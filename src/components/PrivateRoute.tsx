import { useSession } from "@inrupt/solid-ui-react";
import { FC } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";

export const PrivateRoute: FC<RouteProps> = (props) => {
  const {
    session: {
      info: { isLoggedIn },
    },
  } = useSession();
  if (!isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;

  // return isLoggedIn ? <Route {...props} /> : <Navigate to="login" replace />;
};
