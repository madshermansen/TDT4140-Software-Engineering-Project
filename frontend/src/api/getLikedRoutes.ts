//Not used. Can use if we need unique user_id backend endpoints
export const getLikedRoutes = async (user_id: number) => {
    const res = await fetch(`http://localhost:8000/api/user=${user_id}/likes/`);
    const data = await res.json();

    return data;
};
