import React from "react";
import styled from "styled-components";

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

const Abouttag = (props: any) => {
  return (
    <Container>
      <Guidelines>Giới thiệu về #{props.infor.name}</Guidelines>
      <Content>
        {props.infor.abount}
      </Content>
    </Container>
  );
};

export default Abouttag;
