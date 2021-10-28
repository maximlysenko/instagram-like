import createSignPage from "./sign-in";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const signInPage = createSignPage();

    signInPage.render(root);
});
