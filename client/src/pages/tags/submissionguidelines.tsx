import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;
const Guidelines = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const Content = styled.div`
margin-bottom: 10px;
`;
const CreateButton = styled.button`
border: none;
  
`;
const Submissionguidelines = (props: any) => {
  const history = useHistory()
  return (
    <Container>
      <Guidelines>Đóng góp </Guidelines>
      <Content>
        {props.infor.guidelines}
      </Content>
      <CreateButton onClick={()=> history.push('/create_blog')} >
      <button type="button" className="btn btn-primary">Đóng góp bài viết</button>
      </CreateButton>
    </Container>
  );
};

export default Submissionguidelines;
