export default function createRouter(routes, HTMLContainer) {
    const routesList = Object.keys(routes).map((key) => routes[key]);
    let currentRoute = null;

    window.addEventListener("popstate", (event) => {
        removeCurrentPage();

        if (event.state !== null) {
            renderRoute(routes[event.state.id]);
        } else {
            renderRoute(findRouteByPathname(window.location.pathname));
        }
    });

    function findRouteByPathname(pathname) {
        return routesList.find((route) => route.url === pathname);
    }

    function removeCurrentPage() {
        if (currentRoute !== null) {
            currentRoute.page.remove();
            currentRoute = null;
        }
    }

    function renderRouteWithHistoryChange(routeObject, replace = false) {
        renderRoute(routeObject);

        const method = replace 
            ? window.history.replaceState.bind(window.history) 
            : window.history.pushState.bind(window.history);

        method({ id: routeObject.id }, routeObject.title, routeObject.url);
    }

    function renderRoute(routeObject) {
        if (typeof routeObject === "undefined") {
            throw new Error(`There is no such route as "${routeObject}"`);
        }

        currentRoute = routeObject;
        document.title = routeObject.title;
        routeObject.page.render(HTMLContainer);
    }

    return {
        init(pathname) {
            if (currentRoute !== null) {
                throw new Error(`Current route is ${currentRoute.id}. Router cannot be init twice.`);
            }

            renderRouteWithHistoryChange(findRouteByPathname(pathname));
        },
        go(routeId, replace) {
            removeCurrentPage();
            renderRouteWithHistoryChange(routes[routeId], replace);
        },
    };
}
