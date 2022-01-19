import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const FeedContainer = styled.div`

 
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
  width: 100%;
  padding-left: 20px;
`;
const WraperContentInfomation = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;
const ButonWrapAvatar = styled.button`
  border: none;
  margin-right: 10px;
  background-color: transparent;
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
  padding: 10px;
  margin: 0px;
  border-radius: 10px;
  border-width: 0px;
  background-color: #d6d6d7;
  :hover {
    background-color: #bdbdbd;
  }
  cursor: pointer;
`;

const PostCardNoImg = () => {
  return (
    <PostContainer>
      <WraperPostInfomationPost>
        <WraperUserInfomation>
          <ButonWrapAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ButonWrapAvatar>
          <TimeCreate>10 minute ago</TimeCreate>
        </WraperUserInfomation>
        <WraperContentInfomation>
          <TitlePost>
            How to display laravel validation errors in vuejs
          </TitlePost>

          <WraperTagPost>
            <ListTag>
              <ItemTag>
                <DivItem>
                  <TextItem>#android</TextItem>
                </DivItem>
              </ItemTag>
              <ItemTag>
                <DivItem>
                  <TextItem>#android</TextItem>
                </DivItem>
              </ItemTag>
              <ItemTag>
                <DivItem>
                  <TextItem>#android</TextItem>
                </DivItem>
              </ItemTag>
            </ListTag>
          </WraperTagPost>

          <ContainerReaction>
            <ReactionLeft>
              <WraperReaction>
                <LikeIcon></LikeIcon>
                <span>11</span>
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
  );
};

export default function midContent() {
  return (
    <FeedContainer>
      <FeedSectionWraper>
        <ListNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav>Blog mới nhất</TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav>Muộn nhất</TextNav>
            </ContainerItemNav>
          </ItemNav>
        </ListNav>
      </FeedSectionWraper>
      {PostCardNoImg()}
      {PostCardNoImg()}
    </FeedContainer>
  );
}
