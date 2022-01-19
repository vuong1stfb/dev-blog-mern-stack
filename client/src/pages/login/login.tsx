import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPass from '../../components/auth/LoginPass'
import SocialLogin from '../../components/auth/SocialLogin'

import { RootStore } from '../../utils/TypeScript'

const Login = () => {
  const [sms, setSms] = useState(false)
  const history = useHistory()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if(auth.access_token) {
      let url = history.location.search.replace('?', '/')
      return history.push(url)
    }
  },[auth.access_token, history])

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4" style={{fontWeight: 'bold'}}>Đăng nhập</h3>
        <SocialLogin />
         <LoginPass />

        <p>
          {`Bạn chưa có tài khoản `}
          <Link to={`/register${history.location.search}`} style={{color: '#053DF0'}}>
            Đăng ký ngay
          </Link>
        </p>

        <small className="row my-2 text-primary" style={{cursor: 'pointer'}}>
          <span className="col-6">
            <Link to='/forgot_password'>
              Forgot password?
            </Link>
          </span>
        </small>

      </div>
    </div>
  )
}

export default Login
