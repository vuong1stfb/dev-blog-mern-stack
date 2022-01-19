import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { login } from '../../redux/actions/authAction'
import { BsFillEyeFill ,BsFillEyeSlashFill } from "react-icons/bs";
import { height } from '@mui/system';

const LoginPass = () => {
  const initialState = { account: '', password: '' }
  const [userLogin, setUserLogin] = useState(initialState)
  const { account, password } = userLogin

  const [typePass, setTypePass] = useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(login(userLogin))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email
        </label>

        <input type="text" className="form-control" id="account" autoComplete='off' style={{border: "1px solid #BCC4C3"}}
        name="account" value={account} onChange={handleChangeInput} />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">Password</label>

        <div className="pass">
          <input style={{border: "1px solid #BCC4C3"}} type={typePass ? "text" : "password"} 
          className="form-control" 
          id="password"
          name="password" value={password} 
          onChange={handleChangeInput} 
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 
            <BsFillEyeSlashFill  style={{width:"22px", height: "22px", marginRight: '10px'}}/> :
             <BsFillEyeFill style={{width:"22px", height: "22px", marginRight: '10px'}}/>}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-auth w-100 mt-1"
      disabled={(account && password) ? false : true}>
        Đăng nhập
      </button>
    </form>
  )
}

export default LoginPass
