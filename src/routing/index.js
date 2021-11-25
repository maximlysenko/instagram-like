export default function createRouter(routes, HTMLContainer) {
    let currentRoute = null;

    window.addEventListener("popstate", (event) => {
        removeCurrentPage();

        if (event.state !== null) {
            renderRoute(findRouteById(event.state.id));
        } else {
            renderRoute(findRouteByPathname(window.location.pathname));
        }
    });

    function findRouteByPathname(pathname) {
        const found = routes.find(route => route.url === pathname);

        if (!found) {
            return routes.find(route => route.id === "sign-in");
        }

        return found;
    }

    function findRouteById(routeId) {
        return routes.find(route => route.id === routeId);
    }

    function removeCurrentPage() {
        if (currentRoute !== null) {
            currentRoute.page.remove();
            currentRoute = null;
        }
    }

    function renderRouteWithHistoryChange(routeObject, replace = false) {
        renderRoute(routeObject);

        const pushOrReplaceState = replace 
            ? window.history.replaceState.bind(window.history) 
            : window.history.pushState.bind(window.history);

        pushOrReplaceState({ id: routeObject.id }, routeObject.title, routeObject.url);
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
                throw new Error(`Current route is ${currentRoute.id}. Router cannot be initialized twice.`);
            }

            renderRouteWithHistoryChange(findRouteByPathname(pathname));
        },
        go(routeId, replace) {
            removeCurrentPage();
            renderRouteWithHistoryChange(findRouteById(routeId), replace);
        },
    };
}
