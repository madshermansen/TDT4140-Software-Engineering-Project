import { Box } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";
import App from "../App";




const BasicLayout = () => {

    const [darkMode, setDarkMode] = useState(false);

    const changeMode = () => {
        if(darkMode){
            setDarkMode(false)
        }else{
            setDarkMode(true)
        }
    }

    const palette = () => {
        if(darkMode){
            return "#182c25";
        }else{
            return "#f6f7f6";
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: palette(),
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
            <App darkMode = {darkMode}
                changeMode = {changeMode}/>
            </Box>
        </Box>
    );
};

export default BasicLayout;
