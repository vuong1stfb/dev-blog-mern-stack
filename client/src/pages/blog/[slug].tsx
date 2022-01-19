import styled from "styled-components";
import { alpha } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CustomizedMenus from "../CustomizedMenus";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { CardPostDetail } from "../../components/homePage/feed/Feed";
import CommentSection from "./CommentSection";
import CommentCreate from "./CommentCreate";
import ItemCommentUser from "./ItemCommentUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useHistory, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  IParams,
  ObjectFromGetApiBlogByID,
  RootStore,
  IComment,
  IUser,
  Poster,
} from "../../utils/TypeScript";
import { useEffect, useState } from "react";
import { getAPI, patchAPI } from "../../utils/FetchData";
import Loading from "../../components/global/Loading";
import { showErrMsg } from "../../components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import NotFound from "../../components/global/NotFound";
import { createComment, getComments } from "../../redux/actions/commentAction";
import { checkTokenExp } from "../../utils/checkTokenExp";
import ReportIcon from '@mui/icons-material/Report';
import Divider from "@mui/material/Divider";


const DetailPost = () => {
  const id = useParams<IParams>().slug;
  const dispatch = useDispatch();
  const history = useHistory();
  const [showcomments, setShowComments] = useState<IComment[]>([]);
  const { auth, comments } = useSelector((state: RootStore) => state);
  const [checkfollow, setCheckfollow] = useState(false);
  const [checklike, setChecklike] = useState(false);
  const [likecount, setLikecount] = useState(0);
  const [savedcount, setSavedcount] = useState(0);
  const [commentcount, setCommentcount] = useState(0);
  const [checksave, setChecksave] = useState(false);
  const [checkmod, setcheckmod] = useState(false);
  const [blog, setBlog] = useState<ObjectFromGetApiBlogByID | null | undefined>(
    null
  );
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const cmt = { cmt: "vuong reply", root: "id" };

  const unlikeblog = async (idblog: any) => {
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI(`unlike-blog`, { idblog: idblog }, access_token).then(
      (res) => {
        setLikecount(likecount - 1);
        setChecklike(false);
      }
    );
  };

  const likeblog = async (idblog: any, iduserblog: any) => {
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI(
      `like-blog`,
      { idblog: idblog, id_user_blog: iduserblog },
      access_token
    ).then((res) => {
      setLikecount(likecount + 1);
      setChecklike(true);
    });
  };

  
  const savedblog = async (idblog: any) => {
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI(`save-post`, { idblog: idblog }, access_token).then(
      (res) => {
        setSavedcount(savedcount + 1);
        setChecksave(true);
      }
    );
  };
  const unsavedblog = async (idblog: any) => {
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI(`unsave-post`, { idblog: idblog }, access_token).then(
      (res) => {
        setSavedcount(savedcount - 1);
        setChecksave(false);
      }
    );
  };

  const sendComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;
    const data = {
      content: body,
      user: auth.user as IUser,
      id_blog: blog?.blog._id as string,
      id_user_blog: (blog?.blog.poster as Poster)._id,
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showcomments]);
    dispatch(createComment(data, auth.access_token));
  };

  const fectComment = async (id: string) => {
    await dispatch(getComments(id));
  };

  const viewblog = async () => {
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI(`view-blog`, { idblog: blog?.blog._id }, access_token)
  }

  useEffect(() => {
    if (comments.data.length === 0) return;
    setShowComments(comments.data);
  }, [comments.data, history]);

  useEffect(() => {
    if(!auth.access_token) return;
    if(!blog) return;
      const isevery: any = auth.user?.my_follow.some((check: any) => {
        return check === blog?.blog.poster._id;
      });
      setCheckfollow(isevery);
      const ischecksave: any = auth.user?.post_saved.some((check: any) => {
        return check === blog?.blog._id;
      });
      const ischeckview: any = blog.blog.viewer.some((check: any) => {
        return check === auth.user?._id;
      });

      if(ischeckview === false){
        viewblog()
      }

      if(auth.user?.role === "moderators"){
        const checkmodtag: any = blog.blog.tags.some((check: any) => {
          return check.moderators === auth.user?._id;
        });
        setcheckmod(checkmodtag) 
      }

      setChecksave(ischecksave);
      fectComment(blog.blog._id);
  },[auth, blog])

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (!id) return;
    getAPI(`blog/${id}?iduser=${auth.user?._id}`)
      .then((res) => {
        setBlog(res.data);
        setChecklike(res.data.liked);
        setLikecount(Number(res.data.blog.likecount));
        setSavedcount(Number(res.data.blog.saved));
        setCommentcount(Number(res.data.blog.commentcount));
        setLoading(false);
      })
      .catch((err) => {
        setError(err + "");
        setLoading(false);
      });
  }, [id,history]);

  return (
    <>
      {error && showErrMsg(error)}
      {error && <NotFound />}
      {loading ? <Loading /> : <>

      {blog && (
        <Container>
          <LeftNav>
            <div style={{ position: "fixed" }}>
              <WraperReaction>
                {checklike ? (
                  <WraperIconReact
                    style={{ color: "red" }}
                    onClick={() => unlikeblog(blog.blog._id)}
                  >
                    <FavoriteIcon></FavoriteIcon>
                  </WraperIconReact>
                ) : (
                  <WraperIconReact
                    onClick={() =>
                      likeblog(blog.blog._id, blog.blog.poster._id)
                    }
                  >
                    <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                  </WraperIconReact>
                )}

                <WraperNumberReact>
                  <SpanNumber>{likecount}</SpanNumber>
                </WraperNumberReact>
              </WraperReaction>
              <WraperReaction>
                {checksave ? (
                  <WraperIconReact
                    style={{ color: "red" }}
                    onClick={() => unsavedblog(blog.blog._id)}
                  >
                    <BookmarkIcon></BookmarkIcon>
                  </WraperIconReact>
                ) : (
                  <WraperIconReact onClick={() => savedblog(blog.blog._id)}>
                    <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
                  </WraperIconReact>
                )}

                <WraperNumberReact>
                  <SpanNumber>{savedcount}</SpanNumber>
                </WraperNumberReact>
              </WraperReaction>

              <WraperReaction>
                <WraperIconReact onClick={handleClick}><MoreHorizOutlinedIcon ></MoreHorizOutlinedIcon></WraperIconReact>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Divider sx={{ my: 0.5 }} />
        {checkmod ? <MenuItem onClick={() => {handleClose(); history.push(`/removeblogbymod/${blog.blog._id}`)}} disableRipple>
          <ReportIcon />
          Xóa blog
        </MenuItem> : null}
        
        <MenuItem onClick={() => {handleClose(); history.push(`/reportblog/${blog.blog._id}`)}} disableRipple>
          <ReportIcon />
          Báo cáo Blog
        </MenuItem>
      </StyledMenu>
              </WraperReaction>
            </div>
          </LeftNav>
          <WraperBody>
            <Mid>
              <Block1>
                {CardPostDetail(blog)}
                {CommentSection(showcomments.length)}
                <WrapCmt>
                  {auth.user ? (
                    <CommentCreate
                      callback={sendComment}
                      imageuser={auth.user.avatar}
                    />
                  ) : null}

                  {showcomments.map((comment, index) => (
                    <ItemCommentUser comment={comment} />
                  ))}
                  {/* {<ItemCommentUser/>} */}
                </WrapCmt>
              </Block1>
              <div
                className="p-5 my-2 d-flex flex-column gap-3"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D8D8D8",
                  borderRadius: "5px",
                }}
              >
                <h4>Đọc thêm</h4>

                {blog.blogSameTag.map((blog: any, index: number) => (
                    <div className="row align-items-center">
                    <div className="col-auto">
                      <Avatar
                        src={blog.poster.avatar}
                        alt="none"
                      ></Avatar>
                    </div>
                    <div className="col d-flex flex-column" onClick={()=> history.push(`/blog/${blog._id}`)}>
                      <span className="item-roadnext-title">
                        {blog.title}
                      </span>
                      <span className="item-roadnext-user">
                        {moment(blog.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Mid>

            <Right>
              <Containeruser>
                <RowUser className="">
                  <A>
                    <span style={{ marginRight: "10px" }}>
                      <Avatar
                        alt={blog.blog.poster.name}
                        src={blog.blog.poster.avatar}
                      />
                    </span>
                    <SpanName
                      className=""
                      style={{ fontStyle: "normal", textDecoration: "none" }}
                    >
                      {blog.blog.poster.name}
                    </SpanName>
                  </A>
                </RowUser>
                <RowButon className="print-hidden">
                <ButtonFlow
                      onClick={() =>
                        history.push(`/profile/${blog.blog.poster._id}`)
                      }
                    >
                      Trang cá nhân
                    </ButtonFlow>
                </RowButon>

                <RowDesc className="color-base-70">
                  {blog.blog.poster.story}
                </RowDesc>
                <RowListInfo className="user-metadata-details">
                  <Ul className="user-metadata-details-inner">
                    {blog.blog.poster.work === "" ? null : (
                      <Li>
                        <DivDesc className="key">Công việc</DivDesc>
                        <DivValue className="value">
                          {blog.blog.poster.work}
                        </DivValue>
                      </Li>
                    )}
                    {blog.blog.poster.learning === "" ? null : (
                      <Li>
                        <DivDesc className="key">Học vấn</DivDesc>
                        <DivValue className="value">
                          {blog.blog.poster.learning}
                        </DivValue>
                      </Li>
                    )}
                    {blog.blog.poster.location === "" ? null : (
                      <Li>
                        <DivDesc className="key">Địa chỉ</DivDesc>
                        <div className="value">{blog.blog.poster.location}</div>
                      </Li>
                    )}
                    <Li>
                      <DivDesc className="key">Tham gia ngày</DivDesc>
                      <div className="value">
                        <time className="date">
                          {moment(blog.blog.poster.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </time>
                      </div>
                    </Li>
                  </Ul>
                </RowListInfo>
              </Containeruser>
              {blog.blogSameUser.length === 0 ? null : <MoreFromUser>
                <WrapTitleMore>
                  <SpanMore>Bài viết của</SpanMore>{" "}
                  <SpanNameUser>{blog.blog.poster.name}</SpanNameUser>
                </WrapTitleMore>
                {blog.blogSameUser.map((blog:any, index: number) => (
                  <WrapItemPostMore onClick={() => history.push(`/blog/${blog._id}`)}>
                  <div>
                    <SpanTitleMore>
                        {blog.title}
                    </SpanTitleMore>
                  </div>
                  <div>
                    {blog.tags.map((tag:any,  index: number) => (
                      <TagsMore>#{tag.name}</TagsMore>
                    ))}
                  </div>
                </WrapItemPostMore>
                ))}
                
              </MoreFromUser>}
              
            </Right>
          </WraperBody>
        </Container>
      )}
      </>}
    </>
  );
};

export default DetailPost;
const WraperBody = styled.div`
  display: flex;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
  width: 100%;
`;
const WrapTitleMore = styled.div`
  padding: 10px;
`;
const SpanTitleMore = styled.span`
  color: #323ebe;
  line-height: 24px;
`;
const TagsMore = styled.span`
  color: #575757;
  display: inline;
  font-size: 14px;
  line-height: 21px;
  margin: 0px 7px 0px 0px;
`;
const WrapItemPostMore = styled.div`
  border-top: 1px solid #d8d8d8;
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: white;
  }
`;
const SpanMore = styled.span`
  color: #242424;
  /* font-family: -apple-system; */
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
`;
const SpanNameUser = styled.span`
  color: #3b49df;
  display: inline;
  /* font-family: -apple-system; */
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  cursor: pointer;
`;
const MoreFromUser = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 10px;

  border: 1px solid #d8d8d8;
`;
const Mid = styled.div`
  flex: 7;
`;
const Containeruser = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #d8d8d8;
  margin-bottom: 5px;
`;
const RowUser = styled.div`
  margin-bottom: 10px;
`;
const RowButon = styled.div``;
const RowDesc = styled.div`
  margin-bottom: 10px;
`;

const RowListInfo = styled.div``;
const A = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;
const Ul = styled.ul`
  list-style: none;
  padding: 0px;
`;
const Li = styled.li`
  margin-bottom: 10px;
`;
const ButtonFlow = styled.button`
  width: 100%;
  border: 0px;
  background-color: #3b49df;
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-weight: 500;
`;
const SpanName = styled.span`
  font-size: 20px;
  color: #3d3d3d;
`;
const DivDesc = styled.div`
  font-weight: 500;
`;
const DivValue = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: row;

  padding: 30px;
  background-color: #efefef;

  .item-roadnext-title {
    /* font-family: -apple-system; */
    font-size: 20px;
    font-weight: 700;
    line-height: 25px;
    cursor: pointer;
    :hover {
      color: #323ebe;
    }
  }
  .item-roadnext-user {
    /* font-family: -apple-system; */
    line-height: 24px;
    padding: 4px 0px 0px;
    cursor: pointer;
    :hover {
      color: #323ebe;
    }
  }
`;
const LeftNav = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 80px;
  flex-shrink: 0;
`;
const Block1 = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  padding-bottom: 20px;
`;
const Right = styled.div`
  display: flex;

  flex-direction: column;
  flex: 3;
  background-color: #efefef;
  padding: 10px;
`;
////@@@@@@@@@@@@@@@@@@@ LEFT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const WraperReaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;
`;
const WraperNumberReact = styled.div`
  display: inline;
`;

const SpanNumber = styled.span``;
export const WraperIconReact = styled.div`
  display: inline;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    background-color: #edd9d9;
  }
  &:hover {
    ${WraperNumberReact} {
      background-color: #165252;
    }
    ${SpanNumber} {
      background-color: lime;
    }
  }
`;
const WrapCmt = styled.div`
  padding-right: 50px;
  padding-left: 50px;
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    // marginTop: theme.spacing(1),
    minWidth: 180,
    // color:
    //   theme.palette.mode === "light"
    //     ? "rgb(55, 65, 81)"
    //     : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        // marginRight: theme.spacing(1.5),
      },
      // "&:active": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     theme.palette.action.selectedOpacity
      //   ),
      // },
    },
  },
}));
