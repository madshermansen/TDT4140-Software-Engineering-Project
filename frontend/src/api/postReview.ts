import { travelReview } from "../customTypes/Review";

export const postReview = async (review: travelReview) => {
    const res = await fetch("http://localhost:8000/api/reviews/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });

    const data = await res.json();

    return data;
};
