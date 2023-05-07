import React, { useState, useEffect, useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import EmployeeonBoard from "../../Components/Maintenance/EmployeeonBoard";
import NoDataCard from "../../Components/NoDataCard/NoDataCard";
import PayrollCenterButton from "../../Components/PayrollCenterButton/PayrollCenterButton";
import PayrollCommonHeader from "../../Components/PayrollHeader/PayrollCommonHeader";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import "./EmployeeOnboarding.scss";

const EmployeeOnboarding = () => {
  const [maintain, setMaintain] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(5);
  let userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch = useDispatch();
  const [companyId, setCompanyId] = useState("");
  let pageSize = 5;

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      if (userData.mtaFlag !== "N") {
        setMaintain(true);
      } else {
        setMaintain(false);
      }
    }
  }, []);

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const onSelectedCompnayClickEvent = (e: any) => {
    setMaintain(!maintain);
    setCompanyId(e);
  };
  const handleChangeForPagination = (value: number) => {
    setCurrentPage(value);
    setMinIndex((value - 1) * pageSize);
    setMaxIndex(value * pageSize);
  };

  const backClickEvent = () => {
    setMaintain(!maintain);
  };

  return (
    <>
      {!maintain ? (
        <EmployeeonBoard
          companyId={companyId}
          backClickEvent={backClickEvent}
        />
      ) : (
        <>
          <div data-testid="header" style={{ height: "35%" }}>
            <PayrollCommonHeader>Customer Pre Onboarding</PayrollCommonHeader>
          </div>
          <div className="account-center-btn">
            <PayrollCenterButton showPlusIcon={false}></PayrollCenterButton>
          </div>
          <Table hover striped className="text-center">
            <thead>
              <tr>
                <th data-testid="Registration">Company Registration Number</th>
                <th data-testid="Company Name">Company Name</th>
                <th data-testid="Person Name">Contact Person Name</th>
                <th data-testid="Person Mobile">Contact Person Mobile No</th>
                <th data-testid="Person Emailid">
                  Contact Person Email Address
                </th>
                <th data-testid="Account UID">Prefund Account UID</th>
                <th data-testid="Status">Status</th>
              </tr>
            </thead>
            <tbody>
              {companyGetData.length > 0 ? (
                companyGetData.map((e: any, index: number) => {
                  return (
                    index >= minIndex &&
                    index < maxIndex && (
                      <tr key={index}>
                        <td>{e.companyRegistrationNo}</td>
                        <td>{e.companyName}</td>
                        <td>{e.authorizerName}</td>
                        <td>{e.authorizerMobileNo}</td>
                        <td>{e.companyEmail}</td>
                        <td>{e.id}</td>
                        <td>
                          <td
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              color: "blue",
                            }}
                            onClick={() => onSelectedCompnayClickEvent(e)}
                          >
                            <label>Active</label>
                          </td>
                        </td>
                        <hr></hr>
                      </tr>
                    )
                  );
                })
              ) : (
                <div>
                  <NoDataCard isEnquiryScreen={true}>
                    No Company Found
                  </NoDataCard>
                </div>
              )}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default EmployeeOnboarding;
