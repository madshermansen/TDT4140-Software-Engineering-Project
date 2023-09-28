import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Container, ThemeProvider, Typography } from "@mui/material";
import { createUserType } from "../api/postUser";
import { postUser } from "../api/postUser";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { useSnackbar } from "notistack";
import { User } from "../customTypes/user";
import { useNavigate } from "react-router";
import { getUsers } from "../api/getUsers";
import  {handleLogin}  from "../components/HandleLogin";
import { useAppDispatch } from "../hooks/store";

type Props = {
    darkMode: boolean;
}

export const CreateProfile = ({darkMode}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [allUserNames, setAllUserNames] = useState<string[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const palette = () => {
        if(darkMode){
            return theme.palette.secondary;
        }else{
            return theme.palette.primary;
        }
    }
    
    
    const fethUsers = async () => {
        const fetchedUsers = await getUsers();
        setAllUserNames(fetchedUsers.map((user: User) => user.username));
    };

    useEffect(() => {
        fethUsers();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== verifyPassword) {
            enqueueSnackbar("Passwords do not match", { variant: "error" });
        } else {
            if (
                firstname.length === 0 ||
                lastname.length === 0 ||
                username.length === 0 ||
                password.length === 0
            ) {
                enqueueSnackbar("Make sure all fields are filled out", {
                    variant: "error",
                });
            } else {
                if (allUserNames.includes(username)) {
                    enqueueSnackbar("That username already exists!", {
                        variant: "error",
                    });
                } else {
                    var user = createUserType(
                        username,
                        password,
                        firstname,
                        lastname
                    );
                    await postUser(user);
                    enqueueSnackbar("Successfully created user!", {
                        variant: "success",
                    });
                    const loggedIn = await handleLogin(user.username, user.password, enqueueSnackbar, dispatch);
                    if (loggedIn) {
                        navigate("/"); // Or the route you want to redirect the user to after successful login
                }
                    };
            }
        }
    };

    return (
        <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
            <div>
                <ThemeProvider theme={theme}>
                    <Typography
                        variant="h4"
                        color = {darkMode?"secondary":"primary"}
                        sx={{
                            textAlign: "left",
                            mt: 5,
                            ontFamily: "Poppins",
                            marginLeft: "25px",
                            marginBottom: 5,
                        }}
                    >
                        Create Account
                    </Typography>
                    <form onSubmit={(e) => handleSubmit(e)} color = {darkMode?"secondary":"primary"}>
                        {
                            <Container
                                color = {darkMode?"secondary":"primary"}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 10,
                                    width: 1000,
                                    height: 250,
                                    padding: 5,
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1fr, 1fr, 1fr, 1fr, 1fr",
                                        gridTemplateRows: "1fr, 1fr, 1fr, 1fr, 1fr",
                                    }}
                                >
                                    <div
                                        style={{
                                            gridArea: "1/1/2/2",
                                            marginRight: "20px",
                                        }}
                                    >
                                        <FormControl fullWidth color = {darkMode?"secondary":"primary"}>
                                            <TextField
                                                aria-label="name-input"
                                                color = {darkMode?"secondary":"primary"}
                                                required
                                                fullWidth
                                                label="Name"
                                                id="outlined-start-adornment-firstname"
                                                onChange={(e) =>
                                                    setFirstname(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div
                                        style={{
                                            gridArea: "1/2/2/3",
                                            marginRight: "20px",
                                        }}
                                    >
                                        <FormControl fullWidth color = {darkMode?"secondary":"primary"}>
                                            <TextField
                                                color = {darkMode?"secondary":"primary"}
                                                aria-label="surname-input"
                                                fullWidth
                                                required
                                                label="Surname"
                                                id="outlined-start-adornment-surname"
                                                onChange={(e) =>
                                                    setLastname(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div
                                        style={{
                                            gridArea: "1/3/2/5",
                                            columnGap: "20px",
                                        }}
                                    >
                                        <FormControl fullWidth color = {darkMode?"secondary":"primary"}>
                                            <TextField
                                                color = {darkMode?"secondary":"primary"}
                                                aria-label="username-input"
                                                required
                                                label="Username"
                                                id="outlined-start-adornment-username"
                                                fullWidth
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div
                                        style={{
                                            gridArea: "2/1/3/3",
                                            marginRight: "20px",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <FormControl variant="outlined" fullWidth color = {darkMode?"secondary":"primary"}>
                                            <InputLabel htmlFor="outlined-adornment-password" color = {darkMode?"secondary":"primary"}>
                                                Password
                                            </InputLabel>
                                            <OutlinedInput
                                                color = {darkMode?"secondary":"primary"}
                                                required
                                                aria-label="password-input"
                                                id="outlined-adornment-password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                endAdornment={
                                                    <InputAdornment position="end" color = {darkMode?"secondary":"primary"}>
                                                        <IconButton
                                                            color = {darkMode?"secondary":"primary"}
                                                            aria-label="toggle password visibility"
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                                fullWidth
                                            />
                                        </FormControl>
                                    </div>
                                    <div
                                        style={{
                                            gridArea: "2/3/3/5",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <FormControl variant="outlined" fullWidth color = {darkMode?"secondary":"primary"}>
                                            <InputLabel htmlFor="outlined-adornment-verify-password-label" color = {darkMode?"secondary":"primary"}>
                                                Verify Password
                                            </InputLabel>
                                            <OutlinedInput
                                                color = {darkMode?"secondary":"primary"}
                                                aria-label="verify-password-input"
                                                error={verifyPassword !== password}
                                                required
                                                fullWidth
                                                onChange={(e) =>
                                                    setVerifyPassword(
                                                        e.target.value
                                                    )
                                                }
                                                id="outlined-adornment-verify-password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                endAdornment={
                                                    <InputAdornment position="end" color = {darkMode?"secondary":"primary"}>
                                                        <IconButton
                                                            color = {darkMode?"secondary":"primary"}
                                                            aria-label="toggle password visibility"
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <br />
                                <Button
                                    color = {darkMode?"secondary":"primary"}
                                    aria-label="submit-button"
                                    variant="contained"
                                    size={"large"}
                                    sx={{ alignSelf: "center", borderRadius: 2, color:darkMode?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}}
                                    type="submit"
                                >
                                    Create Account
                                </Button>
                            </Container>
                        }
                    </form>
                </ThemeProvider>
            </div>
        </Box>
    );
};
