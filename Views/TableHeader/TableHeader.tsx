import React from "react";
import { Button } from "reactstrap";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./TableHeader.scss";
function TableHeader() {
  return (
    <div className="body">
      <div className="firstname">
        <div className="box">
          <div className="batch">
            <label>Batch Date</label>
            <input
              style={{
                marginLeft: "10px",
                width: "30%",
                borderRadius: "7px",
                height: "30px",
              }}
              type="text"
            />
          </div>
          <div className="credit">
            <label>Date to Credit</label>
            <input
              style={{
                marginLeft: "7px",
                width: "84%",
                borderRadius: "7px",
                height: "30px",
              }}
              type="text"
            />
          </div>
          <div className="entries">
            <label>No of Entries Accepted / actuals</label>
            <input
              style={{
                marginLeft: "7px",
                width: "100%",
                borderRadius: "7px",
                height: "30px",
              }}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="firstname">
        <div className="box">
          <div className="batch">
            <label>Batch Date</label>
            <input
              style={{
                marginLeft: "10px",
                width: "30%",
                borderRadius: "7px",
                height: "30px",
              }}
              type="text"
            />
          </div>
          <div className="credit">
            <label>Date to Credit</label>
            <input
              style={{
                marginLeft: "7px",
                width: "84%",
                borderRadius: "7px",
                height: "30px",
              }}
              type="text"
            />
          </div>
          <div className="entries">
            <label>No of Entries Accepted / actuals</label>
            <input
              style={{
                marginLeft: "7px",
                width: "100%",
                borderRadius: "7px",
                height: "30px",
              }}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="empty"></div>
      <CustomHeader
        data={[
          { name: "Row in File" },
          { name: "Staff Id" },
          { name: "Mobile No" },
          { name: "Employee Name" },
          { name: "Amount to Credit" },
          { name: "Transaction Status" },
          { name: "Error" },
        ]}
      />
      <div style={{ height: "100px" }}></div>
      <div className="amount">
        <label
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Prefund Account Balance
        </label>
        <div className="balance">
          <input
            style={{
              margin: "auto",
              width: "73%",
              borderRadius: "7px",
              height: "40px",
              backgroundColor: "rgb(226, 222, 222)",
            }}
            type="text"
          />
        </div>
      </div>
      <div className="comments">
        <div>
          <input
            style={{
              marginLeft: "10px",
              width: "96%",
              borderRadius: "7px",
              height: "37px",
              display: "flex",
              alignItems: "center",
              marginTop: "25px",
            }}
            type="text"
            placeholder="Comments"
          />
        </div>
        <div className="button">
          <Button>submit</Button>
          <Button>Cancel</Button>
        </div>
        <div>
          <input
            style={{
              marginLeft: "10px",
              width: "96%",
              borderRadius: "7px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              marginTop: "25px",
              color: "red",
            }}
            type="text"
            placeholder="Message:"
          />
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
