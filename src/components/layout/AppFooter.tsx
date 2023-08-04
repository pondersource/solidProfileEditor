import ArchiveIcon from "@mui/icons-material/Archive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLink from "../AppLink/AppLink";
import AppToggleColorMode from "./AppToggleColorMode";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
type IProps = {};

const AppFooter: FC<IProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      variant="elevation"
      color="default"
      enableColorOnDark
    >
      <AppToggleColorMode />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              display: { xs: "block", sm: "none", md: "none" },
            }}
            elevation={3}
          >
            <BottomNavigation showLabels>
              <BottomNavigationAction
                onClick={() => navigate("/profile")}
                label="Profile"
                icon={<PersonIcon />}
              />
              <BottomNavigationAction
                onClick={() => navigate("/bookmarks")}
                label="Bookmarks"
                icon={<BookmarkIcon />}
              />
            </BottomNavigation>
          </Paper>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              p: 3,
              flex: 1,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{
                textDecoration: "none",
              }}
            >
              {"Copyright © "}
              <AppLink
                href="https://pondersource.com/"
                sx={{
                  color: "teal",
                }}
              >
                Ponder Source
              </AppLink>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppFooter;
