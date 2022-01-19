import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Abouttag from "./abouttag";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import InfomationTag from "./InformationTag";
import midContent from "./midContent";
import RightbarDetailTag from "./right";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { IParams, RootStore } from "../../utils/TypeScript";
import Submissionguidelines from "./submissionguidelines";
import {
  postAPI,
  getAPI,
  patchAPI,
  putAPI,
  deleteAPI,
} from "../../utils/FetchData";
import { useSelector } from "react-redux";
import { Avatar, AvatarGroup } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import Loading from "../../components/global/Loading";
import Loadmore from "../../components/alert/Loadmore";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { useDispatch } from "react-redux";

const DetailTag = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);
  const [infortag, setInfortag] = useState(Object);
  const [moderators, setModerators] = useState(Object);
  const [postbest, setPostbest] = useState([]);
  const [total_blog, setTotal_blog] = useState("");
  const [blogbytag, setBlogbytag] = useState([]);
  const [sort, setSort] = useState(-1);
  const [page, setPage] = useState(2);
  const [hasmore, setHasmore] = useState(true);
  const [checkfollow, setCheckfollow] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [btnfl, setbtnfl] = useState(false);
  const [btnunfl, setbtnunfl] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    setPage(Number(page + 1));
    await getAPI(`get-blog-by-tag/${slug}/${page}?sort=${sort}`)
      .then((res) => {
        if (res.data.blogbytag < 3) {
          setHasmore(false);
        }
        let array = blogbytag.concat(res.data.blogbytag);
        setBlogbytag(array);
      })
      .catch((err) => {
        console.log("lôie");
      });
  };

  const followtag = async (idtag: string) => {
    if (!auth.access_token) return handleOpen();
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    setbtnfl(true);
    await patchAPI(`follow-tag`, { idtag }, access_token).then((res) => {
      setCheckfollow(true);
      setbtnfl(false);
    });
  };
  const unfollowtag = async (idtag: string) => {
    if (!auth.access_token) return handleOpen();
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    setbtnunfl(true);
    await patchAPI(`unfollow-tag`, { idtag }, access_token).then((res) => {
      setCheckfollow(false);
      setbtnunfl(false);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadmore(true);
    async function fetchMyAPI1() {
      const blogtag = await getAPI(`get-blog-by-tag/${slug}/${1}?sort=${sort}`);
      if (blogtag.data.blogbytag.length < 3) {
        setHasmore(false);
      } else {
        setHasmore(true);
      }
      setPage(2);
      setBlogbytag(blogtag.data.blogbytag);
      setLoadmore(false);
    }

    fetchMyAPI1();
  }, [sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!auth.user) return;
    setLoadmore(true);
    async function fetchMyAPI() {
      try {
        const res = await getAPI(`get-infor-tag/${slug}`);
        setInfortag(res.data.infortag);
        setModerators(res.data.infortag.moderators);
        setTotal_blog(res.data.infortag.total_blog);
        setPostbest(res.data.favoritePosts);
        // if (auth) {
        //   const isevery: any = auth.user?.my_tags.some((check: any) => {
        //     return check.idtag.toString() == slug;
        //   });
        //   setCheckfollow(isevery);
        // }
        setLoadmore(false);
      } catch (error) {
        history.replace("/not-found");
      }
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (!auth.user) return;
       const isevery: any = auth.user?.my_tags.some((check: any) => {
            return check.idtag.toString() == slug;
          });
          setCheckfollow(isevery);
  },[auth.access_token])

  return (
    <>
      {infortag && (
        <>
          <Container>
            <Info>
              <BackgroundTag></BackgroundTag>
              <div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "400",
                        backgroundColor: "#fff",
                        border: "1px solid #d8d8d8",
                        borderRadius: "10px",
                      }}
                    >
                      <Model>
                        <div style={{ display: "flex" }}>
                          <Titlemodel>Đăng nhập để tiếp tục</Titlemodel>
                        </div>
                        <Descmodel>
                          Chúng tôi là nơi các lập trình viên chia sẻ, cập nhật
                          và phát triển sự nghiệp của họ. Nơi chia sẻ những kiến
                          thức bổ ích thuộc lĩnh vực lập trình{" "}
                        </Descmodel>
                        <button
                          onClick={() => history.push(`/login`)}
                          type="button"
                          className="btn btn-primary"
                          style={{
                            marginRight: "20px",
                            width: "100%",
                            padding: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          Đăng nhập
                        </button>
                        <button
                          onClick={() => history.push(`/register`)}
                          type="button"
                          className="btn"
                          style={{
                            marginRight: "20px",
                            width: "100%",
                            marginTop: "20px",
                          }}
                        >
                          Tạo tài khoản
                        </button>
                      </Model>
                    </Box>
                  </Fade>
                </Modal>
              </div>
              <Wraper>
                <Section>
                  <Lefttag>
                    <SpanTagName>#{infortag?.name}</SpanTagName>
                  </Lefttag>
                  <Righttag>
                    <RowButon>
                      {checkfollow ? (
                        <ButtonFlow>
                          <button
                            type="button"
                            disabled={btnfl}
                            className="btn btn-primary"
                            onClick={() => {
                              unfollowtag(infortag._id);
                            }}
                          >
                            Bỏ theo dõi
                          </button>
                        </ButtonFlow>
                      ) : (
                        <ButtonFlow>
                          <button
                            type="button"
                            disabled={btnunfl}
                            className="btn btn-primary"
                            onClick={() => {
                              followtag(infortag._id);
                            }}
                          >
                            Theo dõi
                          </button>
                        </ButtonFlow>
                      )}
                    </RowButon>
                  </Righttag>
                </Section>
                <Contenttag>{infortag?.description}</Contenttag>
              </Wraper>
            </Info>
            <Content>
              <Left>
                {infortag.guidelines === "" ? null : (
                  <>
                    <Submissionguidelines infor={infortag} />
                    <hr />
                  </>
                )}

                {infortag.abount === "" ? null : (
                  <>
                    <Abouttag infor={infortag} /> <hr />
                  </>
                )}
                {(moderators === null || moderators.role !== "moderators") ? (
                  null
                ) : (
                  <>
                  <Guidelines>Quản trị Tag</Guidelines>
                  <Content>
                    <Avatar
                      alt={moderators.name}
                      src={moderators.avatar}
                      onClick={() => history.push(`/profile/${moderators._id}`)}
                    />
                  </Content>
                  <hr />
                  </>
                )}
                
                <span style={{ color: "#7D7371", fontWeight: "bold" }}>
                  {total_blog} Blog đã được xuất bản
                </span>
              </Left>
              <Mid>
                <FeedContainer>
                  <FeedSectionWraper>
                    <ListNav>
                      {sort === -1 ? (
                        <>
                          <ItemNav>
                            <ContainerItemNav>
                              <TextNav
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                                onClick={() => setSort(-1)}
                              >
                                Blog mới nhất
                              </TextNav>
                            </ContainerItemNav>
                          </ItemNav>
                          <ItemNav>
                            <ContainerItemNav>
                              <TextNav
                                style={{ fontSize: "20px" }}
                                onClick={() => setSort(1)}
                              >
                                Muộn nhất
                              </TextNav>
                            </ContainerItemNav>
                          </ItemNav>
                        </>
                      ) : (
                        <>
                          <ItemNav>
                            <ContainerItemNav>
                              <TextNav
                                style={{ fontSize: "20px" }}
                                onClick={() => setSort(-1)}
                              >
                                Blog mới nhất
                              </TextNav>
                            </ContainerItemNav>
                          </ItemNav>
                          <ItemNav>
                            <ContainerItemNav>
                              <TextNav
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                                onClick={() => setSort(1)}
                              >
                                Muộn nhất
                              </TextNav>
                            </ContainerItemNav>
                          </ItemNav>
                        </>
                      )}
                    </ListNav>
                  </FeedSectionWraper>
                  {loadmore ? (
                    <Loading />
                  ) : (
                    <>
                      {blogbytag.length === 0 ? (
                        <PostContainer style={{ minHeight: "400px" }}>
                          không có bài viết đâu
                        </PostContainer>
                      ) : (
                        <>
                          <InfiniteScroll
                            dataLength={blogbytag.length}
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loading />}
                            endMessage={<p></p>}
                          >
                            <>
                              {blogbytag.map((blog: any, index) => (
                                <>{PostCardNoImg(blog)}</>
                              ))}
                            </>
                          </InfiniteScroll>
                        </>
                      )}
                    </>
                  )}
                </FeedContainer>
              </Mid>
              <Right>
                <PostNewOfTagsWraper>
                  <WraperRowName>
                    <NameTag style={{ fontWeight: "bold", fontSize: "20px" }}>
                      ## Gợi ý cho bạn
                    </NameTag>
                  </WraperRowName>
                  {postbest.map((blog: any, index) => (
                    <WraperRowPost
                      onClick={() => history.push(`/blog/${blog._id}`)}
                    >
                      <Div>
                        <Content
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          {blog.title}
                        </Content>
                      </Div>
                      <Div>
                        <Comment>Tác giả {blog.poster.name}</Comment>
                      </Div>
                    </WraperRowPost>
                  ))}
                </PostNewOfTagsWraper>
              </Right>
            </Content>
          </Container>
        </>
      )}
    </>
  );
};

export default DetailTag;

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
          <TitlePost
            onClick={() => {
              history.push(`/blog/${blog._id}`);
            }}
            style={{ fontWeight: "bold" }}
          >
            {blog.title}
          </TitlePost>

          <WraperTagPost>
            <ListTag>
              {blog.tags.map((infortag: any) => (
                <ItemTag>
                  <DivItem
                    onClick={() => {
                      history.push(`/blog/${blog._id}`);
                    }}
                  >
                    <TextItem>#{infortag.name}</TextItem>
                  </DivItem>
                </ItemTag>
              ))}
            </ListTag>
          </WraperTagPost>

          <ContainerReaction>
            <ReactionLeft>
              <WraperReaction
                onClick={() => {
                  history.push(`/blog/${blog._id}`);
                }}
              >
                <LikeIcon></LikeIcon>
                <span style={{ marginLeft: "10px" }}>
                  {blog.likecount} lượt thích
                </span>
              </WraperReaction>
              <WraperReaction
                onClick={() => {
                  history.push(`/blog/${blog._id}`);
                }}
              >
                <CommentIcon></CommentIcon>
                <span style={{ marginLeft: "10px" }}>
                  {blog.commentcount} Bình luận
                </span>
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

const Container = styled.div`
  width: 100%;
  background-color: #efefef;
  padding: 20px 50px;
`;
const FeedSectionWraper = styled.div`
  width: 100%;
`;
const ListNav = styled.ul`
  list-style: none;
  padding: 10px;
`;
const ItemNav = styled.li`
  display: inline;
`;
const ContainerItemNav = styled.div`
  display: inline-block;
  padding: 10px;
  :hover {
    background-color: #dddeee;
  }
  cursor: pointer;
`;
const TextNav = styled.span``;
const PostContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #d8d8d8;
`;

const ImagePost = styled.img`
  object-fit: cover;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
const ButonWrapAvatar = styled.button`
  border: none;
  margin-right: 10px;
  background-color: transparent;
  :hover {
    opacity: 50%;
  }
  cursor: pointer;
`;
const TimeCreate = styled.span``;
const TitlePost = styled.h1`
  font-size: 30px;
  cursor: pointer;
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

const TimereadSpan = styled.span`
  font-size: 12px;
  margin-right: 10px;
`;
const FeedContainer = styled.div``;
const BtnSave = styled.button`
  padding: 10px;
  margin: 0px;
  border-radius: 10px;
  border-width: 0px;
  background-color: #d6d6d7;
  :hover {
    background-color: #bdbdbd;
  }
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
const Left = styled.div`
  width: 20%;
`;
const Mid = styled.div`
  width: 60%;
  padding-left: 20px;
  padding-right: 20px;
`;
const Right = styled.div`
  width: 20%;
`;
const Info = styled.div`
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 5px;
`;

const Guidelines = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
// model
const Model = styled.div`
  width: 600px;
  height: auto;
  padding: 20px;
`;

const Titlemodel = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const Descmodel = styled.p`
  font-size: 19px;
`;
const CreateButton = styled.button`
  border: none;
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
const Comment = styled.div``;

const Other = styled.div``;
////////User info with button floww
const ContainerUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BackgroundTag = styled.div`
  width: 100%;
  border-radius: 5px 5px 0px 0px;
  height: 25px;
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
const Contenttag = styled.div``;
const Lefttag = styled.div`
  width: 50%;
`;
const Righttag = styled.div`
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
