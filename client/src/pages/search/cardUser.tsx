import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Loadmore from "../../components/alert/Loadmore";
import { getAPI } from "../../utils/FetchData";
import { Link } from "react-router-dom";
import { Avatar, AvatarGroup } from "@mui/material";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import { Badge, Tooltip } from "@mui/material";
import moment from "moment";
const CardUser = (user: any) => {

  return (
    <ContainerUser>
        <WraperUserInfomation>
        <Avatar src={user.avatar}></Avatar>
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/profile`}
            >
              <span style={{ fontWeight: "bold", cursor: "pointer", fontSize: '20px' }}>
                {user.name}
              </span>
              <span style={{ fontSize: '15px', marginLeft: '13px' }}>
                 - Tham gia ngày {moment(user.createdAt).format("DD/MM/YYYY")}
                
              </span>
            </Link>
            <TimeCreate>{user.follower.length} người theo dõi</TimeCreate>
          </div>
          </WraperUserInfomation>
    </ContainerUser>
  );
};
export default CardUser;

const ContainerUser = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #d8d8d8;
`;

const WraperUserInfomation = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  .avt {
    margin-right: 5px;
  }
`;

const TimeCreate = styled.span``;
