import React from 'react'

const Footer = () => {
  return (
    <div className="text-center bg-light py-4">
      <h6>Cộng đồng DEVBLOG- Một mạng xã hội mang tính xây dựng và toàn diện dành cho các nhà phát triển phần mềm. Với bạn mỗi bước trong cuộc hành trình của bạn.</h6>
      <span>Được phát triển bởi nhóm Sinh viên - dự án</span>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <span>Facebook :</span>
        <a href="https://www.facebook.com/caoquocdat12092001/" 
      target="_blank" rel="noreferrer"
      className="mb-2 d-block">
       https://www.facebook.com/caoquocdat12092001/
      </a>
      <span style={{marginLeft: '10px'}}>Email :</span>
        <a href="https://mail.google.com/mail/u/0/#inbox" 
      target="_blank" rel="noreferrer"
      className="mb-2 d-block">
       https://mail.google.com
      </a>
      </div>
      <p> Copyright &copy; 2021</p>
    </div>
  )
}

export default Footer