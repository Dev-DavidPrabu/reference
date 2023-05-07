import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useHistory } from "react-router";
import { Button, Input, Label } from "reactstrap";
import "./ViewAccount.scss";
const ViewAccount = (props: any) => {
  const [viewAccount, setViewAccount] = useState({
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

  const history = useHistory();
  useEffect(() => {
    if (props.location.state !== undefined) {
      setViewAccount(props.location.state);
    }
  }, [props.location.state]);
  const onCancel = () => {
    history.push({
      pathname: "/dashboard/Account-Summary",
    });
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold block-card-title">View Account</h1>
          <button className="block-card-back border-0" onClick={onCancel}>
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>

      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <div className="block-card-account-body p-3">
            <div className="col-6">
              <label className="block-card-account-label p-1">
                Account Number
              </label>
              <div className="col-12 pt-1">
                <Input
                  className="border-1 block-card-account-inputMobile form-control"
                  type="text"
                  readOnly={true}
                  value={viewAccount?.accountNumber}
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
                  readOnly={true}
                  value={viewAccount?.accountName}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Master UID
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileLarge form-control"
                  type="text"
                  readOnly={true}
                  value={viewAccount?.accountMasterId}
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
                  value={viewAccount?.currencyCode}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Product Code
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium  form-control"
                  type="text"
                  readOnly={true}
                  value={viewAccount?.productCode}
                />
              </div>
              <div className="pt-1">
                <label className="block-card-account-label p-1">
                  Account Balance
                </label>
                <Input
                  className="border-1 block-card-account-inputMobileMedium form-control"
                  type="text"
                  readOnly={true}
                  value={viewAccount?.balance}
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
                  value={viewAccount?.accountOpeningDate}
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
                    viewAccount?.accountStatus === "ACTIVE"
                      ? "AccountgenerateBtn-activeColor"
                      : "AccountgenerateBtn-fadeColor"
                  } p-1 border-0`}
                >
                  Active
                </button>
                <button
                  className={`${
                    viewAccount?.accountStatus !== "ACTIVE"
                      ? "AccountgenerateBtn-inactiveColor"
                      : "AccountgenerateBtn-fadeColor"
                  } p-1 border-0`}
                >
                  InActive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAccount;
