import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginDialogFunction from "./LoginDialog";
import { User } from "../customTypes/user";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    onLogin: (value: boolean) => void;
    setName: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const navigate = useNavigate();
    const { onLogin, onClose, selectedValue, open, setName } = props;
    const [logInText, changeTextLogin] = useState("Log in");
    const [logedIn, changeLogin] = useState(false);
    const [user, setUser] = useState("");
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleLogin = () => {
        if (logedIn) {
            changeLogin(false);
            changeTextLogin("Log in");
            navigate("/");
            onLogin(false);
        } else {
            changeLogin(true);
            changeTextLogin("Log out");
            onLogin(true);
        }
        handleClose();
    };

    const LoginDialog = () => {};

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                Log in to get access to all of Adventure Atlas' features
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {logedIn ? null : (
                    <LoginDialogFunction
                        onLogin={handleLogin}
                        Clicked={handleClose}
                        setName={(value) => {
                            setUser(value);
                            setName(value);
                        }}
                    />
                )}
                {logedIn ? (
                    <ListItemButton
                        autoFocus
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                ) : null}
                <ListItem disableGutters>
                    {logedIn ? null : (
                        <ListItemButton
                            autoFocus
                            onClick={() => {
                                navigate("/createprofile");
                                handleClose();
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Make an account" />
                        </ListItemButton>
                    )}
                </ListItem>
                {logedIn ? (
                    <ListItemButton
                        onClick={() => {
                            navigate("/profile");
                            handleClose();
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/2.jpeg" />
                        </ListItemAvatar>
                        <ListItemText primary="View my Profile" />
                    </ListItemButton>
                ) : null}
            </List>
        </Dialog>
    );
}

export default function SimpleDialogFunction(props: {
    onLogin: (value: boolean) => void;
    setName: (value: string) => void;
}) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const [logedIn, logIn] = React.useState(false);
    const { onLogin, setName } = props;
    const [user, setUser] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                startIcon={
                    logedIn ? (
                        <Avatar alt="Travis Howard" src="/2.jpeg" />
                    ) : (
                        <PersonIcon />
                    )
                }
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    fontFamily: "Poppins",
                }}
            >
                {logedIn ? user : "Log in"}
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                onLogin={(value) => {
                    logIn(value);
                    onLogin(value);
                }}
                setName={(value) => {
                    setUser(value);
                    setName(value);
                }}
            />
        </div>
    );
}
