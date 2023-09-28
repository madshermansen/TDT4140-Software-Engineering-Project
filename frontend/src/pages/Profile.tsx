import React, { useEffect, useState } from "react";
import "../components/slider/slick.css";
import "../components/slider/slick-theme.css";
import { Button, Modal, Rating, Typography } from "@mui/material";
import { TravelRoute } from "../customTypes/travelRoute";
import RouteCarousel from "../components/RouteCarousel";
import { getRoutes } from "../api/getRoutes";
import { getUserLikes } from "../api/getUserLikes";
import { UserLike } from "../customTypes/userLike";
import { useAppSelector } from "../hooks/store";
import { deleteLike } from "../api/deleteLike";
import { postLike } from "../api/postLike";
import findUserLikedRoutes from "../utils/findUserLikedRoutes";
import findUserCreatedRoutes from "../utils/findUserCreatedRoutes";
import InfoModal from "../components/InfoModual";
import { travelReview } from "../customTypes/Review";
import { getAllReviews } from "../api/getAllReviews";
import { theme } from "../styles/theme";

type Props = {
    darkMode: boolean;
}

export const Profile = ({darkMode}: Props) => {
    ///STATE
    //TravelRoute
    const [selectedRoute, setSelectedRoute] = useState<TravelRoute | null>(
        null
    );
    const palette = () => {
        if(darkMode){
            return theme.palette.secondary;
        }else{
            return theme.palette.primary;
        }
    }

    //TravelRoute lists
    const [routeList, setRouteList] = useState<TravelRoute[]>([]);
    const [favoriteList, setFavoriteList] = useState<TravelRoute[]>([]);
    const [createdRoutes, setCreatedRoutes] = useState<TravelRoute[]>([]);

    //UserLikes
    const [userLikes, setUserLikes] = useState<UserLike[]>([]);
    //Reviews
    const [reviews, setReviews] = useState<travelReview[]>([]);
    //Auth
    const authState = useAppSelector((state) => state.auth);
    //Modal control
    const [modalOpen, setModalOpen] = useState(false);

    ///USEEFFECT
    useEffect(() => {
        if (authState.userId) {
            setCreatedRoutes(
                findUserCreatedRoutes(authState.userId, routeList)
            );
        }
    }, [authState, routeList]);
    useEffect(() => {
        fetchRoutes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postLike, deleteLike, authState]);

    useEffect(() => {
        setFavoriteList(
            findUserLikedRoutes(authState.userId!, userLikes, routeList)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLikes, authState, routeList]); //Ignore exhaustive-deps warning. Only fetch routes on first render

    ///ASYNC FUNCTIONS
    const fetchRoutes = async () => {
        const fetchedRoutes = await getRoutes();
        const fetchedUserLikes = await getUserLikes();
        const fetchedReviews = await getAllReviews();
        setRouteList(fetchedRoutes);
        setUserLikes(fetchedUserLikes);
        setReviews(fetchedReviews);
        setFavoriteList(
            findUserLikedRoutes(authState.userId!, userLikes, routeList)
        );
    };

    const syncUserLikes = async () => {
        const fetchedUserLikes: UserLike[] = await getUserLikes();
        setUserLikes((userLikes) => [
            ...userLikes.filter(
                (userLike) =>
                    !fetchedUserLikes
                        .map((newUserLike) => newUserLike.id)
                        .includes(userLike.id)
            ),
            ...fetchedUserLikes,
        ]);
        setFavoriteList(
            findUserLikedRoutes(authState.userId!, userLikes, routeList)
        );
    };

    ///FUNCTIONS

    ///HANDLERS
    const handleCardClick = (route: TravelRoute) => {
        setSelectedRoute(route);
        setModalOpen(true);
    };

    const handleLikeButtonClick = (id: number) => {
        if (favoriteList.map((route) => route.id).includes(id)) {
            setFavoriteList(() => {
                return favoriteList.filter((route) => route.id !== id);
            });
            setUserLikes((userLikes) =>
                userLikes.filter(
                    (userLike) =>
                        userLike.likedRoute !== id ||
                        userLike.user !== authState.userId
                )
            );
            deleteLike(
                userLikes.find(
                    (userLike) =>
                        userLike.user === authState.userId &&
                        userLike.likedRoute === id
                )?.id!
            );
        } else {
            syncUserLikes();

            const route = routeList.find((route) => route.id === id);
            if (route) {
                setFavoriteList((favoriteList) => [...favoriteList, route]);
                postLike(authState.userId!, route);
            }
        }
    };

    const getCarouselSettings = (itemList: TravelRoute[]) => {
        return {
            dots: true,
            infinite: itemList.length>2,
            speed: 500,
            slidesToShow: itemList.length <3? itemList.length:3,
            slidesToScroll: 1,
        };
    };

    ///RENDER
    const renderItems = () => {
        return (
            <div>
                <Typography variant="h3" sx={{ textAlign: "left", mt: 5, color: palette().main }}>
                    Your Profile
                </Typography>
                <Typography variant="h5" sx={{ textAlign: "left", mt: 5, color: palette().main }}>
                    Routes you like
                </Typography>
                <RouteCarousel
                    loggedIn={authState.isAuthenticated}
                    routeList={favoriteList}
                    favoriteList={favoriteList}
                    carouselSettings={getCarouselSettings(favoriteList)}
                    handleCardClick={handleCardClick}
                    handleLikeButtonClick={handleLikeButtonClick}
                    handleReviewButtonClick={() => {}}
                    handleDeleteTravelRoute = {() => {window.location.reload();}}
                    handleUpdatedRoute = {() => {window.location.reload();}}
                />
                <Typography variant="h5" sx={{ textAlign: "left", mt: 5, color: palette().main }}>
                    Your Travels
                </Typography>
                <RouteCarousel
                    loggedIn={authState.isAuthenticated}
                    routeList={createdRoutes}
                    favoriteList={favoriteList}
                    carouselSettings={getCarouselSettings(createdRoutes)}
                    handleCardClick={handleCardClick}
                    handleLikeButtonClick={handleLikeButtonClick}
                    handleReviewButtonClick={() => {}}
                    handleDeleteTravelRoute = {() => {window.location.reload();}}
                    handleUpdatedRoute = {() => {window.location.reload();}}
                />
                <InfoModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    Route={selectedRoute}
                    reviews={reviews}
                />
                {/* <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: 12,
                            outline: "none",
                        }}
                    >
                        <Typography variant="h5" id="modal-title">
                            {selectedRoute?.title}
                        </Typography>
                        <Typography variant="body1" id="modal-description">
                            {selectedRoute?.description}
                        </Typography>
                        <Rating
                            name="half-rating"
                            precision={0.5}
                            defaultValue={0}
                            readOnly
                            value={selectedRoute?.authorRating}
                        />
                        <br />
                        <Button
                            size="large"
                            onClick={() => setModalOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </Modal> */}
            </div>
        );
    };

    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {renderItems()}
        </div>
    );
};

export default Profile;
