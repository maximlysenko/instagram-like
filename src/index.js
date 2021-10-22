document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const signInPage = createSignPage();

    signInPage.render(root);

    setTimeout(() => {
        signInPage.remove();
    }, 3000);
});

function createSignPage() {
    const pageContainer = createPageContainer();
    const signInForm = createSignInForm({ onSubmit: handleSubmit });

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
            signInForm.render(pageContainer);
            container.appendChild(pageContainer);
        },
        remove() {
            signInForm.remove();
            pageContainer.remove();
            console.log("After remove", signInForm);
        },
    };
}

function createSignInForm({ onSubmit }) {
    const signInForm = document.createElement("form");
    const emailInput = createSignInFormInput({ type: "email", placeholder: "Email", name: "email" });
    const passwordInput = createSignInFormInput({ type: "password", placeholder: "Password", name: "password" });
    const submitButton = createSignInFormInput({ type: "submit", value: "Log in" });

    signInForm.appendChild(emailInput);
    signInForm.appendChild(passwordInput);
    signInForm.appendChild(submitButton);

    function createSignInFormInput(attributesObject) {
        const input = document.createElement("input");

        Object.keys(attributesObject).forEach((attributeName) => {
            input.setAttribute(attributeName, attributesObject[attributeName]);
        });

        return input;
    };

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
