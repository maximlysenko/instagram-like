import SignInPage from "../sign-in";
import Home from "../home";

export const APP_ROUTES = [
    {
        id: "sign-in",
        url: "/sign-in",
        page: SignInPage,
        title: "Sign In | Instagram",
    },
    {
        id: "home",
        url: "/",
        page: Home,
        title: "Home | Instagram",
    },
];
