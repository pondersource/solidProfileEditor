import Box from "@mui/material/Box";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import { alpha } from "@mui/material";

type Props = {};

const AppLayout: FC<Props> = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ m: 1, mb: 0 }}>
        <AppHeader />
      </Box>
      <Box
        boxShadow="inherit"
        flex={1}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          //
          bgcolor: alpha("#fff", 0.1),
          flex: 1,
          margin: 1,
          borderRadius: 2,
        }}
      >
        <Outlet />
      </Box>
      <Box >
        <AppFooter />
      </Box>
    </Box>
  );
};

export default AppLayout;
