import createHeaderObject from "./header";
import createPostsSectionObject from "./posts";
import createNewPostSectionObject from "./create-post";
import { router, user } from "../index";
import { fetchUser } from "./requests";

function createHomePageObject() {
    const pageContainer = document.createElement("div");
    pageContainer.style.position = "relative"; // <-- MUST be CSS class
    const headerSectionObject = createHeaderObject({
        onNewPostClick: handleNewPostButtonClick,
        onSignOutClick: handleSignOutClick,
    });
    const postsSectionObject = createPostsSectionObject();
    
    function handleNewPostButtonClick() {
        const newPostSectionObject = createNewPostSectionObject(handleNewPostCloseClick);
        newPostSectionObject.render(pageContainer);
        document.body.classList.add("prevent-scroll");

        function handleNewPostCloseClick() {
            newPostSectionObject.remove();
            document.body.classList.remove("prevent-scroll");
        }
    }

    function handleSignOutClick() {
        localStorage.removeItem("auth");
        router.go("sign-in");
    }

    return {
        render(container) {
            fetchUser(
                (fetchedUser) => {
                    user = fetchedUser;
                }, (e) => {
                    console.log(e);
                },
            );
            console.log("user", user);
            headerSectionObject.render(pageContainer);
            postsSectionObject.render(pageContainer);
            container.appendChild(pageContainer);
            console.log("Rendered Home");
        },
        remove() {
            headerSectionObject.remove();
            postsSectionObject.remove();
            pageContainer.remove();
            console.log("Removed Home");
        },
    };
}

export default createHomePageObject();
