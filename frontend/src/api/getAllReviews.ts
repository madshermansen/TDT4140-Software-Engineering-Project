export const getAllReviews = async () => {
    const res = await fetch(`http://localhost:8000/api/reviews/`);
    const data = await res.json();

    return data;
};
