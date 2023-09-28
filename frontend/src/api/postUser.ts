import { User } from "../customTypes/user";

export const postUser = async (user: User) => {
    const res = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await res.json();

    return data;
};

export const createUserType = (
    username: string,
    password: string,
    firstname: string,
    lastname: string
) => {
    const user: User = {
        id: 0, //overwritten in backend
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname,
    };
    return user;
};
