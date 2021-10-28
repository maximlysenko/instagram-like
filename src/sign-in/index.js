import createCarouselContainer from "./carousel";
import createSignInForm from "./form";

export default function createSignPage() {
    const pageContainer = createPageContainer();
    const signInForm = createSignInForm({ onSubmit: handleSubmit });
    const carouselContainer = createCarouselContainer();

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

        router.go("home", true);
    }

    return {
        render(container) {
            carouselContainer.render(pageContainer);
            signInForm.render(pageContainer);
            container.appendChild(pageContainer);
        },
        remove() {
            carouselContainer.remove();
            signInForm.remove();
            pageContainer.remove();
            console.log("After remove", signInForm);
        },
    };
}
