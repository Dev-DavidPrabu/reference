import "./EditNotificationSummary.scss";
import EditToggle from "../../Components/EditSummary/EditToggle/EditToggle";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";

const EditNotificationSummary = (props: any) => {
  let NotificationData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationSummaryReducer?.getNotificationResponse
  );

  const [notificationEditDetails, setnotificationEditDetails] = useState({
    id: "",
    notificationId: "",
    notificationName: "",
    notificationUsage: "",
    module: "",
    enabled: "",
    parameters: "",
    popUpMessage: "",
    inAppMessage: "",
    pushNotificationMessage: "",
    smsMessage: "",
    emailMessage: "",
    inboxMessage: "",
  });
  const handleChange = async (e: any) => {
    setnotificationEditDetails({
      ...notificationEditDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (NotificationData) {
      const data = NotificationData?.data?.filter(
        (e: any) => e?.id === props?.editId
      );

      setnotificationEditDetails(data[0]);
    }
  }, [NotificationData, props?.editId]);

  return (
    <div className="p-4">
      {props.updateData?.name}
      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">Notification ID</label>
          </div>
          <div className="col-8 p-2 ">
            <input
              className="border-0 edit-sum-input form-control"
              type="text"
              value={"PS002"}
              readOnly={true}
            />
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">Notification Name</label>
          </div>
          <div className="col-8 p-2 ">
            <input
              className="border-0 edit-sum-input form-control"
              value="PASSCODE_TRY_COUNT"
              type="text"
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">Module</label>
          </div>
          <div className="col-8 p-2 ">
            <input
              className="border-0 edit-sum-input form-control"
              value="Onboarding"
              type="text"
              readOnly={true}
            />
          </div>
        </div>
        <div className="col-6 d-flex ">
          <div className="col-4 p-2">
            <label className="edit-sum-label">Type</label>
          </div>
          <div className="col-8 p-2 ">
            <input
              className="border-0 edit-sum-input form-control"
              value="User Action"
              type="text"
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              Usage
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2 ">
            <textarea
              className="border-0 edit-sum-textarea edit-sum-ht"
              name="notificationUsage"
              value={notificationEditDetails?.notificationUsage}
              onChange={handleChange}
              rows={2}
            ></textarea>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              Enabled
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2">
            {notificationEditDetails.enabled !== "" && (
              <EditToggle
                isOn={notificationEditDetails.enabled}
                handleToggle={(_e: any) => {
                  handleChange({
                    target: {
                      name: "enabled",
                      value: !notificationEditDetails.enabled,
                    },
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              Pop-up-Message
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2 ">
            <textarea
              className="border-0 edit-sum-textarea edit-sum-ht"
              name="popUpMessage"
              value={notificationEditDetails?.popUpMessage}
              onChange={handleChange}
              rows={2}
            ></textarea>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              Inbox
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2 ">
            <textarea
              className="border-0 edit-sum-textarea edit-sum-ht"
              value={notificationEditDetails?.inboxMessage}
              name={"inboxMessage"}
              placeholder="Enter Your text"
              rows={2}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              Push Notification Message
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2 ">
            <textarea
              className="border-0 edit-sum-textarea edit-sum-ht"
              value={notificationEditDetails?.pushNotificationMessage}
              name={"pushNotificationMessage"}
              rows={2}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              SMS-Message
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2 ">
            <textarea
              className="border-0 edit-sum-textarea edit-sum-ht"
              value={notificationEditDetails?.smsMessage}
              name={"smsMessage"}
              onChange={handleChange}
              rows={2}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">Field List</label>
          </div>
          <div className="col-8 p-2 ">
            <input
              className="border-0 edit-sum-input form-control"
              type="text"
              value={"PS002"}
              readOnly={true}
            />
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 p-2">
            <label className="edit-sum-label">
              Email-Message
              <span className="edit-sum-label-color">*</span>
            </label>
          </div>
          <div className="col-8 p-2 ">
            <textarea
              className="border-0 edit-sum-textarea edit-sum-ht"
              value={notificationEditDetails?.emailMessage}
              name={"emailMessage"}
              placeholder="Enter Your Text"
              rows={2}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="col d-flex">
        <div className="col-6 d-flex">
          <div className="col-4 p-2"></div>
          <div className="col-8 p-2 ">
            <SubmitCancelButton
              button={"Submit"}
              secondButton={"Cancel"}
              onSubmit={() => props.submit(notificationEditDetails)}
              onCancel={() => props.cancel()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditNotificationSummary;
