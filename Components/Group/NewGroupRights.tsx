import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Label, Col } from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import { addGroupData, GroupRightsModal } from "../../models/GroupRightModal";
import {
  createGroupRight,
  getAllFuntionName,
  getAllGroupName,
  updateGroupRight,
  clearCreateGroupRight,
  clearUpdateGroupRight,
} from "../../redux/action/GroupRightsAction";
import "./NewGroupRights.scss";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";

const NewGroupRights = (props: addGroupData) => {
  const [functionId, setfunctionId] = useState(props.userDetail.id || "");
  const [functionName, setFunctionName] = useState(
    props.userDetail.functionCode || ""
  );
  const [groupName, setGroupName] = useState(
    props.userDetail.userGroupCode || ""
  );
  const [status, setStatus] = useState("Active");

  const [error, setError] = useState("");
  const [add, setAdd] = useState(props.userDetail.add || false);
  const [view, setView] = useState(props.userDetail.view || false);

  const [edit, setEdit] = useState(props.userDetail.edit || false);
  const [deleteAuth, setDeleteAuth] = useState(
    props.userDetail.delete || false
  );
  const [levelOne, setLevelOne] = useState(
    props.userDetail.approvalLevel1 || false
  );
  const [levelTwo, setLevelTwo] = useState(
    props.userDetail.approvalLevel2 || false
  );
  const [levelThree, setLevelThree] = useState(
    props.userDetail.approvalLevel3 || false
  );
  const [errors, setErrors] = useState({
    functionIdError: "",
    groupNameError: "",
    functionNameError: "",
    statusError: "",
  });
  const [userType] = useState(
    props.userType === "newGroupRights" ? true : false
  );
  const [apiMessage, setApiMessage] = useState(false);
  const dispatch = useDispatch();

  let GroupRightsData = useSelector(
    (state: RootStateOrAny) => state.GroupRightsReducer?.getAllGroupNames
  );
  let GroupFuntionData = useSelector(
    (state: RootStateOrAny) => state.GroupRightsReducer?.getAllGroupFuntion
  );

  let CreateGroupRightsData = useSelector(
    (state: RootStateOrAny) => state.GroupRightsReducer?.postGroupRightsResponse
  );
  let updateGroupRightsData = useSelector(
    (state: RootStateOrAny) =>
      state.GroupRightsReducer?.updateGroupRightsResponse
  );
  useEffect(() => {
    fetchAllGroupName();
  }, []);
  const fetchAllGroupName = useCallback(async () => {
    try {
      dispatch(getAllGroupName());
      dispatch(getAllFuntionName());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (CreateGroupRightsData) {
      if (CreateGroupRightsData.data) {
        props.submitHandler("add");
        clearCreateData();
        setError("");
      } else if (CreateGroupRightsData.error) {
        setApiMessage(true);
        setError(CreateGroupRightsData.error);
      }
    }
  }, [CreateGroupRightsData]);
  useEffect(() => {
    if (updateGroupRightsData) {
      if (updateGroupRightsData.data) {
        props.submitHandler("update");
        clearUpdateData();
        setError("");
      } else if (updateGroupRightsData.error) {
        setApiMessage(true);
        setError(updateGroupRightsData.message);
      }
    }
  }, [updateGroupRightsData]);

  useEffect(() => {
    clearCreateData();
    clearUpdateData();
  }, []);

  const clearCreateData = useCallback(async () => {
    try {
      dispatch(clearCreateGroupRight());
    } catch (err) {}
  }, [dispatch]);
  const clearUpdateData = useCallback(async () => {
    try {
      dispatch(clearUpdateGroupRight());
    } catch (err) {}
  }, [dispatch]);

  const submitHandler = () => {
    setError("");
    if (userType) {
      if (validate()) {
        var body = JSON.stringify({
          userGroupName: groupName,
          functionId: functionId,
          functionCode: functionName,
          approvalLevel1: levelOne,
          approvalLevel2: levelTwo,
          approvalLevel3: levelThree,
          add: add,
          edit: edit,
          delete: deleteAuth,
          status: status,
        });
        dispatch(createGroupRight(body));
      }
    } else {
      if (validate()) {
        var updateBody = JSON.stringify({
          userGroupFuncRightId: props?.userDetail?.id,
          approvalLevel1: levelOne,
          approvalLevel2: levelTwo,
          approvalLevel3: levelThree,
          add: add,
          edit: edit,
          delete: deleteAuth,
          status: status,
        });
        dispatch(updateGroupRight(updateBody));
      }
    }
  };
  const cancelEvent = () => {
    props.submitHandler("");
  };
  const handleAdd = () => {
    setAdd(!add);
  };
  const handleView = () => {
    setView(!view);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleDelete = () => {
    setDeleteAuth(!deleteAuth);
  };
  const handleLevel = (level: string) => {
    switch (level) {
      case "l1":
        setLevelOne(!levelOne);
        setLevelTwo(false);
        setLevelThree(false);
        return;
      case "l2":
        setLevelTwo(!levelTwo);
        setLevelOne(false);
        setLevelThree(false);
        return;
      case "l3":
        setLevelThree(!levelThree);
        setLevelTwo(false);
        setLevelOne(false);
        return;
      default:
        return;
    }
  };
  const handleFuntionName = (e: any) => {
    setFunctionName(e.target.value);
    functionNames?.filter((value: any) => {
      if (value["functionCode"] === e.target.value) {
        setfunctionId(value.id);
        return value;
      }
      return false;
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const validate = () => {
    let checkfunctionIdError = customValidator(
      "functionId",
      "User ID",
      functionId
    );
    let checkGroupNameError = customValidator(
      "groupName",
      "Group Name",
      groupName
    );
    let checkFunctionNameError = customValidator(
      "functionName",
      "Group Name",
      functionName
    );

    let checkStatusError = customValidator("status", "Status", status);

    if (!(checkfunctionIdError === "null" && checkGroupNameError === "null")) {
      setErrors({
        functionIdError: checkfunctionIdError,
        groupNameError: checkGroupNameError,
        functionNameError: checkFunctionNameError,
        statusError: checkStatusError,
      });
      return false;
    }
    setErrors({
      functionIdError: "",
      groupNameError: "",
      functionNameError: "",
      statusError: "",
    });
    return true;
  };
  let groupNames = GroupRightsData?.data;
  let functionNames = GroupFuntionData?.data;
  if (functionNames) {
    functionNames = functionNames?.sort((a: any, b: any) =>
      a.functionCode.localeCompare(b.functionCode)
    );
  }

  return (
    <div className="d-flex">
      <div className="d-flex flex-column container ">
        <h1 className="fw-bold groupright-container-header ">
          {userType ? "Add Group Rights" : "Edit Group Rights"}
        </h1>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={error}
            closeMessage={closeMessage}
          />
        )}
        <div className="d-flex groupright-container-body mt-2">
          <div className="d-flex flex-column w-100 fw-bold p-4 gap-2">
            <div className="d-flex mt-2 align-items-end">
              <label className="groupright-container-body-label form-label-font-size">
                Group Name{" "}
                <span className="groupright-container-body-label-color">*</span>
              </label>
              <select
                className="form-select groupright-container-body-input form-label-font-size text-box"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              >
                <option selected></option>
                {groupNames &&
                  groupNames.map((e: GroupRightsModal, _index: number) => {
                    return <option>{e.userGroupName}</option>;
                  })}
              </select>
            </div>
            <div className="justify-content-center d-flex">
              {errors.groupNameError && errors?.groupNameError !== "null" && (
                <Label className="error-text-red form-label-font-size">
                  {errors.groupNameError}
                </Label>
              )}
            </div>

            <div className="d-flex mt-2 align-items-end">
              <label className="groupright-container-body-label form-label-font-size ">
                Function UID{" "}
                <span className="groupright-container-body-label-color">*</span>
              </label>
              <input
                className="form-control groupright-container-body-input form-label-font-size"
                readOnly={true}
                value={functionId}
              ></input>
            </div>

            <div className="d-flex mt-3 align-items-end">
              <label className="groupright-container-body-label form-label-font-size">
                Function Name{" "}
                <span className="groupright-container-body-label-color">*</span>
              </label>
              <select
                className=" form-select groupright-container-body-input form-label-font-size"
                value={functionName}
                onChange={(e) => handleFuntionName(e)}
                disabled={!userType}
              >
                <option selected></option>
                {functionNames &&
                  functionNames.map((e: GroupRightsModal, _index: number) => {
                    return <option>{e.functionCode}</option>;
                  })}
              </select>
            </div>
            <div className="justify-content-center d-flex">
              {errors.functionNameError &&
                errors?.functionNameError !== "null" && (
                  <Label className="error-text-red form-label-font-size">
                    {errors.functionNameError}
                  </Label>
                )}
            </div>
            <div className="d-flex mt-2 align-items-center">
              <Label
                className="add-festive-label-font-weight form-label-font-size"
                for="exampleText"
                sm={3}
              >
                Allowed Operations{" "}
                <span className="groupright-container-body-label-color">*</span>
              </Label>
              <Col sm={2} className="ms-5">
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={view}
                  onChange={() => handleView()}
                />
                <Label className="form-label-font-size spaceforLabel">
                  {" "}
                  View{" "}
                </Label>
              </Col>
              <Col sm={2}>
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={add}
                  onChange={() => handleAdd()}
                />
                <Label className="form-label-font-size spaceforLabel">
                  Add
                </Label>
              </Col>
              <Col sm={2}>
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={edit}
                  onChange={handleEdit}
                />
                <Label className="form-label-font-size spaceforLabel">
                  Edit
                </Label>
              </Col>
              <Col sm={2}>
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={deleteAuth}
                  onChange={handleDelete}
                />
                <Label className="form-label-font-size spaceforLabel">
                  Delete
                </Label>
              </Col>
            </div>

            <div className="d-flex mt-2 align-items-center">
              <Label
                className="add-festive-label-font-weight form-label-font-size"
                for="exampleText"
                sm={3}
              >
                Allowed Authorization{" "}
              </Label>
              <Col sm={2} className="ms-5">
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={levelOne}
                  onChange={() => handleLevel("l1")}
                />
                <Label className="form-label-font-size spaceforLabel">L1</Label>
              </Col>
              <Col sm={2}>
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={levelTwo}
                  onChange={() => handleLevel("l2")}
                />
                <Label className="form-label-font-size spaceforLabel">L2</Label>
              </Col>
              <Col sm={2}>
                <Input
                  className="input_space form-label-font-size"
                  type="checkbox"
                  id="checkbox2"
                  checked={levelThree}
                  onChange={() => handleLevel("l3")}
                />
                <Label className="form-label-font-size spaceforLabel">L3</Label>
              </Col>
            </div>

            <div className="d-flex mt-2 align-items-end">
              <label className="groupright-container-body-label form-label-font-size">
                Status{" "}
                <span className="groupright-container-body-label-color">*</span>
              </label>
              <Input
                className=" form-select groupright-container-body-input form-label-font-size statusWidthIncrease"
                value={status}
                type="select"
                disabled={userType}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected>Active</option>
                <option>Inactive</option>
              </Input>
            </div>
            <div className="d-flex mt-3">
              <div className="btn-alignments">
              </div>
              <div className="d-flex">
              <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Cancel"}
                  onSubmit={submitHandler}
                  onCancel={cancelEvent}
                />
              </div>
            </div>
            {/* <div className="col mt-3 d-flex">
              <div className="col-3 ms-4"></div>
              <div className="col-6 p-2 ps-3">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Cancel"}
                  onSubmit={submitHandler}
                  onCancel={cancelEvent}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGroupRights;
