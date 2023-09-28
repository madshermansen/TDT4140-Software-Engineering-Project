import { getUsers } from "../api/getUsers";
import { User } from "../customTypes/user";

export const getAuthorName = async (authorId: number) => {
    const fetchedUsers: User[] = await getUsers();
    return (
        fetchedUsers.find((user) => user.id === authorId)?.first_name +
        " " +
        fetchedUsers.find((user) => user.id === authorId)?.last_name
    );
};
