import { useState } from "react";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import 'quill/dist/quill.snow.css';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import {
  IParams,
  ObjectFromGetApiBlogByID,
  RootStore,
} from "../../../utils/TypeScript";
import { IBlog } from "../../../utils/TypeScript";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { color } from "@mui/system";

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

const PostContainerdeltail = styled.div`
  width: auto;
  background-color: #ffffff;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: 10px;
  // border: 1px solid #d8d8d8;
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

const WraperPostInfomationPostdetail = styled.div`
  width: 100%;
  padding: 30px;
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
`;
const WraperTagPost = styled.div`
  width: 100%;
`;

const ListTag = styled.ul`
  list-style: none;
  padding: 0px;
`;
const ItemTag = styled.li`
  margin-right: 10px;
  display: inline;
`;
const DivItem = styled.div`
  display: inline-block;
  padding: 10px;
  :hover {
    background-color: #dddeee;
  }
  cursor: pointer;
`;
const DivItemdetailpost = styled.div`
  display: inline-block;
  padding: 5px 10px;
  :hover {
    background-color: #dddeee;
    border-radius: 10px;
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
  width: 50%;
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

export const CardPostDetail = (props?: ObjectFromGetApiBlogByID) => {
  return (
    <PostContainerdeltail>
      <ImagePost style={{width: '100%'}} src={props?.blog?.imagepost}></ImagePost>
      <WraperPostInfomationPostdetail>
        <WraperUserInfomation>
          <Avatar className="avt" src={props?.blog?.poster?.avatar}></Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link to={"/"} style={{textDecoration: 'none', fontSize: '20px', marginLeft: '10px', color: "black"}}>
              <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                {props?.blog?.poster?.name}
              </span>
            </Link>
            <TimeCreate style={{marginLeft: '10px', fontSize:'13px'}}>Đăng {moment(props?.blog?.createdAt).fromNow()}</TimeCreate>
          </div>
        </WraperUserInfomation>
        <WraperContentInfomation>
          <TitlePost style={{fontSize: '50px', fontWeight: 'bold', marginBottom: "20px"}} >{props?.blog?.title}</TitlePost>
          <WraperTagPost>
            <ListTag>
              {props?.blog?.tags.map((tag, index) => {
                return (
                  <ItemTag>
                    <DivItemdetailpost>
                      <TextItem>#{tag.name}</TextItem>
                    </DivItemdetailpost>
                  </ItemTag>
                );
              })}
            </ListTag>
          </WraperTagPost>
          {props?.blog?.content && (
            <div className='ql-snow'>
            <div className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: props?.blog?.content,
              }}
            />
            </div>
          )}
        </WraperContentInfomation>
      </WraperPostInfomationPostdetail>
    </PostContainerdeltail>
  );
};

export const cardPostNoImgaepin = (blog?: IBlog) => {
  return (
    <>
      {blog && (
        <PostContainer>
          <WraperPostInfomationPost>
            <WraperUserInfomation>
              <Avatar
                src={
                  typeof blog.poster !== "string"
                    ? `${blog.poster?.avatar}`
                    : ""
                }
              ></Avatar>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/"}
                >
                  <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                    {typeof blog.poster !== "string" && `${blog.poster?.name}`}
                  </span>
                </Link>
                <TimeCreate>
                  {moment(blog.createdAt).format("DD/MM/YYYY")}
                </TimeCreate>
              </div>
            </WraperUserInfomation>
            <WraperContentInfomation>
              <TitlePost style={{ fontSize: "30px" }}>{blog.title}</TitlePost>

              <WraperTagPost>
                <ListTag>
                  {blog.tags.map((tag, index) => (
                    <ItemTag key={index}>
                      <DivItem>
                        <TextItem>#{tag.name}</TextItem>
                      </DivItem>
                    </ItemTag>
                  ))}
                </ListTag>
              </WraperTagPost>

              <ContainerReaction>
                <ReactionLeft>
                  <WraperReaction>
                    <FavoriteBorderTwoToneIcon></FavoriteBorderTwoToneIcon>
                    <span style={{ marginLeft: "10px" }}>
                      {blog.likecount} Lượt thích
                    </span>
                  </WraperReaction>
                  {/* <WraperReaction>
                <CommentIcon></CommentIcon>
                <span>3</span>
              </WraperReaction> */}
                </ReactionLeft>
                {/* <ReactionRight>
              <TimereadSpan> 3 min read</TimereadSpan>

              <BtnSave>Save</BtnSave>
            </ReactionRight> */}
              </ContainerReaction>
            </WraperContentInfomation>
          </WraperPostInfomationPost>
        </PostContainer>
      )}
    </>
  );
};

export const cardPostNoImgae = (blog: any) => {
  return (
    <>
      {blog && (
        <PostContainer>
          <WraperPostInfomationPost>
            <WraperUserInfomation>
              <Avatar src={blog.poster.avatar}></Avatar>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/"}
                >
                  <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                    {blog.poster.name}
                  </span>
                </Link>
                <TimeCreate>
                  {moment(blog.createdAt).format("DD/MM/YYYY")}
                </TimeCreate>
              </div>
            </WraperUserInfomation>
            <WraperContentInfomation>
              <TitlePost style={{ fontSize: "30px" }}>{blog.title}</TitlePost>

              <WraperTagPost>
                <ListTag>
                  {/* {blog.tags.map((tag, index) => (

                <ItemTag key={index}>
                <DivItem>
                  <TextItem>#{tag.name}</TextItem>
                </DivItem>
              </ItemTag>
              ))} */}
                </ListTag>
              </WraperTagPost>

              <ContainerReaction>
                <ReactionLeft>
                  <WraperReaction>
                    <LikeIcon></LikeIcon>
                    <span style={{ marginLeft: "10px" }}>
                      {blog.likecount} Lượt thích
                    </span>
                  </WraperReaction>
                  <WraperReaction>
                    <CommentIcon></CommentIcon>
                    <span>3</span>
                  </WraperReaction>
                </ReactionLeft>
                <ReactionRight>
                  <TimereadSpan> 3 min read</TimereadSpan>

                  <BtnSave>Save</BtnSave>
                </ReactionRight>
              </ContainerReaction>
            </WraperContentInfomation>
          </WraperPostInfomationPost>
        </PostContainer>
      )}
    </>
  );
};

export default function Feed() {
  return (
    <FeedContainer>
      <FeedSectionWraper>
        <ListNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav>Mới nhất</TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav>Cũ nhất</TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav>Đang follow</TextNav>
            </ContainerItemNav>
          </ItemNav>
        </ListNav>
      </FeedSectionWraper>
      {CardPostDetail()}
      {CardPostDetail()}
      {CardPostDetail()}
    </FeedContainer>
  );
}
