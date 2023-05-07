import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input, Label } from "reactstrap";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import {
  createAccountSummary,
  resetCreateAccountSummary,
} from "../../redux/action/AccountSummaryAction";
import "./AddAccount.scss";
const AddAccount = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [accountDetails, setAccountDetails] = useState({
    accountMasterId: "",
    accountName: "",
    productCode: "",
  });
  const [error, setError] = useState({
    AccountNameError: "",
    MasterIDError: "",
    productCodeError: "",
  });

  const Validation = () => {
    let accountNameError = customValidator(
      "startDate",
      "Account Name",
      accountDetails.accountName
    );
    let masterId = customValidator(
      "endDate",
      "Account Master Id",
      accountDetails.accountMasterId
    );
    let WalletType = customValidator(
      "paymentMode",
      "Product Code",
      accountDetails.productCode
    );

    if (
      !(
        accountNameError === "null" &&
        masterId === "null" &&
        WalletType === "null"
      )
    ) {
      setError({
        AccountNameError: accountNameError,
        MasterIDError: masterId,
        productCodeError: WalletType,
      });
      return false;
    }
    setError({
      AccountNameError: "",
      MasterIDError: "",
      productCodeError: "",
    });
    return true;
  };

  const accountSummaryAddData = useSelector(
    (state: RootStateOrAny) =>
      state.AccountSummaryReducer?.getAddAccountSummaryResponse
  );
  const resetAddAccountSummary = useCallback(async () => {
    try {
      dispatch(resetCreateAccountSummary());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (accountSummaryAddData?.data) {
      setIsLoading(false);
      resetAddAccountSummary();
      history.push({
        pathname: "/dashboard/Account-Summary",
        state: "add",
      });
    } else if (accountSummaryAddData?.error) {
      setApiMessage(accountSummaryAddData?.message);
      setIsLoading(false);
      resetAddAccountSummary();
    }
  }, [accountSummaryAddData]);

  const addAccountSummary = useCallback(
    async (data: any) => {
      try {
        dispatch(createAccountSummary(data));
      } catch (err) {}
    },
    [dispatch]
  );

  const handleSubmit = () => {
    setIsLoading(true);
    if (Validation()) {
      addAccountSummary(accountDetails);
    }
  };
  const onCancel = () => {
    history.push({
      pathname: "/dashboard/Account-Summary",
    });
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  const handleChange = (e: any) => {
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold block-card-title">Add New Account</h1>
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
                  value={accountDetails.accountName}
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
                  name="accountMasterId"
                  value={accountDetails.accountMasterId}
                  onChange={handleChange}
                />
                {error.MasterIDError && error.MasterIDError !== "null" && (
                  <Label className="text-red">{error.MasterIDError}</Label>
                )}
              </div>
            </div>
            <div className="d-flex gap-4 mt-3">
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  A/C Currency Code
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-select"
                  type="select"
                  readOnly={true}
                >
                  <option>MYR</option>
                </Input>
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Product Code
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-select"
                  type="select"
                  name="productCode"
                  value={accountDetails.productCode}
                  onChange={handleChange}
                >
                  <option></option>
                  <option>CUSTOMER</option>
                  <option>MERCHANT</option>
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
                  value="0"
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
                <button className="AccountgenerateBtn-activeColor p-1 border-0">
                  Active
                </button>
                <button className="AccountgenerateBtn-fadeColor p-1 border-0">
                  InActive
                </button>
              </div>
            </div>

            <div className="d-flex gap-3 mt-4 mb-4">
              <button
                className="AccountSubmitCancelButton-save border-0 text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="AccountSubmitCancelButton-cancel border-0 ms-3"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
