import { useState } from "react";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { IParams, RootStore } from "../../../utils/TypeScript";
import { IBlog } from "../../../utils/TypeScript";
import moment from "moment";
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
// import { IBlogsUser }
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const FeedContainer = styled.div`
  flex: 5;
`;
const FeedSectionWraper = styled.div`
  width: 100%;
`;
const ListNav = styled.ul`
  list-style: none;
  padding: 10px;
`;
const ItemNav = styled.li`
  display: inline;
`;
const ContainerItemNav = styled.div`
  display: inline-block;
  padding: 10px;
  :hover {
    background-color: #dddeee;
  }
  cursor: pointer;
`;
const TextNav = styled.span``;
const PostContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #d8d8d8;
`;

const ImagePost = styled.img`
  object-fit: cover;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const WraperPostInfomationPost = styled.div`
  width: 100%;
  padding: 10px;
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
const WraperContentInfomation = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;
const ImageAvatarUser = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: black;
  :hover {
    opacity: 50%;
  }
  cursor: pointer;
`;
const TimeCreate = styled.span``;
const TitlePost = styled.h1`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;
const WraperTagPost = styled.div`
  width: 100%;
`;

const ListTag = styled.ul`
  list-style: none;
  padding: 0px;
`;
const ItemTag = styled.li`
  margin-right: 1px;
  display: inline;
`;
const DivItem = styled.div`
  display: inline-block;
  padding: 5px 7px;
  :hover {
    background-color: #dddeee;
    border-radius: 5px;
  }
  cursor: pointer;
`;
const TextItem = styled.span``;

const ContainerReaction = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const ReactionLeft = styled.div`
  width: 100%;
  display: flex;
`;
const ReactionRight = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const WraperReaction = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #dddeee;
  }
  cursor: pointer;
  border-radius: 5px;
`;

const TimereadSpan = styled.span`
  font-size: 12px;
  margin-right: 10px;
`;
const BtnSave = styled.button`
  padding: 5px 10px;
  margin: 0px;
  border-radius: 5px;
  border-width: 0px;
  background-color: #d6d6d7;
  :hover {
    background-color: #bdbdbd;
  }
  cursor: pointer;
`;

const WraperContetn = styled.div`
  height: 100vh;
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
  

export default function CardPostDetail(props: any) {
  const history = useHistory()
    return (
      <PostContainer>
        <ImagePost src={props.blog?.imagepost}></ImagePost>
        <WraperPostInfomationPost>
          <WraperUserInfomation>
            <Avatar
              className="avt"
              src={props.blog?.poster.avatar}
            ></Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to={`/profile/${props.blog?.poster._id}`} style={{textDecoration: "none", fontWeight: "bold", cursor: "pointer", fontSize: '18px', marginLeft:"7px" }}>
                <span>
                  {props.blog?.poster.name}
                </span>
              </Link>
              <TimeCreate style={{
                textDecoration: "none", 
                cursor: "pointer", 
                fontSize: '14px',
                marginLeft:"7px" }} >{moment(props.blog?.createdAt).fromNow()}</TimeCreate>
            </div>
          </WraperUserInfomation>
          <WraperContentInfomation>
            <TitlePost onClick={()=> history.push(`/blog/${props.blog?._id}`)}>
              {props.blog?.title}
            </TitlePost>
  
            <WraperTagPost>
                
              <ListTag>
              {props.blog?.tags.map((tag: any, index: number) => (
                     <ItemTag>
                     <DivItem>
                       <TextItem onClick={()=> history.push(`/blog/${props.blog?._id}`)} >#{tag.name}</TextItem>
                     </DivItem>
                   </ItemTag>
                    ))}
              </ListTag>
            </WraperTagPost>
  
            <ContainerReaction>
              <ReactionLeft>
                <WraperReaction onClick={()=> history.push(`/blog/${props.blog?._id}`)}>
                  <FavoriteBorderTwoToneIcon  style={{marginRight: '10px'}}></FavoriteBorderTwoToneIcon>
                  <span>{props.blog?.likecount} Lượt thích</span>
                </WraperReaction>
                <WraperReaction onClick={()=> history.push(`/blog/${props.blog?._id}`)}>
                  <CommentIcon style={{marginRight: '10px'}}></CommentIcon>
                  <span>{props.blog?.commentcount} Bình luận</span>
                </WraperReaction>
              </ReactionLeft>
              {/* <ReactionRight>
                <TimereadSpan> 3 min read</TimereadSpan>
  
                <BtnSave>Save</BtnSave>
              </ReactionRight> */}
            </ContainerReaction>
          </WraperContentInfomation>
        </WraperPostInfomationPost>
      </PostContainer>
    )
  };