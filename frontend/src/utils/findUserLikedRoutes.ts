import { TravelRoute } from "../customTypes/travelRoute";
import { UserLike } from "../customTypes/userLike";

const findUserLikedRoutes = (
    userId: number,
    userLikes: UserLike[],
    allRoutes: TravelRoute[]
) => {
    const routeIds = userLikes
        .filter((like) => like.user === userId)
        .map((like) => like.likedRoute);
    return allRoutes.filter((route) => routeIds.includes(route.id));
};

export default findUserLikedRoutes;
