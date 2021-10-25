document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const signInPage = createSignPage();

    signInPage.render(root);

    // setTimeout(() => {
    //     signInPage.remove();
    // }, 3000);
});

function createSignPage() {
    const pageContainer = createPageContainer();
    const signInForm = createSignInForm({ onSubmit: handleSubmit });
    const carouselContainer = createCarouselContainer();

    function createPageContainer() {
        const pageContainer = document.createElement("div");

        pageContainer.id = "sign-in-page-container";
        pageContainer.classList.add("container");

        return pageContainer;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fields = event.target.querySelectorAll("input[type=email], input[type=password]");
        const values = {};
        
        fields.forEach((field) => {
            values[field.name] = field.value;
        });

        console.log("values", values);
    }

    return {
        render(container) {
            carouselContainer.render(pageContainer);
            signInForm.render(pageContainer);
            container.appendChild(pageContainer);
        },
        remove() {
            carouselContainer.remove();
            signInForm.remove();
            pageContainer.remove();
            console.log("After remove", signInForm);
        },
    };
}

function createCarouselContainer() {
    const IMAGE_VISIBLE_CLASS_NAME = "carousel-image-container-visible";
    const IMAGES_URLS = [
        "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"
    ];
    const carouselContainer = document.createElement("div");
    const imagesContainers = IMAGES_URLS.map(() => {
        const container = createElement("div", {}, ["carousel-image-container"]);

        container.appendChild(createElement("img", {}, ["carousel-image"]));

        return container;
    });
    const carousel = createCarousel({
        numberOfElements: IMAGES_URLS.length,
        onChange(currentIndex) {
            imagesContainers.forEach((container) => {
                container.classList.remove(IMAGE_VISIBLE_CLASS_NAME);
            });
            imagesContainers[currentIndex].classList.add(IMAGE_VISIBLE_CLASS_NAME);
        },
    });

    carouselContainer.classList.add("carousel-container");
    imagesContainers[0].classList.add(IMAGE_VISIBLE_CLASS_NAME);
    imagesContainers.forEach((imageContainer) => {
        carouselContainer.appendChild(imageContainer);
    });

    return {
        render(container) {
            imagesContainers.forEach((imageContainer, index) => {
                imageContainer.children[0].src = IMAGES_URLS[index];
            });
            container.appendChild(carouselContainer);
            carousel.start();
        },
        remove() {
            carousel.stop();
            carouselContainer.remove();
        },
    };
}

function createSignInForm({ onSubmit }) {
    const signInForm = document.createElement("form");
    const emailInput = createElement("input", { type: "email", placeholder: "Email", name: "email" });
    const passwordInput = createElement("input", { type: "password", placeholder: "Password", name: "password" });
    const submitButton = createElement("input", { type: "submit", value: "Log in" });

    signInForm.appendChild(emailInput);
    signInForm.appendChild(passwordInput);
    signInForm.appendChild(submitButton);

    return {
        render(container) {
            signInForm.addEventListener("submit", onSubmit);
            container.appendChild(signInForm);
        },
        remove() {
            signInForm.removeEventListener("submit", onSubmit);
            signInForm.remove();
        },
    };
}

function createElement(tagName, attributes = {}, classNames = []) {
    const element = document.createElement(tagName);

    classNames.forEach((className) => {
        element.classList.add(className);
    });

    Object.keys(attributes).forEach((attributeName) => {
        element.setAttribute(attributeName, attributes[attributeName]);
    });

    return element;
}

function createCarousel(configuration) {
    const { numberOfElements, onChange, interval = 2000, startingIndex = 0 } = configuration;
    let carouselIntervalId = null;
    let index = startingIndex;

    return {
        start() {
            carouselIntervalId = setInterval(() => {
                index++;

                if (index >= numberOfElements) {
                    index = 0;
                }

                onChange(index);
            }, interval);
        },
        stop() {
            clearInterval(carouselIntervalId);
        },
    };
}
