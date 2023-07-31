import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AppHeader from "./AppHeader";
import { FC } from "react";
import AppFooter from "./AppFooter";

type Props = {};

const AppLayout: FC<Props> = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <Box
        flex={1}
        sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}
      >
        <Outlet />
      </Box>
      <AppFooter />
    </Box>
  );
};

export default AppLayout;
