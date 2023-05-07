import React, { useState } from "react";
import "./ModifyPopup.scss";
import { Modal } from "antd";

import upload from "../../assets/upload.png";
import download from "../../assets/download.png";
import { Input, Label } from "reactstrap";
import { result } from "validate.js";
const templeteFile = require("../../assets/preOnboarding.xlsx");
const ModifyPopup = (props: any) => {
  let { isShow, handleCancel, uploadHandler } = props;
  const [selectedFile, setSelectedFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [preSignedUrl, setPreSignedUrl] = useState("");

  const handleChange = async (e: any) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
    await createPresignedUrl(e.target.files[0]);
  };

  function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  let userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const createPresignedUrl = async (e: any) => {
    let apiURL = `https://dotptlwoki.execute-api.us-east-1.amazonaws.com/s3presignedurl-api/S3-preSigned-url?originalfilename=${
      e.name
    }x&uploaderid=tamilarasanTest&successcount=${1}&failurecount=${0}&objectkey=${
      makeid(8) + e.name
    }`;

    var requestOptions: any = {
      method: "POST",
      redirect: "follow",
      Headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: userData.idToken,
      },
    };
    const response = await fetch(apiURL, requestOptions)
      .then((response) => response.text())
      .then(result);

    setPreSignedUrl(response);
  };

  const fileUploadHandler = () => {
    uploadHandler(preSignedUrl, selectedFile);
  };

  return (
    <>
      <Modal visible={isShow} closable={false} footer={null} width={400}>
        <div>
          <div className="header-top d-flex justify-content-center align-items-center">
            <span className="header-top-text ps-3"> Bulk Upload Customer</span>
          </div>
          <div className="d-flex body-content justify-content-center align-items-center">
            Download a template, add your data, then upload it here for
            processing
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <img
              className="download-content-image mb-1"
              alt="download"
              src={download}
            />
            <a href={templeteFile.default} download={"preOnboarding.xlsx"}>
              {" "}
              Download Create Templete{" "}
            </a>
          </div>
          <hr />
          <div className="upload-template d-flex flex-column justify-content-center align-items-center">
            {fileName.length === 0 ? (
              <>
                <Label>
                  {" "}
                  <img
                    className="upload-template-image mb-2"
                    alt="upload"
                    src={upload}
                  />{" "}
                  <Input
                    onChange={handleChange}
                    style={{ display: "none" }}
                    type="file"
                    className=""
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ></Input>
                </Label>
                <span className="upload-template-text text-bold">
                  Upload filled-in template here
                </span>
                <span className="upload-template-text-small">
                  Drag and drop, or click to select
                </span>
              </>
            ) : (
              <div>{fileName}</div>
            )}
          </div>
          <div className="d-flex justify-content-between mt-1">
            <button className="modify-btn" onClick={fileUploadHandler}>
              Submit
            </button>
            <button className="modify-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModifyPopup;
