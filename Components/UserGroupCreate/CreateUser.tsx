import React, { useState, useEffect, useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Label } from "reactstrap";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import "./CreateUserGroup.scss";
import {
  addNewUserGroup,
  resetCreateGroupInfo,
  updateUserGroup,
} from "../../redux/action/UserGroupAction";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { TiArrowBackOutline } from "react-icons/ti";

const CreateUserGroup = (props: any) => {
  const addedGroupInfo = useSelector(
    (state: RootStateOrAny) =>
      state.UserGroupCreateReducer?.createUserGroupDataResponse
  );
  const UserGroupUpdateData = useSelector(
    (state: RootStateOrAny) =>
      state.UserGroupCreateReducer.updateUserGroupDataResponse
  );
  const dispatch = useDispatch();
  const [userGroupDetials, setUserGroupDetials] = useState({
    userGroupName: "",
    userGroupCode: "",
    status: "Active",
    description: "",
    entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
    id: "",
  });
  const [userType, setUserType] = useState(true);

  let location = props.location?.state;
  useEffect(() => {
    if (location !== undefined) {
      setUserGroupDetials(props?.location?.state);
      setUserType(false);
    }
  }, [location]);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState(false);
  const [errors, setErrors] = useState({
    userGroupNameError: "",
    UserGroupStatusError: "",
  });

  const clearCreateGroup = useCallback(async () => {
    try {
      dispatch(resetCreateGroupInfo());
    } catch (err) {}
  }, [dispatch]);

  const addNewGroupInfo = useCallback(
    async (newGroupInformation: any) => {
      try {
        if (props.location.state === undefined) {
          dispatch(addNewUserGroup(newGroupInformation));
        } else {
          dispatch(updateUserGroup(newGroupInformation));
        }
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (addedGroupInfo) {
      if (addedGroupInfo.data) {
        clearCreateGroup();
        props.history?.push({
          pathname: "/dashboard/user-Access-Management/User-Groups",
          state: true,
          message: "add",
        });
      } else if (addedGroupInfo.error) {
        setApiMessage(true);
      }
    }
  }, [addedGroupInfo]);
  
  useEffect(() => {
    if (UserGroupUpdateData) {
      if (UserGroupUpdateData.data) {
        clearCreateGroup();
        props.history?.push({
          pathname: "/dashboard/user-Access-Management/User-Groups",
          state: true,
          message: "edit",
        });
      } else if (UserGroupUpdateData.error) {
        setApiMessage(true);
      }
    }
  }, [UserGroupUpdateData]);

  const submitHandler = () => {
    if (validate()) {
      userGroupDetials.userGroupCode = userGroupDetials.userGroupName;

      addNewGroupInfo(userGroupDetials);
    }
  };
  const onCancel = () => {
    props.history?.push({
      pathname: "/dashboard/user-Access-Management/User-Groups",
      state: false,
    });
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserGroupDetials({
      ...userGroupDetials,
      [e.target.name]: e.target.value,
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  const validate = () => {
    let checkUserGroupNameError = customValidator(
      "userGroupName",
      "Group Name",
      userGroupDetials.userGroupName
    );
    let checkCommentError = customValidator(
      "description",
      "Description",
      userGroupDetials.description
    );
    let checkStatusError = customValidator(
      "status",
      "Status",
      userGroupDetials.status
    );
    if (checkUserGroupNameError !== "null" || checkStatusError !== "null") {
      setErrors({
        userGroupNameError: checkUserGroupNameError,
        UserGroupStatusError: checkStatusError,
      });
      setError("* Please Complete All the Required Field");
      return false;
    }
    setErrors({
      userGroupNameError: "",
      UserGroupStatusError: "",
    });
    setError("");
    return true;
  };
  return (
    <>
      <div className="d-flex p-3">
        <div className="w-100 d-flex justify-content-between col">
          <div className="col-4">
            <h1 className="text-bold notification-setup-title">
              {location === undefined ? "Add User Group" : "Edit User Group"}
            </h1>
          </div>
          <div className="d-flex col-3 justify-content-end">
            <CustomButton
              className="container-header-back text-bold text-dark btn--sizer"
              onClick={onCancel}
            >
              <TiArrowBackOutline style={{ margin: "auto 5px" }} />
              Back
            </CustomButton>
            {userType && (
              <Button
                type="button"
                className="container-header-add cursor ms-2 btn--sizer"
                color="danger"
                onClick={() => submitHandler()}
              >
                {" "}
                + Add
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="add-group-wrapper">
          <div className="p-3">
            <div className="d-flex flex-column container ">
              {apiMessage && (
                <CustomResponseMessage
                  apiStatus={false}
                  closeMessage={closeMessage}
                  message={addedGroupInfo.message}
                />
              )}

              <div className="row mb-3">
                <Label
                  className="add-group-label-font-weight form-label-font-size"
                  for="exampleText"
                  sm={3}
                >
                  Group Name{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={7}>
                  <CustomInput
                    className="form-control container-body-input form-label-font-size"
                    type="text"
                    name="userGroupName"
                    value={userGroupDetials.userGroupName}
                    onChange={handleChange}
                  />
                  {errors.userGroupNameError &&
                    errors?.userGroupNameError !== "null" && (
                      <Label className="error-text-red form-label-font-size">
                        {errors.userGroupNameError}
                      </Label>
                    )}
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-group-label-font-weight form-label-font-size"
                  for="exampleText"
                  sm={3}
                >
                  Status <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={7}>
                  <Input
                    className="form-select container-body-input form-label-font-size wholeStatussize"
                    type="select"
                    name="status"
                    onChange={handleChange}
                    disabled={userType}
                    value={userGroupDetials.status}
                  >
                    <option selected>Active</option>
                    <option>Inactive</option>
                  </Input>
                  {errors.UserGroupStatusError &&
                    errors?.UserGroupStatusError !== "null" && (
                      <Label className="error-text-red form-label-font-size">
                        {errors.UserGroupStatusError}
                      </Label>
                    )}
                </Col>
              </div>

              {
                <div className="col d-flex p-2">
                  <div className="col-3"></div>
                  <div className="col-5 p-1">
                    <button
                      className="container-save border-0 text-white"
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                    <button
                      className="container-cancel border-0 ms-3 form-label-font-size"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserGroup;
