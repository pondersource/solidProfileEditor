import { useSession } from "@inrupt/solid-ui-react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { FC } from "react";
import { Navigate } from "react-router-dom";

const LoginCallBack: FC<{}> = ({ }) => {
  const { session: { info: { isLoggedIn } } } = useSession();

  return (
    <Box>
      {!isLoggedIn && <>
        <Typography>Redirecting</Typography>
        <LinearProgress color="inherit" />
      </>}
      {isLoggedIn && <Navigate to={"/"} />}
    </Box>
  );
};

export default LoginCallBack;