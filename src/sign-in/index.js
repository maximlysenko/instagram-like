import createCarouselContainer from "./carousel";
import createSignInFormObject from "./form";
import { router } from "../index";
import { EMAIL_REG_EXP } from "./constants";
import { signIn } from "./requests";

function createSignInPageObject() {
    const pageContainer = document.createElement("div");
    const signInForm = createSignInFormObject({ onSubmit: handleSubmit });
    const carouselContainer = createCarouselContainer();

    pageContainer.id = "sign-in-page-container";
    pageContainer.classList.add("container");

    function handleSubmit(event) {
        event.preventDefault();

        const emailInput = event.target.querySelector("input[type=email]");
        const passwordInput = event.target.querySelector("input[type=password]");

        if (EMAIL_REG_EXP.test(emailInput.value) && passwordInput.value.length > 3) {
            signIn(
                { email: emailInput.value, password: passwordInput.value },
                () => {
                    router.go("home");
                }, 
                (error) => {
                    // Handle error
                    console.log("Sign in error", error);
                },
            );
        }
    }

    return {
        render(container) {
            carouselContainer.render(pageContainer);
            signInForm.render(pageContainer);
            container.appendChild(pageContainer);
            console.log("Rendered Sign In");
        },
        remove() {
            carouselContainer.remove();
            signInForm.remove();
            pageContainer.remove();
            console.log("Removed Sign In");
        },
    };
}

export default createSignInPageObject();
