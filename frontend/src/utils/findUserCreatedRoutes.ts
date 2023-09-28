import { TravelRoute } from "../customTypes/travelRoute";

const findUserCreatedRoutes = (userId: number, allRoutes: TravelRoute[]) => {
    return allRoutes.filter((route) => route.author === userId);
};

export default findUserCreatedRoutes;
