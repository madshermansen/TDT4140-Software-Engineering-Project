import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { TravelRoute } from "../customTypes/travelRoute";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";
import EditTravelModal from "./EditTravelModal";
import { useAppSelector } from "../hooks/store";

type Props = {
    loggedIn: boolean;
    routeList: TravelRoute[];
    favoriteList: TravelRoute[];
    carouselSettings: any;
    handleCardClick(item: TravelRoute): void;
    handleLikeButtonClick(travelId: number): void;
    handleReviewButtonClick(item: TravelRoute): void;
    handleDeleteTravelRoute(route: TravelRoute): void;
    handleUpdatedRoute(newRoute: TravelRoute, id: number): void;
};

const RouteCarousel = ({
    loggedIn,
    routeList,
    carouselSettings,
    handleCardClick,
    handleLikeButtonClick,
    handleReviewButtonClick,
    favoriteList,
    handleDeleteTravelRoute,
    handleUpdatedRoute
}: Props) => {
    const ID = useAppSelector((state) => state.auth.userId);

    return (
        <Slider {...carouselSettings}>
            {routeList.map((item: TravelRoute) => (
                <div key={item.id}>
                    <Card
                        style={{
                            width: "400px",
                            borderRadius: 16,
                            backgroundColor: "white",
                            padding: "10px",
                            paddingBottom: "5px",
                            margin: "20px",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                onClick={() => handleCardClick(item)}
                                sx={{ cursor: "pointer" }}
                            >
                                {item.title}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="large"
                                onClick={() => handleCardClick(item)}
                            >
                                See More
                            </Button>
                            {loggedIn ? (
                                <Button
                                    size="large"
                                    onClick={() =>
                                        handleLikeButtonClick(item.id)
                                    }
                                    startIcon={
                                        favoriteList
                                            .map((route) => route.id)
                                            .includes(item.id) ? (
                                            <FavoriteIcon color="secondary" />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )
                                    }
                                ></Button>
                            ) : null}
                            {loggedIn ? (
                                <Button
                                    size="large"
                                    onClick={() =>
                                        handleReviewButtonClick(item)
                                    }
                                    startIcon={
                                        favoriteList
                                            .map((route) => route.id)
                                            .includes(item.id) ? (
                                            <AddCommentIcon />
                                        ) : (
                                            <AddCommentIcon />
                                        )
                                    }
                                ></Button>
                            ) : null}
                            {item.author === ID && loggedIn ? (
                                <EditTravelModal
                                    route={item}
                                    handleDeleteTravelRoute = {handleDeleteTravelRoute}
                                    handleUpdatedRoute = {handleUpdatedRoute}
                                />
                            ) : null}
                        </CardActions>
                    </Card>
                </div>
            ))}
        </Slider>
    );
};

export default RouteCarousel;
