import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  ReferenceDataModel,
  SelectOptionCategory,
} from "../../models/ReferenceDataModel";
import { useHistory } from "react-router";
import CustomButton from "../../Components/UI/CustomButton";
import Select from "react-select";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { getIdDocRecords } from "../../redux/action/CardUpgradeAction";
import {
  createIddocMappingData,
  resetCreateMessage,
} from "../../redux/action/IdDocMappingAction";
import { getAllWalletData } from "../../redux/action/walletSetupAction";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function AddIdDocMapping() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [idDocMappingError, setidDocMappingError] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [createIdDocMapping, setIdDocMapping] = useState({
    idTypeCode: "",
    walletTypeCode: "",
    walletLevelOne: "",
    walletLevelTwo: "",
    walletLevelThree: "",
  });
  const brandData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.walletSetUpReducer.getAllWalletDataResponse
  );
  const idTypeData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer.getIddcocresponse
  );

  const idDocMappingCreateError: any = useSelector(
    (state: RootStateOrAny) => state.IdDocMappingReducer.getIdDocMappingError
  );

  let brandOptions: any = brandData?.data?.map((option: any) => {
    return { label: option.walletTypeCode, value: option.walletTypeCode };
  });

  let idTypeOptions: any = idTypeData?.data?.map((option: any) => {
    return { label: option.idtypeCodeDescription, value: option.idtypeCode };
  });

  let walletLevelOptions = [
    { label: "ORIGINAL", value: "ORIGINAL" },
    { label: "PHOTOCOPY", value: "PHOTOCOPY" },
    { label: "NOT ALLOWED", value: "NOT ALLOWED" },
  ];

  const fetchIdTypedata = useCallback(() => {
    try {
      dispatch(getIdDocRecords());
    } catch (err) { }
  }, [dispatch]);

  const fetchBranddata = useCallback(() => {
    try {
      dispatch(getAllWalletData());
    } catch (err) { }
  }, [dispatch]);

  useEffect(() => {
    fetchIdTypedata();
    fetchBranddata();
  }, [fetchBranddata, fetchIdTypedata]);

  useEffect(() => {
    if (idDocMappingCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3500);
    }
  }, [idDocMappingCreateError]);

  const handleValidate = () => {
    if (
      createIdDocMapping.idTypeCode.length &&
      createIdDocMapping.walletTypeCode.length &&
      createIdDocMapping.walletLevelOne.length &&
      createIdDocMapping.walletLevelTwo.length &&
      createIdDocMapping.walletLevelThree.length
    ) {
      setidDocMappingError(false);
      return true;
    } else {
      setidDocMappingError(true);
      return false;
    }
  };
  const idType_OnChange_handler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdDocMapping({ ...createIdDocMapping, idTypeCode: selectOptions.value });
  };
  const Brand_OnChange_handler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdDocMapping({
      ...createIdDocMapping,
      walletTypeCode: selectOptions.value,
    });
  };

  const L1_Wallet_onChange_handler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdDocMapping({
      ...createIdDocMapping,
      walletLevelOne: selectOptions.value,
    });
  };

  const L2_Wallet_onChange_handler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdDocMapping({
      ...createIdDocMapping,
      walletLevelTwo: selectOptions.value,
    });
  };

  const L3_Wallet_onChange_handler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdDocMapping({
      ...createIdDocMapping,
      walletLevelThree: selectOptions.value,
    });
  };

  const idTypeSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      dispatch(createIddocMappingData(createIdDocMapping));
    }
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  const handle_Cancel = () => {
    history.goBack();
  };

  return (
    <div className="AddIdDocMapping p-4">
      <h1 className="fw-bold container-header mb-4">
        Brand - ID Doc Mapping Add
      </h1>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={false}
          message={idDocMappingCreateError?.message}
          closeMessage={closeMessage}
        />
      )}
      <form onSubmit={idTypeSubmit_handler}>
        <div className="setting2">
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Brand<span className="span-col">*</span>
              </label>
              <Select
                options={brandOptions}
                className="idtype-countrySearch"
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  Brand_OnChange_handler(selectOptions)
                }
              />
            </div>
          </>
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                ID Type Name<span className="span-col">*</span>
              </label>
              <Select
                options={idTypeOptions}
                className="idtype-countrySearch"
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  idType_OnChange_handler(selectOptions)
                }
              />
            </div>
          </>

          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                L1 Wallet<span className="span-col">*</span>
              </label>
              <Select
                options={walletLevelOptions}
                className="idtype-countrySearch"
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  L1_Wallet_onChange_handler(selectOptions)
                }
              />
            </div>
          </>

          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                L2 Wallet<span className="span-col">*</span>
              </label>
              <Select
                options={walletLevelOptions}
                className="idtype-countrySearch"
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  L2_Wallet_onChange_handler(selectOptions)
                }
              />
            </div>
          </>
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                L3 Wallet<span className="span-col">*</span>
              </label>
              <Select
                options={walletLevelOptions}
                className="idtype-countrySearch"
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  L3_Wallet_onChange_handler(selectOptions)
                }
              />
            </div>
          </>
          {idDocMappingError && (
            <div
              style={{ color: "red", marginTop: "5px", marginLeft: "180px" }}
            >
              *Please Select Required Fields
            </div>
          )}
          <div className="idtype-submitButton">
            {/* <CustomButton
              color="danger Reference-DefaultButton"
              className="btn2"
            >
              Save
            </CustomButton>
            <CustomButton
              color="secondary referenceData-cancelButton"
              className="btn2"
              component={"payrollEnquiry"}
              onClick={handle_Cancel}
            >
              Cancel
            </CustomButton> */}
            <button
              className="container-save border-0 text-white"
            >
              Submit
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
      </form>
    </div>
  );
}

export default AddIdDocMapping;
