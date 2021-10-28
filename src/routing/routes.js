import SignInPage from "../sign-in";

export const APP_ROUTES = {
    "sign-in": {
        id: "sign-in",
        url: "/sign-in",
        page: SignInPage,
        title: "Sign In | Instagram",
    },
    "home": {
        id: "home",
        url: "/",
        page: {
            render() {
                console.log("Rendered Home");
            },
            remove() {
                console.log("Removed Home");
            },
        },
        title: "Home | Instagram",
    },
};
