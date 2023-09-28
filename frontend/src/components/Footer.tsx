import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Toolbar,
    Typography,
} from "@mui/material";
import { theme } from "../styles/theme";
import React from "react";

const Footer = () => {
    return (
        <Box
            sx={({ palette }) => ({
                borderTop: 2,
                borderTopColor: palette.primary.light,
                color: palette.primary.light,
                backgroundColor: theme.palette.primary.main,
            })}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    paddingY: 2,
                }}
            >
                <Typography
                    fontWeight="bold"
                    fontSize={13}
                    sx={{ color: "white" }}
                >
                    Copyright@Adventure Atlas 2023
                </Typography>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={({ palette }) => ({
                        borderRight: 2,
                        borderColor: theme.palette.primary.light,
                    })}
                />
                <ButtonGroup variant="text" orientation="vertical">
                    <a href="/legal/service">
                        <Button sx={{ color: "white" }}>
                            Terms of Service
                        </Button>
                    </a>
                    <a href="/legal/privacy">
                        <Button sx={{ color: "white" }}>Privacy Policy</Button>
                    </a>
                </ButtonGroup>
            </Toolbar>
        </Box>
    );
};

export default Footer;
