import { TravelRoute } from "../customTypes/travelRoute";

// Post request to database
export const putRoute = async (route: TravelRoute) => {
    const res = await fetch("http://localhost:8000/api/routes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
    });

    const data = await res.json();

    return data;
};