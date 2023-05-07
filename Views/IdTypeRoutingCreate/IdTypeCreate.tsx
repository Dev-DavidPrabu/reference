import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  getCountryReferenceData,
  getIdtypeReferenceData,
  createIdType,
  resetCreateMessage,
} from "../../redux/action/idTypeRoutingActions";
import {
  ReferenceDataModel,
  SelectOptionCategory,
} from "../../models/ReferenceDataModel";
import { useHistory } from "react-router";
import CustomButton from "../../Components/UI/CustomButton";
import "./IdTypeCreate.scss";
import Select from "react-select";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function IdTypeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [idTypeError, setIdTypeError] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [createIdData, setIdData] = useState({
    countryCode: "",
    idType: "",
    routingChannel: "",
    status: "",
  });
  const countryReferenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer.getAllCountryResponse
  );
  const idtypeReferenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer.getAllIdTypeResponse
  );

  const idtypeCreateError: any = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer.getIdtypeCreateError
  );

  let options: any = countryReferenceData?.data?.map((option: any) => {
    return { label: option.description, value: option.code };
  });

  let idTypeOptions: any = idtypeReferenceData?.data?.map((option: any) => {
    return {
      label: option.idtypeCodeDescription,
      value: option.idtypeCodeDescription,
    };
  });

  let routingOptions = [
    { label: "EKYC Verification", value: "EKYC Verification" },
    { label: "Pre-Registration", value: "Pre-Registration" },
  ];
  let statusOptions = [
    { label: "Enable", value: "Enable" },
    { label: "Disable", value: "Disable" },
  ];

  //Action call for GetList of wallet
  const fetchCountryReferencedata = useCallback(() => {
    try {
      dispatch(getCountryReferenceData("country"));
    } catch (err) { }
  }, [dispatch, "country"]);
  const fetchIdtypeReferencedata = useCallback(() => {
    try {
      dispatch(getIdtypeReferenceData());
    } catch (err) { }
  }, [dispatch]);

  //to load a initial data

  useEffect(() => {
    fetchCountryReferencedata();
    fetchIdtypeReferencedata();
  }, [fetchIdtypeReferencedata, fetchCountryReferencedata]);

  useEffect(() => {
    if (idtypeCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3500);
    }
  }, [idtypeCreateError]);

  const handleValidate = () => {
    if (
      createIdData.countryCode.length &&
      createIdData.idType.length &&
      createIdData.routingChannel.length &&
      createIdData.status.length
    ) {
      setIdTypeError(false);
      return true;
    } else {
      setIdTypeError(true);
      return false;
    }
  };
  const categoryOnChangehandler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdData({ ...createIdData, countryCode: selectOptions.value });
  };
  const onChange_handler = (selectOptions: SelectOptionCategory | any) => {
    setIdData({ ...createIdData, idType: selectOptions.value });
  };

  const onChange_handlerRouting = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdData({ ...createIdData, routingChannel: selectOptions.value });
  };

  const onChange_handlerStatus = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setIdData({ ...createIdData, status: selectOptions.value });
  };

  const idTypeSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      dispatch(createIdType(createIdData));
    }
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  const handle_Cancel = () => {
    history.goBack();
  };

  return (
    <div className="idtype-create">
      <h1 className="fw-bold container-header mb-4">ID Type Create</h1>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={false}
          message={idtypeCreateError?.message}
          closeMessage={closeMessage}
        />
      )}
      <form onSubmit={idTypeSubmit_handler}>
        <div className="setting2">
          <>
            <div className="selectSearch mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Country<span className="span-col">*</span>
              </label>
              <Select
                options={options}
                styles={customSelectStyles}
                className="idtype-countrySearch"
                onChange={(selectOptions: any) =>
                  categoryOnChangehandler(selectOptions)
                }
              />
            </div>
          </>
          <>
            <div className="selectSearch mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                ID Type<span className="span-col">*</span>
              </label>
              <Select
                options={idTypeOptions}
                styles={customSelectStyles}
                className="idtype-countrySearch"
                onChange={(selectOptions: any) =>
                  onChange_handler(selectOptions)
                }
              />
            </div>
          </>

          <>
            <div className="selectSearch mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Routing Channel<span className="span-col">*</span>
              </label>
              <Select
                options={routingOptions}
                styles={customSelectStyles}
                className="idtype-countrySearch"
                onChange={(selectOptions: any) =>
                  onChange_handlerRouting(selectOptions)
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
                Status<span className="span-col">*</span>
              </label>
              <Select
                options={statusOptions}
                styles={customSelectStyles}
                className="idtype-countrySearch"
                onChange={(selectOptions: any) =>
                  onChange_handlerStatus(selectOptions)
                }
              />
            </div>
          </>
          {idTypeError && (
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

export default IdTypeCreate;
