import styled from "styled-components";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
const Container = styled.div`
  border-radius: 5px;
  border-color: black;
  border-width: 1px;
  background-color: #ffffff;
`;
const BackgroundTag = styled.div`
  width: 100%;
  height: 20px;
  background-color: black;
`;
const Wraper = styled.div`
  padding: 20px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const Content = styled.div``;
const Left = styled.div`
  width: 50%;
`;
const Right = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
`;
const SpanTagName = styled.span`
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;
`;
const ButtonFlow = styled.button`
  border: none;
`;
const RowButon = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  z-index: 2;
`;

const folowtag = (idtag: any) => {
  // await patchAPI(`follow-tag`, {idtag}).then(res => {
  //   console.log("follow", res)
  // })
  console.log("aaa");
};
const unfolowtag = (idtag: any) => {
  console.log(idtag);
};

const infomationTag = (infortag: any, checkfollow: any) => {
  console.log("checkfollow", checkfollow);
  return (
    <Container>
      <BackgroundTag></BackgroundTag>
      <Wraper>
        <Section>
          <Left>
            <SpanTagName>#{infortag.name}</SpanTagName>
          </Left>
          <Right>
            <RowButon>
              {checkfollow ? (
                <ButtonFlow onClick={() => folowtag(infortag._id)}>
                  <button type="button" className="btn btn-primary">
                    Theo dõi
                  </button>
                </ButtonFlow>
              ) : (
                <ButtonFlow>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => unfolowtag(infortag._id)}
                  >
                    Bỏ theo dõi
                  </button>
                </ButtonFlow>
              )}
            </RowButon>
          </Right>
        </Section>
        <Content>{infortag.description}</Content>
      </Wraper>
    </Container>
  );
};

export default infomationTag;
