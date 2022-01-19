import { IUser, IProfile } from '../../utils/TypeScript'
import {
  GET_OTHER_INFO,
  IGetOtherInfoType
} from '../types/profileType'


const otherInfoReducer = (
  state:  any = null,
  action: IGetOtherInfoType
): IProfile => {
  switch(action.type){
    case GET_OTHER_INFO:
      return action.payload

    default:
      return state
  }
}

export default otherInfoReducer