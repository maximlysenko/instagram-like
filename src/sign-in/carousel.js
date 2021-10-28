import { createElement, createCarousel } from "../utils";
import { IMAGES_URLS, IMAGE_VISIBLE_CLASS_NAME } from "./constants";

export default function createCarouselContainer() {
    const STARTING_INDEX = 0;
    const imagesContainers = IMAGES_URLS.map((_, index) => {
        const image = createElement("img", { class: "carousel-image" });
        const container = createElement(
            "div",
            {
                class: `carousel-image-container${index === STARTING_INDEX ? IMAGE_VISIBLE_CLASS_NAME : ""}`,
            },
            [image],
        );

        return container;
    });
    const carouselContainer = createElement("div", { class: "carousel-container" }, imagesContainers);

    const carousel = createCarousel({
        numberOfElements: IMAGES_URLS.length,
        onChange(currentIndex) {
            imagesContainers.forEach((container) => {
                container.classList.remove(IMAGE_VISIBLE_CLASS_NAME);
            });
            imagesContainers[currentIndex].classList.add(IMAGE_VISIBLE_CLASS_NAME);
        },
    });

    return {
        render(container) {
            imagesContainers.forEach((imageContainer, index) => {
                imageContainer.children[STARTING_INDEX].src = IMAGES_URLS[index];
            });
            container.appendChild(carouselContainer);
            carousel.start();
        },
        remove() {
            carousel.stop();
            carouselContainer.remove();
        },
    };
};
