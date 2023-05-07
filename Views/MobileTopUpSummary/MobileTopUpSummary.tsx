import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { getDashboardData } from "../../redux/action/MobileTopUpAction";
import "./MobileTopUpSummary.scss";

function MobileTopUpSummary(props: any) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const topupCountValues = useSelector(
    (state: RootStateOrAny) => state.MobileTopUpReducer?.getAllDashBoardResponse
  );
  const fetchDashBoardResponse = useCallback(async () => {
    try {
      dispatch(getDashboardData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchDashBoardResponse();
  }, []);

  useEffect(() => {
    if (topupCountValues?.data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [topupCountValues]);

  let cardDashboard = topupCountValues?.data;

  let valueArr = cardDashboard?.map((status: any) => {
    return Number(status.totalCount);
  });
  const value = valueArr?.reduce((first: any, second: any) => {
    return first + second;
  });

  const handleCardSelected = (e: any) => {
    props.history.push({
      pathname: "/dashboard/Mobile-TopUp-Summary",
      state: {
        statusCode: e.status,
        totalCount: e.totalCount,
      },
    });
  };

  return (
    <div className="MobileTopUpSummary p-4">
      <div className=" pb-4">
        <div className="d-flex col justify-content-between title">
          Mobile TopUp Summary DashBoard
        </div>
      </div>

      <CustomLoader isLoading={isLoading} size={50} />

      {isLoading ? null : (
        <div className={`mb-1 mt-2 remit-txn-total-view `}>
          <div className="ms-3 mt-1 d-flex align-items-center">
            <span className="remit-txn-total">
              {`Total Transaction : ${value} `}
            </span>
          </div>
        </div>
      )}
      <div className="row flex-wrap">
        {cardDashboard?.map((data: any) => (
          <div className="col-sm-4">
            <Card
              className="card-top-margin mobileCardRadius"
              onClick={() => handleCardSelected(data)}
            >
              <CardHeader className="headingCard">{data?.status}</CardHeader>
              <CardBody className="card-display">
                <CardText className="span-font text-center contentBody">
                  {data?.totalCount}
                </CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileTopUpSummary;
