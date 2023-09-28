import {
    Modal,
    Typography,
    Rating,
    Button,
    FormControl,
    Grid,
    TextField,
    Container,
} from "@mui/material";
import { alpha } from "@mui/system";
import React, { useState } from "react";
import { TravelRoute } from "../customTypes/travelRoute";
import { travelReview } from "../customTypes/Review";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../hooks/store";
import { postReview } from "../api/postReview";

type Props = {
    open: boolean;
    onClose: () => void;
    Route: TravelRoute | null;
    reviews: travelReview[];
    setReviews: (reviews: travelReview[]) => void;
};
const ReviewModal = ({ open, onClose, Route, reviews, setReviews }: Props) => {
    const [travelRouteComment, setTravelRouteComment] = useState("");
    const [travelRating, setTravelRating] = useState(Number);
    const { enqueueSnackbar } = useSnackbar();
    const authState = useAppSelector((state) => state.auth);

    const CreateReview = (
        routeId: number,
        rating: number,
        author: number,
        comment: String
    ): travelReview => {
        const id = reviews.length + 1;
        const newReview: travelReview = {
            id,
            route: routeId,
            rating,
            author,
            comment,
        };
        return newReview;
    };

    const validateReviewRouteComment = (comment: string): boolean => {
        if (comment.length > 0 && comment.length < 2000) {
            return true;
        }
        return false;
    };
    const validateReviewRouteRating = (rating: number): boolean => {
        if (rating === 0) {
            return false;
        }
        return true;
    };

    const handleAddReview = (): void => {
        if (
            validateReviewRouteComment(travelRouteComment) ||
            validateReviewRouteRating(travelRating)
        ) {
            const newReview: travelReview = CreateReview(
                Route!.id,
                travelRating,
                authState.userId!,
                travelRouteComment
            );
            postReview(newReview)
                .then((res: travelReview) => {
                    if (!res.id) {
                        enqueueSnackbar(
                            "You can only review each Adventure once!",
                            { variant: "error" }
                        );
                    } else {
                        enqueueSnackbar("Review added", {
                            variant: "success",
                            autoHideDuration: 2000,
                        });
                        setReviews([...reviews, newReview]);
                        onClose();
                    }
                })
                .catch(() => {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    });
                });
        } else {
            enqueueSnackbar("Please enter a valid comment og rating", {
                variant: "error",
            });
        }
        setTravelRating(0);
        setTravelRouteComment("");
    };

    return (
        <Modal
            onClose={onClose}
            open={open}
            sx={({ palette }) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: alpha(palette.common.black, 0.3),
            })}
        >
            <Container
                maxWidth="md"
                sx={({ palette }) => ({
                    backgroundColor: palette.common.white,
                    flexGrow: 1,
                    paddingY: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                })}
            >
                <FormControl sx={{ margin: "15px" }}>
                    <Grid
                        container
                        justifyContent="space-between"
                        paddingBottom={2}
                    >
                        <Typography variant="h4" color="primary">
                            Add Review
                        </Typography>
                    </Grid>

                    <TextField
                        value={travelRouteComment}
                        onChange={(e) => setTravelRouteComment(e.target.value)}
                        variant="outlined"
                        sx={{ width: "100%", marginTop: 2 }}
                        label={
                            travelRouteComment.length > 2000
                                ? "Max 2000 characters"
                                : "Comment"
                        }
                        error={travelRouteComment.length > 2000}
                        multiline
                    />
                    <Typography component="legend" sx={{ marginTop: 2 }}>
                        Rate this adventure
                    </Typography>
                    <Rating
                        name="half-rating"
                        defaultValue={0}
                        precision={1}
                        value={travelRating}
                        onChange={(event, newValue) =>
                            setTravelRating(newValue || 0)
                        }
                        sx={{ marginTop: 0.2, width: 4 }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        aria-label="Platform"
                        sx={{ marginLeft: "0", marginTop: 4 }}
                        onClick={() => {
                            handleAddReview();
                            onClose();
                        }}
                    >
                        Add review
                    </Button>
                </FormControl>
            </Container>
        </Modal>
    );
};
export default ReviewModal;
