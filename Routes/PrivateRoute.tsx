import React, { useCallback } from "react";
import { Redirect, Route } from "react-router";
import { useHistory } from "react-router-dom";
import getLocalStorageValues from "../../src/Constants/AcessLocalStorageInfo";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import { Constants, ApiEndPoints } from "../Constants/Constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  logOutUser,
  userLogout,
} from "../redux/action/UserAuthenticationAction";
const PrivateRoute = (_props: any) => {
  let acessLocalStorageValues = getLocalStorageValues();
  const history = useHistory();
  const dispatch = useDispatch();
  const removeLogoutResponse = useCallback(async () => {
    try {
      dispatch(userLogout());
    } catch (err) {}
  }, [dispatch]);
  React.useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (
      userData.sessionId !== undefined &&
      userData.userInfo.id !== undefined
    ) {
      const apiURL =
        Constants.BaseURL +
        ApiEndPoints.sessionCheck +
        `sessionId=${userData.sessionId}&userId=${userData.userInfo.id}`;
      axios.get(apiURL).then((res) => {
        if (
          res?.data?.error !== undefined &&
          res?.data?.message !== undefined
        ) {
          var body = JSON.stringify({
            userType: userData.userInfo.userType,
            loginId: userData.userInfo.loginId,
          });
          dispatch(logOutUser(body));
          removeLogoutResponse().then(() => {
            localStorage.clear();
            history.push("/auth/login");
          });
        }
      });
    }
  }, []);
  return (
    <>
      <Route
        path="/dashboard"
        render={(props: any) =>
          acessLocalStorageValues ? (
            <AuthLayout {...props} exact />
          ) : (
            <Redirect to="/auth" />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
