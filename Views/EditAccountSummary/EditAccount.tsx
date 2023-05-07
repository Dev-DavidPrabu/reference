import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Input, Label } from "reactstrap";
import CustomLoader from "../../Components/Loader/CustomLoader";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import {
  resetUpdateAccountSummary,
  updateAccountSummary,
} from "../../redux/action/AccountSummaryAction";
const EditAccount = (props: any) => {
  const [editAccount, setEditAccount] = useState({
    accountMasterId: "",
    accountName: "",
    accountNumber: "",
    accountOpeningDate: "",
    accountStatus: "",
    balance: 0,
    currencyCode: "",
    id: "",
    productCode: "",
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const history = useHistory();
  const [error, setError] = useState({
    AccountNameError: "",
    productCodeError: "",
  });
  const onCancel = () => {
    history.push({
      pathname: "/dashboard/Account-Summary",
    });
  };
  const accountSummaryUpdateData = useSelector(
    (state: RootStateOrAny) =>
      state.AccountSummaryReducer?.updateAccountSummaryResponse
  );
  const updateAccountSummarydata = useCallback(
    async (data: any) => {
      try {
        dispatch(updateAccountSummary(data));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetUpdateAccountSummaryData = useCallback(async () => {
    try {
      dispatch(resetUpdateAccountSummary());
    } catch (err) {}
  }, [dispatch]);
  const Validation = () => {
    let accountNameError = customValidator(
      "startDate",
      "Account Name",
      editAccount.accountName
    );
    let WalletType = customValidator(
      "paymentMode",
      "Product Code",
      editAccount.productCode
    );

    if (!(accountNameError === "null" && WalletType === "null")) {
      setError({
        AccountNameError: accountNameError,
        productCodeError: WalletType,
      });
      return false;
    }
    setError({
      AccountNameError: "",
      productCodeError: "",
    });
    return true;
  };
  const updateHandler = () => {
    setIsLoading(true);
    if (Validation()) {
      let value = {
        accountId: editAccount?.id,
        accountName: editAccount?.accountName,
        accountStatus: "ACTIVE",
      };
      updateAccountSummarydata(value);
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  useEffect(() => {
    if (props.location.state !== undefined) {
      setEditAccount(props.location.state);
    }
  }, [props.location.state]);
  useEffect(() => {
    if (accountSummaryUpdateData?.data) {
      setIsLoading(false);
      resetUpdateAccountSummaryData();
      history.push({
        pathname: "/dashboard/Account-Summary",
        state: "update",
      });
    } else if (accountSummaryUpdateData?.error) {
      setApiMessage(accountSummaryUpdateData?.message);
      setIsLoading(false);
      resetUpdateAccountSummaryData();
    }
  }, [accountSummaryUpdateData]);

  const handleChange = (e: any) => {
    setEditAccount({ ...editAccount, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold block-card-title">Edit Account</h1>
          <button className="block-card-back border-0" onClick={onCancel}>
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <CustomLoader isLoading={isLoading} size={50} />
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <div className="block-card-account-body p-3">
            <div>
              {apiMessage && (
                <CustomResponseMessage
                  apiStatus={false}
                  closeMessage={() => closeMessage()}
                  message={apiMessage}
                  errorFix={true}
                />
              )}
            </div>
            <div className="col-6">
              <label className="block-card-account-label p-1">
                Account Number
              </label>
              <div className="col-12 pt-1">
                <Input
                  className="border-1 block-card-account-inputMobile form-control"
                  type="text"
                  readOnly={true}
                  value={editAccount?.accountNumber}
                />
              </div>
            </div>

            <div className="d-flex gap-4 mt-3">
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Name
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileLarge form-control"
                  type="text"
                  name="accountName"
                  value={editAccount?.accountName}
                  onChange={handleChange}
                />
                {error.AccountNameError &&
                  error.AccountNameError !== "null" && (
                    <Label className="text-red">{error.AccountNameError}</Label>
                  )}
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Master UID
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileLarge form-control"
                  type="text"
                  readOnly={true}
                  value={editAccount?.accountMasterId}
                />
              </div>
            </div>
            <div className="d-flex gap-4 mt-3">
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  A/C Currency Code
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-control"
                  type="text"
                  readOnly={true}
                  value={editAccount?.currencyCode}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Product Code
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-select"
                  type="select"
                  name="productCode"
                  value={editAccount?.productCode}
                  disabled={true}
                  onChange={handleChange}
                >
                  <option></option>
                  <option>CUSTOMER</option>
                  <option>MERCHANT</option>
                  <option>PPA</option>
                  <option>ROUTING</option>
                  <option>INCOME</option>
                  <option>SUSPENSE</option>
                  <option>EXPENCE</option>
                </Input>
                {error.productCodeError &&
                  error.productCodeError !== "null" && (
                    <Label className="text-red">{error.productCodeError}</Label>
                  )}
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Balance
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium form-control"
                  type="text"
                  readOnly={true}
                  value={editAccount?.balance}
                />
              </div>
            </div>
            <div className="d-flex gap-4 mt-3">
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Opening
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-control"
                  type="text"
                  readOnly={true}
                  value={editAccount?.accountOpeningDate}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Closing
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-control"
                  type="text"
                  readOnly={true}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Last System Txn
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium form-control"
                  type="text"
                  readOnly={true}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Last Customer Txn
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium form-control"
                  type="text"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block-card-account-label p-1">Status</label>
              <div className="d-flex">
                <button
                  className={`${
                    editAccount?.accountStatus === "ACTIVE"
                      ? "AccountgenerateBtn-activeColor"
                      : "AccountgenerateBtn-fadeColor"
                  } p-1 border-0`}
                >
                  Active
                </button>
                <button
                  className={`${
                    editAccount?.accountStatus !== "ACTIVE"
                      ? "AccountgenerateBtn-inactiveColor"
                      : "AccountgenerateBtn-fadeColor"
                  } p-1 border-0`}
                >
                  InActive
                </button>
              </div>
            </div>

            <div className="d-flex gap-3 mt-4 mb-4">
              <SubmitCancelButton
                button={"Save"}
                secondButton={"Cancel"}
                onSubmit={updateHandler}
                onCancel={() => onCancel()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
