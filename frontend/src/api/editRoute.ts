import { TravelRoute } from "../customTypes/travelRoute";

export const editRoute = async (id: number, route: TravelRoute) => {
    const res = await fetch(`http://localhost:8000/api/routes/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
    });

    const data = await res.json();

    return data;
};