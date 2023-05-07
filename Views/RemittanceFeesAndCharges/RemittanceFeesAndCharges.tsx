import React, { useCallback, useEffect, useState } from "react";
import "./RemittanceFeesAndCharges.scss";
import { Select, Switch } from "antd";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomInput from "../../Components/UI/CustomInput";
import CustomButton from "../../Components/UI/CustomButton";
import { SelectOptionCategory } from "../../models/ReferenceDataModel";

import { TiPlus } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import {
  createChargeCode,
  getChargeDetails,
  getChargeList,
  resetCreateChargeCode,
} from "../../redux/action/RemittanceFeesAndChargesAction";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function RemittanceFeesAndCharges() {
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiErrMessage, setApiErrMessage] = useState(false);
  const [error, setError] = useState(false);

  const chargeCodeList: any = useSelector(
    (state: RootStateOrAny) =>
      state.RemittanceFeesAndChargesReducer.getAllChargeCodeListResponse
  );

  const chargeCodeDetails: any = useSelector(
    (state: RootStateOrAny) =>
      state.RemittanceFeesAndChargesReducer.getAllChargeCodeDetails
  );

  const chargeCodeMessage: any = useSelector(
    (state: RootStateOrAny) =>
      state.RemittanceFeesAndChargesReducer.createChargeCodeMessage
  );

  const optionsDevice: any = chargeCodeList?.data?.map((option: any) => {
    return { label: option.description, value: option.chargeCode };
  });

  const dynamicRows = {
    rangeStartValue: "",
    rangeEndValue: "",
    chargeType: "FLT",
    chargeValue: "",
  };

  const [feeDetailsList, setFeeDetailsList]: any = useState([
    {
      rangeStartValue: "",
      rangeEndValue: "",
      chargeType: "FLT",
      chargeValue: "",
    },
  ]);

  const [chargeCodeData, setChargeCodeData]: any = useState({
    id: "",
    chargeCode: "",
    currencyCode: "",
    description: "",
    statusCode: "",
  });

  const [chargeCodeDataErrMessage, setChargeCodeDataErrMessage]: any = useState(
    {
      chargeCodeErrMessage: "",
      descriptionErrMessage: "",
    }
  );

  const [chargeStatus, setChargeStatus] = useState(false);

  useEffect(() => {
    if (chargeCodeMessage) {
      if (chargeCodeMessage?.message) {
        setApiErrMessage(true);
        setApiMessage(false);
        setTimeout(function () {
          setApiErrMessage(false);
          dispatch(resetCreateChargeCode());
        }, 4000);
      } else if (chargeCodeMessage?.data) {
        setApiErrMessage(false);
        setApiMessage(true);
        setTimeout(function () {
          setApiMessage(false);
          dispatch(resetCreateChargeCode());
          window.location.reload();
        }, 3000);
      }
    }
  }, [chargeCodeMessage]);

  useEffect(() => {
    if (chargeCodeDetails?.data?.feeDetailsList?.length > 0) {
      setFeeDetailsList(chargeCodeDetails?.data?.feeDetailsList);
      setChargeCodeData({
        id: chargeCodeDetails?.data?.id,
        chargeCode: chargeCodeDetails?.data?.chargeCode,
        currencyCode: chargeCodeDetails?.data?.currencyCode,
        description: chargeCodeDetails?.data?.description,
        statusCode: chargeCodeDetails?.data?.statusCode,
      });
      setChargeStatus(
        chargeCodeDetails?.data?.statusCode === "ACTIVE" ? true : false
      );
    }
  }, [chargeCodeDetails]);

  const onChange_Chargehandler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    dispatch(getChargeDetails(selectOptions));
  };

  const fetchChargeCodedata = useCallback(async () => {
    try {
      dispatch(getChargeList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchChargeCodedata();
  }, [fetchChargeCodedata]);

  const handle_onChange = (e: any) => {
    setChargeCodeData({ ...chargeCodeData, [e.target.name]: e.target.value });
  };

  const statusCode_onChange = () => {
    setChargeStatus(!chargeStatus);
    setChargeCodeData({
      ...chargeCodeData,
      statusCode: !chargeStatus ? "ACTIVE" : "INACTIVE",
    });
  };

  const addDynamicRows = () => {
    setFeeDetailsList([...feeDetailsList, dynamicRows]);
  };

  const deleteDynamicRows = (index: number) => {
    const rows = [...feeDetailsList];
    rows.splice(index, 1);
    setFeeDetailsList(rows);
  };

  const handle_DynamicRowonChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...feeDetailsList];
    list[index][name] = value;
    setFeeDetailsList(list);
  };

  const validate = () => {
    let chargeCode = customValidator(
      "feesChargesMandatoryFields",
      "Charge Code",
      chargeCodeData?.chargeCode
    );
    let description = customValidator(
      "feesChargesMandatoryFields",
      "Charge Description",
      chargeCodeData?.description
    );

    feeDetailsList?.map((e: any) => {
      if (
        e.rangeStartValue.length === 0 ||
        e.rangeEndValue.length === 0 ||
        e.chargeValue.length === 0
      ) {
        setError(true);
        return false;
      } else {
        setError(false);
      }
    });

    if (!(chargeCode === "null" && description === "null")) {
      setChargeCodeDataErrMessage({
        chargeCodeErrMessage: chargeCode,
        descriptionErrMessage: description,
      });
      return false;
    } else {
      setChargeCodeDataErrMessage({
        chargeCodeErrMessage: "",
        descriptionErrMessage: "",
      });
      return true;
    }
  };

  const handle_chargeCodeOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chargeCodeData.feeDetailsList = feeDetailsList;
    if (validate()) {
      dispatch(createChargeCode(chargeCodeData));
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeErrMessage = () => {
    setApiErrMessage(false);
  };

  return (
    <div className="RemittanceFeesAndCharges">
      <CommonEditSummary
        name={"Remittance Fees And Charges"}
        style={{ maxHeight: "fit-content" }}
        backButton={false}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={true}
            message={"Charge Code Updated Successfully."}
            closeMessage={closeMessage}
          />
        )}
        {apiErrMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={chargeCodeMessage?.message}
            closeMessage={closeErrMessage}
          />
        )}
        <form onSubmit={handle_chargeCodeOnSubmit}>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-12 d-flex">
                <div className="col-4 me-2 width">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Select Charge Code<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-2">
                    <Select
                      options={optionsDevice}
                      className="prefund-Account-input form-control border-0 cursor selectAdd"
                      onChange={(selectOptions: any) =>
                        onChange_Chargehandler(selectOptions)
                      }
                    />
                    {chargeCodeDataErrMessage?.chargeCodeErrMessage &&
                      chargeCodeDataErrMessage?.chargeCodeErrMessage !==
                        "null" && (
                        <Label className="text-red">
                          {chargeCodeDataErrMessage?.chargeCodeErrMessage}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Charge Currency<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges referenceData-readOnly"
                      readOnly={true}
                      name="currencyCode"
                      value={chargeCodeData?.currencyCode}
                    />
                    {chargeCodeDataErrMessage?.currencyCodeErrMessage &&
                      chargeCodeDataErrMessage?.currencyCodeErrMessage !==
                        "null" && (
                        <Label className="text-red">
                          {chargeCodeDataErrMessage?.currencyCodeErrMessage}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Charge Description<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-2 textAreaWidth">
                    <textarea
                      className="no-border remit_feesAndCharges"
                      name="description"
                      value={chargeCodeData?.description}
                      style={{ width: "100%" }}
                      onChange={handle_onChange}
                    />
                    {chargeCodeDataErrMessage?.descriptionErrMessage &&
                      chargeCodeDataErrMessage?.descriptionErrMessage !==
                        "null" && (
                        <Label className="text-red">
                          {chargeCodeDataErrMessage?.descriptionErrMessage}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Active Flag<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-2">
                    <Switch
                      className="toggle-switch"
                      checkedChildren="Yes"
                      unCheckedChildren="NO"
                      checked={chargeStatus}
                      onChange={statusCode_onChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {feeDetailsList?.map((element: any, index: number) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mb-4"
                  key={index}
                >
                  <div className="col-9 remit_dynamic_rows p-4 d-flex">
                    <div className="col me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          From Value<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          name="rangeStartValue"
                          type="number"
                          min={0}
                          value={feeDetailsList?.[index]?.rangeStartValue}
                          className="no-border remit_feesAndCharges"
                          onChange={(e) => handle_DynamicRowonChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          To Value<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          type="number"
                          min={
                            parseInt(feeDetailsList?.[index]?.rangeStartValue) +
                            1
                          }
                          className="no-border remit_feesAndCharges"
                          name="rangeEndValue"
                          value={feeDetailsList?.[index]?.rangeEndValue}
                          onChange={(e) => handle_DynamicRowonChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Type<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          type="select"
                          className="no-border remit_feesAndCharges referenceData-readOnly"
                          style={{
                            height: "35px",
                          }}
                          name="chargeType"
                          value={feeDetailsList?.[index]?.chargeType}
                          onChange={(e) => handle_DynamicRowonChange(e, index)}
                        >
                          <option selected value="FLT">
                            Flat Fee
                          </option>
                        </Input>
                      </div>
                    </div>
                    <div className="col me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Charge Value<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          type="number"
                          min={0}
                          className="no-border remit_feesAndCharges"
                          name="chargeValue"
                          value={feeDetailsList?.[index]?.chargeValue}
                          onChange={(e) => handle_DynamicRowonChange(e, index)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-3 d-flex">
                    <div className="col ms-1 me-2">
                      <div className="col"></div>
                      <div className="col me-2">
                        <TiPlus
                          className="remit_dynamic_addBtn cursor"
                          onClick={addDynamicRows}
                        />
                        {index != 0 && (
                          <AiFillMinusCircle
                            className="remit_dynamic_deleteBtn cursor"
                            onClick={() => deleteDynamicRows(index)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {error && (
              <Label className="text-red mb-3">
                {"*Please input all mandatory fields."}
              </Label>
            )}
            <div className="mt-0">
              <button className="container-save border-0 text-white">
                Submit
              </button>
              <button
                type="button"
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </CommonEditSummary>
    </div>
  );
}

export default RemittanceFeesAndCharges;
