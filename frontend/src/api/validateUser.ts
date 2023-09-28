const getUser = async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/users/${id}`);
    const data = await res.json();

    return data;
}

export const validateUser = async (id: string) => {
    const user = await getUser(id);

    if (user) {
        return true;
    } else {
        return false;
    }
}