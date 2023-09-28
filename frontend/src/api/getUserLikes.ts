export const getUserLikes = async () => {
    const res = await fetch(`http://localhost:8000/api/userLikes`);
    const data = await res.json();

    return data;
};
