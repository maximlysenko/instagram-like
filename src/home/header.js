export default function createHeaderObject(handleButtonClick) {
    const header = document.createElement("header");
    // "Plus" button
    const button = document.createElement("button");
    button.innerText = "Create post";

    header.appendChild(button);

    return {
        render(container) {
            container.appendChild(header);
            button.addEventListener("click", handleButtonClick);
            // TODO: Add circle "click" listener
            // TODO: Add document "click" listener
        },
        remove() {
            button.removeEventListener("click", handleButtonClick);
            header.remove();
            // TODO: Remove circle "click" listener
            // TODO: Remove document "click" listener
        },
    };
}
