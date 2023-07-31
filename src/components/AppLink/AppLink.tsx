import { LinkProps, Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

import { FC } from "react";

const AppLink: FC<LinkProps> = (props) => {
  return (
    <>
      <MuiLink
        {...props}
        component={ReactRouterLink}
        sx={{
          color: "inherit",
          textDecoration: "none",
          ...props.sx,
          // mr: 2,
          // display: { xs: "none", md: "flex" },
        }}
        to={props.href ?? "#"}
      />
    </>
  );
};

export default AppLink;
