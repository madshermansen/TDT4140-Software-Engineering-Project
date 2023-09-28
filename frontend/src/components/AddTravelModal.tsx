import {
    alpha,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    Input,
    Modal,
    Rating,
    Slider,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { postRoute } from "../api/postRoute";
import { useSnackbar } from "notistack";
import { TravelRoute } from "../customTypes/travelRoute";
import { useAppSelector } from "../hooks/store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "darkgreen",
    },
    "& .MuiRating-iconHover": {
        color: "green",
    },
});

type Props = {
    open: boolean;
    onClose: () => void;
    onNewTravelRoute: (newRoute: TravelRoute) => void;
};

const AddTravelModal = ({ open, onClose, onNewTravelRoute }: Props) => {
    const authState = useAppSelector((state) => state.auth);
    const [travelRouteTitle, setTravelRouteTitle] = useState("");
    const [travelRouteDescription, setTravelRouteDescription] = useState("");
    const [travelRating, setTravelRating] = useState(Number);
    const [travelPrice, setTravelPrice] = useState(Number);
    const [travelDuration, setTravelDuration] = useState(Number);
    const [travelTags, setTravelTags] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const createTravelRoute = (
        author: number,
        title: string,
        description: String,
        duration: number,
        authorRating: number,
        priceEstimate: number,
        tags: string
    ) => {
        var travelRoute: TravelRoute = {
            id: 0, // default value, can really be anything because it autoincrements
            author: author,
            title: title,
            description: description,
            dateCreated: new Date().toISOString(),
            duration: duration,
            authorRating: authorRating,
            priceEstimate: priceEstimate,
            tags: tags,
        };
        return travelRoute;
    };

    const validateTravelRouteTitle = (title: string): boolean => {
        if (title.length > 0 && title.length < 300) {
            return true;
        }
        return false;
    };
    const validateTravelRouteDescription = (description: string): boolean => {
        if (description.length > 0 && description.length < 5000) {
            return true;
        }
        return false;
    };

    const resetAddTravelRouteFields = (): void => {
        setTravelRouteTitle("");
        setTravelRouteDescription("");
        setTravelRating(0);
        setTravelTags("");
        setTravelDuration(0);
        setTravelPrice(0);
    };

    const handleDurationChange = (e: Event, value: number | number[]) => {
        const newDuration = Array.isArray(value) ? value[0] : value;
        setTravelDuration(newDuration);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTravelDuration(
            event.target.value === "" ? 0 : Number(event.target.value)
        );
    };
    const handleBlur = () => {
        if (travelDuration < 0) {
            setTravelDuration(0);
        } else if (travelDuration > 100) {
            setTravelDuration(100);
        }
    };
    const handleAddTravelRoute = (): void => {
        if (
            validateTravelRouteTitle(travelRouteTitle) &&
            validateTravelRouteDescription(travelRouteDescription)
        ) {
            const newTravelRoute: TravelRoute = createTravelRoute(
                authState.userId!,
                travelRouteTitle,
                travelRouteDescription,
                travelDuration,
                travelRating,
                travelPrice,
                travelTags
            );
            onNewTravelRoute(newTravelRoute);
            postRoute(newTravelRoute);
            enqueueSnackbar("Successfully added your travel!", {
                variant: "success",
            });
            resetAddTravelRouteFields();
        } else
            enqueueSnackbar(
                "Make sure your adventure contains a title and description!",
                { variant: "error" }
            );
    };

    return (
        <Modal
            aria-label="addtravel-modal"
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
                        <Typography
                            variant="h4"
                            color="primary"
                            aria-label="addtravel-heading"
                        >
                            Add Travel Route
                        </Typography>
                    </Grid>
                    <TextField
                        aria-label="travelroute-title"
                        value={travelRouteTitle}
                        onChange={(e) => setTravelRouteTitle(e.target.value)}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        label={
                            travelRouteTitle.length > 300
                                ? "Max 300 characters"
                                : "Title"
                        }
                        error={
                            travelRouteTitle.length === 0 ||
                            travelRouteTitle.length > 300
                        }
                        required
                    />
                    <TextField
                        aria-label="travelroute-description"
                        value={travelRouteDescription}
                        onChange={(e) =>
                            setTravelRouteDescription(e.target.value)
                        }
                        variant="outlined"
                        sx={{ width: "100%", marginTop: 2 }}
                        label={
                            travelRouteDescription.length > 2000
                                ? "Max 5000 characters"
                                : "Description"
                        }
                        error={travelRouteDescription.length === 0}
                        required
                        multiline
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 2,
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography component="legend">
                                Your Adventure Rating
                            </Typography>
                            <Rating
                                name="half-rating"
                                defaultValue={2.5}
                                precision={0.5}
                                value={travelRating}
                                onChange={(event, newValue) =>
                                    setTravelRating(newValue || 0)
                                }
                                sx={{ marginTop: 0.2, width: 4 }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: 150,
                            }}
                        >
                            <Typography component="legend">Price</Typography>
                            <StyledRating
                                value={travelPrice}
                                name="price"
                                max={5}
                                getLabelText={(value: number) =>
                                    `${value} Heart${value !== 1 ? "s" : ""}`
                                }
                                precision={1}
                                icon={<AttachMoneyIcon fontSize="inherit" />}
                                emptyIcon={
                                    <AttachMoneyIcon fontSize="inherit" />
                                }
                                onChange={(event, newValue) =>
                                    setTravelPrice(newValue || 0)
                                }
                                sx={{ marginTop: 0.2, width: 4 }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: 280,
                            }}
                        >
                            <Typography component="legend" marginTop={1}>
                                Days Travelled
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Slider
                                        value={travelDuration}
                                        aria-label="Default"
                                        valueLabelDisplay="auto"
                                        onChange={handleDurationChange}
                                        sx={{ width: 200, marginLeft: 2 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Input
                                        value={travelDuration}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 100,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Typography
                        component="legend"
                        sx={{ marginTop: 2, marginBottom: 0 }}
                    ></Typography>
                    <TextField
                        aria-label="travelroute-tags"
                        value={travelTags}
                        onChange={(e) => setTravelTags(e.target.value)}
                        variant="outlined"
                        sx={{ width: "100%", marginTop: 1 }}
                        label={
                            travelTags.length > 2000
                                ? "Max 5000 characters"
                                : "Continents, Countries and Cities visited. Separate with comma"
                        }
                        multiline
                    />
                    <Button
                        variant="contained"
                        size="large"
                        aria-label="addtravel-submit"
                        sx={{ marginLeft: "0", marginTop: 4 }}
                        onClick={() => handleAddTravelRoute()}
                    >
                        Add travel
                    </Button>
                </FormControl>
            </Container>
        </Modal>
    );
};

export default AddTravelModal;
