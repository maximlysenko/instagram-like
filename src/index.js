import createRouter from "./routing";
import { APP_ROUTES } from "./routing/routes";

export let router = null;

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    
    router = createRouter(APP_ROUTES, root);
    router.init(/*window.location.pathname*/"/sign-in");
});
