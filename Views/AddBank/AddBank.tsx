import React, { useCallback, useEffect, useState } from "react";
import "./AddBank.scss";
import { default as SelectAndSearch } from "react-select";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  ReferenceDataModel,
  SelectOptionCategory,
} from "../../models/ReferenceDataModel";
import {
  getBankReferenceData,
  getVendorReferenceData,
  createAddBank,
} from "../../redux/action/BankMenuActions";
import { useHistory, useLocation } from "react-router";
import CustomButton from "../../Components/UI/CustomButton";
import { reduceEachLeadingCommentRange } from "typescript";
import { Select } from "antd";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function AddBank() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const addedBanks = location?.state?.addedBanks;
  let listOfBanks: ReferenceDataModel | any = useSelector(
    (state: RootStateOrAny) => state.BankMenuReducer.getAllBankResponse
  );
  listOfBanks = listOfBanks.data?.filter(
    ({ description: id1 }: any) =>
      !addedBanks?.some(({ bankName: id2 }: any) => id1 === id2)
  );

  let bankOptions: any = listOfBanks?.map((option: any) => {
    return { label: option.description, value: option.code };
  });
  let listOfVendor: ReferenceDataModel | any = useSelector(
    (state: RootStateOrAny) => state.BankMenuReducer.getAllVendorResponse.data
  );

  if (location?.state.value.vendorAdd) {
    listOfVendor = listOfVendor?.filter(
      ({ description: id1 }: any) =>
        !location?.state?.addedVendors?.some(
          ({ vendorName: id2 }: any) => id1 === id2
        )
    );
  }

  let vendorOptions: any = listOfVendor?.map((option: any) => {
    return {
      label: option.description,
      value: option.description,
      vendorList: {
        vendorName: option.description,
        vendorCode: option.code,
        vendorStatus: "Active",
      },
    };
  });

  const fetchBankList = useCallback(() => {
    try {
      dispatch(getBankReferenceData("bank"));
    } catch (err) {}
  }, [dispatch, "bank"]);

  const fetchVendorList = useCallback(() => {
    try {
      dispatch(getVendorReferenceData("bankvendor"));
    } catch (err) {}
  }, [dispatch, "bankvendor"]);

  useEffect(() => {
    fetchBankList();
    fetchVendorList();
  }, [fetchBankList, fetchVendorList]);

  const [bankAdd, setBankAdd] = useState({
    bankCode: location?.state?.value.vendorAdd
      ? location?.state?.value.bankCode
      : "",
    bankName: location?.state?.value.vendorAdd
      ? location?.state?.value.bankName
      : "",
    vendorList: [],
  });

  const [vendorView, setVendorView] = useState(
    location?.state?.value.vendorView
  );
  let isValid = true;
  const [bankError, setBankError] = useState(false);

  const bankOnChangehandler = (selectOptions: SelectOptionCategory | any) => {
    setBankAdd({
      ...bankAdd,
      bankCode: selectOptions.value,
      bankName: selectOptions.label,
    });
  };
  let selectedVendors: any = [];
  const VendorOnChangehandler = (selectOptions: SelectOptionCategory | any) => {
    selectedVendors = selectOptions.map((vd: any) => {
      return vd.vendorList;
    });

    setBankAdd({ ...bankAdd, vendorList: selectedVendors });
  };

  const vendor_onClickHandler = () => {
    setVendorView(!vendorView);
  };

  function handle_ValidateBank() {
    if (bankAdd.bankCode.length < 1 || bankAdd.bankName.length < 1) {
      isValid = false;
      setBankError(true);
    } else {
      setBankError(false);
    }
    return isValid;
  }

  const handle_bankOnsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handle_ValidateBank()) {
      dispatch(createAddBank(bankAdd));
      history.goBack();
    }
  };

  const handle_Cancel = () => {
    history.goBack();
  };
  return (
    <div className="Addbank">
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex">
            <h1 className="text-bold edit-summary-title">Add Bank</h1>
          </div>
          <div className="d-flex"></div>
        </div>
        <div className="addBank-body">
          <form onSubmit={handle_bankOnsubmit}>
            <div className="p-3">
              <div className="d-flex">
                <div className="align-items-center col-5 d-flex">
                  <div className="d-flex align-items-center">
                    <label className="edit-sum-label">Bank Name</label>
                  </div>
                  <div className="col-9 p-1 ms-1">
                    {location.state.value.vendorAdd ? (
                      <input
                        className="border-0 edit-sum-input form-control form-select"
                        type="select"
                        value={location?.state.value.bankName}
                        style={{
                          background: "#CFCFCF",
                          width: "100%",
                          borderRadius: "0px",
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <SelectAndSearch
                        options={bankOptions}
                        styles={customSelectStyles}
                        onChange={(selectOptions: any) =>
                          bankOnChangehandler(selectOptions)
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="align-items-center col-5 d-flex">
                  <div className="d-flex align-items-center">
                    <label className="edit-sum-label">Vendors</label>
                  </div>
                  <div className="col-9 p-1 ms-1">
                    <SelectAndSearch
                      isMulti
                      options={vendorOptions}
                      styles={customSelectStyles}
                      onChange={(selectOptions: any) =>
                        VendorOnChangehandler(selectOptions)
                      }
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex pt-2 ">
                    {/* <CustomButton
                      color="danger Reference-DefaultButton customerEdit-btn"
                      className="btn2"
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      color="secondary referenceData-cancelButton customerEdit-btn"
                      className="btn2"
                      component={"payrollEnquiry"}
                      onClick={handle_Cancel}
                    >
                      Cancel
                    </CustomButton> */}
                      <button
                className="container-save border-0 text-white"
              >
                Save
              </button>
              <button
              type="button"
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={handle_Cancel}
              >
                Cancel
              </button>
                  </div>
                </div>
              </div>
              {bankError && (
                <div style={{ marginLeft: "200px", marginTop: "10px" }}>
                  <span className="span-col1">please select Bank *</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBank;
