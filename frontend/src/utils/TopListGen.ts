
import { TravelRoute } from "../customTypes/travelRoute";

function sortRoutesByRating(routes: TravelRoute[]): TravelRoute[] {
  // Create a copy of the original array to avoid modifying it
  const sortedRoutes = [...routes];
  // Sort the routes by their rating in descending order
  sortedRoutes.sort((a, b) => b.authorRating - a.authorRating);
  return sortedRoutes;
}
export default sortRoutesByRating;