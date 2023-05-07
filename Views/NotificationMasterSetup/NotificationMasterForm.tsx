import { Switch } from "antd";
import { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomButton from "../../Components/UI/CustomButton";
import "./NotificationMasterForm.scss";

const NotificationMasterForm = (props: any) => {
  const [enable, setEnable] = useState(false);
  const [type, setType] = useState();

  const [NotificationDetails, setNotificationDetails] = useState({
    id: "",
    notificationId: "",
    moduleDepedency: "",
    description: "",
    parameters: "",
    enabled: false,
  });
  let location = props.location?.state;
  useEffect(() => {
    if (location !== undefined) {
      if (props.location.state === "") {
        setNotificationDetails(NotificationDetails);
      } else {
        setNotificationDetails(props.location.state);
      }
      setType(props.location.action);
    }
  }, [location]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationDetails({
      ...NotificationDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleEnabled = (e: any) => {
    setNotificationDetails({
      ...NotificationDetails,
      ["enabled"]: e,
    });
  };

  const onClickBack = () => {
    props.history?.push({
      pathname: "/dashboard/Notification-Master-Setup",
    });
  };
  return (
    <>
      {/* <div className="d-flex p-4">
        <div className="col d-flex justify-content-start">
          <div className="col-6">
            <h1 className="text-bold notification-setup-title">
              {"Notification Master Setup"}
            </h1>
          </div>
          <div className="col-6">
            <CustomButton
              className="notification-setup-back text-bold text-dark ms-5"
              onClick={onClickBack}
            >
              <TiArrowBackOutline style={{ margin: "auto 5px" }} />
              Back
            </CustomButton>
          </div>
        </div>
      </div> */}
      <div className="d-flex p-4">
        <div className="col-6 d-flex justify-content-between notification-setup-headerAlign">
          <div>
            <h1 className="text-bold notification-setup-title">
              {"Notification Master Setup"}
            </h1>
          </div>
          <div>
            <CustomButton
              className="notification-setup-back text-bold text-dark ms-5"
              onClick={onClickBack}
            >
              <TiArrowBackOutline style={{ margin: "auto 5px" }} />
              Back
            </CustomButton>
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-between align-items-center p-4 pb-3">
          <div className="d-flex col justify-content-between title">
          {"Notification Master Setup"}
          </div>
          <CustomButton onClick={onClickBack} className="backBtnDevice">
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div> */}

      <div className="p-4">
        <div className="notification-setup-body p-3">
          <div className="col d-flex p-1">
            <div className="col-4 p-1">
              <label className="notification-setup-label">
                Notification ID
                <span className="notification-setup-label-color">*</span>
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 notification-setup-input form-control"
                type="text"
                value={NotificationDetails.notificationId}
                name=""
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-4 p-1">
              <label className="notification-setup-label">
                Description
                <span className="notification-setup-label-color">*</span>
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                type="text"
                readOnly={true}
                className="notification-setup-input form-control border-0"
                value={NotificationDetails.description}
              ></input>
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-4 p-1">
              <label className="notification-setup-label">
                {" "}
                Module Dependency
                <span className="notification-setup-label-color">*</span>
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 notification-setup-input form-control"
                type="text"
                value={NotificationDetails.moduleDepedency}
                name=""
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-4 p-1">
              <label className="notification-setup-label">
                Content Parameter
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 notification-setup-input form-control"
                type="text"
                value={NotificationDetails.parameters}
                name=""
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-4 p-1">
              <label className="notification-setup-label">
                Active Flag
                <span className="notification-setup-label-color">*</span>
              </label>
            </div>
            <div className="col-6 p-1 ">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="NO"
                disabled
                checked={NotificationDetails.enabled}
                onChange={(e) => handleEnabled(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationMasterForm;
