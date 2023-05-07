import { useEffect, useState, useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getCustomerData } from "../../redux/action/CustomerOnboarding";
import NoDataCard from "../NoDataCard/NoDataCard";
import PayrollCenterButton from "../PayrollCenterButton/PayrollCenterButton";
import PayrollCommonHeader from "../PayrollHeader/PayrollCommonHeader";
import PreOnboarding from "../PreOnboarding/PreOnboarding";
import ModifyPopup from "../Modal/ModalPopUp";
import { toast } from "react-toastify";

function EmployeeonBoard(props: any) {
  const [isShowModal, setIsShowModal] = useState(false);

  const [maintain, setMaintain] = useState(false);
  let userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(5);
  const [userId, setUserId] = useState({});
  const [method, setMethod] = useState("");

  useEffect(() => {
    fetchAllCustomers();
    if (Object.keys(userData).length > 0) {
      if (userData.mtaFlag !== "N") {
        setMaintain(true);
      } else {
        setMaintain(false);
      }
    }
  }, []);

  let getCustomerList = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerOnboardingReducer.getCustomerDataResponse
  );

  const dispatch = useDispatch();

  const fetchAllCustomers = useCallback(async () => {
    try {
      dispatch(getCustomerData(props.companyId.id));
    } catch (err) {}
  }, [dispatch]);

  const cancelClickEven = () => {
    setMaintain(!maintain);
    fetchAllCustomers();
  };

  const addNewPrefundUser = () => {
    setMaintain(!maintain);
    setUserId({});
    setMethod("addMethod");
  };

  const uploadUsers = () => {
    setIsShowModal(true);
  };

  const updateSelectedPrefundUser = (e: any) => {
    setMaintain(!maintain);
    setUserId(e);
    setMethod("updateMethod");
  };

  const uploadHandler = async (url: any, fileinfo: any) => {
    if (fileinfo) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      var file = fileinfo;

      var requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        body: file,
        redirect: "follow",
      };

      await fetch(url, requestOptions)
        .then((response) => response.text())
        .then((res) => {
          setIsShowModal(false);
          toast.success("uploaded successfully");
          return res;
        });
    }
  };
  return (
    <>
      {!maintain ? (
        <PreOnboarding
          method={method}
          cancelClickEven={cancelClickEven}
          companyInfo={props.companyId}
          userInfo={userId}
        />
      ) : (
        <>
          <div style={{ height: "35%" }}>
            <div
              data-testid="heder-3"
              className="back-arrow-btn"
              onClick={props.backClickEvent}
            >
              <BiArrowBack></BiArrowBack>
            </div>
            <div style={{ height: "90%" }}>
              <PayrollCommonHeader>Company User List</PayrollCommonHeader>
            </div>
          </div>
          <div className="account-center-btn">
            <PayrollCenterButton
              showPlusIcon={true}
              showUploadIcon={true}
              onClickUploadEvent={uploadUsers}
              onClickAddEvent={addNewPrefundUser}
            ></PayrollCenterButton>
          </div>
          <Table hover striped className="text-center">
            <thead>
              <tr>
                <th data-testid="DOC Id">DOC ID type</th>
                <th data-testid="DOC Number">DOC ID Number</th>
                <th data-testid="Full Name">Full Name</th>
                <th data-testid="Mobile Number">Mobile No</th>
                <th data-testid="MailId">Email ID</th>
                <th data-testid="Status">Status</th>
              </tr>
            </thead>
            <tbody>
              {getCustomerList.length > 0 ? (
                getCustomerList.map((e: any, index: number) => {
                  return (
                    index >= minIndex &&
                    index < maxIndex && (
                      <tr key={index}>
                        <th scope="row">{e.idTypeCode}</th>
                        <td>{e.idValue}</td>
                        <td>{e.customerName}</td>
                        <td>{e.mobileNumber}</td>
                        <td>{e.emailAddress}</td>
                        <td
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "blue",
                          }}
                          onClick={() => updateSelectedPrefundUser(e)}
                        >
                          {e.statusCode === "A" ? "Active" : "Deleted"}
                        </td>
                      </tr>
                    )
                  );
                })
              ) : (
                <div>
                  <NoDataCard isEnquiryScreen={true}>
                    No Customer Found
                  </NoDataCard>
                </div>
              )}
            </tbody>
          </Table>
          {isShowModal && (
            <ModifyPopup
              isShow={isShowModal}
              handleCancel={() => setIsShowModal(false)}
              uploadHandler={uploadHandler}
            />
          )}
        </>
      )}
    </>
  );
}
export default EmployeeonBoard;
