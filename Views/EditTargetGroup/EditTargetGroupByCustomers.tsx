import React, { useCallback, useEffect, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomInput from "../../Components/UI/CustomInput";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { Button, Input, Label } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  deleteTargetGroupCustomers,
  getKYCCustomerGroupDetails,
  getTargetGroupByCustomersList,
  resetCustomerGroupDetails,
  resetTargetGroupByCustomersEditMessage,
  updateTargetGroupByCustomers,
} from "../../redux/action/TargetGroupAction";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import "./EditTargetGroup.scss";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";

function EditTargetGroupByCustomers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiTargetGroupMessage, setApiTargetGroupMessage] = useState(false);
  const [duplicateCustomer, setDuplicateCustomer] = useState(false);
  const [targetGrouplengthErr, setTargetGrouplengthErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [customerData, setCustomerData]: any = useState([]);
  let [targetGroupData, setTargetGroupData] = useState({
    id: location?.state?.value?.id,
    groupName: location?.state?.value?.groupName,
    groupCode: location?.state?.value?.groupCode,
    targetGroupByCustomer: true,
    statusCode: location?.state?.value?.statusCode,
    customerList: [],
  });
  const [targetGroupDataErr, setTargetGroupDataErr] = useState({
    groupNameErr: "",
  });

  const Header = [
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.toString().localeCompare(b.customerName?.toString()),
      },
    },
    {
      title: "Id Type",
      dataIndex: "idTypeCodeDescription",
      key: "idTypeCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idTypeCodeDescription
            ?.toString()
            .localeCompare(b.idTypeCodeDescription?.toString()),
      },
    },
    {
      title: "Id Number",
      dataIndex: "idValue",
      key: "idValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idValue?.toString().localeCompare(b.idValue?.toString()),
      },
    },
    {
      title: "Nationality",
      dataIndex: "nationalityCodeDescription",
      key: "nationalityCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCodeDescription
            ?.toString()
            .localeCompare(b.nationalityCodeDescription?.toString()),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.toString().localeCompare(b.mobileNumber?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.statusCode?.toString().localeCompare(b.statusCode?.toString()),
      },
      render: (StatusCode: any) => {
        return (
          <label
            className={` ${
              StatusCode === "ACTIVE"
                ? "status-validated"
                : StatusCode === "INACTIVE" && "status-error"
            }`}
          >
            {StatusCode}
          </label>
        );
      },
    },
  ];

  const TargetGroupHeader = [
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.toString().localeCompare(b.customerName?.toString()),
      },
    },
    {
      title: "Id Type",
      dataIndex: "idTypeCodeDescription",
      key: "idTypeCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idTypeCodeDescription
            ?.toString()
            .localeCompare(b.idTypeCodeDescription?.toString()),
      },
    },
    {
      title: "Id Number",
      dataIndex: "idValue",
      key: "idValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idValue?.toString().localeCompare(b.idValue?.toString()),
      },
    },
    {
      title: "Nationality",
      dataIndex: "nationalityCodeDescription",
      key: "nationalityCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCodeDescription
            ?.toString()
            .localeCompare(b.nationalityCodeDescription?.toString()),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.toString().localeCompare(b.mobileNumber?.toString()),
      },
    },
  ];

  const CustomerEnquiryDetailList: any = useSelector(
    (state: RootStateOrAny) => state.TargetGroupReducer.getGroupCustomerDetails
  );

  const TargetGroupByCustomers: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getTargetGroupByCustomersList
  );

  const targetGroupByCustomersList = TargetGroupByCustomers?.data?.customerList;

  const targetGroupCustomerUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getTargetGroupByCustomersEditError
  );

  const fetchTargetGroupdata = useCallback(async () => {
    try {
      dispatch(
        getTargetGroupByCustomersList(location?.state?.value?.groupCode)
      );
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchTargetGroupdata().then(() => {
      if (!TargetGroupByCustomers?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchTargetGroupdata]);

  useEffect(() => {
    if (TargetGroupByCustomers) {
      if (TargetGroupByCustomers.data) {
        setIsLoading(false);
      }
    }
  }, [TargetGroupByCustomers]);

  useEffect(() => {
    if (targetGroupCustomerUpdate?.error) {
      setApiTargetGroupMessage(true);
      setTimeout(function () {
        setApiTargetGroupMessage(false);
        dispatch(resetTargetGroupByCustomersEditMessage());
      }, 3000);
    } else if (targetGroupCustomerUpdate?.status === 200) {
      setCustomerData([]);
      history.push({
        pathname: "/dashboard/marketing/Target-Group-Setup",
        state: {
          value: "",
        },
      });
    }
  }, [targetGroupCustomerUpdate]);

  useEffect(() => {
    if (CustomerEnquiryDetailList?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCustomerGroupDetails());
      }, 5000);
    } else if (CustomerEnquiryDetailList?.data) {
      if (mobileNo.length >= 3) {
        setCustomerData([...customerData, CustomerEnquiryDetailList?.data]);
        dispatch(resetCustomerGroupDetails());
      }
    }
  }, [CustomerEnquiryDetailList]);

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
  };

  const handleDelete = (recordInfo: any) => {
    const tempArray = customerData.filter((e: any) => e.id != recordInfo?.id);
    setCustomerData(tempArray);
  };

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleCustomersDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteTargetGroupCustomers(recordId));
      } catch (err) {}
    },
    [dispatch]
  );

  const validate = () => {
    let groupName = customValidator(
      "agentGroupMandatoryFields",
      "Group Name",
      targetGroupData?.groupName
    );

    if (!(groupName === "null")) {
      setTargetGroupDataErr({
        groupNameErr: groupName,
      });
      return false;
    } else {
      setTargetGroupDataErr({
        groupNameErr: "",
      });
      return true;
    }
  };

  const handle_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetGroupData({ ...targetGroupData, [e.target.name]: e.target.value });
  };

  const TargetGroup_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    targetGroupData.customerList = customerData;
    if (validate()) {
      dispatch(updateTargetGroupByCustomers(targetGroupData));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (mobileNum.length >= 5) {
      setMobileNumErr(false);
      if (customerData?.length + targetGroupByCustomersList?.length >= 500) {
        setTargetGrouplengthErr(true);
      } else {
        setTargetGrouplengthErr(false);
        if (
          customerData?.some((mobNo: any) => mobNo?.mobileNumber === mobileNo) ||
          targetGroupByCustomersList?.some(
            (mobNo: any) => mobNo?.mobileNumber === mobileNo
          )
        ) {
          setDuplicateCustomer(true);
          setTimeout(function () {
            setDuplicateCustomer(false);
          }, 3000);
        } else {
          dispatch(getKYCCustomerGroupDetails(mobileNo));
          setDuplicateCustomer(false);
        }
      }
    } else {
      setMobileNumErr(true);
    }
  };

  const handleReset = () => {
    setMobileNumErr(false);
    setMobileNum("");
  };

  const closeMessage = () => {
    setApiMessage(false);
  };
  const closeTargetGroupMessage = () => {
    setApiTargetGroupMessage(false);
  };
  const closeDuplicateCustomer = () => {
    setDuplicateCustomer(false);
  };
  const closetargetGrouplengthErr = () => {
    setTargetGrouplengthErr(false);
  };
  const handle_Cancel = () => {
    history.goBack();
  };

  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  return (
    <div className="EditTargetGroupByCustomers">
      <form onSubmit={TargetGroup_onSubmit}>
        <div className="p-4">
          <div className="d-flex">
            <h1 className="text-bold edit-summary-title">
              Edit Target Group By Customers
            </h1>
            <div
              className={"d-flex commonEdit-BackButton"}
              onClick={handle_Cancel}
            >
              <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
            </div>
          </div>

          {apiTargetGroupMessage && (
            <div className="px-3">
              <CustomResponseMessage
                apiStatus={false}
                closeMessage={closeTargetGroupMessage}
                message={targetGroupCustomerUpdate?.error}
              />
            </div>
          )}

          <div
            className="target-group-body"
            style={{ maxHeight: "fit-content" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 p-4">
              <div className="col d-flex">
                <div className="col-3 me-3 ">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Group Name<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-3">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges"
                      name="groupName"
                      value={targetGroupData?.groupName}
                      onChange={handle_onChange}
                    />
                    {targetGroupDataErr?.groupNameErr &&
                      targetGroupDataErr?.groupNameErr !== "null" && (
                        <Label className="text-red">
                          {targetGroupDataErr?.groupNameErr}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-3 me-3">
                  <div className="col">
                    <label className="KYCViewCustomer-label ms-2">
                      Status<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col-9 ms-2 me-3">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges btn--sizer"
                      name="statusCode"
                      onChange={handle_onChange}
                    >
                      <option selected hidden className="cursor">
                        {location?.state?.value?.statusCode}
                      </option>
                      <option>ACTIVE</option>
                      <option>INACTIVE</option>
                    </Input>
                  </div>
                </div>
                {location?.state?.value?.statusCode === "ACTIVE" && (
                  <div className="col-7 d-flex">
                    <div className="col-3 me-4 ">
                      <div className="col" id="code">
                        <CustomTooltip target="code">
                          Country Code
                        </CustomTooltip>
                        <label className="editTarget-label">
                          C.Code<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col-8 me-1">
                        <Input
                          name="countryCode"
                          type="select"
                          className="Kyc-FilterINputBox form-input btn--sizer"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                        >
                          <option>+60</option>
                          <option>+65</option>
                          <option>+91</option>
                        </Input>
                      </div>
                    </div>
                    <div className="col-10 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Mobile Number<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-5 me-2">
                          <Input
                            name="mobileNo"
                            type="text"
                            value={mobileNum}
                            className={
                              mobileNumErr
                                ? "validation-error kyc-noBorder"
                                : "Kyc-FilterINputBox form-input"
                            }
                            onChange={handleChangeMobileNo}
                            maxLength={15}
                            minLength={5}
                          ></Input>
                        </div>
                        <div className="col  me-2">
                         
                           <button
                className="container-save shadow-none border-0 me-2 text-white"
                onClick={handleSubmit}
              >
                Add
              </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {apiMessage && (
              <div className="px-3">
                <CustomResponseMessage
                  apiStatus={false}
                  closeMessage={closeMessage}
                  message={CustomerEnquiryDetailList?.message}
                />
              </div>
            )}
            {duplicateCustomer && (
              <div>
                <CustomResponseMessage
                  apiStatus={false}
                  closeMessage={closeDuplicateCustomer}
                  message={"Customer Already Added."}
                />
              </div>
            )}
            {targetGrouplengthErr && (
              <div>
                <CustomResponseMessage
                  apiStatus={false}
                  closeMessage={closetargetGrouplengthErr}
                  message={"Target Group can have only 500 customers."}
                />
              </div>
            )}
          </div>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className=" mb-5">
              <CustomTable
                deleteUser={handleCustomersDelete}
                TableData={TargetGroupHeader}
                CustomTableHeader={targetGroupByCustomersList}
                DisablePagination={false}
                Delete={true}
                Edit={false}
                DisableMange={
                  targetGroupByCustomersList?.length <= 2 ? true : false
                }
                toPrint={false}
              />
            </div>
          )}

          {customerData?.length > 0 && (
            <div className=" mb-2">
              <div className="d-flex">
                <h1 className="text-bold edit-summary-title">
                  Add new Customers
                </h1>
              </div>
              <CustomTable
                TableData={Header}
                CustomTableHeader={customerData}
                Delete={true}
                deleteUser={handleDelete}
                Edit={false}
                DisableMange={false}
                DisablePagination={false}
                toPrint={false}
              />
            </div>
          )}
        </div>

        <div className="p-4">
          <Button color="danger" className="kyc-FilterSubmitButton me-2">
            Submit
          </Button>
        </div>
      </form>
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default EditTargetGroupByCustomers;
