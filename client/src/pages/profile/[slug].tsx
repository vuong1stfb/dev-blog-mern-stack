import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import Loadmore from "../../components/alert/Loadmore";
import InfiniteScroll from "react-infinite-scroll-component";
import { cardPostNoImgaepin } from "../../components/homePage/feed/Feed";
import CardBlogProfile from './CardBlogProfile';
import Pinned from "./Pinned";
import Recentcomments from "./Recentcomments";
import { UserInformation } from "./UserInformation";
import { IParams, RootStore } from '../../utils/TypeScript'
import { getOtherInfo } from '../../redux/actions/userAction';
import { getBlogsByUserId } from '../../redux/actions/blogAction';
import { postAPI, getAPI, putAPI, deleteAPI } from '../../utils/FetchData';
import Loading from '../../components/global/Loading';
import { useLocation } from 'react-router-dom'; 

const Profile = () => {
  const { slug }: IParams = useParams()
  const location = useLocation();
  const [page, setPage] = useState(2);
  const [hasmore, setHasmore] = useState(true);
  const { auth } = useSelector((state: RootStore) => state)
  const { otherInfo } = useSelector((state: RootStore) => state)
  const { blogsUser } = useSelector((state: RootStore) => state)
  const [bloguser, setBloguser] = useState([])
  const [loaduser, setLoaduser] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchData = async () => {
    setPage(Number(page + 1));
    await getAPI(`blog-by-user/${slug}/${page}`)
      .then((res) => {
        if (res.data.result.length < 3) {
          setHasmore(false);
        }
        let array = bloguser.concat(res.data.result);
        setBloguser(array);
      })
      .catch((err) => {
        console.log("lôie");
      });
  };

  useEffect(() => {
    async function fetchMyAPI() {
      window.scrollTo(0, 0);
      setLoaduser(true)
    if(!slug) return;
    try {
      await dispatch(getOtherInfo(slug));
      const res = await getAPI(`blog-by-user/${slug}/${1}`)
      if (res.data.result.length < 3) {
        setHasmore(false);
      }else{
        setHasmore(true);
      }
      setBloguser(res.data.result)
      setLoaduser(false)
    } catch (error) {
      return history.replace('/not-found')
    }
    }
    fetchMyAPI()
  }, [location, slug])
  return (
    <>
    {loaduser && <Loading />}
    {(loaduser === false && otherInfo) && <>
    
    <Container>
      <UserInformation user={otherInfo}/>
      <With100>
        <ContainerBottom>
          <Left>
            {otherInfo.userinfor?.learning === "" ? null : 
            <LeftWrapTag>
              <TagTitle>
                <SpanTitle>Học vấn</SpanTitle>
              </TagTitle>
              <TagContent>
                <SpanContent>
                  {otherInfo.userinfor?.learning}
                </SpanContent>
              </TagContent>
            </LeftWrapTag>}
            {/* <LeftWrapTag>
              <TagTitle>
                <SpanTitle>Skills/Languages</SpanTitle>
              </TagTitle>
              <TagContent>
                <SpanContent>infomation</SpanContent>
              </TagContent>
            </LeftWrapTag> */}

            <LeftWrapTag>
              <TagContent>
              <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-labelledby="a8xj41v3f6couuhlpz22mk9uxnw73tax"
                    className="crayons-icon mr-3 color-base-50"
                    style={{ marginRight: '10px' }}
                  >
                    <title id="a8xj41v3f6couuhlpz22mk9uxnw73tax">Post</title>
                    <path d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"></path>
                  </svg>
                  {otherInfo.userinfor?.follower.length} Người theo dõi
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-labelledby="a8xj41v3f6couuhlpz22mk9uxnw73tax"
                    className="crayons-icon mr-3 color-base-50"
                    style={{ marginRight: '10px' }}
                  >
                    <title id="a8xj41v3f6couuhlpz22mk9uxnw73tax">Post</title>
                    <path d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"></path>
                  </svg>
                  {otherInfo.blogPublishedCount} Blog đã đăng
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-labelledby="a3xy0gxqd212l6cuqjldjcj2ate4xane"
                    className="crayons-icon mr-3 color-base-50"
                    style={{ marginRight: '10px' }}
                  >
                    <title id="a3xy0gxqd212l6cuqjldjcj2ate4xane">Comment</title>
                    <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
                  </svg>
                  {otherInfo.commentsCount} Bình luận
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-labelledby="anvq4po2cra66t7a8up5gkz7f3tthsej"
                    className="crayons-icon mr-3 color-base-50"
                    style={{ marginRight: '10px' }}
                  >
                    <title id="anvq4po2cra66t7a8up5gkz7f3tthsej">Tag</title>
                    <path d="M7.784 14l.42-4H4V8h4.415l.525-5h2.011l-.525 5h3.989l.525-5h2.011l-.525 5H20v2h-3.784l-.42 4H20v2h-4.415l-.525 5h-2.011l.525-5H9.585l-.525 5H7.049l.525-5H4v-2h3.784zm2.011 0h3.99l.42-4h-3.99l-.42 4z"></path>
                  </svg>
                  {otherInfo.tagfollowCount} Thẻ tag theo dõi
                </p>
              </TagContent>
            </LeftWrapTag>
          </Left>

          <Right>
            {
              otherInfo.blogPin?.length === 0 ? null :
              <Pinned blog={otherInfo.blogPin}/>
            }
           
            {/* <Wraper> {
              otherInfo.commentRecent?.length === 0 ? null : <>{Recentcomments(otherInfo.commentRecent)}</>
            }</Wraper> */}
            {bloguser && <>
              {bloguser.length === 0 ? null : <Wraper> 
                {/* {bloguser.map((blog, index) => (
                  <>
                  {cardPostNoImgaepin(blog)}
                  </>
                ))} */}
                <InfiniteScroll
                            dataLength={bloguser.length}
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loading />}
                            endMessage={<p></p>}
                          >
                            <>
                              {bloguser.map((blog: any, index) => (
                                <>
                                 {/* {cardPostNoImgaepin(blog)} */}
                                 <CardBlogProfile blog={blog}/>
                                </>
                              ))}
                            </>
                          </InfiniteScroll>
                </Wraper>}
              
            </>}
          </Right>
        </ContainerBottom>
      </With100>
    </Container>
    </>} 
    </>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #efefef;
`;

const With100 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ContainerBottom = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 3;
  margin-right: 10px;
`;
const Right = styled.div`
  flex: 7;
`;

const Wraper = styled.div`
  
`;
const LeftWrapTag = styled.div`
  border: 1px solid #d8d8d8;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const TagTitle = styled.div`
  padding: 10px;
  border-bottom: 1px solid #d8d8d8;
`;
const SpanTitle = styled.span`
  font-weight: bold;
`;
const TagContent = styled.div`
  padding: 10px;
`;
const SpanContent = styled.span``;


export default Profile