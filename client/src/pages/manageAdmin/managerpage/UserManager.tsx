import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LeftMenu from "../LeftMenu";
import { getAPI, patchAPI, postAPI } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { WraperIconReact } from "../../blog/[slug]";
import Loading from "../../../components/global/Loading";
import Menu, { MenuProps } from "@mui/material/Menu";
import InfiniteScroll from "react-infinite-scroll-component";
import { ALERT, IAlertType } from "../../../redux/types/alertType";
import { useDispatch } from "react-redux";
import { Avatar, AvatarGroup } from "@mui/material";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Formik, Form, Field, useFormik } from "formik";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { checkTokenExp } from "../../../utils/checkTokenExp";

const UserManage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);
  const [listuser, setlistuser] = useState(Array);

  const [page, setPage] = useState(2);
  const [indexuser, setIndexuser] = useState(Number);
  const [search, setsearch] = useState("");
  const [userid, setUserid] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openlock, setOpenlock] = React.useState(false);
  const handleOpenlock = () => setOpenlock(true);
  const handleCloselock = () => setOpenlock(false);
  const [openaddmod, setOpenaddmod] = React.useState(false);
  const handleOpenaddmod = () => setOpenaddmod(true);
  const handleCloseaddmod = () => setOpenaddmod(false);
  const [openunlock, setOpenunlock] = React.useState(false);
  const handleOpenunlock = () => setOpenunlock(true);
  const handleCloseunlock = () => setOpenunlock(false);


  useEffect(() => {
    async function fecthdata() {
      if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI(`getlistusermanager?searchvalue=${search}`, access_token).then(
        (res) => {
          setlistuser(res.data.searchresult);
          console.log(res.data.searchresult);
        }
      );
    }
    fecthdata();
  }, [search]);

  const lockUser = async () => {
    if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
    await patchAPI("lockuser", {userid: userid}, access_token).then(res => {
      listuser.splice(indexuser,1,res.data.user)
      handleCloselock()
    })
  }
  const unlockUser = async () => {
    if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
    await patchAPI("unlockuser", {userid: userid}, access_token).then(res => {
      listuser.splice(indexuser,1,res.data.user)
      handleCloseunlock()
    })
  }

  const addmod = async () => {
    if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
    await postAPI("addmoderators", {iduser: userid}, access_token).then(res => {
      listuser.splice(indexuser,1,res.data.user)
      handleCloseaddmod()
    })
  }

  return (
    <Container>
      {/* lockuser */}
       <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openlock}
          onClose={handleCloselock}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openlock}>
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
                <div style={{padding: "25px"}}>
                  <h3>Bạn có chắc chắn muốn mở khóa tài khoản này ? </h3>
                  <p>Tài khoản sau khi mở khóa sẽ vẫn tiếp tục đăng nhập và sử dụng dịch vụ</p>
                  <button onClick={() => unlockUser()} style={{width: '100%'}} type="button" className="btn btn-danger">Khóa Tài khoản</button>
                </div>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>

      {/* add mod */}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openaddmod}
          onClose={handleCloseaddmod}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openaddmod}>
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
                <div style={{padding: "25px"}}>
                  <h3>Bạn có chắc chắn muốn đặt người dùng này làm Quản trị  </h3>
                  {/* <p>Tài khoản sau khi mở khóa sẽ vẫn tiếp tục đăng nhập và sử dụng dịch vụ</p> */}
                  <button onClick={() => addmod()} style={{width: '100%'}} type="button" className="btn btn-danger">Thêm quản trị</button>
                </div>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>

{/* unlock */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openunlock}
          onClose={handleCloseunlock}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openunlock}>
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
                <div style={{padding: "25px"}}>
                  <h3>Bạn có chắc chắn muốn khóa tài khoản này ? </h3>
                  <p>Tài khoản sau khi bị khóa sẽ không thể đăng nhập cho đến khi được mở khóa</p>
                  <button onClick={() => unlockUser()} style={{width: '100%'}} type="button" className="btn btn-danger">Mở khóa tài khoản</button>
                </div>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>


      <div className="row mt-3">
        <div className="col-md-3">
          <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Quản lý trang
          </h2>
          <LeftMenu isActive="usermanager" />
        </div>
        <div className="col-md-9">
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col d-none d-md-block">
              <Header>
                <div className="header">
                  <div className="reading-list">
                    <h1>Quản lý Người dùng</h1>
                  </div>

                  <Formik
                    enableReinitialize={true}
                    initialValues={{ valuesearch: search }}
                    onSubmit={(values, { resetForm }) => {
                      setsearch(values.valuesearch);
                    }}
                  >
                    <Form>
                      <Field
                        className="search-usermanage"
                        name="valuesearch"
                        autocomplete="off"
                        type="text"
                        placeholder="Tìm kiếm bài viết..."
                      />
                    </Form>
                  </Formik>
                </div>
              </Header>
            </div>
            <TableContainer style={{ marginTop: "20px" }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: "19px" }}>
                      Tên người dùng
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontSize: "19px" }}
                      align="right"
                    >
                      Chức vụ
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontSize: "19px" }}
                      align="right"
                    >
                      Ngày tham gia
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontSize: "19px" }}
                      align="right"
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontSize: "19px" }}
                      align="right"
                    >
                      Tùy chọn
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listuser.map((user: any, index: number) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div style={{ display: "flex" }}>
                          <Avatar src={user.avatar} />
                          <h5 style={{ marginTop: "10px", marginLeft: "10px" }}>
                            {user.name}
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {user.role === "user" ? (
                          "Người dùng"
                        ) : (
                          <p style={{ color: "red" }}>Quản trị viên</p>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {moment(user.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {user.is_destroy === true
                          ? "Tạm khóa"
                          : "Đang hoạt động"}
                      </TableCell>
                      <TableCell align="right">
                        <button
                        onClick={() => history.push(`/profile/${user._id}`)}
                          style={{ marginLeft: "5px" }}
                          type="button"
                          className="btn btn-info"
                        >
                          Profile
                        </button>
                        {/* {user.role === "user" ? 
                        <button
                          style={{ marginLeft: "5px" }}
                          type="button"
                          className="btn btn-primary"
                        >
                          <AddCircleOutlineIcon />
                        </button>
                          : null} */}
                        {user.is_destroy === true ? 
                              <button
                              onClick={() => {handleOpenunlock(); setUserid(user._id); setIndexuser(index)}}
                              style={{ marginLeft: "5px" }}
                              type="button"
                              className="btn btn-success"
                            >
                              <LockOpenIcon/>
                            </button>
                            : 
                            <button
                                onClick={() => {handleOpenlock(); setUserid(user._id); setIndexuser(index)}}
                                style={{ marginLeft: "5px" }}
                                type="button"
                                className="btn btn-danger"
                              >
                                <LockIcon/>
                              </button>

                          }
                            {user.role === "moderators" ? null : 
                            <button
                            onClick={() => {handleOpenaddmod(); setUserid(user._id); setIndexuser(index)}}
                            style={{ marginLeft: "5px" }}
                            type="button"
                            className="btn btn-danger"
                            >
                            Thêm quản trị
                            </button>
                          }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserManage;

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

const Header = styled.div`
  .header {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    @media only screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
    .reading-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > h1 {
        align-items: center;
        color: #090909;
        display: flex;

        font-size: 30px;
        font-weight: 700;
        line-height: 45px;
      }
      > a {
        background-color: #efefef;
        border-color: rgb(214, 214, 215);
        border-radius: 6px;
        border-style: solid;
        border-width: 2px;

        color: #090909;
        /* font-family: -apple-system; */
        font-weight: 500;
        line-height: 24px;
        padding: 6px 14px;
        text-align: center;
        text-decoration: none;

        :hover {
          background-color: rgb(231, 231, 231);
          border-color: rgb(163, 163, 163);
        }
      }
    }
    .search {
      border-radius: 6px;
      border-style: solid;
      border-width: 1px;
      color: #090909;
      line-height: 24px;
      padding: 7px 8px;
      outline: none;

      :hover {
        border-color: black;
      }
      :focus {
        border: 1px solid blue;
      }
      @media only screen and (max-width: 768px) {
        width: 100%;
      }
    }
    .form-select {
      display: none;
      margin-bottom: 10px;
      @media only screen and (max-width: 768px) {
        display: block;
      }
    }
  }
  // .body {
  //   display: grid;
  //   grid-template-columns: 240px 1fr;
  //   gap: 5px;
  // }
`;

const Container = styled.div`
  background-color: rgb(239, 239, 239);
  padding: 30px 50px;
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
const Model = styled.div`
  width: 800px;
  height: auto;
  padding: 20px 40px;
`;

const Titlemodel = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const Descmodel = styled.p`
  font-size: 19px;
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
