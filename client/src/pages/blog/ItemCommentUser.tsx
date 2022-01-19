import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import { Badge, Tooltip } from "@mui/material";
import CommentCreate from "./CommentCreate";
import { Link } from "react-router-dom";
import { IComment, RootStore } from "../../utils/TypeScript";
import moment from "moment";
import Loadmore from "../../components/alert/Loadmore";
import CommentList from './CommentList'

interface IProps {
  comment: IComment;
}

const ItemCommentUser: React.FC<IProps> = ({ comment }) => {
  const [showreply, setShowReply] = useState<IComment[]>([]);
  
  useEffect(() => {
      if(!comment.replyComment) return;
      setShowReply(comment.replyComment)
  }, [comment.replyComment])

  return (
    <>
      <Container>
        <Row1>
          <Avatar alt={comment.user?.name} src={comment.user?.avatar} />
        </Row1>
        <CommentList comment={comment} showreply={showreply} setShowReply={setShowReply}>
            {
              showreply.map((comment, index) => (
                <div
                style={{
                  borderColor: "black",
                  opacity: comment._id ? 1 : 0.5,
                  pointerEvents: comment._id ? "initial" : "none",
                }}
              > 
              <Containerreply>
              <Row1>
              <Avatar alt={comment.user?.avatar} src={comment.user?.avatar} />
            </Row1>
                <CommentList comment={comment} showreply={showreply} setShowReply={setShowReply}/>
                </Containerreply>
              </div>
              ))
            }

        </CommentList>
      </Container>
    </>
  );
};
export default ItemCommentUser;

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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  margin-top: 20px;
  background-color: #ffffff;
`;
const Containerreply = styled.div`
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
  margin-top: 5px;
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
  padding: 3px 6px;
  border: none;
  background: transparent;
  :hover {
    border-radius: 5px;
    background-color: #ebe3e3;
  }
`;
