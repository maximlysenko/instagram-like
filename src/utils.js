export function createElement(tagName, attributes = {}, children = []) {
    const element = document.createElement(tagName);

    Object.keys(attributes).forEach((attributeName) => {
        element.setAttribute(attributeName, attributes[attributeName]);
    });

    children.forEach((child) => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));    
        } else {
            element.appendChild(child);
        }
    });

    return element;
}

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

export async function fetch(url, options) {
    const response = await window.fetch(url, options);

    if (response.status >= 400) {
        throw response;
    }

    return response.json();
};
