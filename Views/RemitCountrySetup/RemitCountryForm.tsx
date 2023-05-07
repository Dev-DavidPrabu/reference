import "./RemitCountryForm.scss";
import { useCallback, useEffect, useState } from "react";
import { Input } from "reactstrap";

import { IoArrowUndoOutline } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import {
  resetUpdatePayoutCountryData,
  updatePayoutCountry,
} from "../../redux/action/RemitPayoutCountryAction";
import { useHistory } from "react-router";
import CustomLoader from "../../Components/Loader/CustomLoader";

const RemitCountryForm = (props: any) => {
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState("");
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [countryValue, setCountryValue] = useState({
    id: props.location?.state?.value?.id,
    countryCode: props.location?.state?.value?.countryCode,
    notes: props.location?.state?.value?.notes,
    paymentMethodCode: props.location?.state?.value?.paymentMethodCode,
    description: props.location?.state?.value?.description,
    maxTransactionValue: props.location?.state?.value?.maxTransactionValue,
    minTransactionValue: props.location?.state?.value?.minTransactionValue,
    statusCode: props.location?.state?.value?.statusCode,
  });

  const onCancel = () => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Payout-Country",
    });
  };

  const handleChange = (e: any) => {
    setCountryValue({
      ...countryValue,
      [e.target.name]: e.target.value,
    });
  };

  const updateRecords = useSelector(
    (state: RootStateOrAny) =>
      state.RemitPayoutCountryReducer?.updatePayoutCountryRecordsResponse
  );

  const resetUpdatedData = useCallback(async () => {
    try {
      dispatch(resetUpdatePayoutCountryData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (updateRecords) {
      if (updateRecords.data) {
        resetUpdatedData();
        setIsLoading(false);
        history.push({
          pathname: "/dashboard/remit-setup/Payout-Country",
          state: {
            countryCode: countryValue.countryCode,
            action: "update",
          },
        });
      } else if (updateRecords.error) {
        resetUpdatedData();
        setIsLoading(false);
        setApiMessage(updateRecords?.message);
      }
    }
  }, [updateRecords]);

  const closeMessage = () => {
    setApiMessage("");
  };
  const submitHandlers = () => {
    setIsLoading(true);
    dispatch(updatePayoutCountry(countryValue));
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold payout-country-title">
            Edit Payout Country
          </h1>
          <button
            className="payout-country-back btn-secondary border-0"
            onClick={onCancel}
          >
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <CustomLoader isLoading={isLoading} size={50} />
      <div className="payout-country-body ">
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={apiMessage}
            errorFix={true}
          />
        )}

        <div className=" p-3">
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">
                Payout Country Setup ID{" "}
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 payout-country-input form-control"
                type="text"
                value={countryValue?.id}
                name="id"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">Payout Country</label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 payout-country-input form-control"
                type="text"
                value={props.location?.state?.country?.country}
                name="id"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">Payout Mode</label>
            </div>

            <div className="col-6 p-1 ">
              <input
                className="border-0 payout-country-input form-control"
                type="text"
                value={countryValue?.description}
                name="id"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">
                Customer Information Prompt
              </label>
            </div>
            <div className="col-6 p-1 ">
              <Input
                className="border-0 payout-country-input form-control"
                type="textarea"
                value={countryValue?.notes}
                name="id"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">
                Min. Allowed Transaction Value
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 payout-country-input form-control"
                type="text"
                value={countryValue?.minTransactionValue}
                name="id"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">
                Max. Allowed Transaction Value
              </label>
            </div>
            <div className="col-6 p-1 ">
              <input
                className="border-0 payout-country-input form-control"
                type="text"
                value={countryValue?.maxTransactionValue}
                name="id"
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5 p-1">
              <label className="payout-country-label">Status Code</label>
            </div>
            <div className="col-6 p-1 ">
              <Input
                className="border-0 payout-country-input form-select"
                type="select"
                value={countryValue.statusCode}
                name="statusCode"
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Status
                </option>
                <option>ACTIVE</option>
                <option>INACTIVE</option>
              </Input>
            </div>
          </div>
          <div className="col d-flex p-1">
            <div className="col-5"></div>
            <SubmitCancelButton
              button={"Update"}
              secondButton={"Cancel"}
              onSubmit={submitHandlers}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RemitCountryForm;
