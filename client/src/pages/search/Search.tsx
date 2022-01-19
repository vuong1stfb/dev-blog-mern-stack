import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux'
import { IParams, RootStore } from '../../utils/TypeScript'
import Loadmore from "../../components/alert/Loadmore";
import { getAPI } from "../../utils/FetchData";
import { Link } from "react-router-dom";
import Loading from "../../components/global/Loading";
import { Avatar, AvatarGroup } from "@mui/material";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import moment from "moment";
import CardUser from "./cardUser";
import CardComment from "./cardComment";
import InfiniteScroll from "react-infinite-scroll-component";
const Search = () => {
  const regex = /-/g;
  const location = useLocation();
  const { auth } = useSelector((state: RootStore) => state)
  const [valuesearch, setvaluesearch] = useState("")
  const [resultblog, setResultblog] = useState([])
  const [resultComment, setResultComment] = useState([])
  const [resultUser, setResultUser] = useState([])
  const [page, setPage] = useState(2);
  const [hasmore, setHasmore] = useState(true);
  const [loadmore, setLoadmore] = useState(false);
  const [loading, setLoading] = useState(false)
  const [activeButton, setActiveButton] = useState({
    blog: true,
    comment: false,
    user: false,
    myblog: false
  });
  const _handleButtonComment = () => {
    setActiveButton({ blog: false, comment: true, user: false,myblog: false });
  };
  const _handleButtonblog = () => {
    setActiveButton({ blog: true, comment: false, user: false, myblog: false });
  };
  const _handleButtonuser = () => {
    setActiveButton({ blog: false, comment: false, user: true, myblog: false });
  };
  const _handleButtonmyblog = () => {
    setActiveButton({ blog: false, comment: false, user: false, myblog: true });
  };


  const fetchData = async () => {
    const parsedHash: any = queryString.parse(location.search).v
      setvaluesearch(parsedHash?.replace(regex, ' '))
      if(activeButton.blog){
        setPage(Number(page + 1));
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=blog&page=${page}`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          let array = resultblog.concat(res.data.searchresult);
          setResultblog(array)
          setLoadmore(false)
        })
      }else if(activeButton.comment){
        setPage(Number(page + 1));
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=comment&page=${page}`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          let array = resultComment.concat(res.data.searchresult);
          setResultComment(array)
          setLoadmore(false)
        })
      }
      else if(activeButton.user){
        setPage(Number(page + 1));
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=user&page=${page}`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          let array = resultUser.concat(res.data.searchresult);
          setResultUser(array)
          setLoadmore(false)
        })
      }
      else if(activeButton.myblog){
        setPage(Number(page + 1));
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=myblog&iduser=${auth.user?._id}&page=${page}`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          let array = resultblog.concat(res.data.searchresult);
          setResultblog(array)
          setLoadmore(false)
        })
      }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true)
    setHasmore(true)
    setPage(2)
    async function fetchMyAPI() {
      const parsedHash: any = queryString.parse(location.search).v
      setvaluesearch(parsedHash?.replace(regex, ' '))
      if(activeButton.blog){
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=blog&page=1`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          setResultblog(res.data.searchresult)
          setLoading(false)
        })
      }else if(activeButton.comment){
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=comment&page=1`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          setResultComment(res.data.searchresult)
          setLoading(false)
        })
      }
      else if(activeButton.user){
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=user&page=1`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          setResultUser(res.data.searchresult)
          console.log(res.data.searchresult)
          setLoading(false)
        })
      }
      else if(activeButton.myblog){
        await getAPI(`search?searchvalue=${parsedHash?.replace(regex, ' ')}&type=myblog&iduser=${auth.user?._id}&page=1`).then(res => {
          if(res.data.searchresult.length < 2){
            setHasmore(false)
          }
          setResultblog(res.data.searchresult)
          console.log(res.data.searchresult)
          setLoading(false)
        })
      }
    }
    fetchMyAPI();
  }, [location.search,activeButton])


  return (
    <Container>
      <div className="container">
        <div className="row ">
          <div className="col" style={{marginBottom: '15px'}}>
            <h1>Kết quả tìm kiếm cho {valuesearch}</h1>
          </div>
          {/* <div className="col">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-outline-secondary">
                <span className="font-weight-bold">Settings</span>
              </button>
            </div>
          </div> */}
        </div>

        <div className="row">
          <div className="col-3">
            <Wrapbutton>
              <Button active={activeButton.blog} onClick={_handleButtonblog}>
                Blog
              </Button>
            </Wrapbutton>
            <Wrapbutton>
              <Button
                active={activeButton.comment}
                onClick={_handleButtonComment}
              >
                Bình luận
              </Button>
            </Wrapbutton>
            <Wrapbutton>
              <Button active={activeButton.user} onClick={_handleButtonuser}>
                Người dùng
              </Button>
            </Wrapbutton>
            {!auth.access_token ? null : <>
            <Wrapbutton>
              <Button active={activeButton.myblog} onClick={_handleButtonmyblog}>
                Blog của tôi
              </Button>
            </Wrapbutton></>}
          </div>
          <div className="col-9">
            {activeButton.blog ? 
              <>
                {loading ? <Loading/> : <>
                {resultblog.length === 0 ? <NoResult>Không có kết quả nào phù hợp</NoResult> :
                  <Resultsearch>
                     <InfiniteScroll
                            dataLength={resultblog.length}
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loading />}
                            endMessage={<p></p>}
                          >
                      {resultblog.map((blog: any, index) => (
                           <>
                           {PostCardNoImg(blog)}
                           </>
                      ))}
                     </InfiniteScroll>
                  </Resultsearch>
                }</>}
              </>: null}

              {/* comment */}
            {activeButton.comment ? 
            <>
            {loading ? <Loading/> : <>
            {resultComment.length === 0 ? <NoResult>Không có kết quả nào phù hợp</NoResult> :
              <Resultsearch>
                <InfiniteScroll
                            dataLength={resultComment.length}
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loading />}
                            endMessage={<p></p>}
                          >
                  {resultComment.map((comment: any, index) => (
                       <>
                       {CardComment(comment)}
                       </>
                  ))}
                  </InfiniteScroll>
              </Resultsearch>
            }</>}
          </>: null}

          {/* user */}
            {activeButton.user ?   <>
            {loading ? <Loading/> : <>
            {resultUser.length === 0 ? <NoResult>Không có kết quả nào phù hợp</NoResult> :
              <Resultsearch>
                 <InfiniteScroll
                            dataLength={resultUser.length}
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loading />}
                            endMessage={<p></p>}
                          >
                  {resultUser.map((user: any, index) => (
                       <>
                       {CardUser(user)}
                       </>
                  ))}
                  </InfiniteScroll>
              </Resultsearch>
            }</>}
          </>: null}
            
            {activeButton.myblog ? <>
                {loading ? <Loading/> : <>
                {resultblog.length === 0 ? <NoResult>Không có kết quả nào phù hợp</NoResult> :
                  <Resultsearch>
                    <InfiniteScroll
                            dataLength={resultblog.length}
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loading />}
                            endMessage={<p></p>}
                          >
                      {resultblog.map((blog: any, index) => (
                           <>
                           {PostCardNoImg(blog)}
                           </>
                      ))}
                     </InfiniteScroll>
                  </Resultsearch>
                }</>}
              </>: null}
            
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Search;

const PostCardNoImg = (blog: any) => {
  const history = useHistory();
  return (
    <PostContainer>
      <WraperPostInfomationPost>
        <WraperUserInfomation>
          <Avatar src={blog.poster.avatar}></Avatar>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/profile/${blog.poster._id}`}
            >
              <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                {blog.poster.name} 
              </span>
            </Link>
            <TimeCreate>{moment(blog.createdAt).fromNow()}</TimeCreate>
          </div>
        </WraperUserInfomation>

        <WraperContentInfomation>
          <TitlePost style={{ fontWeight: "bold" }}>{blog.title}</TitlePost>

          <WraperTagPost>
            <ListTag>
              {blog.tags.map((infortag: any) => (
                <ItemTag>
                  <DivItem> 
                    <TextItem>#{infortag.name}</TextItem>
                  </DivItem>
                </ItemTag>
              ))}
            </ListTag>
          </WraperTagPost>

          <ContainerReaction>
            <ReactionLeft>
              <WraperReaction>
                <LikeIcon></LikeIcon>
                <span style={{ marginLeft: "10px" }}>
                  {blog.likecount} lượt thích
                </span>
              </WraperReaction>
              <WraperReaction>
                <CommentIcon></CommentIcon>
                <span style={{ marginLeft: "10px" }}>{blog.commentcount} Bình luận</span>
              </WraperReaction>
            </ReactionLeft>
            <ReactionRight>
              {/* <TimereadSpan> 3 min read</TimereadSpan> */}
              {/* {postsave.indexOf(blog._id) ? 
              <BtnSave style={{ padding: "10px 25px" }}>Lưu</BtnSave>:
              <BtnSave style={{ padding: "10px 25px" }}>Đã Lưu</BtnSave>} */}
            </ReactionRight>
          </ContainerReaction>
        </WraperContentInfomation>
      </WraperPostInfomationPost>
    </PostContainer>
  );
};

const Container = styled.div`
  background-color: #efefef;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 0px 200px;
  padding-top: 40px;
`;

const Wrapbutton = styled.div``;

const Button = styled.button<{ active?: boolean }>`
  border: none;
  width: 100%;
  background-color: ${(props) => (props.active ? "white" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  border: ${(props) => (props.active ? "1px solid #d8d8d8" : "none")};
  :hover {
    background-color: ${(props) => (props.active ? "" : "#dddeee")};

    color: blue;
    
  }
`;

const Resultsearch = styled.div`
  width: 100%;
  height: auto;
  // background-color: #F27849
`;

const PostContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #d8d8d8;
`;

const NoResult = styled.div`
  width: 100%;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  color: #A7A8A5;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #d8d8d8;
`;


const WraperPostInfomationPost = styled.div`
  width: 100%;
  padding: 10px;
`;
const WraperUserInfomation = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  .avt {
    margin-right: 5px;
  }
`;
const WraperContentInfomation = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
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

var localeData = moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s trước",
    s: "vài giây",
    ss: "%d seconds",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
});