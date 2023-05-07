import React, { useState, useEffect, useCallback } from "react";
import "./ReferenceData.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getAllMetaData } from "../../redux/action/metadataAction";

import {
  DataArray,
  ReferenceDataModel,
  SelectOptionCategory,
} from "../../models/ReferenceDataModel";
import CustomButton from "../../Components/UI/CustomButton";
import { GoPlus } from "react-icons/go";
import { Link, useHistory } from "react-router-dom";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { resetCreateMessage } from "../../redux/action/ReferenceDataAction";
import { Select } from "antd";

function Reference() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [category_code, setcategory_code] = useState("");
  const [SelectCategoryError, setSelectCategoryError] = useState(false);

  const MetaData = useSelector(
    (state: RootStateOrAny) => state.metadataReducer.getAllMetaDataResponse
  );

  const createReferenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.referenceReducer.createReferenceData?.data
  );

  const fetchAllMetadata = useCallback(() => {
    try {
      dispatch(getAllMetaData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllMetadata();
  }, [fetchAllMetadata]);

  useEffect(() => {
    if (createReferenceData?.data) {
      setApiMessage(true);
      setTimeout(function () {
        dispatch(resetCreateMessage());
      }, 1500);
    }
  }, [createReferenceData]);

  let category = MetaData.data?.map((e: DataArray) => ({
    value: e.categoryCode,
    label: e.categoryCode,
  }));
  category = category?.sort((a: any, b: any) => a.value.localeCompare(b.value));

  const categoryOnChangehandler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setcategory_code(selectOptions);
  };

  const changeCreateCategory = (e: React.MouseEvent<HTMLInputElement>) => {
    if (category_code.length) {
      setSelectCategoryError(false);
    } else {
      e.preventDefault();
      setSelectCategoryError(true);
    }
  };

  const categorySubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category_code.length) {
      setSelectCategoryError(false);
      history.push({
        pathname: "/dashboard/reference-data/reference-data-view",
        state: {
          MetaData: MetaData?.data,
          category: category_code,
        },
      });
    } else {
      setSelectCategoryError(true);
    }
  };
  const closeMessage = () => {
    setApiMessage(false);
  };

  return (
    <>
      <div className="Reference">
        <div className="reference_container p-3">
          <h1 className="reference-heading">Reference Data Setup</h1>
          <div className="createCode-btn">
            <Link
              to={{
                pathname: "/dashboard/reference-data/create-new-code",
                state: { value: category_code, MetaData: MetaData.data },
              }}
            >
              <CustomButton
                testid="createCode"
                component={"payrollEnquiry"}
                color="danger Reference-DefaultButton"
                className="btn2 me-0"
                onClick={changeCreateCategory}
              >
                <GoPlus /> Create New Code
              </CustomButton>
            </Link>
          </div>
          <>
            <form onSubmit={categorySubmitHandler}>
              <div className="reference-view">
                <div className="options-view">
                  <p style={{ marginTop: "6px" }}>Category</p>
                </div>
                <div className="options-view">
                  <Select
                    className="prefund-Account-input form-control border-0 cursor selectAdd set-switch"
                    data-testid="inputCategory"
                    showSearch
                    filterOption={(input: any, value: any) =>
                      value?.label
                        ?.toLowerCase()
                        ?.indexOf(input?.toLowerCase()) >= 0
                    }
                    onChange={(selectOptions) =>
                      categoryOnChangehandler(selectOptions!)
                    }
                    options={category}
                  />
                  {SelectCategoryError ? (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      *Please Select Category
                    </div>
                  ) : null}
                </div>
                <div className="options-view mt-1">
                  <CustomButton
                    testid="viewCategory"
                    color="danger Reference-DefaultButton"
                    className="btn2"
                  >
                    View
                  </CustomButton>
                </div>
              </div>
            </form>
          </>
          {apiMessage && (
            <div className="mt-3">
              <CustomResponseMessage
                apiStatus={true}
                closeMessage={closeMessage}
                message={"Code Created Successfully"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reference;
