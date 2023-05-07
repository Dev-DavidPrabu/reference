import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
const ImagePreview = (props: any) => {
  console.log(props?.cloudfrontUrl + props.imageInfo);
  console.log(props?.cloudfrontUrl, "props?.cloudfrontUrl");

  return (
    <div>
      {props.mobileTopup ? (
        <Modal
          size="lg"
          style={{ maxWidth: "700px", width: "100%" }}
          isOpen={props.showModal}
        >
          <ModalHeader toggle={props.closeModal}>Preview</ModalHeader>
          <ModalBody
            className="d-flex align-items-center justify-content-center"
            style={{ marginTop: "25%" }}
          >
            <div className="w-50">
              <pre>{JSON.stringify(props.imageInfo, null, 2)}</pre>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        <Modal isOpen={props.showModal}>
          <ModalHeader toggle={props.closeModal}>Image Preview</ModalHeader>
          <ModalBody className="d-flex align-items-center justify-content-center">
            <object
              data={`${
                props?.cloudfrontUrl !== false
                  ? props?.cloudfrontUrl + props.imageInfo
                  : "https://d3b57tlppasclh.cloudfront.net/" + props.imageInfo
              }`}
              width="500"
              height="400"
            ></object>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default ImagePreview;
