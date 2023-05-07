import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomButton from "../../Components/UI/CustomButton";
import "./NotificationChannelView.scss";
function NotificationChannelView(props: any) {
  const [channelValueDTO, setChannelValueDTO] = useState({
    description: "",
    notificationId: "",
  });
  const [channelLanguage, setChannelLanguage] = useState({
    languageCode: "",
    languageName: "",
    content: "",
  });
  const [channelValue, setChannelValue] = useState({
    id: "",
    channelCode: "",
    enabled: true,
    content: "",
    notificationMasterDTO: channelValueDTO,
    notificationChannelIl8nDTO: [channelLanguage],
  });

  let location = props.location?.state;
  useEffect(() => {
    if (location !== undefined) {
      setChannelValue(props.location.state);
    }
  }, [location]);
  const [enable, setEnable] = useState(false);
  const handleEnabled = (e: any) => {
    setEnable(!enable);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelValue({ ...channelValue, [e.target.name]: e.target.value });
  };
  const onClickBack = () => {
    props.history?.push({
      pathname: "/dashboard/notification-channel",
    });
  };
  const extractContent = (s: any) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  return (
    <>
      <div className="d-flex justify-content-between p-3">
        <span className="font-tittle">Notification Channel Setup </span>
        <CustomButton
          className="channel-edit-back text-bold text-dark"
          onClick={onClickBack}
        >
          <TiArrowBackOutline style={{ margin: "auto 5px" }} />
          Back
        </CustomButton>
      </div>
      <div className="p-4 bg-clr">
        <div className="col d-flex mb-3">
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">Notication ID</label>
            </div>
            <div className="col-8 p-2 ">
              <input
                className="border-0 edit-sum-input form-control"
                type="select"
                value={channelValue.notificationMasterDTO.notificationId}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">Channel</label>
            </div>
            <div className="col-8 p-2 ">
              <input
                className="border-0 edit-sum-input form-control"
                value={channelValue.channelCode}
                type="option"
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="col d-flex mb-3">
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">Description</label>
            </div>
            <div className="col-8 p-2 ">
              <input
                className="border-0 edit-sum-input form-control"
                value={channelValue.notificationMasterDTO.description}
                type="option"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">Active Flag</label>
            </div>
            <div className="col-8 p-2">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="NO"
                checked={channelValue.enabled}
                disabled
                onChange={(e) => handleEnabled(e)}
              />
            </div>
          </div>
        </div>
        <div className="col d-flex">
          <div className="col-12 d-flex">
            <div className="col-2 p-2">
              <label className="edit-sum-label">Content</label>
            </div>
            <div className="col-10 p-2 ">
              <input
                className="border-0 form-control channel-text-area btn--sizer"
                value={extractContent(channelValue.content)}
                type="option"
                readOnly={true}
              />
            </div>
          </div>
        </div>
        {channelValue.notificationChannelIl8nDTO &&
          channelValue.notificationChannelIl8nDTO.map(
            (e: any, index: number) => {
              return (
                <>
                  <div className="col d-flex">
                    <div className="col-12 d-flex">
                      <div className="col-2 p-2">
                        <label className="edit-sum-label">Language code</label>
                      </div>
                      <div className="col-2 p-2 ">
                        <input
                          className="border-0 edit-sum-input form-control "
                          value={
                            channelValue.notificationChannelIl8nDTO[index]
                              .languageCode
                          }
                          type="option"
                          readOnly={true}
                        />
                      </div>
                      <div className="col-4 p-2 ">
                        <input
                          className="border-0 edit-sum-input form-control "
                          value={
                            channelValue.notificationChannelIl8nDTO[index]
                              .languageName
                          }
                          type="option"
                          readOnly={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <div className="col-12 d-flex">
                      <div className="col-2 p-2">
                        <label className="edit-sum-label">Content</label>
                      </div>
                      <div className="col-10 p-2 ">
                        <input
                          className="border-0 form-control channel-text-area btn--sizer"
                          value={extractContent(
                            channelValue.notificationChannelIl8nDTO[index]
                              .content
                          )}
                          readOnly={true}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          )}
      </div>
    </>
  );
}

export default NotificationChannelView;
