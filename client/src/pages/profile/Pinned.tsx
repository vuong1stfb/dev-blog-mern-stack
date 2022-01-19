import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { cardPostNoImgaepin } from "../../components/homePage/feed/Feed";

const Container = styled.div`
  background-color: white;
  margin-bottom: 20px;
`;
const ListPost = styled.div`
position: relative;
  padding: 20px;
  border: 1px solid blue;
  border-radius: 5px;
`;
const DivPined = styled.div`
position: absolute;
top: -30px;
  display: inline-block;
  padding: 10px;
  background-color: blue;
  border-radius: 5px;
`;
const Divh5 = styled.h5`
color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 0;
padding: 0;
`;
const Pinned = (props: any) => {
  const [blogs , setBlogs] = useState([])

  useEffect(() => {
    setBlogs(props.blog)
    console.log("ss2",blogs)
  }, [props])
  return (
    <Container>
      <ListPost>
        {props && <>
          {blogs.length === 0 ? null : 
            <>
            {blogs.map((blog,index) => (
              <>
                {cardPostNoImgaepin(blog)}
              </>
            ))}
           </>
          }
          
        </>}
        <DivPined>
          <Divh5 >
            <svg
            fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              role="img"
              aria-labelledby="aeu7xbkvme45az4ryl181dk6ygsirbp8"
            >
              <title id="aeu7xbkvme45az4ryl181dk6ygsirbp8">Pin</title>
              <path d="M22.314 10.172l-1.415 1.414-.707-.707-4.242 4.242-.707 3.536-1.415 1.414-4.242-4.243-4.95 4.95-1.414-1.414 4.95-4.95-4.243-4.242 1.414-1.415L8.88 8.05l4.242-4.242-.707-.707 1.414-1.415z"></path>
            </svg>
            Ghim
          </Divh5>
        </DivPined>
      </ListPost>
    </Container>
  );
};

export default Pinned;
