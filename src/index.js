import createRouter from "./routing";
import { APP_ROUTES } from "./routing/routes";
import { fetchUser } from "./home/requests";

export let router = null;
export let user = null;

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    
    router = createRouter(APP_ROUTES, root);

    fetchUser(handleUserSuccess, handleUserFailure);

    function handleUserSuccess(fetchedUser) {
        user = fetchedUser;
        router.init("/");
    }

    function handleUserFailure() {
        router.init("/sign-in");
    }
});
