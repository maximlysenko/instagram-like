import createHeaderObject from "./header";
import createPostsSectionObject from "./posts";
import createNewPostSectionObject from "./create-post";

function createHomePageObject() {
    const pageContainer = document.createElement("div");
    pageContainer.style.position = "relative"; // <-- MUST be CSS class
    const headerSectionObject = createHeaderObject(handleNewPostButtonClick);
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

    return {
        render(container) {
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
