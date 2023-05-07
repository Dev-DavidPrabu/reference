import React, { useCallback, useEffect, useState } from "react";
import { Label, Col, Input } from "reactstrap";
import { Constants, ApiEndPoints } from "../../../Constants/Constants";
import axios from "axios";
import CustomCurrentPage from "../../../Components/CustomCurrentPageComponent/CustomCurrentPage";
import { Select } from "antd";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { BsUpload } from "react-icons/bs";
import "./OnboardingBulkCustomer.scss";
import CustomButton from "../../../Components/UI/CustomButton";
import { customValidator } from "../../../Constants/Validation";
import { getAllCompanyData } from "../../../redux/action/CompanyMaintenanceAction";
import { result } from "validate.js";
import CustomLoader from "../../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../../Components/UI/ApiResponse/CustomResponseMessage";
import { useHistory } from "react-router";
const { Option } = Select;

const OnboardingBulkCustomer = (props: any) => {
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userInfo?.userType;
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(Object);
  const [bulkCustomers, setBulkCustomers] = useState({
    companyName:
      (userType === "COMPANY_USER" &&
        userData?.userInfo?.companyUserResponse[0]?.companyName) ||
      "Select Company",
    companyId:
      (userType === "COMPANY_USER" &&
        userData?.userInfo?.companyUserResponse[0]?.companyId) ||
      "",
  });

  const [bulkbranch, setBulkBranch] = useState("");

  const [errors, setErrors] = useState<any>({
    companyNameError: "",
    fileError: "",
    branchNameError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);
  const templateFile = require("../../../assets/Bulkupload1.xlsx");

  const [preSignedUrl, setPreSignedUrl] = useState("");
  const [apiMessage, setApiMessage] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("init");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [branchData, setBrancData] = useState([]);

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  useEffect(() => {
    if (props.location.state !== undefined) {
      setState(props.location.state);
    }
  }, [props.location.state]);

  useEffect(() => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAllBranchCode;
    axios.get(apiURL).then((res) => setBrancData(res.data.data));
  }, []);
  const fetchAllCompany = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllCompany();
  }, [fetchAllCompany]);

  const navigateTo = (e: any) => {
    if (e === "customer") {
      props.history.push({
        pathname: "/dashboard/Add-Customer",
        state: state,
      });
    } else if (e === "bulk") {
      props.history.push({
        pathname: "/dashboard/Bulk-Upload-Customer",
        state: state,
      });
    }
  };

  const onBack = () => {
    if (state === false) {
      props.history.push({
        pathname: "/dashboard/PreOnBoarding",
      });
    } else if (state === true) {
      props.history.push({
        pathname: "/dashboard/PreOnBoarding-Customer",
      });
    }
  };

  const handleChangeSearch = (e: any) => {
    let obj = JSON.parse(e);
    setBulkCustomers({
      ...bulkCustomers,
      ["companyName"]: obj.companyName,
      ["companyId"]: obj.id,
    });
    setErrors({
      ...errors,
      companyNameError: "",
    });
  };
  const validate = () => {
    let uploadcompanyNameError = customValidator(
      "companyname",
      "Company Name",
      bulkCustomers?.companyName
    );

    if (uploadcompanyNameError !== "null") {
      setErrors({
        companyNameError: uploadcompanyNameError,
        fileError: "",
      });
      return false;
    } else {
      setErrors({
        companyNameError: "",
        fileError: "",
      });
      return true;
    }
  };

  const uploadHandlerSelf = async (url: string, fileinfo: any) => {
    if (fileinfo) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      var requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        body: fileinfo,
        redirect: "follow",
      };
      fetch(url, requestOptions)
        .then(() => {
          setUploadLoading(false);
          setApiMessage(true);
          setUploadStatus(true);
          setUploadMessage("Uploaded Successfully");
          setPreSignedUrl("");
          setSelectedFile({});
        })
        .catch(() => {
          setUploadLoading(false);
          setApiMessage(true);
          setUploadStatus(false);
          setSelectedFile({});
          setPreSignedUrl("");
          setUploadMessage("Upload Failed");
        });
    }
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const submitHandler = () => {
    setErrors({
      companyNameError: "",
      fileError: "",
    });

    if (validate()) {
      if (preSignedUrl && selectedFile?.name) {
        setErrors({
          companyNameError: "",
          fileError: "",
        });
        setUploadLoading(true);
        uploadHandlerSelf(preSignedUrl, selectedFile);
        setSelectedFile({});
        setPreSignedUrl("");
      } else {
        if (bulkCustomers.companyName === "") {
          setErrors({
            companyNameError: "Company Name can't be empty",
            fileError: "Upload file",
          });
        } else {
          setErrors({
            companyNameError: "",
            fileError: "Upload file",
          });
        }
      }
    }
  };

  const onCancelReset = () => {
    setSelectedFile({});
    setBulkCustomers({
      companyName: "Select Company",
      companyId: "",
    });
    setBulkBranch("");
    setPreSignedUrl("");
    setErrors({
      companyNameError: "",
      fileError: "",
    });
    setApiMessage(false);
  };

  function makeid(length: number) {
    var resultId = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      resultId += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return resultId;
  }

  function fileFormatValidation(filename: string) {
    var type = filename.split(".");
    if (type[type.length - 1] === "xlsx") {
      return true;
    } else {
      return false;
    }
  }
  function hasNumber(myString: string) {
    return /\d/.test(myString);
  }
  const fileSelect = async (e: any) => {
    if (bulkbranch.length !== 0) {
      let fileName = e.target.files[0].name;
      if (selectedFile.name) {
        iconClose();
      }
      if (fileFormatValidation(fileName)) {
        if (hasNumber(fileName)) {
          if (bulkCustomers.companyId) {
            setErrors({
              companyNameError: "",
              fileError: "",
            });
            setIsLoading(true);
            await createPresignedUrlSelf(e.target.files[0]);
            e.target.value = "";
          } else {
            setErrors({
              companyNameError: "Select Company Name to upload file",
              fileError: "",
            });
            e.target.value = "";
          }
        } else {
          setErrors({
            companyNameError: "",
            fileError: "Excel file name must contain alphabets and numeric",
          });
        }
      } else {
        setErrors({
          companyNameError: "",
          fileError: "Excel must in xlsx format",
        });
      }
    } else {
      setErrors({
        ...errors,
        branchNameError: "Branch Name can't be empty",
      });
    }
  };

  const createPresignedUrlSelf = async (e: any) => {
    let branchFilter: any = branchData.filter(
      (item: any) => item.branchCode === bulkbranch
    );

    let apiURL =
      process.env.REACT_APP_LAMBDA +
      `?originalfilename=${e.name}&uploaderid=${
        userData?.userInfo?.id
      }&entitycode=MTAMY&entityid=${
        userData?.userInfo?.entityId
      }&successcount=${1}&failurecount=${0}&objectkey=${
        makeid(8) + e.name
      }&companyid=${bulkCustomers.companyId}&branchcode=${
        branchFilter[0]?.branchName + "%23%23" + branchFilter[0]?.branchCode
      }`;

    console.log(apiURL, "apiURLapiURL");
    console.log(process.env.REACT_APP_LAMBDA, "process.env.REACT_APP_LAMBDA");

    var requestOptions: any = {
      method: "POST",
      redirect: "follow",
      Headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: userData.idToken,
      },
    };
    const urlResponse = await fetch(apiURL, requestOptions)
      .then((response) => response.text())
      .then(result);
    setSelectedFile(e);
    setIsLoading(false);
    setPreSignedUrl(urlResponse);
  };
  const iconClose = () => {
    setSelectedFile({});
  };
  const handleChange = (e: any) => {
    setBulkCustomers({ ...bulkCustomers, [e.target.name]: e.target.value });
  };

  const handleBranch = (e: any) => {
    setBulkBranch(e.target.value);
    setErrors({
      ...errors,
      branchNameError: "",
    });
  };

  return (
    <>
      <CustomCurrentPage
        page={"bulk"}
        addCustomer={true}
        onClick={navigateTo}
        Back={true}
        Custom={true}
        onBack={onBack}
      />
      <div className="p-4">
        {!uploadLoading ? (
          <div className="p-4 d-flex flex-column add-customer-background justify-content-center">
            {apiMessage && (
              <CustomResponseMessage
                apiStatus={uploadStatus}
                closeMessage={closeMessage}
                message={uploadMessage}
              />
            )}
            <div>
              <h1 className="add-customer-title mt-2">Upload the File</h1>
            </div>
            <div className="d-flex justify-content-start align-items-center p-2 bulk-customer-note mt-2">
              <span className="ms-2">
                Note: The excel filename must be Alphanumeric and it should be
                in xlsx format
              </span>
            </div>
            <div className="d-flex align-items-center bulk-customer-sample mt-3">
              <a href={templateFile.default} download={"Bulkupload1.xlsx"}>
                {" "}
                Click here{" "}
              </a>
              <span className="ms-1">
                to get the sample format of the upload file
              </span>
            </div>
            <div className="row mb-3 mt-3">
              <Label className="add-customer-label" for="exampleText" sm={4}>
                Company Name
              </Label>
              <Col sm={5}>
                {userType === "COMPANY_USER" ? (
                  <Input
                    type="select"
                    name="companyName"
                    className="form-select"
                    value={bulkCustomers.companyName}
                    onChange={handleChange}
                  >
                    {userData.userInfo.companyUserResponse?.map(
                      (option: any) => {
                        return <option>{option.companyName}</option>;
                      }
                    )}
                  </Input>
                ) : (
                  <Select
                    onChange={handleChangeSearch}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="prefund-Account-input form-control border-0 cursor"
                    value={bulkCustomers?.companyName}
                    style={{ height: "38px" }}
                    disabled={false}
                  >
                    {companyGetData?.map((option: any, index: any) => {
                      return (
                        <Option key={index} value={JSON.stringify(option)}>
                          {option.companyName}
                        </Option>
                      );
                    })}
                  </Select>
                )}
                {errors.companyNameError &&
                  errors?.companyNameError !== "null" && (
                    <Label className="text-red">
                      {errors.companyNameError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className="row mb-3 mt-3">
              <Label className="add-customer-label" for="exampleText" sm={4}>
                Branch Name
              </Label>
              <Col sm={5}>
                <Input
                  type="select"
                  className="form-select btn--sizer"
                  value={bulkbranch}
                  onChange={handleBranch}
                >
                  <option value="" disabled hidden>
                    Select Branch
                  </option>
                  {branchData?.map((option: any) => {
                    return (
                      <option value={option.branchCode}>
                        {option.branchName}
                      </option>
                    );
                  })}
                </Input>
                {errors.branchNameError &&
                  errors?.branchNameError !== "null" && (
                    <Label className="text-red">{errors.branchNameError}</Label>
                  )}
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="add-customer-label " for="exampleText" sm={4}>
                Upload file
              </Label>
              <Col sm={2}>
                <div className="bulk-customer-upload-icon text-bold text-white">
                  <Label className="bulk-customer-cursor">
                    <BsUpload
                      type="file"
                      style={{ fontSize: "22px" }}
                    ></BsUpload>
                    <Input
                      style={{ display: "none" }}
                      type="file"
                      onChange={fileSelect}
                    ></Input>
                    <span className="ms-1">Upload</span>
                  </Label>
                </div>
              </Col>
              <Col sm={4} className="d-flex align-items-center">
                {selectedFile.name && (
                  <div className="d-flex">
                    <div className="bulk-customer-filename">
                      <p className="bulk-customer-filename-text p-1">
                        {selectedFile.name}
                      </p>
                    </div>
                  </div>
                )}
                {<CustomLoader isLoading={isLoading} size={25} />}
              </Col>
            </div>
            {errors.fileError && errors?.fileError !== "" && (
              <div className="row">
                <div className="col-4"></div>
                <div className="">
                  <Label className="text-red">{errors.fileError}</Label>
                </div>
              </div>
            )}
            <div className="row mt-3">
              <div className="col-4"></div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="bulk-customer-save border-0"
                  onClick={submitHandler}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Submit
                </div>
                {/* <CustomButton
                  className="bulk-customer-cancel ms-3 border-0"
                  onClick={onCancelReset}
                >
                  Cancel
                </CustomButton> */}
                <button
                  type="button"
                  className="container-cancel border-0 ms-3 form-label-font-size"
                  onClick={onCancelReset}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <CustomLoader isLoading={uploadLoading} size={50} />
        )}
      </div>
    </>
  );
};

export default OnboardingBulkCustomer;
