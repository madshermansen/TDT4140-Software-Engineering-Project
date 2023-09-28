import { TravelRoute } from "../customTypes/travelRoute";

// Post request to database
export const postLike = async (userId: number, route: TravelRoute) => {
    const res = await fetch("http://localhost:8000/api/userLikes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId, likedRoute: route.id }),
    });

    const data = await res.json();

    return data;
};
