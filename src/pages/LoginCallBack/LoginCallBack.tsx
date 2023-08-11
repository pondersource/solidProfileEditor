import { Auth } from "@/utils/auth";
import { useSession } from "@inrupt/solid-ui-react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

const LoginCallBack: FC<{}> = ({ }) => {
  // const navigate = useNavigate()
  const { session: { info: { isLoggedIn } } } = useSession();

  // useEffect(() => {
  //   isLoggedIn && navigate("/", { replace: true });
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   handleIncomingRedirect({ restorePreviousSession: true })
  //     .then((value?: ISessionInfo): void | PromiseLike<void> => {
  //       value?.isLoggedIn && navigate("/", { replace: true });
  //     })
  //     .catch(() => { });
  // }, [isLoggedIn]);

  useEffect(() => {
    Auth.completeLogin();
  }, []);

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