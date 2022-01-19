import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IComment } from "../../utils/TypeScript";

import moment from 'moment';

const Container = styled.div`
  background-color: #ffffff;

  

`;
const Wraper = styled.div`
border: 2px solid rgb(9 9 9 / 10%);
`;
const RowRecentComment = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgb(9 9 9 / 10%);
`;
const SpanRecentComment = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
const RowComment = styled.div`
  color: black;
  padding: 10px;
  border-bottom: 1px solid rgb(9 9 9 / 10%);
  :hover {
    background-color: #efefef;
  }
`;
const TitlePost = styled.div``;
const SpanTitlePost = styled.span`
  font-weight: bold;
`;

const ContentCmt = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SpanContent = styled.span``;
const SpanTime = styled.span``;

const Recentcomments = (props: any) => {
  const [cmts , setCmts] = useState([])

  useEffect(() => {
    setCmts(props.cmt)
    console.log("ss444",cmts)
  }, [props])
  return (
    <Container>
      <Wraper>
        <RowRecentComment>
          <SpanRecentComment>Bình luận gần đây</SpanRecentComment>
        </RowRecentComment>
          {/* {cmts && <>
            {cmts.map((cmt, index) => (
              <Link style={{textDecoration:'none'}} to="/">
                <RowComment>
                <TitlePost>
                  <SpanTitlePost>
                    {cmt?.id_blog.title}
                  </SpanTitlePost>
                </TitlePost>
                <ContentCmt>
                  <SpanContent>
                    {cmt.content}
                  </SpanContent>
                  <SpanTime>{moment(cmt.createdAt).format('DD/MM/YYYY')}</SpanTime>
                </ContentCmt>
              </RowComment>
              </Link>
            ))}
          </>} */}

        {/* load 250 comment */}
        <RowRecentComment>
          <a href="/">xem tất cả bình luận</a>
        </RowRecentComment>
      </Wraper>
    </Container>
  );
};

export default Recentcomments;
