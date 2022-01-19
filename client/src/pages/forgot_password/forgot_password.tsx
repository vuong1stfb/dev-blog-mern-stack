import { borderRadius, height } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from "styled-components";
import { forgotPassword} from '../../redux/actions/authAction'

import { FormSubmit} from '../../utils/TypeScript'

const ForgotPassword = () => {
  const [account, setAccount] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(forgotPassword(account))
  }

  return (
    <Container>
    <div style={{
      maxWidth: '600px', 
      height: 'auto', 
      backgroundColor: '#ffffff',
      padding: '20px 30px',
      border: '1px solid #e5e0e0',
      borderRadius: '10px'
      }}>
      <h2>Quên mật khẩu</h2>

      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="account">Email</label>

        <div className=" align-items-center" style={{ width: '500px'}} >
          <input type="text" className="form-control" id="account"
          name="account" onChange={e => setAccount(e.target.value)}  />

          <button className="btn btn-primary " style={{ width: '100%', marginTop: '20px' , fontSize: '18px', fontWeight: '600'}}
          type="submit">
            <i className="fas fa-paper-plane me-2" /> Gửi xác thực vào email
          </button>
        </div>
      </form>
    </div>
    </Container>
  )
}

export default ForgotPassword


const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef
`;
