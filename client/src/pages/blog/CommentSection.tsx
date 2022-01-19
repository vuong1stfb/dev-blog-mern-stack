import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-top: 1px solid #d8d8d8;
`;
const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const  Discussion= styled.h3`
  
`;
const WraperSubcribe = styled.button`
padding: 10px;
border: none;
background-color: blue;
border-radius: 5px;
`;

const CommentSection = (commentcount: any) => {
  return (
    <Container>
      <Section>
        <Discussion>Bình luận ({commentcount})</Discussion>
        {/* <WraperSubcribe>Subscribe</WraperSubcribe> */}
      </Section>
    </Container>
  );
};

export default CommentSection;
