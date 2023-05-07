import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  deleteWalletListType,
  getAllWalletData,
  getAllWalletType,
} from "../../redux/action/walletSetupAction";
import { PreLoginCarouselWallet } from "../../models/PreLoginCarouselModel";
import "./PreLoginCarouselSetup.scss";
import { walletTypeObjects } from "../../models/WalletSetupModel";
import PreLoginCarousel from "../../Components/PreLoginCarousel/PreLoginCarousel";
import DeleteConfirmation from "../../Components/DeleteConfirmation/DeleteConfirmation";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";

const PreLoginCarouselSetup = () => {
  const [maxSeqNo, setMaxSeqNo] = useState(0);
  let PreLoginCarouselSetupData = {
    UID: "",
    Sequence: "",
    Image: "",
    Title: "",
    Body: "",
    Action: "",
  };

  let PreLoginCarouselWalletData = {
    id: "",
    sequence: "",
    walletTypeCode: "",
    walletTypeDescription: "",
    category: "",
    contentCode: "",
    fileName: "",
    description: "",
    statusCode: "",
    title: "",
  };

  const dispatch = useDispatch();
  const [showPreLoginScreen, setShowPreLoginScreen] = useState(false);
  const [isButtonEvents, setIsButtonEvents] = useState("");
  const [walletType, setWalletType] = useState("");
  const [showWalletDescription, setWalletDescription] = useState("");
  const [modalTittle, setModalTittle] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [listType, setListType] = useState([]);
  const [preLoginTableData, setPreLoginTableData] = useState(Object);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [typeList, setTypeList] = useState([{}]);
  const [limitMessage, setLimitMessage] = useState("");
  const typeListArray: any[] = [];
  const cancelMethodHandler = () => {
    setShowPreLoginScreen(!showPreLoginScreen);
  };

  const walletData = useSelector(
    (state: RootStateOrAny) => state.walletSetUpReducer.getAllWalletDataResponse
  );

  let walletTypeData = useSelector(
    (state: RootStateOrAny) => state.walletSetUpReducer.getAllWalletDataType
  );

  useEffect(() => {
    if (walletTypeData) {
      walletTypeData =
        walletTypeData &&
        walletTypeData.sort((a: any, b: any) =>
          a.sequence < b.sequence ? -1 : 1
        );
      setListType(walletTypeData);
    }
  }, [walletTypeData]);
  const fetchAllWallet = useCallback(async () => {
    try {
      dispatch(getAllWalletData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllWallet();
  }, []);
  useEffect(() => {
    fetchWalletTypeList(walletType);
  }, []);

  const fetchWalletTypeList = useCallback(
    async (type) => {
      try {
        dispatch(getAllWalletType(type));
      } catch (err) {}
    },
    [dispatch]
  );

  const handleClear = () => {
    setListType([]);
    setWalletType("");
    setWalletDescription("");
    setLimitMessage("");
  };

  const DeleteWalletType = useCallback(
    async (walletTypeId) => {
      try {
        dispatch(deleteWalletListType(walletTypeId));
      } catch (err) {}
    },
    [dispatch]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchWalletTypeList(e.target.value);
    setWalletType(e.target.value);
  };

  const AlretClickEvent = (id: string) => {
    DeleteWalletType(id).then((e) => {
      fetchWalletTypeList(walletType);
    });
  };

  const showDescription = (
    data: walletTypeObjects | any,
    e: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    var name = data?.map((item: walletTypeObjects) => {
      if (item.walletTypeCode === e.target.value) {
        return item.name;
      }
    });
    var brandname = data?.map((item: walletTypeObjects) => {
      if (item.walletTypeCode === e.target.value) {
        return item.walletTypeCode;
      }
    });

    var arrayLength = name.length;
    for (var i = 0; i < arrayLength; i++) {
      if (name[i] !== undefined) {
        setWalletDescription(name[i]);
      }
    }
  };

  const deletePopUpHandler = (method: string) => {};

  const finalSubmitHandler = (method: string) => {
    if (method === "deleteMethod") {
      AlretClickEvent(deleteId);
      setShowPreLoginScreen(!showPreLoginScreen);
    } else {
      fetchWalletTypeList(walletType);
      setShowPreLoginScreen(!showPreLoginScreen);
    }
  };

  const modalPopUpHandler = (method: string, data: PreLoginCarouselWallet) => {
    if (method === "addMethod") {
      var maxSequence = [];
      for (let key in walletTypeData) {
        if (walletTypeData.hasOwnProperty(key)) {
          maxSequence.push(walletTypeData[key].sequence.toString());
        }
      }
      if (maxSequence.length > 0) {
        if (Math.max.apply(null, maxSequence) >= 5) {
          setLimitMessage("*Maximun allowed 5");
          return;
        } else {
          setMaxSeqNo(Math.max.apply(null, maxSequence));
        }
      } else {
        setMaxSeqNo(0);
      }
      setShowPreLoginScreen(true);
      setIsButtonEvents("addMethod");
      setModalTittle("Add Carousel");
      setPreLoginTableData(data);
    } else if (method === "viewMethod") {
      setShowPreLoginScreen(true);
      setIsButtonEvents("viewMethod");
      setModalTittle("Carousel Info");
      setPreLoginTableData(data);
    } else if (method === "editMethod") {
      setShowPreLoginScreen(true);
      setIsButtonEvents("editMethod");
      setModalTittle("Edit Carousel");
      setPreLoginTableData(data);
    } else if (method === "deleteMethod") {
      setShowPreLoginScreen(true);
      setIsButtonEvents("deleteMethod");
      setModalTittle("Delete Carousel");
      setPreLoginTableData(data);
    }
  };

  const deleteWalletType = (e: PreLoginCarouselWallet) => {
    setShowPreLoginScreen(true);
    setIsButtonEvents("deleteMethod");
    setModalTittle("Delete Carousel");
    setDeleteId(e.id);
    setPreLoginTableData(e);
  };

  const data = [
    {
      UID: "123e4567-e89b",
      Sequence: "1",
      Image: "test_image.png",
      Title: "Test wallet Type",
      Body: "description",
      Action: "testing",
    },
  ];

  walletTypeData =
    walletTypeData &&
    walletTypeData?.filter((e: any) => {
      return e.statusCode === "A";
    });

  return (
    <Container>
      {!showPreLoginScreen && (
        <>
          <h1 style={{ marginTop: "3rem" }}>Pre Login Carousel Setup</h1>
          <div>
            <Card>
              <CardBody className="card-margin">
                <Form>
                  <FormGroup row className="Form-group">
                    <Label for="exampleEmail" className="label-font" sm={3}>
                      Entity
                    </Label>
                    <Col sm={9}>
                      <CustomInput
                        type="text"
                        className="input-size"
                        name="Entity"
                        id="Entity"
                        placeholder="Entity"
                        readOnly={true}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="Form-group">
                    <Label for="exampleSelect" className="label-font" sm={3}>
                      Wallet Type
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        value={walletType}
                        onChange={handleChange}
                        onClick={(e) => showDescription(walletData, e)}
                      >
                        {walletType ? (
                          <option>{walletType}</option>
                        ) : (
                          <option key="-1" value="">
                            Select wallet Type
                          </option>
                        )}
                        {walletData &&
                          walletData?.map((items: walletTypeObjects) => {
                            return (
                              <option key={items.id}>
                                {items.walletTypeCode}
                              </option>
                            );
                          })}
                      </Input>
                    </Col>
                    <Col sm={1} className="align-items-center d-flex">
                      {walletType ? (
                        <Button
                          color="danger"
                          onClick={() => handleClear()}
                          outline
                        >
                          clear
                        </Button>
                      ) : (
                        <div></div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row className="Form-group">
                    <Label
                      for="WalletDescription"
                      className="label-font"
                      sm={3}
                      data-testid="description"
                    >
                      Wallet Description
                    </Label>
                    <Col sm={9}>
                      <CustomInput
                        type="textarea"
                        name="text"
                        id="Wallet Description"
                        value={showWalletDescription}
                      />
                    </Col>
                  </FormGroup>
                </Form>
                <br />
                {limitMessage && (
                  <h6 style={{ color: "red" }}>{limitMessage}</h6>
                )}
                <CustomButton
                  color="primary"
                  className="button-align"
                  onClick={() => {
                    modalPopUpHandler("addMethod", PreLoginCarouselWalletData);
                  }}
                >
                  Add
                </CustomButton>
                {""}
              </CardBody>
            </Card>
          </div>

          <div></div>
          <div>
            <Table hover striped>
              <thead className="thead-font">
                <tr>
                  <th>UID</th>
                  <th>Sequence</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {listType &&
                  listType.map((e: PreLoginCarouselWallet) => {
                    return (
                      <tr>
                        <td style={{ color: "blue", cursor: "pointer" }}>
                          {e.id}
                        </td>
                        <td>{e.sequence}</td>
                        <td>{e.title}</td>
                        <td>
                          <div>{e.description}</div>
                        </td>
                        <td>
                          <CustomButton
                            color="danger"
                            className="delete-btn"
                            onClick={() => deleteWalletType(e)}
                          >
                            Delete
                          </CustomButton>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </>
      )}
      {""}
      {showPreLoginScreen && (
        <PreLoginCarousel
          showPreLoginScreen={showPreLoginScreen}
          finalSubmitHandler={finalSubmitHandler}
          cancelMethod={cancelMethodHandler}
          isButtonEvents={isButtonEvents}
          modalTittle={modalTittle}
          preLoginTableData={preLoginTableData}
          showWalletDescription={showWalletDescription}
          walletTypeCode={walletType}
          maxSeqNo={maxSeqNo}
        />
      )}
      <DeleteConfirmation
        deleteConfirmation={deleteConfirmation}
        deletePopUpHandler={deletePopUpHandler}
      ></DeleteConfirmation>
    </Container>
  );
};

export default PreLoginCarouselSetup;
