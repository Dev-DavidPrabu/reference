import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";

export const POST_FILE_DATA = "POST_FILE_DATA";

export const uploadFileWithData = (formData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.contentUpload;
    const response = fetch(apiURL, {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      var value = await response.json();

      dispatch({ type: POST_FILE_DATA, data: value.data });
    });
  };
};
