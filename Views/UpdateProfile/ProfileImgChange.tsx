import { useCallback, useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input, Label } from "reactstrap";
import CustomNavigateProfile from "../../Components/CustomNavigateProfile/CustomNavigateProfile";
import { customValidator } from "../../Constants/Validation";
import {
  ChangeProfile,
  detailResponse,
  resetChangeProfile,
} from "../../redux/action/ChangePasswordAction";
import "./ProfileImgChange.scss";
import emptyAvatar from "../../assets/emptyAvatar.png";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";

function ProfileImgChange(props: any) {
  const dispatch = useDispatch();

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let imageSrc = "https://" + userData?.userInfo?.profileLinkurl;
  let history = useHistory();
  const [img, setImg] = useState<string>(
    userData?.userInfo?.profileLinkurl !== undefined ? imageSrc : emptyAvatar
  );
  const [inputvalue, setInputValue] = useState(
    userData?.userInfo?.userName || ""
  );
  const [nameError, setNameError] = useState("");
  const [imgError, setImgError] = useState("");
  const [imgSend, setImgSend] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [profileStatus, setProfileStatus] = useState(true);
  const [fixError, setFixError] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage]);

  const closeMessage = () => {
    setApiMessage("");
  };

  const getChangedProfile = useSelector(
    (state: RootStateOrAny) =>
      state.ChangePasswordReducer?.changeToNewProfileRes
  );

  const newDetailresponse = useSelector(
    (state: RootStateOrAny) => state.ChangePasswordReducer?.detailNewResponse
  );

  const navigateTo = (e: any) => {
    if (e === "changePassword") {
      history.push("/dashboard/update-profile");
    } else if (e === "ProfileImgChange") {
      history.push("/dashboard/Profile-image-change");
    }
  };

  const validate = () => {
    let ProfileNameError = customValidator(
      "customerName",
      "Profile Name",
      inputvalue
    );
    if (ProfileNameError !== "null") {
      setNameError(ProfileNameError);
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const postProfileChanges = useCallback(
    (name: any, body: any) => () => {
      try {
        dispatch(ChangeProfile(name, body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (getChangedProfile) {
      if (getChangedProfile?.data) {
        setIsLoadingData(false);
        setApiMessage(getChangedProfile?.data?.message);
        resetChangeProfileRes();
        getDetailRes();
      }
    }
  }, [getChangedProfile]);

  const resetChangeProfileRes = useCallback(() => {
    try {
      dispatch(resetChangeProfile());
    } catch (err) {}
  }, [dispatch]);

  const getDetailRes = useCallback(() => {
    try {
      dispatch(detailResponse());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (newDetailresponse) {
      let UpdatedProfile: any = {
        userInfo: newDetailresponse.data,
        idToken: userData.idToken,
        refreshToken: userData.refreshToken,
        sessionId: userData.sessionId,

        loginTime: userData.loginTime,
      };
      let userDataInfo = JSON.stringify(UpdatedProfile);
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", userDataInfo);
      history.push("/dashboard/Profile-image-change");
    }
  }, [newDetailresponse]);

  const onImageChange = (e: any) => {
    const [file] = e.target.files;
    let frontBlob = new Blob([file], { type: "image" });
    setImg(URL.createObjectURL(frontBlob));
    setImgSend(e.target.files);
  };
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    setIsLoadingData(true);
    if (validate()) {
      dispatch(postProfileChanges(inputvalue, imgSend));
    }
  };
  return (
    <>
      <div className="ms-5"></div>
      <div className="d-flex ms-5 mt-5">
        <div className="d-flex flex-column container-user-background">
          <h1
            className="secondary_label_txt pt-3"
            data-testid="header-title"
          ></h1>
          <CustomLoader isLoading={isLoadingData} size={50} />
          <h1>Change Profile Image</h1>
          <CustomNavigateProfile
            page={"ProfileImgChange"}
            onClick={navigateTo}
          />
          <br />
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={profileStatus}
              closeMessage={() => closeMessage()}
              message={apiMessage}
              errorFix={fixError}
            />
          )}

          <div className="card card-backgound mt-3">
            <h6>Change Your Profile For Your Account</h6>
            <br />
            <div className="row">
              <div className="col-5">
                <Label className="profile-label">Profile Name</Label>
              </div>
              <div className="col-5">
                <Input
                  type="text"
                  className="profile-box"
                  value={inputvalue}
                  onChange={handleChange}
                ></Input>
                {nameError && <p className="errormsg">{nameError}</p>}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-5">
                <Label className="profile-label">
                  Upload Your Profile Image
                </Label>
              </div>
              <div className="col-5">
                <div className="img-background">
                  <img className="upload-img" src={img} alt="" />
                  <i className="profile-icon">
                    <CgProfile />
                  </i>
                </div>
              </div>
            </div>

            <div className="row ms-4 gap-3 d-flex  justify-content-center align-items-center">
              <div className="bulk-customer-upload-icon text-bold text-white cursor-pointer  mt-3 col-3 upload-button">
                <Label className="d-flex">
                  <BsUpload
                    type="file"
                    style={{ fontSize: "15px", cursor: "pointer" }}
                  ></BsUpload>
                  <Input
                    style={{ display: "none" }}
                    type="file"
                    className="cursor-pointer"
                    onChange={onImageChange}
                  ></Input>
                  <span className="ms-1 cursor-pointer">Upload</span>
                </Label>
              </div>

              <button
                className="uploadSub-btn mt-3 border-0"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileImgChange;
