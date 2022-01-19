import axios from 'axios'
import {checkTokenExp} from '../utils/checkTokenExp'

export const postAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const getAPI = async (url: string, token?:string) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token }
  })

  return res;
}

export const patchAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const putAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const deleteAPI = async (url: string, token?:string) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token }
  })

  return res;
}