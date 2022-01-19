import { Dispatch } from 'redux'
import { IAuth, IAuthType, AUTH } from '../types/authType'
import { IAlertType, ALERT } from '../types/alertType'

import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { patchAPI, getAPI } from '../../utils/FetchData'
import { checkPassword } from '../../utils/Valid'
import NotFound from '../../components/global/NotFound'

import { 
  GET_OTHER_INFO,
  IGetOtherInfoType
} from '../types/profileType'

import { checkTokenExp } from '../../utils/checkTokenExp'
import { UserParamUpdate } from '../../pages/settings/[slug]'


export const updateUser =
  (useParams: UserParamUpdate, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    let url = "";
    // console.log(useParams)
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI("updateprofile", useParams, access_token);
      console.log(res);

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            ...useParams,
          },
        },
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const updateUserImage =
  (file: any, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    let url = "";
    // console.log(useParams)
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // neu co file thi up anh len cloudnary, va tra ve url
      if (file) {
        const check = checkImage(file);
        //neu co loi thi thoat khoi ham
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });
        const photo = await imageUpload(file);
        url = photo.url;
        console.log(url);
      }

      //neu check file sau do upload cloud ok ===>
      const res = await patchAPI(
        "updateprofileimage",
        { avatar: url },
        access_token
      );

      dispatch({ 
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar, 
          }
        } 
      })

      dispatch({ type: ALERT, payload: { success: res.data.msg } });



      // console.log(res.data.msg);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const updateUserImageCover =
  (file: any, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    let url = "";
    // console.log(useParams)
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // neu co file thi up anh len cloudnary, va tra ve url
      if (file) {
        const check = checkImage(file);
        //neu co loi thi thoat khoi ham
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });
        const photo = await imageUpload(file);
        url = photo.url;
        console.log(url);
      }

      //neu check file sau do upload cloud ok ===>
      const res = await patchAPI(
        "updateprofileimage_cover",
        { coverimage: url },
        access_token
      );

      dispatch({ 
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            coverimage: url ? url : auth.user.coverimage, 
          }
        } 
      })

      dispatch({ type: ALERT, payload: { success: res.data.msg } });



      // console.log(res.data.msg);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };


export const resetPassword = (
  password: string, cf_password: string, token: string
) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token

  const msg = checkPassword(password, cf_password)
  if(msg) return dispatch({ type: ALERT, payload: {errors: msg}})

  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    const res = await patchAPI('reset_password', { password }, access_token)

    dispatch({ type: ALERT, payload: {success: res.data.msg}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
  }
}


export const getOtherInfo = (id: string) => 
async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    const res = await getAPI(`profile/${id}`)
    dispatch({
      type: GET_OTHER_INFO,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { }})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {}})
    
  }
}