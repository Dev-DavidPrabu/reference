import { ApiEndPoints, Constants } from "../Constants/Constants";

var axios = require("axios");
var FormData = require("form-data");
const ContentUpload = async (fileInfo: any) => {
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  var formData = new FormData();
  formData.append("file", fileInfo[0]);
  formData.append("category", "ALL");
  formData.append("description", "");
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `${"Bearer " + userData.idToken}`,
  };
  const createResponse = await axios
    .post(Constants.BaseURL + ApiEndPoints.contentUpload, formData)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      return error;
    });
  return createResponse;
};

export default ContentUpload;
