import {
  ICommentState,
  CREATE_COMMENT,
  GET_COMMENTS,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  ICommentType
} from '../types/commentType'

const initialState = {
  data: [],
  total: 1
}


const commentReducer = (
  state: ICommentState = initialState,
  action: ICommentType
): ICommentState => {
  switch(action.type){
    case CREATE_COMMENT:
      return{
        ...state,
        data: [action.payload, ...state.data]
      }
    
    case GET_COMMENTS:
      return action.payload

    case REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.comment_root
          ? {
            ...item,
            replyComment: [
              action.payload,
              ...item.replyComment as [],

            ]
          }
          : item
        ))
      }

    case UPDATE_COMMENT:
      return{
        ...state,
        data: state.data.map(item => (
          item._id === action.payload._id
          ? action.payload
          : item
        ))
      }

    case UPDATE_REPLY:
      return{
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.comment_root
          ? {
            ...item,
            replyComment: item.replyComment?.map(rp => (
              rp._id === action.payload._id
              ? action.payload
              : rp
            ))
          }
          : item
        ))
      }
      
    case DELETE_COMMENT:
      return{
        ...state,
        data: state.data.filter(item => 
          item._id !== action.payload._id
        )
      }

    case DELETE_REPLY:
      return{
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.comment_root
          ? {
            ...item,
            replyComment: item.replyComment?.filter(rp => (
              rp._id !== action.payload._id
            ))
          }
          : item
        ))
      }
      
    default:
      return state
  }
}


export default commentReducer