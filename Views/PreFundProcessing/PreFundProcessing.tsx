import {
  useCallback,
  useState,
  useEffect,
  SyntheticEvent,
  useRef,
} from "react";
import { Col, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./PreFundProcessing.scss";
import CustomInput from "../../Components/UI/CustomInput";
import { BsUpload } from "react-icons/bs";
import { customValidator } from "../../Constants/Validation";
import moment from "moment";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  clearCreateTransitionInfo,
  getCurrentBalanceOftheCompany,
  postNewTransaction,
  uploadProofFile,
  getBankName,
} from "../../redux/action/PreFundAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Select } from "antd";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
const { Option } = Select;

const PreFundProcessing = (props: any) => {
  const today = moment();
  const textRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userInfo?.userType;
  let TransactionType = ["TOPUP", "REFUND"];
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [payRollInfo, setPayRollInfo] = useState<any>({
    transactionType: "",
    companyName: "",
    transactionAmount: 0,
    transactionReference: "",
    currentBalance: 0,
    makerComments: "",
    checkerComments: "Amount Validated",
    approvalStage: "L1 Approved",
    approvalStatus: "Approved",
    transactionDate: today.format("YYYY-MM-DD"),
    expectedBalance: 0,
    userId: "",
    id: "",
    companyAccountId: "",
    contentCode: "",
    bankName: "",
    bankCode: "",
    companyId:
      (userType === "COMPANY_USER" &&
        userData?.userInfo?.companyUserResponse[0]?.companyId) ||
      "",
  });

  const [error, setError] = useState("" || props.error);
  const [selectedFile, setSelectedFile] = useState(Object);
  const [contentCode, setContentCode] = useState("");
  const [errors, setErrors] = useState({
    rupeesError: "",
    uploadFileError: "",
  });
  const [apiMessage, setApiMessage] = useState("");
  const [lockedStatus, setLockedStatus] = useState(false);
  const selectedTranscationInfo = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.selectedTranscationInfo
  );
  const currentBalanceInfo = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.currentBalanceResponse
  );

  const bankdetails = useSelector(
    (state: any) => state.PreFundReducer.getbankdetails
  );
  const addNewTranscation = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer?.addNewTranscationResponse
  );
  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  let proofUploadData = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.proofUploadResponse
  );
  const submitData = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.postAddData
  );
  const fetchAllCompanyData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    clearCreateInfo();
    setError("");
  }, []);
  const clearCreateInfo = useCallback(async () => {
    try {
      dispatch(clearCreateTransitionInfo());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllCompanyData();
  }, [fetchAllCompanyData]);
  useEffect(() => {
    if (currentBalanceInfo && currentBalanceInfo?.balance) {
      setIsLoading(false);
    } else if (!currentBalanceInfo?.balance) {
      setIsLoading(false);
    }
  }, [currentBalanceInfo]);

  const handleChangeDate = (event: any) => {
    setDate(event.target.value);
  };
  const getCurrentBalance = useCallback(
    async (data: string) => {
      try {
        dispatch(getCurrentBalanceOftheCompany(data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (props.error && props.error.length > 0) {
      setError(props.error);
    }
  }, [props.error]);
  useEffect(() => {
    getCurrentBalance("");
    dispatch(getBankName());
  }, []);

  useEffect(() => {
    if (addNewTranscation?.data) {
      setApiMessage("Amount Transfered Successfully");
      setLockedStatus(true);
      setIsLoading(false);
      onCancel();
      clearCreateInfo();
      getCurrentBalance(payRollInfo.companyAccountId);
    } else if (addNewTranscation?.error) {
      setApiMessage(addNewTranscation?.error);
      setIsLoading(false);
      setLockedStatus(false);
      clearCreateInfo();
    }
  }, [addNewTranscation]);

  useEffect(() => {
    if (proofUploadData?.data) {
      setPayRollInfo({
        ...payRollInfo,
        contentCode: proofUploadData?.data.contentCode,
      });
    } else if (proofUploadData?.error) {
      setApiMessage(proofUploadData?.error);
      setIsLoading(false);
      setLockedStatus(false);
    }
  }, [proofUploadData]);

  useEffect(() => {
    if (apiMessage === "Amount Transfered Successfully") {
      history.push({
        pathname: "/dashboard/PayrollPrefund",
        state: "Amount Transfered Successfully",
      });
    }
  }, [apiMessage]);

  const validate = () => {
    let centrupeesError = customValidator(
      "rupees",
      "Amount",
      payRollInfo?.transactionAmount?.toString()
    );

    if (!(centrupeesError === "null")) {
      setError("Please complete all required fields.");
      let fileError = "";
      if (selectedFile.name) {
        fileError = "";
      } else {
        fileError = "Upload Proof";
      }
      setErrors({
        rupeesError: centrupeesError,
        uploadFileError: fileError,
      });
      return false;
    } else {
      if (selectedFile.name) {
        setError("");
        setErrors({
          rupeesError: "",
          uploadFileError: "",
        });
        return true;
      } else {
        setErrors({ ...errors, uploadFileError: "Upload File" });
        return false;
      }
    }
  };

  // const checkExpectedBalanceTobeTrue = (number: number) => {
  //   let tobeTrue = true;
  //   if (number >= 0) {
  //     tobeTrue = true;
  //   } else if (number == 0) {
  //     tobeTrue = true;
  //   } else {
  //     tobeTrue = false;
  //   }
  //   return tobeTrue;
  // };



  const PostNewTransaction = useCallback(
    async (transactionData: any) => {
      try {
        dispatch(postNewTransaction(transactionData));
      } catch (err) {}
    },
    [dispatch]
  );

  const uploadFile = useCallback(
    async (transactionData: any) => {
      try {
        dispatch(uploadProofFile(transactionData));
      } catch (err) {}
    },
    [dispatch]
  );

  const postPrefundData = () => {
    setErrors({
      rupeesError: "",
      uploadFileError: "",
    });
    if (payRollInfo.transactionAmount === 0) {
      setErrors({
        ...errors,
        rupeesError: "Amount can't 0",
      });
    } else if (proofUploadData?.data?.contentCode === undefined) {
      setErrors({
        ...errors,
        uploadFileError: "Proof of Deposit is Required",
      });
    } else {
      setIsLoading(true);
      let apidata = {
        companyAccountId:
          userData.userInfo.companyUserResponse.length === 1
            ? userData.userInfo.companyUserResponse[0].companyAccountId
            : payRollInfo.companyAccountId,

        companyId:
          userData.userInfo.companyUserResponse.length === 1
            ? userData.userInfo.companyUserResponse[0].companyId
            : payRollInfo.companyId,

        companyName:
          userData.userInfo.companyUserResponse.length === 1
            ? userData.userInfo.companyUserResponse[0].companyName
            : payRollInfo.companyName,
        transactionAmount: payRollInfo.transactionAmount,
        transactionReference: payRollInfo.transactionReference,
        currentBalance: currentBalanceInfo?.balance,
        expectedBalance:
          currentBalanceInfo?.balance +
          Number(payRollInfo?.transactionAmount?.toString()),
        makerComments: payRollInfo.makerComments,

        proofOfReceipt: proofUploadData.data.contentCode,
        transactionDate: payRollInfo?.transactionDate.toString(),
        bankName: payRollInfo?.bankName,
        bankCode: payRollInfo?.bankCode,
      };

      dispatch(postNewTransaction(apidata));
    }
  };

  const onCancel = () => {
    setPayRollInfo({
      transactionType: "",
      companyName: "",
      transactionAmount: 0,
      transactionReference: "",
      currentBalance: 0,
      makerComments: "",
      checkerComments: "Amount Validated",
      approvalStage: "L1 Approved",
      approvalStatus: "Approved",
      transactionDate: today.format("YYYY-MM-DD"),
      expectedBalance: 0,
      userId: "",
      id: "",
      companyAccountId: "",
      contentCode: "",
      companyId: "",
    });
    setSelectedFile({});
    history.goBack();
  };

  const handleChange = (e: any) => {
    if (e.target.name == "transactionAmount") {
      setPayRollInfo({
        ...payRollInfo,
        [e.target.name]: e.target.value ? parseFloat(e.target.value) : 0,
      });
    } else {
      setPayRollInfo({ ...payRollInfo, [e.target.name]: e.target.value });
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };

  const handleChangeSearch = (e: any) => {
    setIsLoading(true);
    let obj = JSON.parse(e);
    setPayRollInfo({
      ...payRollInfo,
      companyName: obj.companyName,
      companyId: obj.companyId,
      companyAccountId: obj.companyAccountId,
      currentBalance: currentBalanceInfo?.balance,
    });
    getCurrentBalance(obj.companyAccountId);
  };

  // useEffect(()=>{

  // },[])

  const fileSelect = async (e: any) => {
    let selectedFile = e.target.files[0];
    let fileName = selectedFile.name;
    let fileExtension = fileName.split(".").pop();
    let allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      setSelectedFile({});
      setErrors({
        ...errors,
        uploadFileError: "Please upload only jpeg, jpg, png or pdf file",
      });
    } else {
      setSelectedFile(e.target.files[0]);
      setErrors({ ...errors, uploadFileError: "" });
      uploadFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (userData.userInfo.companyUserResponse.length === 1) {
      getCurrentBalance(
        userData.userInfo.companyUserResponse[0].companyAccountId
      );
    }
  }, []);
  const handlebankdChange = (e: any) => {
    let value = JSON.parse(e);

    setPayRollInfo({
      ...payRollInfo,
      bankName: value.description,
      bankCode: value.code,
    });
  };
  let dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 180);
  let pastDate = `${dateNow.getFullYear()}-${("0" + dateNow.getMonth()).slice(
    -2
  )}-${dateNow.getDate()}`;

  const onChangeHandler = function (e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
   
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="p-4">
      <div className="">
        <div className="primary_heading ">Payroll Prefund - Add</div>
        {apiMessage && apiMessage !== "Amount Transfered Successfully" ? (
          <CustomResponseMessage
            apiStatus={lockedStatus}
            closeMessage={closeMessage}
            message={apiMessage}
          />
        ) : null}
        <CustomLoader isLoading={isLoading} size={50} />{" "}
        {Object.keys(userData).length > 0 ? (
          <>
            {userData?.userInfo?.status.toUpperCase() === "ACTIVE" ? (
              <div style={{ backgroundColor: "#f3f3f3" }} className="mt-4">
                <div className="d-flex justify-content-between col-12">
                  <div className="block-card-view-body p-3">
                    <div className="row p-2 d-flex">
                      <div className="col-3">
                        <div className="block-card-view-label mt-2 mb-1">
                          Company Name
                        </div>

                        <Select
                          onChange={handleChangeSearch}
                          showSearch
                          defaultValue={
                            userData.userInfo.companyUserResponse.length === 1
                              ? userData.userInfo.companyUserResponse[0]
                                  .companyName
                              : ""
                          }
                          filterOption={(input: any, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          id="fieldName1"
                          className="prefund-Account-input form-control border-0 cursor"
                          style={{ height: "38px" }}
                          placeholder={"Select Company"}
                        >
                          {userType === "COMPANY_USER"
                            ? userData.userInfo.companyUserResponse?.map(
                                (option: any, index: any) => {
                                  return (
                                    <option
                                      selected
                                      key={index}
                                      value={JSON.stringify(option)}
                                    >
                                      {option.companyName}
                                    </option>
                                  );
                                }
                              )
                            : companyGetData?.map((option: any, index: any) => {
                                return (
                                  <Option
                                    key={index}
                                    value={JSON.stringify(option)}
                                  >
                                    {option.companyName}
                                  </Option>
                                );
                              })}
                        </Select>
                      </div>
                      <div className="col-3">
                        <div className="block-card-view-label mt-2 mb-1">
                          Designated Bank name
                        </div>

                        <Select
                          onChange={handlebankdChange}
                          id="fieldName2"
                          className="prefund-Account-input form-control border-0 cursor"
                          style={{ height: "38px" }}
                          placeholder={"Select Bank"}
                        >
                          {bankdetails.map((res: any, index: number) => (
                            <Option key={index} value={JSON.stringify(res)}>
                              {res.description}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className="container-fluid row p-2">
                      <div className="col-12 p-1">
                        <div className="row ">
                          <div className="col-3">
                            <div className="block-card-view-label">
                              <span className="edit-sum-label-color"> *</span>
                              Amount
                            </div>
                            <div className="d-flex">
                              <Input
                                type="select"
                                name="select"
                                className="btn--sizer select_align"
                                disabled={props?.transactionId ? true : false}
                              >
                                <option key="-1" value="">
                                  MYR
                                </option>
                                <option>SGD</option>
                                <option>IND</option>
                              </Input>
                              <div>
                                <Input
                                  type="number"
                                  className="input-size"
                                  name="transactionAmount"
                                  step="any"
                                  onChange={handleChange}
                                  value={payRollInfo?.transactionAmount?.toString()}
                                  disabled={props?.transactionId ? true : false}
                                />
                                {errors.rupeesError &&
                                  errors?.rupeesError !== "null" && (
                                    <label className="text-red">
                                      {errors.rupeesError}
                                    </label>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="col-3">
                            <div className="block-card-view-label">
                              Bank Transaction Date
                            </div>
                            <input
                              type="date"
                              name="transactionDate"
                              className="date-picker"
                              value={date}
                              min={String(pastDate)}
                              max={moment().format("YYYY-MM-DD")}
                              readOnly={false}
                              onChange={handleChange}
                            ></input>
                          </div>

                          <div className="col-3">
                            <div className="block-card-view-label label_width">
                              Transaction Reference
                            </div>

                            <CustomInput
                              type="text"
                              className="date-picker"
                              name="transactionReference"
                              onChange={handleChange}
                              disabled={props?.transactionId ? true : false}
                              value={payRollInfo?.transactionReference}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid row p-2">
                      <div className="col-12 p-1">
                        <div className="row d-flex align-items-baseline">
                          <div className="col-3">
                            <div className="block-card-view-label">
                              Current Balance
                            </div>

                            <Input
                              type="text"
                              className="date-picker"
                              name="currentBalance"
                              id="currentBalance"
                              value={currentBalanceInfo?.balance}
                              readOnly={true}
                            />
                          </div>
                          <div className="col-3">
                            <div className="block-card-view-label mt-2">
                              Expected Balance
                            </div>

                            <Input
                              type="text"
                              className="date-picker"
                              name="currentBalance"
                              id="currentBalance"
                              value={
                                currentBalanceInfo?.balance +
                                Number(
                                  payRollInfo?.transactionAmount?.toString()
                                )
                              }
                              readOnly={true}
                            />
                          </div>
                          <div className="col-3">
                            <div className="block-card-view-label">
                              Maker Comments
                            </div>

                            <textarea
                              ref={textRef}
                              style={{
                                height: "2.4rem",
                                border: "none",
                                width: "15rem",
                              }}
                              name=""
                              id="makerComments"
                              value={currentBalanceInfo?.makerComments}
                              onChange={(e) =>
                                setPayRollInfo({
                                  ...payRollInfo,
                                  makerComments: e.target.value,
                                })
                              }
                              onKeyUp={onChangeHandler}
                            />
                          </div>
                          <div className="col-3">
                            <div className="block-card-view-label mt-2 width_label">
                              Proof of Deposit
                            </div>
                            <Col sm={3}>
                              <div
                                className="bulk-customer-upload-icon text-bold text-white"
                                style={{ width: "120px" }}
                              >
                                <label>
                                  <BsUpload
                                    type="file"
                                    style={{ fontSize: "28px" }}
                                  ></BsUpload>
                                  <Input
                                    style={{ display: "none" }}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    className=""
                                    onChange={fileSelect}
                                  ></Input>
                                  <span className="ms-1">Upload</span>
                                </label>
                              </div>
                              {errors.uploadFileError &&
                                errors?.uploadFileError !== "null" && (
                                  <Label
                                    className="text-red"
                                    style={{ width: "200px" }}
                                  >
                                    {errors.uploadFileError}
                                  </Label>
                                )}
                            </Col>
                            <Col>
                              {selectedFile !== null && (
                                <Label className="file-upload-label">
                                  {selectedFile.name}
                                </Label>
                              )}
                            </Col>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <FormGroup row className="Form-group mb-4">
                      <Label for="uid" className="ft-14" sm={5}>
                        Expected Balance
                      </Label>
                      <Col className="ml-20">
                        <Input
                          type="text"
                          className="input-size"
                          name="expectedBalance"
                          id="expectedBalance"
                          value={
                            payRollInfo?.transactionType !==
                              "Select Transaction Type" &&
                            payRollInfo?.transactionType === "REFUND"
                              ? currentBalanceInfo?.balance -
                                payRollInfo?.transactionAmount
                              : currentBalanceInfo?.balance +
                                payRollInfo?.transactionAmount
                          }
                          readOnly={true}
                        />
                      </Col>
                    </FormGroup> */}
                </div>
                <div className="col d-flex p-2">
                  <div className="col-6 d-flex">
                    <div className="col-5 p-2"></div>
                    <div className="col-6 p-2 ">
                      <SubmitCancelButton
                        button={"Submit"}
                        secondButton={"Cancel"}
                        onSubmit={postPrefundData}
                        onCancel={onCancel}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <CustomResponseMessage
                status={false}
                message={`Transaction posting is unavailable. ${
                  userType === "COMPANY_USER" &&
                  userData?.userInfo?.companyUserResponse[0]?.companyName
                } is currently inactive.`}
              />
            )}
          </>
        ) : (
          <CustomResponseMessage
            status={false}
            message={"You are unauthorized to perform this action"}
          />
        )}
      </div>
    </div>
  );
};

export default PreFundProcessing;
