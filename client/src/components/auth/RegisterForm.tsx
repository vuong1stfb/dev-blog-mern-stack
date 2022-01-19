import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { register } from '../../redux/actions/authAction'
import { BsFillEyeFill ,BsFillEyeSlashFill } from "react-icons/bs";

const RegisterForm = () => {

  const initialState = { 
    name: '', account: '', password: '', cf_password: '' 
  }
  const [userRegister, setUserRegister] = useState(initialState)
  const { name, account, password, cf_password } = userRegister

  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserRegister({...userRegister, [name]:value})
  }

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault()
    dispatch(register(userRegister))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Username :</label>

        <input type="text" className="form-control" id="name" style={{border: "1px solid #BCC4C3"}}
        name="name" value={name} onChange={handleChangeInput}
        placeholder="Tên hiển thị tối đa 20 ký tự" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email :
        </label>

        <input type="text" className="form-control" id="account" style={{border: "1px solid #BCC4C3"}}
        name="account" value={account} onChange={handleChangeInput}
        placeholder="Example@gmail.com" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">Password :</label>

        <div className="pass">
          <input type={typePass ? "text" : "password"} 
          style={{border: "1px solid #BCC4C3"}}
          className="form-control" 
          id="password"
          name="password" value={password} 
          onChange={handleChangeInput} 
          placeholder="Password"
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? <BsFillEyeSlashFill  style={{width:"22px", height: "22px", marginRight: '10px'}}/> :
             <BsFillEyeFill style={{width:"22px", height: "22px", marginRight: '10px'}}/>}
          </small>
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Confirm Password :
        </label>

        <div className="pass">
          <input type={typeCfPass ? "text" : "password"} 
          style={{border: "1px solid #BCC4C3"}}
          className="form-control" 
          id="cf_password"
          name="cf_password" value={cf_password} 
          onChange={handleChangeInput} 
          placeholder="Confirm password."
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? <BsFillEyeSlashFill  style={{width:"22px", height: "22px", marginRight: '10px'}}/> :
             <BsFillEyeFill style={{width:"22px", height: "22px", marginRight: '10px'}}/>}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-auth w-100 my-1">
        Đăng ký
      </button>
    </form>
  )
}

export default RegisterForm
