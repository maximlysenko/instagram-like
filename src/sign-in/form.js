import { createElement } from "../utils";

export default function createSignInFormObject({ onSubmit }) {
    const emailInput = createElement(
        "input",
        { type: "email", placeholder: "Email", name: "email" },
    );
    const passwordInput = createElement(
        "input",
        { type: "password", placeholder: "Password", name: "password" },
    );
    const submitButton = createElement(
        "input",
        { type: "submit", value: "Log in" },
    );
    const signInForm = createElement("form", {}, [emailInput, passwordInput, submitButton]);

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
