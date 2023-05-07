import React from "react";
import { Redirect, Route } from "react-router";
import getLocalStorageValues from "../Constants/AcessLocalStorageInfo";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";

const PublicRoute = (_props: any) => {
  let acessLocalStorageValues = getLocalStorageValues();
  return (
    <>
      <>
        <Route
          path="/auth"
          render={(props: any) =>
            !acessLocalStorageValues ? (
              <AdminLayout {...props} exact />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
      </>
    </>
  );
};

export default PublicRoute;
