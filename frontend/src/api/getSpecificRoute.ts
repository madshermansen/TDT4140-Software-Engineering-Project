export const getSpecificRoute = async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/routes/${id}`);
    const data = await res.json();

    return data;
}