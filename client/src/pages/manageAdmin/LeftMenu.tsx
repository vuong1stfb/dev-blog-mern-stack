import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const LeftMenu = ({isActive}:{isActive?:string}) => {
  const data = {
    button: [
      {
        name: "Trang chủ",
        id : "home",
      },
      {
        name: "Quản lý Quản trị viên",
        id : "modmanager",
      },
      {
        name: "Quản lý thẻ Tag",
        id : "tagmanager",
      },
      {
        name: "Quản lý Khiếu nại",
        id : "reportmanager",
      },
      {
        name: "Quản lý Người dùng",
        id : "usermanager",
      },
    ],
    isActive: isActive || "post"//,post,followers,following-tags,following-users,analytics
  };
  const [listButton, setListButton] = useState(data);
  const _handleClick = (name:string)=>{
    setListButton({ ...listButton, isActive: name })
  }
  return (
    <Container>
      {/* renderlist menu left */}
      {listButton.button.map((item) => {
        return (
          <Link to={`/manager/${item.id}`} style={{textDecoration:"none",color:'black'}}>
          <Button onClick={()=>{}} active={listButton.isActive==item.id?true:false}>
            <div className="d-flex">
              <div className="col">
                <span>{item.name}</span>
              </div>
              {/* <div className="col-auto">
                <WraperSpanNumber>
                  <span>{item.number}</span>
                </WraperSpanNumber>
              </div> */}
            </div>
          </Button>
          </Link>
        );
      })}
    </Container>
  );
};

export default LeftMenu;

const Container = styled.div`
// background-color: red;
// padding: 10px;
`;

const Button = styled.button<{ active?: boolean }>`
  border: none;
  width: 100%;
  background-color: ${(props) => (props.active ? "white" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
  border: ${(props) => (props.active ? "1px solid #d8d8d8" : "")};
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => (props.active ? "" : "#dddeee")};
    color: blue;
  }
`;

const WraperSpanNumber = styled.div`
  display: inline-block;
  padding: 0 5px;
  background-color: #d6d6d7;
  border-radius: 30%;
`;
