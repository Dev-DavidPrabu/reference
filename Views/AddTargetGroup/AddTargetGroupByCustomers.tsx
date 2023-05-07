import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AddTargetGroup.scss";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomInput from "../../Components/UI/CustomInput";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { Button, Input, Label } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import {
  createTargetGroupByCustomersData,
  getKYCCustomerGroupDetails,
  resetCustomerGroupDetails,
  resetTargetGroupByCustomersCreateMessage,
} from "../../redux/action/TargetGroupAction";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";

function AddTargetGroupByCustomers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiTargetGroupMessage, setApiTargetGroupMessage] = useState(false);
  const [duplicateCustomer, setDuplicateCustomer] = useState(false);
  const [targetGrouplengthErr, setTargetGrouplengthErr] = useState(false);
  const [grouplengthErr, setGrouplengthErr] = useState(false);
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [customerData, setCustomerData]: any = useState([]);
  let [targetGroupData, setTargetGroupData] = useState({
    groupName: "",
    targetGroupByCustomer: true,
    customerList: [],
  });
  const [targetGroupDataErr, setTargetGroupDataErr] = useState({
    groupNameErr: "",
    customerListErr: "",
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
  ];

  const CustomerEnquiryDetailList: any = useSelector(
    (state: RootStateOrAny) => state.TargetGroupReducer.getGroupCustomerDetails
  );

  const targetGroupCreate: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getTargetGroupByCustomersError
  );

  useEffect(() => {
    if (targetGroupCreate?.error) {
      setApiTargetGroupMessage(true);
      setTimeout(function () {
        setApiTargetGroupMessage(false);
        dispatch(resetTargetGroupByCustomersCreateMessage());
      }, 3000);
    } else if (targetGroupCreate?.status === 200) {
      history.push({
        pathname: "/dashboard/marketing/Target-Group-Setup",
        state: {
          value: "",
        },
      });
    }
  }, [targetGroupCreate]);

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

  let KYCPendingCustomerData = [{}];

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

  const validate = () => {
    let groupName = customValidator(
      "agentGroupMandatoryFields",
      "Group Name",
      targetGroupData?.groupName
    );

    if (!(groupName === "null" && targetGroupData?.customerList?.length != 0)) {
      setTargetGroupDataErr({
        groupNameErr: groupName,
        customerListErr: "Please Add Customers To The Group",
      });
      return false;
    } else {
      setTargetGroupDataErr({
        groupNameErr: "",
        customerListErr: "",
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
      if (targetGroupData?.customerList?.length < 2) {
        setGrouplengthErr(true);
      } else {
        setGrouplengthErr(false);
        dispatch(createTargetGroupByCustomersData(targetGroupData));
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (mobileNum?.length >= 5) {
      setMobileNumErr(false);
      if (customerData?.length >= 500) {
        setTargetGrouplengthErr(true);
      } else {
        setTargetGrouplengthErr(false);
        if (
          customerData?.some((mobNo: any) => mobNo?.mobileNumber === mobileNo)
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
  const closeGrouplengthErr = () => {
    setGrouplengthErr(false);
  };
  const handle_Cancel = () => {
    history.goBack();
  };

  let mobileNo = "+" + countryCode.slice(1) + mobileNum;

  return (
    <div className="AddTargetGroupByCustomers">
      <form onSubmit={TargetGroup_onSubmit}>
        <div className="p-4">
          <div className="d-flex">
            <h1 className="text-bold edit-summary-title">
              Add Target Group By Customers
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
                message={targetGroupCreate?.error}
              />
            </div>
          )}

          <div
            className="target-group-body"
            style={{ maxHeight: "fit-content" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 p-4">
              <div className="col-12 d-flex">
                <div className="col-3 me-3">
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
                <div className="col-7 d-flex">
                  <div className="col-2 me-4">
                    <div className="col" id="targetcode">
                      <CustomTooltip target="targetcode">
                        Country Code
                      </CustomTooltip>
                      <label className="KYCViewCustomer-label">
                        C.Code<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col-9 me-1">
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
                        {targetGroupDataErr?.customerListErr &&
                          targetGroupDataErr?.customerListErr !== "null" && (
                            <Label className="text-red">
                              {targetGroupDataErr?.customerListErr}
                            </Label>
                          )}
                      </div>
                      <div className="col me-2">
                        {/* <Button
                          className="kyc-FilterSubmitButton shadow-none border-0 me-2"
                          onClick={handleSubmit}
                        >
                          Add
                        </Button> */}
                        <button
                className="container-save border-0 text-white shadow-none border-0 me-2"
                   onClick={handleSubmit}
              >
                  Add
              </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {apiMessage && (
              <div>
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
            {grouplengthErr && (
              <div>
                <CustomResponseMessage
                  apiStatus={false}
                  closeMessage={closeGrouplengthErr}
                  message={"Target Group should have more than one customer."}
                />
              </div>
            )}
          </div>

          <div className=" mb-5">
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
        </div>
        <div className="p-4">
          <Button color="danger" className="kyc-FilterSubmitButton me-2">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTargetGroupByCustomers;
