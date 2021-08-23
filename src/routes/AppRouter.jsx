import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { GlobalSnackbar } from "../components/GlobalSnackbar";
import { ROUTES } from "./constants";
import { RenderRoutes } from "./RenderRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar />
        <RenderRoutes routes={ROUTES} />
      </div>
    </Router>
  );
};
