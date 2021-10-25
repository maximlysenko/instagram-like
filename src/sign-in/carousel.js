import { createElement, createCarousel } from "../utils";

export default function createCarouselContainer() {
    const IMAGE_VISIBLE_CLASS_NAME = "carousel-image-container-visible";
    const IMAGES_URLS = [
        "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"
    ];
    const carouselContainer = document.createElement("div");
    const imagesContainers = IMAGES_URLS.map(() => {
        const container = createElement("div", {}, ["carousel-image-container"]);

        container.appendChild(createElement("img", {}, ["carousel-image"]));

        return container;
    });
    const carousel = createCarousel({
        numberOfElements: IMAGES_URLS.length,
        onChange(currentIndex) {
            imagesContainers.forEach((container) => {
                container.classList.remove(IMAGE_VISIBLE_CLASS_NAME);
            });
            imagesContainers[currentIndex].classList.add(IMAGE_VISIBLE_CLASS_NAME);
        },
    });

    carouselContainer.classList.add("carousel-container");
    imagesContainers[0].classList.add(IMAGE_VISIBLE_CLASS_NAME);
    imagesContainers.forEach((imageContainer) => {
        carouselContainer.appendChild(imageContainer);
    });

    return {
        render(container) {
            imagesContainers.forEach((imageContainer, index) => {
                imageContainer.children[0].src = IMAGES_URLS[index];
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
