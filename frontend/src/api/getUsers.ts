export const getUsers = async () => {
    // const res = await fetch("http//localhost:8000/api/users/");
    // const data = await res.json();
    const res = await fetch("http://localhost:8000/api/users/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data; //haha we can view all passwords. This is a major GDPR breach
};
