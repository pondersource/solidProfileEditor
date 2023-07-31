import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import { FC } from "react";

type Props = {};

const AppLayout: FC<Props> = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <footer>©️ me 2023</footer>
    </>
  );
};

export default AppLayout;
