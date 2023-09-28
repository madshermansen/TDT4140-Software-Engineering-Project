import { User } from "../customTypes/user";

export const validateLogin = async (id: string, password: string) => {
    const res = await fetch(`http://localhost:8000/api/users/`);
    const data = await res.json();
    let hit = null;
    data.forEach((user: User) => {
        if (user.username === id && user.password === password) {
            hit = user;
        }
    });
    return hit;
};

export const getUserData = async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/users/`);
    const data = await res.json();
    let hit = {};
    data.forEach((user: User) => {
        if (user.username === id) {
            hit = user;
        }
    });
    return hit;
};
