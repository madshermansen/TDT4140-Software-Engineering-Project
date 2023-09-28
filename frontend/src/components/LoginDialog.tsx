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
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { TextField } from "@mui/material";
import { validateLogin } from "../api/getUserPassword";
import { User } from "../customTypes/user";

const emails = ["username@gmail.com", "user02@gmail.com"];

type SimpleDialogProps = {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    onLogin: (value: boolean) => void;
    setName: (value: string) => void;
};

const SimpleDialog = (props: SimpleDialogProps) => {
    const { onLogin, onClose, selectedValue, open, setName } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("Log in");
    const [loggedIn, setLoggedIn] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUser = async () => {
        await validateLogin(username, password).then((res) => {
            setSelectedUser(() => res);
            if (res) {
                setName(res["first_name"]);
            }
            onLogin(loggedIn);
            handleClose();
            setUsername("");
            setPassword("");
            return selectedUser;
        });
    };

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Log into your account</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </ListItem>
                <ListItem disableGutters>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </ListItem>
                <Button
                    onClick={() => {
                        fetchUser();
                    }}
                >
                    Login
                </Button>
            </List>
        </Dialog>
    );
};

export default function LoginDialogFunction(props: {
    onLogin: (value: boolean) => void;
    Clicked: () => void;
    setName: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    const [loggedIn, setLoggedIn] = useState(false);
    const { onLogin, Clicked, setName } = props;
    const [logInText, setLogInText] = useState("Log in");
    const [user, setUser] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(loggedIn);
        setSelectedValue(value);
    };

    return (
        <div>
            <ListItem disableGutters>
                <ListItemButton
                    autoFocus
                    onClick={() => {
                        handleClickOpen();
                    }}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Log In" />
                </ListItemButton>
            </ListItem>
            <SimpleDialog
                setName={(value) => {
                    setUser(value);
                    setName(value);
                }}
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                onLogin={(value) => {
                    setLoggedIn(value);
                    onLogin(value);
                }}
            />
        </div>
    );
}
function onEffect(arg0: () => void) {
    throw new Error("Function not implemented.");
}
