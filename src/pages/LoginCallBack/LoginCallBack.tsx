import { useSession } from "@inrupt/solid-ui-react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallBack: FC<{}> = ({}) => {
  const {
    session: {
      info: { isLoggedIn },
    },
  } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn && navigate("/profile");
  }, [isLoggedIn]);

  return (
    <Box>
      <Typography>Redirecting</Typography>
      <LinearProgress color="inherit" />
    </Box>
  );
};

export default LoginCallBack;
