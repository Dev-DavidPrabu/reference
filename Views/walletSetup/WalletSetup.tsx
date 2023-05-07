import React, { useState, useEffect, useCallback } from "react";
import { Table } from "reactstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  getAllWalletData,
  postNewWalletData,
  deleteWalletData,
  updateWalletData,
} from "../../redux/action/walletSetupAction";
import { walletTypeObjects } from "../../models/WalletSetupModel";
import WalletSettings from "../../Components/WalletSettings/WalletSettings";
import DeleteConfirmation from "../../Components/DeleteConfirmation/DeleteConfirmation";
import "./WalletSetup.scss";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { Pagination } from "antd";

let pageSize = 5;

const WalletSetup = () => {
  let walletSetupData = {
    countryCode: "",
    entityId: "",
    id: "",
    statusCode: "",
    walletTypeCode: "",
    isDefault: false,
    name: "",
  };

  const dispatch = useDispatch();
  const [isFullScreenView, setIsFullScreenView] = useState(false);
  const [toggleElement, setToggleElement] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [walletSetupDataToModal, setWalletSetupDataToModal] =
    useState(walletSetupData);
  const [searchWalletType, setsearchWalletType] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(5);
  const handleChangeForPagination = (value: number) => {
    setCurrentPage(value);
    setMinIndex((value - 1) * pageSize);
    setMaxIndex(value * pageSize);
  };

  const walletData = useSelector(
    (state: RootStateOrAny) => state.walletSetUpReducer.getAllWalletDataResponse
  );

  const fetchAllWallet = useCallback(async () => {
    try {
      dispatch(getAllWalletData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllWallet();
  }, [fetchAllWallet]);

  const createNewWallet = useCallback(
    async (body) => {
      try {
        dispatch(postNewWalletData(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const DeleteWallet = useCallback(
    async (walletTypeId) => {
      try {
        dispatch(deleteWalletData(walletTypeId));
      } catch (err) {}
    },
    [dispatch]
  );
  const UpdateWallet = useCallback(
    async (data: walletTypeObjects) => {
      try {
        dispatch(updateWalletData(data));
      } catch (err) {}
    },
    [dispatch]
  );
  const AlretClickEvent = (id: string) => {
    DeleteWallet(id).then((e) => {
      fetchAllWallet();
    });
  };

  const finalSubmitHandler = (
    method: string,
    data: walletTypeObjects,
    id: string
  ) => {
    if (method === "addMethod") {
      createNewWallet(data).then((e) => {
        setIsFullScreenView(!isFullScreenView);
        fetchAllWallet();
      });
    } else if (method === "deleteMethod") {
      setIsFullScreenView(!isFullScreenView);
      setDeleteConfirmation(!deleteConfirmation);
      setDeleteId(id);
    } else {
      UpdateWallet(data).then((e) => {
        setIsFullScreenView(!isFullScreenView);
        fetchAllWallet();
      });
    }
  };

  const cancelMethodHandler = () => {
    setWalletSetupDataToModal(walletSetupData);
    setIsFullScreenView(!isFullScreenView);
  };

  const deletePopUpHandler = (method: string) => {
    if (method === "yes") {
      setDeleteConfirmation(!deleteConfirmation);
      AlretClickEvent(deleteId);
      setDeleteId("");
    } else {
      setDeleteConfirmation(!deleteConfirmation);
    }
  };

  const onClickSubmitHandler = (method: string, e: walletTypeObjects) => {
    if (method === "viewMethod") {
      setIsFullScreenView(!isFullScreenView);
      setToggleElement(method);
      setWalletSetupDataToModal(e);
      setPreviewTitle("Wallet Info");
    } else if (method === "editMethod") {
      setIsFullScreenView(!isFullScreenView);
      setToggleElement(method);
      setWalletSetupDataToModal(e);
      setPreviewTitle("Edit Your Wallet");
    } else if (method === "deleteMethod") {
      setIsFullScreenView(!isFullScreenView);
      setToggleElement(method);
      setWalletSetupDataToModal(e);
      setPreviewTitle("Delete Wallet");
    } else {
      setIsFullScreenView(!isFullScreenView);
      setToggleElement(method);
      setWalletSetupDataToModal(e);
      setPreviewTitle("Add new Wallet Info");
    }
  };
  let Data = walletData;

  if (searchWalletType) {
    Data = Data.forEach((e: walletTypeObjects) => {
      if (
        e.walletTypeCode.toUpperCase().includes(searchWalletType.toUpperCase())
      ) {
        return e;
      }
    });
  }
  let emptyObjectForAddMethod = {
    countryCode: "",
    entityId: "",
    id: "",
    statusCode: "",
    walletTypeCode: "",
    isDefault: false,
    name: "",
  };
  return (
    <div>
      {!isFullScreenView && (
        <>
          <h1 style={{ marginTop: "3rem" }}>Wallet Details</h1>
          <div className="Header-content">
            <CustomInput
              className="search"
              type="text"
              placeholder="Search"
              onChange={(ev) => setsearchWalletType(ev.currentTarget.value)}
            ></CustomInput>
            <CustomButton
              className="btn-width-add"
              color="primary"
              onClick={() =>
                onClickSubmitHandler("addMethod", emptyObjectForAddMethod)
              }
            >
              {"Add Wallet"}
            </CustomButton>
          </div>
          <div className="table-div">
            {Data.length > 0 ? (
              <Table hover striped>
                <thead>
                  <tr>
                    <th>Wallet Type</th>
                    <th>Description</th>
                    <th>Default Wallet</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Data &&
                    Data.map((e: walletTypeObjects, index: number) => {
                      return (
                        index >= minIndex &&
                        index < maxIndex && (
                          <tr>
                            <td>{e.walletTypeCode}</td>
                            <td>{e.name}</td>
                            <td>{e.isDefault ? "TRUE" : "FALSE"}</td>
                            <td>
                              <CustomButton
                                className="btn-width"
                                color="primary"
                                onClick={() =>
                                  onClickSubmitHandler("editMethod", e)
                                }
                              >
                                {"Edit"}
                              </CustomButton>
                            </td>
                            <td>
                              <CustomButton
                                className="btn-width"
                                color="danger"
                                onClick={() =>
                                  onClickSubmitHandler("deleteMethod", e)
                                }
                              >
                                {"Delete"}
                              </CustomButton>
                            </td>
                            <td>
                              <CustomButton
                                className="btn-width"
                                color="success"
                                onClick={() =>
                                  onClickSubmitHandler("viewMethod", e)
                                }
                              >
                                {"View"}
                              </CustomButton>
                            </td>
                          </tr>
                        )
                      );
                    })}
                </tbody>
              </Table>
            ) : (
              <div
                style={{
                  height: "3rem",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <h1>
                  No Wallets are Found.<br></br>Please{" "}
                  <label
                    onClick={() =>
                      onClickSubmitHandler("addMethod", emptyObjectForAddMethod)
                    }
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Add
                  </label>{" "}
                  New One
                </h1>
              </div>
            )}
          </div>
          <Pagination
            style={{ textAlign: "center" }}
            current={currentPage}
            pageSize={pageSize}
            onChange={handleChangeForPagination}
            total={Data?.length}
          />
        </>
      )}
      {""}
      {isFullScreenView && (
        <WalletSettings
          isFullScreenView={isFullScreenView}
          toggleElement={toggleElement}
          previewTitle={previewTitle}
          cancelMethod={cancelMethodHandler}
          walletSetupDataToModal={walletSetupDataToModal}
          finalSubmitHandler={finalSubmitHandler}
          overAllData={walletData}
        ></WalletSettings>
      )}
      <DeleteConfirmation
        deleteConfirmation={deleteConfirmation}
        deletePopUpHandler={deletePopUpHandler}
      ></DeleteConfirmation>
    </div>
  );
};

export default WalletSetup;
