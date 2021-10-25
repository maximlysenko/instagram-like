export function createElement(tagName, attributes = {}, classNames = []) {
    const element = document.createElement(tagName);

    classNames.forEach((className) => {
        element.classList.add(className);
    });

    Object.keys(attributes).forEach((attributeName) => {
        element.setAttribute(attributeName, attributes[attributeName]);
    });

    return element;
};

export function createCarousel(configuration) {
    const { numberOfElements, onChange, interval = 2000, startingIndex = 0 } = configuration;
    let carouselIntervalId = null;
    let index = startingIndex;

    return {
        start() {
            carouselIntervalId = setInterval(() => {
                index++;

                if (index >= numberOfElements) {
                    index = 0;
                }

                onChange(index);
            }, interval);
        },
        stop() {
            clearInterval(carouselIntervalId);
        },
    };
};
