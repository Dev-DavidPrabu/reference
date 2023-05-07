import React, { useCallback, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Input } from "reactstrap";
import { addNewUserToCompany } from "../../redux/action/PreFundAction";

const AddCompanyUser = (props: any) => {
  const dispatch = useDispatch();
  const [companyUserInfo, setCompanyUserInfo] = useState({
    id: "",
    userId: "",
    companyId: props.location.state.companyInfo.data.id || "",
    companyAccountId:
      props.location.state.companyInfo.data.companyAccountId || "",
    companyRegistrationNo:
      props.location.state.companyInfo.data.companyRegistrationNo || "",
    companyName: props.location.state.companyInfo.data.companyName || "",
    mtaFlag: "",
    recordStatus: "Active",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyUserInfo({
      ...companyUserInfo,

      [e.target.name]: e.target.value,
    });
  };
  const createNewCompanyuser = useCallback(
    async (userInfoCreation: any) => {
      try {
        dispatch(addNewUserToCompany(userInfoCreation));
      } catch (err) {}
    },
    [dispatch]
  );
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold back-office-title">Edit Company User</h1>
          <button className="back-office-back border-0">
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="back-office-body p-3">
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              User Id
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-control"
              type="text"
              value={companyUserInfo.userId}
              name="userId"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              Company Id
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-control"
              type="text"
              value={companyUserInfo.companyId}
              name="companyId"
              onChange={handleChange}
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              Company Name
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-control"
              type="text"
              name="companyName"
              onChange={handleChange}
              readOnly={true}
              value={companyUserInfo.companyName}
            ></Input>
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              Company Registration Number
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-control"
              type="text"
              name="companyRegistrationNo"
              onChange={handleChange}
              value={companyUserInfo.companyRegistrationNo}
              readOnly={true}
            ></Input>
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              Meta Flag
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-select"
              type="select"
              value={companyUserInfo.mtaFlag}
              name="mtaFlag"
              onChange={handleChange}
            >
              <option selected></option>
              <option>True</option>
              <option>False</option>
            </Input>
          </div>
        </div>

        <div className="col d-flex p-2">
          <div className="col-4"></div>
          <div className="col-5 p-1">
            <button
              className="back-office-save border-0 text-white"
              onClick={() => createNewCompanyuser(companyUserInfo)}
            >
              Update
            </button>
            <button className="back-office-cancel border-0 ms-3">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyUser;
