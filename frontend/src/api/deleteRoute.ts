export const deleteRoute = async (id: number) => {
    const res = await fetch(`http://localhost:8000/api/routes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}