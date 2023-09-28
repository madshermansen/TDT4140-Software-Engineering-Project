import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
    createTheme(
        {
            typography: {
                fontFamily: ['"Open Sans"', "sans-serif"].join(","),
                h1: {
                    fontSize: 24,
                    fontWeight: 700,
                },
                h2: {
                    fontSize: 20,
                    fontWeight: 700,
                },
                body1: {
                    fontSize: 15,
                    fontWeight: 400,
                },
                button: {
                    fontSize: 12,
                },
            },
            palette: {
                primary: {
                    main: "#355e3b",
                    light: "#f6f7f6",

                    dark: "#007d68",
                    contrastText: "#000000",
                },
                secondary: {
                    main: "#f6f7f6",
                    light: "#182c25",

                    dark: "#355e3b",
                    contrastText: "#f6f7f6",
                },
            },
        }
        //locales.nbNO,
    )
);
