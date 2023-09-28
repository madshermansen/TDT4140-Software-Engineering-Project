import {
    Modal,
    Typography,
    Rating,
    Button,
    Card,
    Slider,
    Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TravelRoute } from "../customTypes/travelRoute";
import { travelReview } from "../customTypes/Review";
import { User } from "../customTypes/user";
import { getUsers } from "../api/getUsers";
import { theme } from "../styles/theme";

type Props = {
    open: boolean;
    onClose: () => void;
    Route: TravelRoute | null;
    reviews: travelReview[];
};

const InfoModal = ({ open, onClose, Route, reviews }: Props) => {
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const fetchedUsers = await getUsers();
        setAllUsers(fetchedUsers);
    };
    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAverageRating = () => {
        const ratingValues = reviews
            .filter((review) => review.route === Route?.id && review.rating !== null)
            .map((review) => review.rating);
        return ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
    };

    return (
        <Modal
            open={open}
            onClose={() => onClose()}
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
                    {Route?.title}
                </Typography>
                <Typography
                    sx={{
                        marginTop: -0.5,
                        color: "GrayText",
                    }}
                >
                    {new Date(Route?.dateCreated!).getDate() +
                        "." +
                        (1 + new Date(Route?.dateCreated!).getMonth()) +
                        "." +
                        new Date(Route?.dateCreated!).getFullYear()}
                </Typography>
                <Typography
                    variant="body2"
                    fontFamily={"Poppins"}
                    sx={{ marginBottom: 2 }}
                >
                    Posted by:{" "}
                    {allUsers.find((user) => user.id === Route?.author)
                        ?.first_name +
                        " " +
                        allUsers.find((user) => user.id === Route?.author)
                            ?.last_name}
                </Typography>
                <div
                    style={{
                        maxHeight: "200px",
                        overflowY: "scroll",
                        marginTop: 20,
                        marginBottom: 30,
                    }}
                >
                    <Typography variant="body1" id="modal-description">
                        {Route?.description}
                    </Typography>
                </div>
                <Box display={"flex"} flexDirection="row">
                    <Box display={"flex"} flexDirection="column">
                        <Typography variant="body2" color={"gray"}>
                            Author's travel rating:
                        </Typography>
                        <Rating
                            name="half-rating"
                            precision={0.5}
                            defaultValue={0}
                            readOnly
                            value={Route?.authorRating}
                        />
                    </Box>
                    <Box display={"flex"} flexDirection="column">
                        <Typography
                            variant="body2"
                            color={"gray"}
                            sx={{ marginLeft: 10 }}
                        >
                            Days Traveled:
                        </Typography>
                        <Typography
                            sx={{
                                marginLeft: 10,
                                fontFamily: "Poppins",
                            }}
                        >
                            {Route?.duration}
                        </Typography>
                    </Box>
                </Box>
                <br />
                {reviews.filter((review) => review.route === Route?.id).length >
                    0 && (
                    <>
                        <Typography variant="body2" color={"gray"}>
                            Average User rating:
                        </Typography>
                        <Rating
                            name="avg-rating"
                            precision={0.1}
                            defaultValue={0}
                            readOnly
                            value={getAverageRating()}
                        />
                    </>
                )}
                {/* <Typography variant="body2" color={"gray"}>
                    Days Traveled:
                </Typography>
                <Box sx={{ height: 35 }}></Box>
                <Slider
                    disabled
                    defaultValue={Route?.duration}
                    aria-label="Disabled slider"
                    valueLabelDisplay="on"
                    sx={{ length: "50%" }}
                />
                <br /> */}
                {reviews.filter((review) => review.route === Route?.id).length >
                    0 && (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: "Poppins",
                                color: theme.palette.primary.main,
                                marginLeft: 0,
                                marginTop: 3,
                            }}
                        >
                            Reviews
                        </Typography>
                        <div
                            style={{
                                maxHeight: "300px",
                                overflowY: "scroll",
                                marginTop: 10,
                            }}
                        >
                            {reviews
                                .filter((review) => review.route === Route?.id)
                                .map((review) => (
                                    <Card
                                        key={review.id}
                                        className="post"
                                        variant="outlined"
                                        sx={{
                                            margin: 2,
                                            marginLeft: 1,
                                            borderRadius: 5,
                                            width: 600,
                                        }}
                                    >
                                        <div
                                            style={{ marginBottom: 16 }}
                                            key={review.id}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                            >
                                                {allUsers.find(
                                                    (user) =>
                                                        user.id ===
                                                        review.author
                                                )?.first_name +
                                                    " " +
                                                    allUsers.find(
                                                        (user) =>
                                                            user.id ===
                                                            review.author
                                                    )?.last_name}
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                            >
                                                {review.comment}
                                            </Typography>
                                            <Rating
                                                name="half-rating-read"
                                                defaultValue={0}
                                                precision={0.5}
                                                value={review.rating}
                                                readOnly
                                                style={{ marginBottom: 8 }}
                                            />
                                        </div>
                                    </Card>
                                ))}
                        </div>
                    </>
                )}

                <Button size="large" onClick={() => onClose()}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};
export default InfoModal;
