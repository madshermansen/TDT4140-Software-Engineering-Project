import {
    Avatar,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { authActions } from "../store/slices/authSlice";
import LoginModal from "./LoginModal";

type Props = {
    open: boolean;
    onCloseAuthMenu: () => void;
};

const AuthMenu = ({ open, onCloseAuthMenu }: Props) => {
    const navigate = useNavigate();
    const authState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleLogin = () => {
        if (authState.isAuthenticated) {
            dispatch(authActions.logout());
            localStorage.removeItem("logedIn");
            onCloseAuthMenu();
            navigate("/");
        }
    };

    function handleCloseLoginModal(): void {
        setLoginModalOpen(false);
    }

    return (
        <Dialog onClose={onCloseAuthMenu} open={open}>
            <DialogTitle>
                {authState.isAuthenticated
                    ? "Hello " +
                      authState.firstName.charAt(0).toUpperCase() +
                      authState.firstName.slice(1) +
                      "!"
                    : "Log in to get access to all of Adventure Atlas' features"}
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {authState.isAuthenticated ? (
                    <ListItemButton
                        aria-label="authmenu-logout"
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <LogoutIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                ) : (
                    <div>
                        <ListItem disableGutters>
                            <ListItemButton
                                aria-label="authmenu-login"
                                onClick={() => {
                                    setLoginModalOpen(true);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <LoginIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Log in" />
                            </ListItemButton>
                        </ListItem>
                        <LoginModal
                            open={loginModalOpen}
                            onClose={() => {
                                handleCloseLoginModal();
                                onCloseAuthMenu();
                            }}
                            onCloseLogin={() => handleCloseLoginModal()}
                        />
                    </div>
                )}
                <ListItem disableGutters>
                    {authState.isAuthenticated ? (
                        <ListItemButton
                            onClick={() => {
                                navigate("/profile");
                                onCloseAuthMenu();
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt={
                                        authState.firstName +
                                        " " +
                                        authState.lastName
                                    }
                                    src="/2.jpeg "
                                />
                            </ListItemAvatar>
                            <ListItemText primary="View my profile" />
                        </ListItemButton>
                    ) : (
                        <ListItemButton
                            onClick={() => {
                                navigate("/createprofile");
                                onCloseAuthMenu();
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonAddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Make an account" />
                        </ListItemButton>
                    )}
                </ListItem>
            </List>
        </Dialog>
    );
};

export default AuthMenu;
