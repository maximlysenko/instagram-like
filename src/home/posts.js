import { fetchPosts } from "./requests";
import { POSTS_SECTION_SCROLL_THRESHOLD } from "./constants";

export default function createPostsSectionObject() {
    const postsContainer = document.createElement("div");

    const state = {
        postsResult: {
            posts: [],
            totalElements: 0,
        },
        fetchingPosts: false,
    };

    /**
     * Колбек для скролінгу
     * Викликаєтсья кожен раз, коли скролимо вікно на 1px
     * Тут наша задача перевірити:
     * 1. Що ми проскролили до відповідної точки (window.scrollY + window.innerHeight >= контейнер.scrollHeight - константа)
     * 2. Що кількість постів, які ми вже раніше загрузили є меншою, ніж загальна кількість постів в юзера
     * 3. Що ми в даний момент не знаходимось в процесі загрузки постів
     * 
     * Якщо всі умови справджуються можна викликати функцію загрузки постів
     */
    function handleScroll() {
        const reachedScrollPoint = window.scrollY + window.innerHeight >= postsContainer.scrollHeight - POSTS_SECTION_SCROLL_THRESHOLD;

        if (
            reachedScrollPoint && 
            !state.fetchingPosts && 
            state.postsResult.posts.length < state.postsResult.totalElements
        ) {
            fetchPostsLocal();
        }
    }
    /**
     * Додаткова функція, яка викликаю функцію загрузки постів
     * Але ще заоодно і змінює значення змінної, що відповідає те чи ми знаходимось в процесі загрузки
     */
    function fetchPostsLocal() {
        console.log("Started posts fetch");
        state.fetchingPosts = true;
        fetchPosts(onSuccess, onFailure);
    }
    /**
     * Функція, що буде обробляти успішну загрузку постів
     * Тут ми:
     * 1. Оновлюємо наш об'єкт з постами і їх загальною кількістю, щоб він був в актуальному стані
     * 2. Створюємо HTML нових постів
     * 3. Змінюємо значення змінної, що відповідає те чи ми знаходимось в процесі загрузки назад на false
     */
    function onSuccess(result) {
        const { posts, totalElements } = result;

        state.postsResult.posts = state.postsResult.posts.concat(posts);
        state.postsResult.totalElements = totalElements;
        state.fetchingPosts = false;

        createAndAppendPostsElements(posts);
        console.log("Finished posts fetch");
    }
    /**
     * Функція, що буде обробляти невдалу загрузку постів
     * Тут ми можемо показати якесь повідомлення про помилку
     * Але обов'язково змінюємо значення змінної, що відповідає те чи ми знаходимось в процесі загрузки назад на false
     */
    function onFailure(error) {
        state.fetchingPosts = false;
        console.error("Fetch failed with:", error);
    }
    /**
     * Окрема функція, що створює HTML постів
     */
    function createAndAppendPostsElements(posts) {
        posts.forEach((post) => {
            postsContainer.appendChild(createPostElement(post));
        });
    }

    return {
        render(container) {
            container.appendChild(postsContainer);
            fetchPostsLocal();
            window.addEventListener("scroll", handleScroll);
            console.log("Rendered posts section");
        },
        remove() {
            window.removeEventListener("scroll", handleScroll);
            postsContainer.remove();
            console.log("Removed posts section");
        },
    };
}

function createPostElement(post) {
    const container = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const titleContainer = document.createElement("div");
    const title = document.createElement("span");

    title.innerText = post.text;
    titleContainer.appendChild(title);

    img.src = post.imageUrl;
    imgContainer.appendChild(img);

    container.appendChild(titleContainer);
    container.appendChild(imgContainer);
    container.style.padding = "20px 0";

    return container;
}
