import styled from "styled-components";
import NewIcon from "@mui/icons-material/FiberNewOutlined";
import Tags from "../../../pages/Listtags/Tags";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  flex: 2.5;
  padding: 20px;
  @media only screen and (max-width: 1000px) {
  /* For everything bigger than 768px */
  display: none;
  }
`;
const PostNewOfTagsWraper = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #D8D8D8;
`;
const WraperRowPost = styled.div`
  padding: 10px;
  :hover {
    background-color: #ffffff;
  }
  cursor: pointer;
  border-top: 1px solid #D8D8D8;
`;
const WraperRowName = styled.div`
  padding: 10px;
`;
const Div = styled.div``;
const NameTag = styled.span`
  font-weight: bold;
`;
const Content = styled.p``;
const Comment = styled.div``;



const Rightbar = (props: any) => {
  const history = useHistory()
  return (
    <Container>
    
        {props.listtagblog.map((tag: any, index: number) => (<>
          <PostNewOfTagsWraper>
          <WraperRowName>
            <NameTag>#{tag.namecategory}</NameTag>
          </WraperRowName>
            {tag.listpost.map((blog:any, index: number) => (
                <WraperRowPost>
                <Div onClick={()=> history.push(`/blog/${blog._id}`)}>
                  <Content>
                    {blog.title}
                  </Content>
                </Div>
                {/* <Div>
                  <Comment>{blog.likecount + blog.commentcount} Lượt tương tác</Comment>
                </Div> */}
                {/* <Div>{true && <NewIcon></NewIcon>}</Div> */}
              </WraperRowPost>
            ))}
</PostNewOfTagsWraper>
        </>

        ))}
    </Container>
  );
};
export default Rightbar;
