import { fetch } from "../utils";
import { API_URL } from "../constants/api";

export async function signIn({ email, password }, onSuccess, onFailure) {
    try {
        const signInResponse = await fetch(`${API_URL}/auth/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        localStorage.setItem("auth", signInResponse["access_token"]);
        onSuccess();
    } catch (e) {
        onFailure(e);
    }
}

export async function signOut() {
    // TODO
}
