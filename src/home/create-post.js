export default function createNewPostSectionObject(handleCloseClick) {
     // RGBA background-color
     // position: absolute;
     // display: flex;
    const newPostSectionContainer = document.createElement("div");
    newPostSectionContainer.style.position = "absolute";
    newPostSectionContainer.style.left = "0px";
    newPostSectionContainer.style.top = "0px";
    newPostSectionContainer.style.height = "100vh";
    newPostSectionContainer.style.width = "100vw";
    newPostSectionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    // Close icon "X"
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";

    // TODO: Create main "white" block
    // TODO: Create image block
    // TODO: Create textarea block

    function createImgSelection() {
        const div = document.createElement("div");
        div.style.width = "300px";
        const input = document.createElement("input");
        input.type = "file";
        input.name = "user-photo";
        input.accept = "image/*";

        input.addEventListener("change", (event) => {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", (event) => {
                const img = document.createElement("img");
                img.style.maxWidth = "100%";
                img.style.display = "block";
                img.src = event.target.result;
    
                div.appendChild(img);
            });
            fileReader.readAsDataURL(event.target.files[0]);
        });

        div.appendChild(input);

        return div;
    }

    newPostSectionContainer.appendChild(closeButton);
    newPostSectionContainer.appendChild(createImgSelection());

    return {
        render(container) {
            closeButton.addEventListener("click", handleCloseClick);
            container.appendChild(newPostSectionContainer);
        },
        remove() {
            closeButton.removeEventListener("click", handleCloseClick);
            newPostSectionContainer.remove();
        },
    };
}
