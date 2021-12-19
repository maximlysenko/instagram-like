export default function createHeaderObject({ onNewPostClick, onSignOutClick }) {
    const header = document.createElement("header");
    // "Plus" button
    const button = document.createElement("button");
    button.innerText = "Create post";

    const signOutButton = document.createElement("button");
    signOutButton.innerText = "Sign out";

    header.appendChild(button);
    header.appendChild(signOutButton);

    return {
        render(container) {
            container.appendChild(header);
            button.addEventListener("click", onNewPostClick);
            signOutButton.addEventListener("click", onSignOutClick);
            // TODO: Add circle "click" listener
            // TODO: Add document "click" listener
        },
        remove() {
            button.removeEventListener("click", onNewPostClick);
            signOutButton.removeEventListener("click", onSignOutClick);
            header.remove();
            // TODO: Remove circle "click" listener
            // TODO: Remove document "click" listener
        },
    };
}
