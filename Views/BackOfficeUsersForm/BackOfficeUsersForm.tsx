import "./BackOfficeUsersForm.scss";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { IoArrowUndoOutline } from "react-icons/io5";

const BackOfficeUsersForm = (props: any) => {
  const [type, setType] = useState();
  const [backOfficeDetails, setBackOfficeDetails] = useState({
    userType: "",
    userId: "",
    fullName: "",
    phoneNumber: "",
    role: "",
    status: "",
  });
  let location = props.location?.state;
  useEffect(() => {
    if (location !== undefined) {
      if (props.location.state === "") {
        setBackOfficeDetails(backOfficeDetails);
      } else {
        setBackOfficeDetails(props.location.state);
      }
      setType(props.location.action);
    }
  }, [location]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackOfficeDetails({
      ...backOfficeDetails,
      [e.target.name]: e.target.value,
    });
  };
  const onCancel = () => {
    props.history?.push({
      pathname: "/dashboard/user-Management/Back-Office-Users",
    });
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold back-office-title">
            {type === "edit"
              ? "Edit Back Office User"
              : type === "add"
              ? "Add Back Office User"
              : "Back Office Users"}
          </h1>
          <button className="back-office-back border-0" onClick={onCancel}>
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="back-office-body p-3">
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">User Type <span className="back-office-label-color">*</span></label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-select"
              type="text"
              value={backOfficeDetails.userType}
              name=""
              readOnly={type === "edit"}            />
          </div>
        </div>
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
              value={backOfficeDetails.userId}
              name=""
            />
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              Full Name
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-control"
              type="text"
              name="status"
              onChange={handleChange}
              value={backOfficeDetails.fullName}
            ></Input>
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">Phone Number<span className="back-office-label-color">*</span></label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="back-office-input border-0 form-control"
              type="number"
              value={backOfficeDetails.phoneNumber}
            ></Input>
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">Role<span className="back-office-label-color">*</span></label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="back-office-input border-0 form-select"
              type="select"
              value={backOfficeDetails.role}
            >
                  <option selected></option>
              <option>Back Office Admin</option>
              <option>Topup Approver V3</option>
              <option>Payroll Onboarding Maker</option>
              <option>Payroll Test Role</option>
              <option>E-Terminal Maker</option>

            </Input>
          </div>
        </div>
        <div className="col d-flex p-2">
          <div className="col-4 p-1">
            <label className="back-office-label">
              Status
              <span className="back-office-label-color">*</span>
            </label>
          </div>
          <div className="col-5 p-1 ">
            <Input
              className="border-0 back-office-input form-select"
              type="select"
              value={backOfficeDetails.status}
              name=""
            >
              <option selected></option>
              <option>Active</option>
              <option>Deleted</option>
            </Input>
          </div>
        </div>

          <div className="col d-flex p-2">
            <div className="col-4"></div>
            <div className="col-5 p-1">
              <button className="back-office-save border-0 text-white">
                {type === "add" ? "Submit" : "Update"}
              </button>
              <button
                className="back-office-cancel border-0 ms-3"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default BackOfficeUsersForm;
