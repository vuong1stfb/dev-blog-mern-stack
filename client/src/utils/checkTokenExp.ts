import jwt_decode from "jwt-decode";
import { logout } from "../redux/actions/authAction";
import { AUTH } from '../redux/types/authType'
import { getAPI } from './FetchData'


interface IToken {
  exp: number
  iat: number
  id: string
}
export const checkTokenExp = async (token: string, dispatch: any) => {
  if (typeof token === "string") {
    const decoded: IToken = jwt_decode(token);
    if (decoded.exp >= Date.now() / 1000) return;
    // nếu token hết hạn
    const res = await getAPI("refresh_token")
    // if(!res){
    //   await dispatch(logout(token))
    // }
    dispatch({ type: AUTH, payload: res.data });
    return res.data.access_token;
  }
}; 
// export const checkTokenExp = async (token: string | undefined, dispatch: any) => {
//   const decoded: IToken = jwt_decode(token)
//   if(decoded.exp >= Date.now() / 1000) return;
//   // nếu token hết hạn
//   const res = await getAPI('refresh_token')
//   dispatch({ type: AUTH, payload: res.data })
//   return res.data.access_token;
// }