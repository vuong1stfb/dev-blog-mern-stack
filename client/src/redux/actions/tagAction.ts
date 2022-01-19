import { Dispatch } from "redux";
import { IBlog } from "../../utils/TypeScript";
import { imageUpload } from "../../utils/ImageUpload";
import { postAPI, getAPI, putAPI, deleteAPI } from "../../utils/FetchData";

import { ALERT, IAlertType } from "../types/alertType";

import { checkTokenExp } from "../../utils/checkTokenExp";

export const getListTag = () => async (dispatch: any) => {
  try {
    const res = await getAPI("/get-list-tag");
    dispatch({ type: "GET_LIST_TAG", payload: res.data.listtag });
  } catch (err: any) {
    console.log(err);
  }
};
