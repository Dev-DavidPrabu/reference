import { TiArrowBackOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";

import { updateGroupRight } from "../../redux/action/NotificationSummaryAction";
import EditParameterSummary from "../../Views/ParameterSummary/EditParameterSummary";
import EditNotificationSummary from "../EditNotification/EditNotificationSummary";

import "./CommonEditSummary.scss";

const CommonEditSummary = (props: any) => {
  const dispatch = useDispatch();

  const cancelEvent = () => {
    props.history.push({
      pathname: "/dashboard/parameter-summary",
    });
  };
  const onSubmit = () => {
    props.history.push({
      pathname: "/dashboard/parameter-summary",
    });
  };
  const OnSumbitNotification = async (details: any) => {
    dispatch(updateGroupRight(details));
    props.history.push({
      pathname: "/dashboard/Notification-Summary",
    });
  };
  const notificationCancelEvent = () => {
    props.history.push({
      pathname: "/dashboard/Notification-Summary",
    });
  };

  const handle_CategoryCancel = (_e: React.MouseEvent<HTMLElement>) => {
    props.backCustomer();
  };

  return (
    <div className="p-4">
      <div className="d-flex">
        <h1 className="primary_heading ">{props.name}</h1>

        {props.backButton && (
          <>
            <div
              className={
                props.formData
                  ? "d-flex commonEdit-BackButton"
                  : "d-flex commonEdit-BackButton deletedRecord"
              }
              onClick={handle_CategoryCancel}
            >
              <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
            </div>
          </>
        )}
      </div>
      <div className="edit-summary-body" style={props.style}>
        {props.history?.location?.state?.previousPath == "Parameters" ? (
          <EditParameterSummary
            selectedInfo={props.history?.location?.state?.data}
            updateData={props}
            cancel={cancelEvent}
            submit={onSubmit}
          />
        ) : props.history?.location?.state?.previousPath == "Notification" ? (
          <EditNotificationSummary
            editId={props.history?.location?.state?.data?.id}
            cancel={notificationCancelEvent}
            submit={OnSumbitNotification}
          />
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};

export default CommonEditSummary;
