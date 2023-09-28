import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    Rating,
    Typography,
} from "@mui/material";
import { getRoutes } from "../api/getRoutes";
import { theme } from "../styles/theme";
import CreateIcon from "@mui/icons-material/Create";
import AddTravelModal from "../components/AddTravelModal";
import { TravelRoute } from "../customTypes/travelRoute";
import RouteCarousel from "../components/RouteCarousel";
import sortedRoutesByRating from "../utils/TopListGen";
import { useAppSelector } from "../hooks/store";
import { UserLike } from "../customTypes/userLike";
import { getUserLikes } from "../api/getUserLikes";
import { postLike } from "../api/postLike";
import { deleteLike } from "../api/deleteLike";
import findUserLikedRoutes from "../utils/findUserLikedRoutes";
import ReviewModal from "../components/RewievModal";
import InfoModual from "../components/InfoModual";
import { travelReview } from "../customTypes/Review";
import { getAllReviews } from "../api/getAllReviews";
import { editRoute } from "../api/editRoute";
import { useRadioGroup } from '@mui/material/RadioGroup';
import { useSnackbar } from "notistack";

type Props = {
    darkMode: boolean;
}

const Home = ({darkMode}: Props) => {
    ///STATE
    //TravelRoute
    const [selectedRoute, setSelectedRoute] = useState<TravelRoute | null>(null);

    //TravelRoute lists
    const [routeList, setRouteList] = useState<TravelRoute[]>([]);
    const [favoriteList, setFavoriteList] = useState<TravelRoute[]>([]);
    const [sortedRoutes, setSortedRoutes] = useState<TravelRoute[]>(sortedRoutesByRating(routeList));
    //UserLikes
    const [userLikes, setUserLikes] = useState<UserLike[]>([]);
    //Reviews
    const [reviews, setReviews] = useState<travelReview[]>([]);
    //Auth
    const authState = useAppSelector((state) => state.auth);
    //Modal control
    const [modalOpen, setModalOpen] = useState(false);
    const [RewievModalOpen, setRewievModalOpen] = useState(false);
    const [addTravelModalOpen, setAddTravelModalOpen] = useState(false);
    const [TopListRadiovalue, setTopListRadioValue] = useState("5");
    const [RecList, setRecList] = useState<TravelRoute[]>([]);
    //SNACKBAR
    const { enqueueSnackbar } = useSnackbar();

    ///USEEFFECT
    useEffect(() => {
        fetchRoutes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postLike, deleteLike, authState]); //Ignore exhaustive-deps warning. Only fetch routes on first render

    const createRecommendationList = () => {
        let taglist : string[] = [];
        let recommendedList : TravelRoute[] = [];
        favoriteList.forEach((route) => {
            route.tags.split(",").forEach((tag) => {
                taglist.push(tag);
            });
        });

        let uniqueTags = [...new Set(taglist)];
        routeList.forEach((route) => {
            if (uniqueTags.some(element => route.tags.includes(element))) {
                recommendedList.push(route);
            }
        });
        setRecList(recommendedList);
    };

    useEffect(() => {
        let sortedRoutes = sortedRoutesByRating(routeList);
        setSortedRoutes(
            sortedRoutes
                .filter(
                    (route: TravelRoute) =>
                        sortedRoutes.indexOf(route) <
                        parseInt(TopListRadiovalue)
                )
                .map((route) => {
                    let { title, ...other } = route;
                    return {
                        title:
                            "#" +
                            (1 + sortedRoutes.indexOf(route)).toString() +
                            ": " +
                            title,
                        ...other,
                    };
                })
        );
    }, [routeList, TopListRadiovalue]);

    useEffect(() => {
        setFavoriteList(
            findUserLikedRoutes(authState.userId!, userLikes, routeList)
        );
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLikes, authState, routeList]);

    useEffect(() => {
        createRecommendationList();
    }, [favoriteList]);
    // For future review-stuff from cathy
    // const [review, setReview] = useState<travelReview>();

    // const fetchReview = async(id: string) => {
    //     const fetchedReview = await getSpecificReview(id);
    //     setReview(fetchedReview);
    // }
    // useEffect(() => {

    //     fetchReview("1");
    // }, []);

    // console.log(review);

    // testing delete call - can be used when deleting post 9
    // const idToDelete = 9;
    // deleteRoute(idToDelete);

    // Testing of editing function
    // var MadsTrip: TravelRoute = {
    //     id: 9,
    //     author: 1,
    //     title: "halla",
    //     description: "String",
    //     dateCreated: "string",
    //     duration: 2,
    //     authorRating: 3,
    //     priceEstimate: 4,
    //     tags: "string",
    // };

    // editRoute(9, MadsTrip);

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

        setSortedRoutes(
            fetchedRoutes.filter(
                (route: TravelRoute) =>
                    sortedRoutes.indexOf(route) < parseInt(TopListRadiovalue)
            )
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

    const getCarouselSettings = (itemList: TravelRoute[]) => {
        return {
            dots: true,
            infinite: itemList.length>2,
            speed: 500,
            slidesToShow: itemList.length <3? itemList.length:3,
            slidesToScroll: 2,
        };
    };

    const sortByDateCreated = (routes: TravelRoute[]): TravelRoute[] => {
        const sortedRoutes = routes.sort(
            (r1, r2) =>
                new Date(r2.dateCreated).getTime() -
                new Date(r1.dateCreated).getTime()
        );
        const newRoutes = sortedRoutes.map((route) => {
            let { title, ...other } = route;
            return {
                title:
                    route.title +
                    ": " +
                    new Date(route.dateCreated).getDate() +
                    "." +
                    (1 + new Date(route.dateCreated).getMonth()) +
                    "." +
                    new Date(route.dateCreated).getFullYear(),
                ...other,
            };
        });
        return sortedRoutes;
    };

    const palette = () => {
        if(darkMode){
            return theme.palette.secondary;
        }else{
            return theme.palette.primary;
        }
    }

    ///HANDLERS

    const handleCardClick = (route: TravelRoute) => {
        setSelectedRoute(route);
        setModalOpen(true);
    };

    const handleLikeButtonClick = (id: number) => {
        if (favoriteList.map((route) => route.id).includes(id)) {
            setFavoriteList((favoriteList) =>
                favoriteList.filter((route) => route.id !== id)
            );
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
    const handleReviewButtonClick = (route: TravelRoute) => {
        setSelectedRoute(route);
        setRewievModalOpen(true);
    };

    const handleNewTravelRoute = (newRoute: TravelRoute): void => {
        setRouteList([...routeList, newRoute]);
        setAddTravelModalOpen(false);
    };
    const handleTopListRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopListRadioValue((event.target as HTMLInputElement).value);
        //console.log((event.target as HTMLInputElement).value);
        //console.log(parseInt(TopListRadiovalue));
    };

    const handleDeleteTravelRoute = (route: TravelRoute) => {
        setRouteList(routeList.filter((travelroute: TravelRoute)=> 
            travelroute.id!=route.id
        ));
    }

    const handleUpdatedRoute = (route: TravelRoute, id: number) => {
        setRouteList([...(routeList.filter((travelroute: TravelRoute)=> 
            travelroute.id!=route.id
        )), route]);
    }

    const renderItems = () => {
        return (
            <div>
                <Box>
                    <div
                        style={{
                            maxWidth: "1400px",
                            margin: "0 auto",
                            padding: 3,
                            borderRadius: 8,
                            backgroundImage: darkMode?`url(${process.env.PUBLIC_URL + "/natt.jpg"})`:`url(${process.env.PUBLIC_URL + "/italia.png"})`,
                        }}
                    >
                        {authState.isAuthenticated ? (
                            <Button
                                aria-label="addtravel-button"
                                onClick={() => {
                                    setAddTravelModalOpen(true);
                                }}
                                startIcon=<CreateIcon />
                                    sx={{
                                    color: theme.palette.primary.main,
                                    backgroundColor:
                                        theme.palette.primary.light,
                                    marginTop: 3,
                                    marginLeft: 3,
                                    borderRadius: 3,
                                    paddingX: 2,
                                    fontFamily: "Poppins",
                                    ":hover": {
                                        bgcolor:
                                            theme.palette.primary.contrastText,
                                    },
                                }}
                            >
                                Add Travel
                            </Button>
                        ) : (
                            <Button
                                sx={{
                                    color: theme.palette.primary.light,
                                    marginTop: 3,
                                    borderRadius: 3,
                                    paddingX: 2,
                                    fontFamily: "Poppins",
                                }}
                            ></Button>
                        )}
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: "left",
                                mt: 5,
                                color: theme.palette.primary.light,
                                ontFamily: "Poppins",
                                marginLeft: 4,
                            }}
                        >
                            New Travel Routes
                        </Typography>
                        <AddTravelModal
                            open={addTravelModalOpen}
                            onClose={() => setAddTravelModalOpen(false)}
                            onNewTravelRoute={handleNewTravelRoute}
                        />

                        <RouteCarousel
                            loggedIn={authState.isAuthenticated}
                            routeList={sortByDateCreated(routeList)}
                            favoriteList={favoriteList}
                            carouselSettings={getCarouselSettings(routeList)}
                            handleCardClick={handleCardClick}
                            handleLikeButtonClick={handleLikeButtonClick}
                            handleReviewButtonClick={handleReviewButtonClick}
                            handleDeleteTravelRoute = {handleDeleteTravelRoute}
                            handleUpdatedRoute = {handleUpdatedRoute}
                        />
                    </div>
                </Box>

                <>
                    <Typography variant="h4" sx={{ textAlign: "left", mt: 5, color: palette().contrastText }}>
                        Top Travel Routes
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={"5"}
                            name="radio-buttons-group"
                            row={true}
                            value={TopListRadiovalue}
                            onChange={handleTopListRadio}
                        >
                            <FormControlLabel
                                value={"5"}
                                control={<Radio />}
                                label="Top 5"
                                sx = {{color: palette().contrastText}}
                            />
                            <FormControlLabel
                                value={"15"}
                                control={<Radio />}
                                label="Top 15"
                                sx = {{color: palette().contrastText}}
                            />
                            <FormControlLabel
                                value={"30"}
                                control={<Radio />}
                                label="Top 30"
                                sx = {{color: palette().contrastText}}
                            />
                        </RadioGroup>
                    </FormControl>
                    <RouteCarousel
                        loggedIn={authState.isAuthenticated}
                        routeList={sortedRoutes}
                        carouselSettings={getCarouselSettings(sortedRoutes)}
                        handleCardClick={handleCardClick}
                        handleLikeButtonClick={handleLikeButtonClick}
                        favoriteList={favoriteList}
                        handleReviewButtonClick={handleReviewButtonClick}
                        handleDeleteTravelRoute = {handleDeleteTravelRoute}
                        handleUpdatedRoute = {handleUpdatedRoute}
                    />

                    <InfoModual
                        open={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                        }}
                        Route={selectedRoute}
                        reviews={reviews}
                    />
                    <ReviewModal
                        open={RewievModalOpen}
                        onClose={() => {
                            setRewievModalOpen(false);
                        }}
                        Route={selectedRoute}
                        reviews={reviews}
                        setReviews={setReviews}
                    />
                </>
                {(authState.isAuthenticated&&(favoriteList.length>0)) && (
                    <>
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "left", mt: 5, color: palette().contrastText }}
                        >
                            Liked Travel Routes
                        </Typography>

                        <RouteCarousel
                            loggedIn={authState.isAuthenticated}
                            routeList={favoriteList}
                            carouselSettings={getCarouselSettings(favoriteList)}
                            handleCardClick={handleCardClick}
                            handleLikeButtonClick={handleLikeButtonClick}
                            handleReviewButtonClick={handleReviewButtonClick}
                            favoriteList={favoriteList}
                            handleDeleteTravelRoute = {handleDeleteTravelRoute}
                            handleUpdatedRoute = {handleUpdatedRoute}
                        />
                    
                    <Typography variant="h4" sx={{ textAlign: "left", mt: 5, color: palette().contrastText }}>
                        Recommended Travel Routes
                    </Typography>
                    <RouteCarousel
                        loggedIn={authState.isAuthenticated}
                        routeList={RecList}
                        favoriteList={favoriteList}
                        carouselSettings={getCarouselSettings(routeList)}
                        handleCardClick={handleCardClick}
                        handleLikeButtonClick={handleLikeButtonClick}
                        handleReviewButtonClick={handleReviewButtonClick}
                        handleDeleteTravelRoute = {handleDeleteTravelRoute}
                        handleUpdatedRoute = {handleUpdatedRoute}

                    />
                </>
                )}

                
            </div>
        );
    };

    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {renderItems()}
        </div>
    );
};

export default Home;
