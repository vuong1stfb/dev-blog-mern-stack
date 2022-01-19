import React from 'react'
import styled from "styled-components";
import '../../styles/loadmore.css'
const Containerload = styled.div`
  display: flex;
  justify-content: center;
`;

const Loadmore = () => {
  return (
    <div className='loadmore'></div>
    // style={{background: '#0007', color: "white", top: 0, left: 0, zIndex: 99}}>
    //   <svg width="205" height="250" viewBox="0 0 40 50">
    //     <polygon stroke="#fff" strokeWidth="1" fill="none"
    //     points="20,1 40,40 1,40" />
    //     <text fill="#fff" x="5" y="47">Loading</text>
    //   </svg>
    // </div>
  )
}

export default Loadmore