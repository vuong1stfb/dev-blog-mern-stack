import styled from "styled-components";
import NewIcon from "@mui/icons-material/FiberNewOutlined";
import { Avatar } from "@mui/material";
const Container = styled.div`
  padding: 20px;
`;
const PostNewOfTagsWraper = styled.div`
  width: 100%;

  border-radius: 10px;
  margin-bottom: 20px;
`;
const WraperRowPost = styled.div`
  padding: 10px;
  :hover {
    background-color: #ffffff;
  }
  cursor: pointer;
`;
const WraperRowName = styled.div`
  padding: 10px;
`;
const Div = styled.div``;
const NameTag = styled.div`

  font-weight: bold;
  
 margin-bottom: 10px;

`;
const Content = styled.p``;
const Comment = styled.div``;

const Other = styled.div``;
////////User info with button floww
const ContainerUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  

`;
const Left = styled.div`

`;
const Right = styled.div``;
const DivContent = styled.div``;
const ButtonFllow = styled.button`
  background: transparent;
  border: none;
  background-color: blue;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  

`;
const UserInforWithFollowButton = () => 
  
    <ContainerUser>
      <Left>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Left>
      <Right>
        <DivContent>Daniel Onuoha Agbo lo</DivContent>
        <ButtonFllow>Flow</ButtonFllow>
      </Right>
    </ContainerUser>

const RightbarDetailTag = () => {
  return (
    <Container>
      <PostNewOfTagsWraper>
        <WraperRowName>
          <NameTag>Bài viết nổi bật</NameTag>
        </WraperRowName>

        <WraperRowPost>
          <Div>
            <Content>
              Top 3 Ways to Save Emails from Gmail to External Hard Drives? New
            </Content>
          </Div>
          <Div>
            <Comment>13 Comments</Comment>
          </Div>
          <Div>{true && <NewIcon></NewIcon>}</Div>
        </WraperRowPost>

        <WraperRowPost>
          <Div>
            <Content>
              Top 3 Ways to Save Emails from Gmail to External Hard Drives? New
            </Content>
          </Div>
          <Div>
            <Comment>13 Comments</Comment>
          </Div>
          <Div>{true && <NewIcon></NewIcon>}</Div>
        </WraperRowPost>

        <WraperRowPost>
          <Div>
            <Content>
              Top 3 Ways to Save Emails from Gmail to External Hard Drives? New
            </Content>
          </Div>
          <Div>
            <Comment>13 Comments</Comment>
          </Div>
          <Div>{true && <NewIcon></NewIcon>}</Div>
        </WraperRowPost>
      </PostNewOfTagsWraper>
      <hr />
      <div>
        <NameTag>Hard - working person</NameTag>
        {UserInforWithFollowButton()}
        {UserInforWithFollowButton()}
        {UserInforWithFollowButton()}
        {UserInforWithFollowButton()}
      </div>
    </Container>
  );
};
export default RightbarDetailTag;
