import { IoArrowUndoOutline } from "react-icons/io5";
import { Col, Input } from "reactstrap";
import { Switch } from "antd";
import { useHistory } from "react-router-dom";

const MerchantSummaryAdd = () => {
  const history = useHistory();

  const handle_Cancel = () => {
    history.goBack();
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold block-card-title">Add Merchant</h1>
          <button className="block-card-back border-0" onClick={handle_Cancel}>
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="block-card-view-body p-3">
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      Merchant Name
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      //readOnly={true}
                      //value={blockCardRecords.id}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Activation Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="date"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Approval Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="date"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Merchant Phone No
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      Merchant Address
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      //readOnly={true}
                      //value={blockCardRecords.id}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Merchant Owner
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Merchant Wallet No
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Security Deposit
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">Longitute</label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      //readOnly={true}
                      //value={blockCardRecords.id}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">Latitude</label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">Start Time</label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="time"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">End Time</label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="time"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      Contact Person
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      //readOnly={true}
                      //value={blockCardRecords.id}
                    />
                  </div>
                  <div className="col">
                    <label className="block-card-view-label">
                      Contact Number
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Contact Person Email
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col ">
                    <label
                      className="createReference-label"
                      style={{ width: "200px" }}
                    >
                      Merchant Status<span className="span-col">*</span>
                    </label>
                    <Col sm={4}>
                      <Switch
                        checkedChildren="ACTIVE"
                        unCheckedChildren="INACTIVE"
                        //onChange={(e) => handleEnabled(e)}
                        //checked={
                        // createFunctionalAdd.status === "ACTIVE" ? true : false
                        // }
                      />
                    </Col>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Merchant Category
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control form-select"
                        type="select"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">MERS Code</label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Old Registration Code
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col ">
                    <label
                      className="createReference-label"
                      style={{ width: "200px" }}
                    >
                      Super Merchant
                    </label>
                    <Col sm={4}>
                      <Switch
                        checkedChildren="YES"
                        unCheckedChildren="NO"
                        //onChange={(e) => handleEnabled(e)}
                        //checked={
                        // createFunctionalAdd.status === "ACTIVE" ? true : false
                        // }
                      />
                    </Col>
                  </div>
                  <div className="col ">
                    <label
                      className="createReference-label"
                      style={{ width: "200px" }}
                    >
                      Merchant
                    </label>
                    <Col sm={4}>
                      <Switch
                        checkedChildren="YES"
                        unCheckedChildren="NO"
                        //onChange={(e) => handleEnabled(e)}
                        //checked={
                        // createFunctionalAdd.status === "ACTIVE" ? true : false
                        // }
                      />
                    </Col>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Company Registration No
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Company Expiry Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="date"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col ">
                    <label className="block-card-view-label">
                      Business Registration No
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Business Expiry Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="date"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Income Tax No
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control "
                        type="text"
                        //   readOnly={true}
                        //   value={blockCardRecords.customerName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="container-save border-0 text-white">
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
        </div>
      </div>
    </div>
  );
};
export default MerchantSummaryAdd;
