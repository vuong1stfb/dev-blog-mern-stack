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
const CardComment = (comment: any) => {

  return (
    <ContainerComment>
        <Blogname>Blog: {comment.blog.title}</Blogname>
        <Container>
      <Row1>
        <Avatar alt="Remy Sharp" src={comment.user.avatar} />
      </Row1>
      <Row2>
        <Comment className="border  rounded" style={{ borderColor: "black" }}>
          <Textarea>
            <Link to={"/"} style={{ textDecoration: "none", color: "#3D3D3D", marginRight: '10px' }}>
              <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                {comment.user.name}
              </span>
            </Link>

            {/* <div style={{ display: "inline-block" }}>
              <Tooltip title="Author" placement="top">
                <MilitaryTechOutlinedIcon></MilitaryTechOutlinedIcon>
              </Tooltip>
            </div> */}
            • {moment(comment.createdAt).fromNow()}
          </Textarea>
          <Textarea style={{fontSize: '18px'}}>
          {comment.content}
          </Textarea>
        </Comment>

        <Button>
          <WraperReaction>
            <Badge badgeContent={`${comment.likecount}`} color="primary">
              <FavoriteBorderOutlinedIcon color="action" />
            </Badge>
          </WraperReaction>
        </Button>
      </Row2>
    </Container>
    </ContainerComment>
  );
};
export default CardComment;

const ContainerComment = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #d8d8d8;
`;

const Blogname = styled.p`
  width: 100%;
  color: #747573;
  font-size: 23px;
  font-weight: bold;
  padding-bottom: 8px;

  border-bottom: 1px solid #d8d8d8
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  margin-top: 20px;
  background-color: #ffffff;
`;
const Row1 = styled.div`
  margin-right: 10px;
`;
const Row2 = styled.div`
  flex: 1;
`;
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  justify-content: space-between;
`;

const TextCmt = styled.input`
  height: 100%;
`;
const Option = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OptionLeft = styled.div`
  padding: 5px;
`;
const OptionRight = styled.div`
  padding: 5px;
`;
const Button = styled.div`
  margin-top: 10px;
`;
const Textarea = styled.p`
  background: transparent;
`;
const Icon = styled.button`
  padding: 10px;
  display: inline;
  border: none;
  margin-right: 10px;
  border-radius: 5px;
  background: transparent;
  :hover {
    background-color: #efefef;
  }
  cursor: pointer;
`;

const WraperReaction = styled.button`
  display: inline;
  padding: 10px;
  border: none;
  background: transparent;
  :hover {
    border-radius: 5px;
    background-color: #ebe3e3;
  }
`;



var localeData = moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s trước",
    s: "vài giây",
    ss: "%d seconds",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
});