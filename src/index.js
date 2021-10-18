document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    const SignInPage = {
        createSignInFormInput(inputObject) {
            const input = document.createElement("input");
            input.type = inputObject.type;

            if (typeof inputObject.value !== "undefined") {
                input.value = inputObject.value;
            }

            if (typeof inputObject.placeholder !== "undefined") {
                input.placeholder = inputObject.placeholder;
            }

            if (typeof inputObject.name !== "undefined") {
                input.name = inputObject.name;
            }

            return input;
        },
        createSignForm() {
            const signInForm = document.createElement("form");
            const emailInput = this.createSignInFormInput({ type: "email", placeholder: "Email", name: "email" });
            const passwordInput = this.createSignInFormInput({ type: "password", placeholder: "Password", name: "password" });
            const submitButton = this.createSignInFormInput({ type: "submit", value: "Log in" });

            signInForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const fields = event.target.querySelectorAll("input[type=email], input[type=password]");
                const values = {};
                
                fields.forEach((field) => {
                    values[field.name] = field.value;
                });

                console.log("values", values);
                // Make an HTTP request with form values.
            });

            signInForm.appendChild(emailInput);
            signInForm.appendChild(passwordInput);
            signInForm.appendChild(submitButton);

            return signInForm;
        },
        render(container) {
            const signInPageContainer = document.createElement("div");
            signInPageContainer.id = "sign-in-page-container";

            const signInForm = this.createSignForm();

            signInPageContainer.appendChild(signInForm);
            container.appendChild(signInPageContainer);
        },
    };

    SignInPage.render(root);
});
