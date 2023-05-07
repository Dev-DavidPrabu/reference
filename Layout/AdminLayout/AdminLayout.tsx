import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router";
import Routes from "../../Routes";
import "../../Components/Login/AuthLayout.scss";
const AdminLayout = (_props: any) => {
  const getRoutes = () => {
    return Routes.map((prop: any, key: any) => {
      if (prop.layout == "/auth") {
        let Component = prop.component;

        return (
          <Route
            path={prop.layout + prop.path}
            render={(props: any) => <Component {...prop} {...props} />}
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div className="auth-wrapper w-100 col-12 li-bg">
      <div className=" col-8 m-auto  box-shadow: 0px 14px 80px rgb(34 35 58 / 20%)">
        <Switch>
          {getRoutes()}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
