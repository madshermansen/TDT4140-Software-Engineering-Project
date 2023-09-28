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

type Props = {
    loggedIn: boolean;
    routeList: TravelRoute[];
    topList: TravelRoute[];
    carouselSettings: any;
    handleCardClick(item: TravelRoute): void;
    handleLikeButtonClick(travelId: number): void;
};

const RouteCarousel = ({
    loggedIn,
    routeList,
    carouselSettings,
    handleCardClick,
    handleLikeButtonClick,
    topList,
}: Props) => {
    return (
        <Slider {...carouselSettings}>
            {routeList.map((item: TravelRoute) => (
                <div key={item.id}>
                    <Card
                        style={{
                            width: "600px",
                            borderRadius: 16,
                            backgroundColor: "white",
                            padding: "10px",
                            paddingBottom: "5px",
                            margin: "20px",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
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
                                        topList
                                            .map((route) => route.id)
                                            .includes(item.id) ? (
                                            <FavoriteIcon color="secondary" />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )
                                    }
                                ></Button>
                            ) : null}
                        </CardActions>
                    </Card>
                </div>
            ))}
        </Slider>
    );
};

export default RouteCarousel;
