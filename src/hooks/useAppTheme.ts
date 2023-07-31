import { useMemo } from "react";
import { useColorMode } from "../atoms/colorMode.atom";
import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const useAppTheme = () => {
      //   const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const { colorMode } = useColorMode();
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: colorMode,
                    //   mode: prefersDarkMode ? "dark" : "light",
                    primary: {
                        main: '#556cd6',
                    },
                    secondary: {
                        main: '#19857b',
                    },
                    error: {
                        main: red.A400,
                    },
                },
            }),
        [colorMode]
        // [prefersDarkMode]
    );

    return { theme }
};

