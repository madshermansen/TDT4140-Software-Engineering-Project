import {
    Button,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { validateLogin } from "../api/getUserPassword";
import { useAppDispatch } from "../hooks/store";
import { authActions } from "../store/slices/authSlice";
import { handleLogin } from "./HandleLogin";
type Props = {
    open: boolean;
    onClose: () => void;
    onCloseLogin: () => void;
};

const LoginModal = ({ open, onClose, onCloseLogin }: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const login = async () => {
        const loggedIn = await handleLogin(username, password,enqueueSnackbar, dispatch);
        if (loggedIn) {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onCloseLogin}>
            <DialogTitle>Log into your account</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <TextField
                        aria-label="login-username"
                        autoFocus
                        margin="dense"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                login();
                            }
                        }}
                        id="username"
                        label="Username"
                        type={"email"}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ margin: "20px" }}
                    />
                </ListItem>
                <ListItem disableGutters>
                    <TextField
                        aria-label="login-password"
                        margin="dense"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                login();
                            }
                        }}
                        id="password"
                        label="Password"
                        type={"password"}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ margin: "20px" }}
                    />
                </ListItem>
                <Button
                    aria-label="login-submit"
                    onClick={() => {
                        login();
                    }}
                >
                    Log in
                </Button>
            </List>
        </Dialog>
    );
};

export default LoginModal;
