import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAppSelector } from "../hooks/store";
import { theme } from "../styles/theme";
import AuthMenu from "./AuthMenu";

type Props = {
    darkMode: boolean,
    color: string,
}

const AuthButton = ({darkMode, color}: Props) => {
    const authState = useAppSelector((state) => state.auth);

    const [openAuthMenu, setOpenAuthMenu] = useState(false);

    const handleOpenAuthMenu = () => {
        setOpenAuthMenu(true);
    };

    const handleCloseAuthMenu = () => {
        setOpenAuthMenu(false);
    };

    const palette = () => {
        if(darkMode){
            return theme.palette.secondary;
        }else{
            return theme.palette.primary;
        }
    }

    return (
        <div aria-label="auth-button">
            <Button
                onClick={handleOpenAuthMenu}
                onMouseDown={(e) => e.preventDefault()}
                startIcon={
                    authState.isAuthenticated ? (
                        <Avatar alt={authState.firstName+" "+authState.lastName} src="/2.jpeg" />
                    ) : (
                        <PersonIcon />
                    )
                }
                sx={{
                    color: color,
                    fontFamily: "Poppins",
                }}
            >
                {authState.isAuthenticated ? authState.firstName : "Log in"}
            </Button>

            <AuthMenu
                onCloseAuthMenu={handleCloseAuthMenu}
                open={openAuthMenu}
            />
        </div>
    );
};

export default AuthButton;
