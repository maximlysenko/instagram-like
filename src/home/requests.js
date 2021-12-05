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
            }, 1500);
        });

        const posts = [];

        for (let i = 0; i < 20; i++) {
            posts[i] = {
                id: i + 1,
                imageUrl: "https://",
                text: `My post #${i + 1}`,
            };
        }

        onSuccess({
            posts,
            totalElements: 100,
        });
    } catch (e) {
        onFailure(e);
    }
}
