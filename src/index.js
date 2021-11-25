import createRouter from "./routing";
import { APP_ROUTES } from "./routing/routes";
// import { fetchUser } from "./home/requests";

export let router = null;

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    
    router = createRouter(APP_ROUTES, root);
    router.init("/");

    // fetchUser(handleUserSuccess, handleUserFailure);

    // function handleUserSuccess(user) {
    //     console.log("SUCCESS", user);
    //     router.init("/");
    // }

    // function handleUserFailure() {
    //     router.init("/sign-in");
    // }
});
