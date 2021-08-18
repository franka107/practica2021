import React from "react";
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
        {/*
        <Switch>
          <PublicRoute
            component={AnimalDetailPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.animalDetail}
            isAuthenticated={false}
          />
          <PublicRoute
            component={SalePage}
            layout={DashboardLayout}
            path={ROUTES_DICT.sale}
            isAuthenticated={false}
          />
          <PublicRoute
            component={WeightPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.weight}
            isAuthenticated={false}
          />
          <PublicRoute
            component={ZealPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.zeal}
            isAuthenticated={false}
          />
          <PublicRoute
            component={ServicePage}
            layout={DashboardLayout}
            path={ROUTES_DICT.service}
            isAuthenticated={false}
          />
          <PublicRoute
            component={BirthPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.birth}
            isAuthenticated={false}
          />
          <PublicRoute
            component={PalpationPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.palpations}
            isAuthenticated={false}
          />
          <PublicRoute
            component={PregnanciesPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.pregnancies}
            isAuthenticated={false}
          />
          <PublicRoute
            component={AnimalControlPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.animalControl}
            isAuthenticated={false}
          />
          <PublicRoute
            component={SetupControlPage}
            layout={DashboardLayout}
            path={ROUTES_DICT.setup}
            isAuthenticated={false}
          />

          <PublicRoute
            component={RegisterPage}
            layout={AuthLayout}
            path={ROUTES_DICT.register}
            isAuthenticated={false}
          />
          <PublicRoute
            component={LoginPage}
            layout={AuthLayout}
            path={ROUTES_DICT.login}
            isAuthenticated={false}
          />
          <PublicRoute
            component={EmailVerifiedPage}
            layout={AuthLayout}
            path={ROUTES_DICT.emailVerified}
            isAuthenticated={false}
          />
          <Redirect to="/login" />
        </Switch>
          */}
      </div>
    </Router>
  );
};
