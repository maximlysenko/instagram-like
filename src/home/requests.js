import { fetch } from "../utils";

export async function fetchUser(onSuccess, onFailure) {
    try {
        const user = await fetch("https://api.github.com/users/maximlysenko123");

        onSuccess(user);
    } catch (e) {
        onFailure(e);
    }
}

export async function fetchPosts(onSuccess, onFailure) {
    try {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });

        const posts = [];

        for (let i = 0; i < 10; i++) {
            posts[i] = {
                id: i + 1,
                imageUrl: "",
                text: `My post #${i + 1}`,
            };
        }

        onSuccess({
            posts,
            totalElements: 30,
        });
    } catch (e) {
        onFailure(e);
    }
}
