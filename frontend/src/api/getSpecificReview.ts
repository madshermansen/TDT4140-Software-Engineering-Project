export const getSpecificReview = async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/reviews/${id}`);
    const data = await res.json();

    return data;
}