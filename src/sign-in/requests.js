import { fetch } from "../utils";

export async function signIn({ email, password }, onSuccess, onFailure) {
    try {
        const signInResponse = await fetch("", {
            body: JSON.stringify({
                email,
                password,
            }),
        });
        // Handle success
        /* 
            {
                "access_token": "dklamdaljkfnkasnda"
            }
        */
    } catch (e) {
        // Handle error
    }
}

export async function signOut() {
    // TODO
}
