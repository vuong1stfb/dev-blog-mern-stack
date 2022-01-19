import React , { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RegisterForm from '../../components/auth/RegisterForm'
import SocialLogin from '../../components/auth/SocialLogin'
import { RootStore } from '../../utils/TypeScript'

const Register = () => {
  const history = useHistory();
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
        <h3 className="text-uppercase text-center mb-4" style={{fontWeight: 'bold'}}>Đăng ký tài khoản</h3>
        <SocialLogin/>
        <RegisterForm />
        
        <p className="mt-2">
          {`Bạn đã có tài khoản? `}
          <Link to={`/login${history.location.search}`} style={{color: '#053DF0'}}>
            Đăng nhập
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register
