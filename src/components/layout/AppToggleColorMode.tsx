import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "../../atoms/colorMode.atom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
type IProps = {};

const AppToggleColorMode: React.FC<IProps> = ({}) => {
  const theme = useTheme();
  const { colorMode, setColorMode } = useColorMode();
  return (
    <Fab
      size="small"
      // color="secondary"
      aria-label="add"
      sx={{
        position: "absolute",
        bottom: 86,
        right: 16,
      }}
      onClick={() => setColorMode((p) => (p === "light" ? "dark" : "light"))}
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </Fab>
    // <IconButton
    //   sx={{
    //     // ml: 1,
    //     position: "absolute",
    //     top: "25%",
    //     right: "0",
    //   }}
    //   onClick={() => setColorMode((p) => (p === "light" ? "dark" : "light"))}
    //   color="inherit"
    // >
    // {theme.palette.mode === "dark" ? (
    //   <Brightness7Icon />
    // ) : (
    //   <Brightness4Icon />
    // )}
    // </IconButton>
  );
};

export default AppToggleColorMode;
