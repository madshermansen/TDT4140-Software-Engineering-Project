import { AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React from "react";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import AuthButton from "./AuthButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { dark } from "@mui/material/styles/createPalette";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

type Props = {
    darkMode: boolean
    handleChangeDarkMode: () => void;
}

const NavBar = ({darkMode, handleChangeDarkMode} : Props) => {
    const navigate = useNavigate();

    const palette = () => {
        if(darkMode){
            return theme.palette.secondary;
        }else{
            return theme.palette.primary;
        }
    }

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: palette().light,
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                paddingY: 1,
                boxShadow: "none",
            }}
            elevation={1}
        >
            <Toolbar sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Button
                        startIcon={
                            darkMode?<img
                                src={"/globus_darkmode.png"}
                                width={42}
                                height={42}
                                alt="Logo"
                            />:<img
                            src={"/globus_lightmode.png"}
                            width={42}
                            height={42}
                            alt="Logo"
                        />
                        }
                        sx={{
                            color: palette().main,
                            fontSize: "48px",
                            fontFamily: "Poppins",
                            fontWeight: "700",
                        }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                color: palette().main,
                                fontSize: "48px",
                                fontFamily: "Poppins",
                                fontWeight: "700",
                            }}
                        >
                            Adventure Atlas
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                <IconButton sx={{ ml: 1, color: palette().main }} onClick={() => {handleChangeDarkMode()}}>
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                
                <Button
                    startIcon={<ExploreIcon />}
                    sx={{
                        color: palette().main,
                        fontFamily: "Poppins",
                    }}
                    onClick={() => {
                        navigate("/search");
                    }}
                >
                    Explore
                </Button>
                <AuthButton darkMode = {darkMode}
                            color = {palette().main}/>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
