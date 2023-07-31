import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";

import { Grid } from "@mui/material";
import AppLink from "../AppLink/AppLink";
import AppLogo from "./AppLogo";
import AppToggleColorMode from "./AppToggleColorMode";

const settings = ["Profile", "Logout"];

const pages = [
  { title: "Home", url: "/" },
  { title: "Blog", url: "/blog" },
];

type IProps = {};

const AppHeader: FC<IProps> = ({ }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" alignItems="center" flex={1} gap={1}>
            <Box flex={2} display="flex" justifyContent="flex-start" >
              <AppLogo />
            </Box>
            <Box flex={8} sx={{ display: { xs: "none", md: "flex" }, gap: 2 }} justifyContent="center" >
              {pages.map(({ title, url }) => (
                <AppLink key={url} href={url}>
                  {title}
                </AppLink>
              ))}
            </Box>
            <Box flex={2} display="flex" justifyContent="flex-end">
              <Box display="flex" gap={1}>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                      sx={{ p: 0 }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                      // src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={() => setAnchorEl(null)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
