import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/TypeScript'
import { postAPI } from '../../utils/FetchData'
import { showErrMsg, showSuccessMsg } from '../../components/alert/Alert'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertType'

const Active = () => {
  const { slug }: IParams = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if(slug){
      postAPI('active', { active_token: slug })
      .then(res => 
       {
        dispatch({ type: ALERT, payload: { success: "Xác thực tài khoản thành công" } })
        history.push('/login')
       }

        )
      .catch(err => setErr(err.response.data.msg))
    }
  },[slug])

  return (
    <div>
      { err && showErrMsg(err) }
      { success && showSuccessMsg(success) }
    </div>
  )
}

export default Active