import CustomInput from "../../Components/UI/CustomInput";
import "./AddTransactionLimit.scss";
import { useCallback, useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getLimitTransactionList,
  updateTransDetails,
} from "../../redux/action/RemitTransactionLimitAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { FaRegEdit } from "react-icons/fa";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function RemittanceAddLimit(props: any) {
  const [inputValues, setInputValues]: any = useState([
    {
      limitCode: "",
      limitPerTransaction: "",
      limitPerDay: "",
      limitForThirtyDays: "",
      noOfTransactionsPerDay: "",
      noOfTransactionsForThirtyDays: "",
      id: "",
      statusCode: "",
    },
  ]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [cardStatus, setCardStatus] = useState(true);
  const [fixError, setFixError] = useState(false);
  const [finalValue, setFinalValue] = useState({
    limitCode: "",
    limitPerTransaction: "",
    limitPerDay: "",
    limitForThirtyDays: "",
    noOfTransactionsPerDay: "",
    noOfTransactionsForThirtyDays: "",
    id: "",
    statusCode: "",
  });

  const transferLimitDatas = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionLimitReducer?.getTransferLimitResponse
  );
  const updateTransferLimitDatas = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionLimitReducer?.updateTransferLimitResponse
  );
  let limitDatas = transferLimitDatas?.data;
  const fetchTransferLimitResponse = useCallback(async () => {
    try {
      dispatch(getLimitTransactionList());
    } catch (err) {}
  }, [dispatch]);

  const fetchUpdateTransferLimitResponse = useCallback(
    async (body: any) => {
      try {
        dispatch(updateTransDetails(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (updateTransferLimitDatas) {
      if (updateTransferLimitDatas?.data) {
        setIsLoading(false);
        setApiMessage("TranScation Limit Updated Successfully");
        setButtonVisible(false);
        setDisabled(true);
        setIsDisabled(false);
        setCardStatus(true);
      } else if (updateTransferLimitDatas?.error) {
        setIsLoading(false);
        setFixError(updateTransferLimitDatas?.message);
      }
    }
  }, [updateTransferLimitDatas]);

  useEffect(() => {
    fetchTransferLimitResponse();
  }, []);
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);

  useEffect(() => {
    if (limitDatas) {
      setIsLoading(false);
    }
  }, [limitDatas]);
  useEffect(() => {
    if (!limitDatas) {
      setIsLoading(true);
    }
  }, [limitDatas]);
  useEffect(() => {
    if (limitDatas) {
      setInputValues(limitDatas);
    }
  }, [limitDatas]);
  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...inputValues];
    list[index][name] = value;
    setFinalValue(list[index]);
    setInputValues(list);
  };
  const handleEdit = () => {
    setButtonVisible(true);
    setDisabled(false);
    setIsDisabled(true);
  };

  const onCancel = () => {
    setButtonVisible(false);
    setDisabled(true);
    setIsDisabled(false);
  };

  const submitHandler = () => {
    var body = JSON.stringify({
      id: finalValue.id,
      limitCode: finalValue.limitCode,
      limitForThirtyDays: finalValue.limitForThirtyDays,
      limitPerDay: finalValue.limitPerDay,
      limitPerTransaction: finalValue.limitPerTransaction,
      noOfTransactionsForThirtyDays: finalValue.noOfTransactionsForThirtyDays,
      noOfTransactionsPerDay: finalValue.noOfTransactionsPerDay,
      statusCode: finalValue.statusCode,
    });

    fetchUpdateTransferLimitResponse(body);
    setIsLoading(true);
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  return (
    <div className="RemittanceFeesAndCharges">
      <p className="primary_heading mt-5 p-4">
        {isDisabled === true
          ? "Edit Transaction Limit Code"
          : "Transaction Limit Code"}{" "}
      </p>
      <CustomLoader isLoading={isLoading} size={50} />
      {apiMessage && (
        <div className="col pb-5 add-limit-form">
          <CustomResponseMessage
            apiStatus={cardStatus}
            closeMessage={() => closeMessage()}
            message={apiMessage}
            errorFix={fixError}
          />
        </div>
      )}
      {isLoading ? null : (
        <div className="add-limit-form mt-4">
          <div className="btnEdit">
            <Button className="btnPosition" onClick={handleEdit}>
              <FaRegEdit />
            </Button>
          </div>
          <div className="px-2 py-4 remitTransLimitFieldArea add-limit-wrapper">
            {inputValues?.map((element: any, index: number) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mt-4"
                  key={index}
                >
                  <div className="col remit_dynamic_rows p-4 d-flex">
                    <div className="col-2">
                      <label
                        className={`transLimitLabel ${
                          index === 0 ? "" : "d-none"
                        }`}
                      >
                        Remittance Limit Code
                      </label>
                      <div className=" me-2">
                        <Input
                          type="text"
                          className="no-border transLimitInputBox"
                          name="limitCode"
                          value={inputValues?.[index]?.limitCode}
                          onChange={(e) => handleInputChange(e, index)}
                          readOnly={isDisabled}
                        ></Input>
                      </div>
                    </div>
                    <div className="col-2 me-2">
                      <div className="">
                        <label
                          className={`transLimitLabel ${
                            index === 0 ? "" : "d-none"
                          }`}
                        >
                          Limit per transaction
                        </label>
                      </div>
                      <div className=" me-1">
                        <CustomInput
                          name="limitPerTransaction"
                          type="text"
                          className="no-border transLimitInputBox"
                          value={inputValues?.[index]?.limitPerTransaction}
                          readOnly={disabled}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col-2 ">
                      <div className="">
                        <label
                          className={`transLimitLabel ${
                            index === 0 ? "" : "d-none"
                          }`}
                        >
                          Limit per day
                        </label>
                      </div>
                      <div className=" me-2">
                        <CustomInput
                          type="text"
                          className="no-border transLimitInputBox"
                          name="limitPerDay"
                          readOnly={disabled}
                          value={inputValues?.[index]?.limitPerDay}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col-2 me-2">
                      <div className="">
                        <label
                          className={`transLimitLabel ${
                            index === 0 ? "" : "d-none"
                          }`}
                        >
                          Limit for 30 days
                        </label>
                      </div>
                      <div className=" me-2">
                        <CustomInput
                          type="text"
                          className="no-border transLimitInputBox"
                          name="limitForThirtyDays"
                          readOnly={disabled}
                          value={inputValues?.[index]?.limitForThirtyDays}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col-2 me-2">
                      <div className="">
                        <label
                          className={`transLimitLabel ${
                            index === 0 ? "" : "d-none"
                          }`}
                        >
                          No. of txn per day
                        </label>
                      </div>
                      <div className=" me-2">
                        <CustomInput
                          type="text"
                          className="no-border transLimitInputBox"
                          name="noOfTransactionsPerDay"
                          readOnly={disabled}
                          value={inputValues?.[index]?.noOfTransactionsPerDay}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col-2 me-2">
                      <div className="">
                        <label
                          className={`transLimitLabel ${
                            index === 0 ? "" : "d-none"
                          }`}
                        >
                          No. of txn for 30 days
                        </label>
                      </div>
                      <div className=" me-2">
                        <CustomInput
                          type="text"
                          className="no-border transLimitInputBox"
                          name="noOfTransactionsForThirtyDays"
                          readOnly={disabled}
                          value={
                            inputValues?.[index]?.noOfTransactionsForThirtyDays
                          }
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {buttonVisible && (
              <div className="col-6 pt-4">
                <SubmitCancelButton
                  button={"Save"}
                  secondButton={"Cancel"}
                  onSubmit={submitHandler}
                  onCancel={onCancel}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RemittanceAddLimit;
