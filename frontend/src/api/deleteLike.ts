export const deleteLike = async (userLikeId: number) => {
    await fetch(`http://localhost:8000/api/userLikes/${userLikeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userLikeId: userLikeId }), //body is not used in the request. Just sending something
    });
};
