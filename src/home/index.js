import createPostsSectionObject from "./posts";

function createHomePageObject() {
    const pageContainer = document.createElement("div");
    const postsSectionObject = createPostsSectionObject();

    return {
        render(container) {
            postsSectionObject.render(pageContainer);
            container.appendChild(pageContainer);
            console.log("Rendered Home");
        },
        remove() {
            postsSectionObject.remove();
            pageContainer.remove();
            console.log("Removed Home");
        },
    };
}

export default createHomePageObject();
