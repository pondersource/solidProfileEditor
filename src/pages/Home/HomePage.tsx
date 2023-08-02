import AppLink from "@/components/AppLink/AppLink";
import { Button } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type IProps = {};

const HomePage: FC<IProps> = ({}) => {
  return (
    <div>
      {/* <AppLink href="/login"> */}
      Home
      {/* </AppLink> */}
    </div>
  );
};

export default HomePage;
