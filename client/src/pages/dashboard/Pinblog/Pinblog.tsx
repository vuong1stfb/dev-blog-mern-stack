import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import AlertDialog from "./dialogdelete";
import LeftMenu from "../LeftMenu";
import { getAPI,patchAPI } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { WraperIconReact } from "../../blog/[slug]";
import Loading from "../../../components/global/Loading";
import Menu, { MenuProps } from "@mui/material/Menu";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ALERT } from '../../../redux/types/alertType';
import { checkTokenExp } from '../../../utils/checkTokenExp'

const Pinblog = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory()
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  const [listblog, setlistblog] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const unpinBlog = async (id: any, index: number) => {
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI("un-pin-blog", {idblog: id}, access_token).then(async (res) => {
      listblog.splice(index, 1)
      dispatch({ type: ALERT, payload: { success: "Đã Gỡ ghim blog" } })
    }).catch(err => {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    })
  }

  useEffect(() => {
    async function fectdata() {
      if(!auth.access_token) return;
      window.scrollTo(0, 0);
      setLoading(true)
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI("get-blog-pin", access_token).then(res => {
        setlistblog(res.data.listBlog)
        console.log(res.data.listBlog)
        setLoading(false)
      })
    }
    fectdata()
  }, [auth.access_token])


  return (
    <Container>
      {/* secction@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <h2>Bảng điều khiển » Ghim</h2>

      {/* body@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <div className="row mt-3">
        <div className="col-md-3">
          <LeftMenu isActive="pinblog"></LeftMenu>
        </div>
        
        {/* content right@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        
        <div className="col-md-9 ">
        {loading ? <Loading/> : <>
        {listblog.length === 0 ? <div className="notfound">
          Không có bài viết nào được Ghim...
          </div> :  <>
          
          {listblog.map((blog:any, index: number) => (
              <div className="wrap-post-card" key={index}>
              <div className="row">
                <div className=" col-12 col-md-11">
                  <div style={{ marginBottom: "5px" }}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                      to={`/blog/${blog._id}`}
                    >
                      <span className="spantitle">{blog.title}</span>
                    </Link>
                  </div>
                  <div className="col-6 col-md-11">
                    <div className="row" style={{ height: "100%" }}>
                      <div className="col-auto">
                        <span className="spanViewReact">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            role="img"
                            aria-labelledby="aa2r27ks5a7szf14rfdc8horatga0e36"
                            className="crayons-icon mr-1"
                          >
                            <title id="aa2r27ks5a7szf14rfdc8horatga0e36">
                              Reactions
                            </title>
                            <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                          </svg>
                         {blog.likecount} lượt thích
                        </span>
                      </div>

                      <div className="col-auto">
                        <span className="spanViewReact">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            role="img"
                            aria-labelledby="a5tjol8kg3sunh029romim1kmocmy3fw"
                            className="crayons-icon mr-1"
                          >
                            <title id="a5tjol8kg3sunh029romim1kmocmy3fw">
                              Comments
                            </title>
                            <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                          </svg>
                         {blog.commentcount} bình luận
                        </span>
                      </div>
                      <div className="col-auto">
                        <span className="spanViewReact">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-labelledby="as6uvtg2ss9eerrglob7wpmcliy7v1bt"
                            className="crayons-icon mr-1"
                          >
                            <title id="as6uvtg2ss9eerrglob7wpmcliy7v1bt">
                              Views
                            </title>
                            <path d="M12 5.5c3.987 0 7.304 2.802 8 6.5-.695 3.698-4.013 6.5-8 6.5S4.696 15.698 4 12c.695-3.698 4.013-6.5 8-6.5zm0 11.556a6.76 6.76 0 004.15-1.42A6.486 6.486 0 0018.49 12a6.487 6.487 0 00-2.341-3.633A6.76 6.76 0 0012 6.951c-1.507 0-2.97.499-4.149 1.416A6.487 6.487 0 005.51 12a6.486 6.486 0 002.34 3.636 6.76 6.76 0 004.15 1.42zm0-1.806a3.368 3.368 0 01-2.353-.952A3.212 3.212 0 018.673 12c0-.862.35-1.689.974-2.298A3.368 3.368 0 0112 8.75c.883 0 1.729.342 2.353.952.624.61.975 1.436.975 2.298 0 .862-.351 1.689-.975 2.298-.624.61-1.47.952-2.353.952zm0-1.444c.49 0 .96-.19 1.307-.53.347-.338.542-.797.542-1.276s-.195-.938-.542-1.277A1.871 1.871 0 0012 10.194c-.49 0-.96.19-1.307.53A1.785 1.785 0 0010.15 12c0 .479.195.938.542 1.277.347.338.817.529 1.307.529z"></path>
                          </svg>
                          {blog.viewer.length} lượt xem
                        </span>
                      </div>
                      <div className="col-auto">
                        <span className="spanViewReact">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-labelledby="as6uvtg2ss9eerrglob7wpmcliy7v1bt"
                            className="crayons-icon mr-1"
                          >
                            <title id="as6uvtg2ss9eerrglob7wpmcliy7v1bt">
                              Views
                            </title>
                            <path d="M12 5.5c3.987 0 7.304 2.802 8 6.5-.695 3.698-4.013 6.5-8 6.5S4.696 15.698 4 12c.695-3.698 4.013-6.5 8-6.5zm0 11.556a6.76 6.76 0 004.15-1.42A6.486 6.486 0 0018.49 12a6.487 6.487 0 00-2.341-3.633A6.76 6.76 0 0012 6.951c-1.507 0-2.97.499-4.149 1.416A6.487 6.487 0 005.51 12a6.486 6.486 0 002.34 3.636 6.76 6.76 0 004.15 1.42zm0-1.806a3.368 3.368 0 01-2.353-.952A3.212 3.212 0 018.673 12c0-.862.35-1.689.974-2.298A3.368 3.368 0 0112 8.75c.883 0 1.729.342 2.353.952.624.61.975 1.436.975 2.298 0 .862-.351 1.689-.975 2.298-.624.61-1.47.952-2.353.952zm0-1.444c.49 0 .96-.19 1.307-.53.347-.338.542-.797.542-1.276s-.195-.938-.542-1.277A1.871 1.871 0 0012 10.194c-.49 0-.96.19-1.307.53A1.785 1.785 0 0010.15 12c0 .479.195.938.542 1.277.347.338.817.529 1.307.529z"></path>
                          </svg>
                          {blog.saved} lượt lưu
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "7px" }}>
                    <span>
                      <strong style={{ color: "#717171" }}>
                      Thời gian đăng
                      </strong>{" "}
                      : {moment(blog.createdAt).fromNow()}
                    </span>
                  </div>
                  <div style={{ marginTop: "7px" }}>
                              <span>
                                <strong style={{ color: "#717171" }}>
                                  Trạng thái
                                </strong>{" "}
                                : {blog.status}
                              </span>
                            </div>
                </div>

                <div className="col-6 col-md-1" style={{display: "flex", alignItems: 'center'}}>
                <button onClick={() => unpinBlog(blog._id, index)} className="btn btn-primary">Gỡ</button>
                </div>
              </div>
            </div>
          ))}
                      </>}
                      </>}
                      </div>
                    
          </div>
    </Container>
  );
};

export default Pinblog;


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
  background-color: rgb(239, 239, 239);
  padding: 50px;
  width: 100%;
  min-height: 90vh;
  .notfound {
    border: 1px solid #d8d8d8;
    background-color: rgb(249, 249, 249);
    width: 100%;
    display: inline-block;
    font-size: 18px;
    line-height: 12px;
    padding: 62px;
    border-radius: 10px;
    text-align: center;
  }

  .item-section {
    background-color: #f9f9f9;
  }
  .wrap-post-card {
    margin-bottom: 5px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    :hover {
      background-color: #f9f9f9;
    }
  }
  .wrapbutton {
    padding: 5px 10px;
    border-radius: 5px;
    :hover {
      background-color: #f0f0f0;
    }
  }
  .spanViewReact {
    display: inline-block;
  }
  .spantitle {
    color: blue;
    font-size: 27px;
    font-weight: bold;
    cursor: pointer;
  }
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
    //   marginTop: theme.spacing(1),
    minWidth: 180,
    //   color:
    //     theme.palette.mode === "light"
    //       ? "rgb(55, 65, 81)"
    //       : "",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        //   color: theme.palette.text.secondary,
        //   marginRight: theme.spacing(1.5),
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
