import {
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./search.css";
import { styled, ThemeProvider } from "@mui/material/styles";

import AddCommentIcon from "@mui/icons-material/AddComment";
import { TravelRoute } from "../customTypes/travelRoute";
import { getRoutes } from "../api/getRoutes";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { theme } from "../styles/theme";
import { getUsers } from "../api/getUsers";
import { User } from "../customTypes/user";
import { useAppSelector } from "../hooks/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserLike } from "../customTypes/userLike";
import { deleteLike } from "../api/deleteLike";
import { postLike } from "../api/postLike";
import { getUserLikes } from "../api/getUserLikes";
import findUserLikedRoutes from "../utils/findUserLikedRoutes";
import { getAllReviews } from "../api/getAllReviews";
import { travelReview } from "../customTypes/Review";
import ReviewModal from "../components/RewievModal";

type Props = {
    darkMode: boolean;
}

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "green",
    },
    "& .MuiRating-iconHover": {
        color: "darkgreen",
    },
});

export const Search = ({darkMode}: Props) => {
    // filters
    const [europeFilter, setEuropeFilter] = useState(false);
    const [asiaFilter, setAsiaFilter] = useState(false);
    const [africaFilter, setAfricaFilter] = useState(false);
    const [northAmericaFilter, setNAFilter] = useState(false);
    const [southAmericaFilter, setSAFilter] = useState(false);
    const [oceaniaFilter, setOceaniaFilter] = useState(false);
    const [antarcticaFilter, setAntarcticaFilter] = useState(false);
    const [durationFilter, setDurationFilter] = useState([0, 100]);
    const [priceFilter, setPriceFilter] = useState(0);
    const authState = useAppSelector((state) => state.auth);
    const [routeList, setRouteList] = useState<TravelRoute[]>([]);
    const [Results, setSearchedResults] = useState<TravelRoute[]>([]);
    const [sortedResults, setSortedResults] = useState<TravelRoute[]>([]);
    const [sortBy, setSortBy] = useState("authorRating Descending");
    const [searchText, setSearchText] = useState("");
    const [searchedText, setSearchedText] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [reviews, setReviews] = useState<travelReview[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<TravelRoute | null>(
        null
    );
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const palette = () => {
        if(darkMode){
            return theme.palette.secondary;
        }else{
            return theme.palette.primary;
        }
    }

    const fetchRoutes = async () => {
        const fetchedRoutes = await getRoutes();
        const fetchedUserLikes = await getUserLikes();
        const fetchedReviews = await getAllReviews();

        setRouteList(fetchedRoutes);
        setSearchedResults(fetchedRoutes);
        setReviews(fetchedReviews);

        setUserLikes(fetchedUserLikes);

        setFavoriteList(
            findUserLikedRoutes(authState.userId!, userLikes, routeList)
        );
    };

    const fetchUsers = async () => {
        const fetchedUsers = await getUsers();
        setAllUsers(fetchedUsers);
    };

    useEffect(() => {
        handleKeyPress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchText,
        europeFilter,
        asiaFilter,
        africaFilter,
        northAmericaFilter,
        southAmericaFilter,
        oceaniaFilter,
        antarcticaFilter,
        durationFilter,
        priceFilter,
    ]);

    useEffect(() => {
        fetchRoutes();
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        sortFunction(sortBy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Results, sortBy]);

    const checkFilters = (
        filter: Boolean,
        mytag: string,
        priceBool: Boolean,
        country: string
    ): boolean => {
        if (priceBool) {
            if (filter && mytag.includes(country)) {
                return true;
            }
        }
        return false;
    };
    const handleReviewButtonClick = (route: TravelRoute) => {
        setSelectedRoute(route);
        setReviewModalOpen(true);
    };
    const handleCardClick = (route: TravelRoute) => {
        setSelectedRoute(route);
    };
    const handleKeyPress = () => {
        // VERY MESSY SEARCH FUNCTION oops - mads

        let results: TravelRoute[] = [];
        routeList.forEach((e1) => {
            Object.values(e1).forEach((e2) => {
                if (e2 == null) {
                    return;
                } else if (
                    e2
                        .toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                ) {
                    if (results.includes(e1)) {
                        return;
                    }
                    results.push(e1);
                }
            });
        });

        setSearchedText(searchText);
        let filteredResults: TravelRoute[] = [];
        let listFilters = [
            europeFilter,
            asiaFilter,
            africaFilter,
            northAmericaFilter,
            southAmericaFilter,
            oceaniaFilter,
            antarcticaFilter,
        ];
        let listFilterString = [
            "europe",
            "asia",
            "africa",
            "north america",
            "south america",
            "oceania",
            "antarctica",
        ];
        let checkBoxFilterOn =
            europeFilter ||
            asiaFilter ||
            africaFilter ||
            northAmericaFilter || // check if any filters are turned on
            southAmericaFilter ||
            oceaniaFilter ||
            antarcticaFilter;
        let priceFilterOn = false;
        if (priceFilter !== null && priceFilter !== 0) {
            priceFilterOn = true;
        }
        results.forEach((e1) => {
            let priceFilterMatch = e1.priceEstimate === priceFilter;
            let tag = e1.tags === null ? "" : e1.tags.toString().toLowerCase();
            let isDurationMatch =
                e1.duration >= durationFilter[0] &&
                e1.duration <= durationFilter[1];
            if (!isDurationMatch) {
                return;
            }
            if (!checkBoxFilterOn && !priceFilterOn) {
                filteredResults.push(e1);
            } else if (!checkBoxFilterOn && priceFilterOn) {
                if (priceFilterMatch) {
                    filteredResults.push(e1);
                }
            } else if (checkBoxFilterOn && !priceFilterOn) {
                for (let i = 0; i < listFilters.length; i++) {
                    if (
                        checkFilters(
                            listFilters[i],
                            tag,
                            true,
                            listFilterString[i]
                        )
                    ) {
                        filteredResults.push(e1);
                        break;
                    }
                }
            } else if (checkBoxFilterOn && priceFilterOn) {
                for (let i = 0; i < listFilters.length; i++) {
                    if (
                        checkFilters(
                            listFilters[i],
                            tag,
                            priceFilterMatch,
                            listFilterString[i]
                        )
                    ) {
                        filteredResults.push(e1);
                        break;
                    }
                }
            }
        });

        let tempResults = filteredResults;
        if (sortBy.includes("authorRating")) {
            tempResults.sort(
                (Route1, Route2) => Route1.authorRating - Route2.authorRating
            );
        } else if (sortBy.includes("priceEstimate")) {
            tempResults.sort(
                (Route1, Route2) => Route1.priceEstimate - Route2.priceEstimate
            );
        } else if (sortBy.includes("duration")) {
            tempResults.sort(
                (Route1, Route2) => Route1.duration - Route2.duration
            );
        }
        if (sortBy.includes("Descending")) {
            tempResults.reverse();
        }
        setSearchedResults(tempResults);
    };

    const [favoriteList, setFavoriteList] = useState<TravelRoute[]>([]);
    const [userLikes, setUserLikes] = useState<UserLike[]>([]);

    useEffect(() => {
        setFavoriteList(
            findUserLikedRoutes(authState.userId!, userLikes, routeList)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLikes, authState, routeList]);

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

    const sortFunction = (sortQuery: string) => {
        setSortBy(sortQuery);
        let query = sortQuery.split(" ");
        let tempResults = Results.map((result) => {
            return result;
        });
        if (query[0] === "authorRating") {
            tempResults.sort(
                (Route1, Route2) => Route1.authorRating - Route2.authorRating
            );
        } else if (query[0] === "priceEstimate") {
            tempResults.sort(
                (Route1, Route2) => Route1.priceEstimate - Route2.priceEstimate
            );
        } else if (query[0] === "duration") {
            tempResults.sort(
                (Route1, Route2) => Route1.duration - Route2.duration
            );
        } else if (query[0] === "dateCreated") {
            tempResults.sort(
                (r1, r2) =>
                    new Date(r1.dateCreated).getTime() -
                    new Date(r2.dateCreated).getTime()
            );
        }
        if (query[1] === "Descending") {
            tempResults.reverse();
        }
        setSortedResults(tempResults);
    };

    const numberOfMoneyIcons = (price: number) => {
        let moneyList = [];
        for (let index = 0; index < price; index++) {
            moneyList.push(
                <AttachMoneyIcon key={index} sx={{ marginX: -0.5 }} />
            );
        }
        return moneyList;
    };

    return (
        <Container>
            <div className="parent">
                <div className="searchbar">
                    <Typography
                        variant="h2"
                        fontFamily={"Poppins"}
                        sx={{ marginTop: 5, 
                            color: palette().contrastText }}
                    >
                        Explore Adventures
                    </Typography>
                    <ThemeProvider theme={theme}>
                    <TextField
                        color = {darkMode?"secondary":"primary"}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        variant="outlined"
                        sx={{ width: "100%", marginY: 4 }}
                        required
                    />
                    </ThemeProvider>
                </div>
                <ThemeProvider theme={theme}>
                <div className="filter">
                    <div className="sort" style={{ maxWidth: 200 }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label" sx={{color: palette().contrastText}} color = {darkMode?"secondary":"primary"}>
                                Sort By
                            </InputLabel>
                            <Select 
                                color = {darkMode?"secondary":"primary"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortBy}
                                label="Sort By"
                                onChange={(e) => {
                                    sortFunction(e.target.value);
                                }}
                                sx={{ marginBottom: 2, width: 190 }}
                            >
                                <MenuItem value={"authorRating Descending"}>
                                    Highest Rating
                                </MenuItem>
                                <MenuItem value={"authorRating Ascending"}>
                                    Lowest Rating
                                </MenuItem>
                                <MenuItem value={"priceEstimate Descending"}>
                                    Highest Price
                                </MenuItem>
                                <MenuItem value={"priceEstimate Ascending"}>
                                    Lowest Price
                                </MenuItem>
                                <MenuItem value={"duration Descending"}>
                                    Longest Trip
                                </MenuItem>
                                <MenuItem value={"duration Ascending"}>
                                    Shortest Trip
                                </MenuItem>
                                <MenuItem value={"dateCreated Descending"}>
                                    Newest Trips
                                </MenuItem>
                                <MenuItem value={"dateCreated Ascending"}>
                                    Oldest Trips
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <FormGroup>
                        <Typography sx={{color: palette().contrastText}}>Duration</Typography>
                        <Slider
                            value={durationFilter}
                            onChange={(e, newValue) =>
                                setDurationFilter(newValue as number[])
                            }
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={100}
                            sx={{
                                width: 175,
                                marginBottom: 2,
                                marginLeft: 1,
                                color: palette().main
                            }}
                        />

                        <Typography component="legend" sx={{color: palette().contrastText}}>Price</Typography>
                        <StyledRating
                            name="customized-price"
                            defaultValue={0}
                            onChange={(e, newValue) =>
                                setPriceFilter(newValue as number)
                            }
                            max={5}
                            getLabelText={(value: number) =>
                                `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            precision={1}
                            icon={<AttachMoneyIcon fontSize="inherit" />}
                            emptyIcon={<AttachMoneyIcon fontSize="inherit" />}
                            sx={{ marginBottom: 2, color: palette().main}}
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setEuropeFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="Europe"
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setAsiaFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="Asia"
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setNAFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="North America"
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setSAFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="South America"
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setAfricaFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="Africa"
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setAntarcticaFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="Antartica"
                        />
                        <FormControlLabel
                            sx={{color: palette().contrastText}}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setOceaniaFilter(e.target.checked)
                                    }
                                    sx={{color: palette().contrastText}}
                                />
                            }
                            label="Oceania"
                        />
                    </FormGroup>
                </div>
                </ThemeProvider>
                <div className="posts">
                    <Typography
                        variant="h4"
                        fontFamily="Poppins"
                        sx={{
                            marginLeft: 1,
                            marginBottom: 2,
                            color: palette().main,
                            fontWeight: "700",
                        }}
                    >
                        {searchedText.length > 0
                            ? `Results containing "${searchedText}"`
                            : `Results`}
                    </Typography>
                    {sortedResults.map((route) => {
                        return (
                            <Card
                                key={route.id}
                                className="post"
                                variant="outlined"
                                sx={{
                                    margin: 2,
                                    marginLeft: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <div className="postTitle">
                                    <Typography
                                        variant="h4"
                                        fontFamily={"Poppins"}
                                    >
                                        <b>{route.title}</b>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            marginTop: -0.5,
                                            color: "GrayText",
                                        }}
                                    >
                                        {new Date(route.dateCreated).getDate() +
                                            "." +
                                            (1 +
                                                new Date(
                                                    route.dateCreated
                                                ).getMonth()) +
                                            "." +
                                            new Date(
                                                route.dateCreated
                                            ).getFullYear()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontFamily={"Poppins"}
                                    >
                                        Posted by:{" "}
                                        {allUsers.find(
                                            (user) => user.id === route.author
                                        )?.first_name +
                                            " " +
                                            allUsers.find(
                                                (user) =>
                                                    user.id === route.author
                                            )?.last_name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={"gray"}
                                        sx={{ marginTop: 1 }}
                                    >
                                        Days Traveled:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins",
                                        }}
                                    >
                                        {route.duration}
                                    </Typography>
                                    <p>
                                        {numberOfMoneyIcons(
                                            route.priceEstimate
                                        )}
                                    </p>
                                    <Rating
                                        value={route.authorRating}
                                        readOnly
                                    />
                                </div>
                                <div className="postBody">
                                    <Typography
                                        variant="body1"
                                        sx={{ marginTop: 2 }}
                                    >
                                        {route.description}
                                    </Typography>
                                </div>
                                <div className="postFooter">
                                    {/* <p>{route.tags}</p> */}
                                    {authState.isAuthenticated ? (
                                        <Button
                                            size="large"
                                            onClick={() =>
                                                handleLikeButtonClick(route.id)
                                            }
                                            startIcon={
                                                favoriteList
                                                    .map((route) => route.id)
                                                    .includes(route.id) ? (
                                                    <FavoriteIcon color="secondary" />
                                                ) : (
                                                    <FavoriteBorderIcon />
                                                )
                                            }
                                        ></Button>
                                    ) : null}
                                    {authState.isAuthenticated ? (
                                        <Button
                                            size="large"
                                            onClick={() =>
                                                handleReviewButtonClick(route)
                                            }
                                            startIcon={
                                                favoriteList
                                                    .map((routes) => routes.id)
                                                    .includes(route.id) ? (
                                                    <AddCommentIcon />
                                                ) : (
                                                    <AddCommentIcon />
                                                )
                                            }
                                        ></Button>
                                    ) : null}
                                </div>
                            </Card>
                        );
                    })}
                    <ReviewModal
                        open={reviewModalOpen}
                        onClose={() => {
                            setReviewModalOpen(false);
                        }}
                        Route={selectedRoute}
                        reviews={reviews}
                        setReviews={setReviews}
                    />
                    
                </div>
            </div>
        </Container>
    );
};

export default Search;
