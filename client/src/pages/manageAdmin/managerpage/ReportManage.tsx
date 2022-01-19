import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LeftMenu from "../LeftMenu";
import { getAPI, patchAPI } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import moment from "moment";
import { Avatar, AvatarGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
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
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { checkTokenExp } from "../../../utils/checkTokenExp";

export interface BlogReport {
  _id: string;
  title: string;
}

export interface FromUser {
  _id: string;
  name: string;
  avatar: string;
}

export interface UserReport {
  _id: string;
  name: string;
  avatar: string;
}

export interface Reports {
  _id: string;
  message: string;
  blog_report?: BlogReport;
  user_report?: UserReport;
  from_user: FromUser;
  report_process: boolean;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RootObject {
  reports: Reports[];
}

const ReportManage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);
  const [listreport, setlistreport] = useState<Reports[]>([]);
  const [itemreport, setItemreport] = useState<Reports>();
  const [inndex, setIndex] = useState(Number);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openlock, setOpenlock] = React.useState(false);
  const handleOpenlock = () => setOpenlock(true);
  const handleCloselock = () => setOpenlock(false);

  useEffect(() => {
    async function fecthdata() {
      if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI(`get-report`, access_token).then((res) => {
        console.log(res.data.reports);
        setlistreport(res.data.reports);
      });
    }
    fecthdata();
  }, []);

  const readingReport = async (idreport: string, index : number) => {
    dispatch({ type: ALERT, payload: { loading: true } });
    if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
    await patchAPI("delete-report", {idreport: idreport}, access_token).then(res => {
      listreport.splice(index, 1)
      dispatch({ type: ALERT, payload: { loading: false } });
    }).catch(err => {
      dispatch({
        type: ALERT,
        payload: { errors: "Có lỗi xảy ra" },
      });
    })
  }

  return (
    <Container>
      {/* detail report */}
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
                <div style={{ padding: "25px" }}>
                  <h2 style={{ fontWeight: "bold" }}>Thông tin Báo cáo </h2>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#efefef",
                      padding: "20px",
                      borderRadius: "10px",
                      border: "1px solid #d8d8d8",
                    }}
                  >
                    <h5>Nội dung :</h5>
                    <p>{itemreport?.message}</p>
                    {itemreport?.type === "user" ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            backgroundColor: "white",
                            padding: "20px",
                          }}
                        >
                          <Avatar src={itemreport.user_report?.avatar} />
                          <h5 style={{ marginTop: "10px", marginLeft: "10px" }}>
                            {itemreport.user_report?.name}
                          </h5>
                        </div>
                        <button
                          onClick={() => history.push(`/profile/${itemreport.user_report?._id}`)}
                          style={{ width: "100%", marginTop: "20px" }}
                          type="button"
                          className="btn btn-primary"
                        >
                          Xem trang cá nhân
                        </button>
                      </>
                    ) : (
                      <div
                      onClick={()=> history.push(`/blog/${itemreport?.blog_report?._id}`)}
                        style={{
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "10px",
                          border: "1px solid #d8d8d8",
                        }}
                      >
                        <h1 style={{ fontWeight: "bold", cursor: "pointer" }}>
                          {itemreport?.blog_report?.title}
                        </h1>
                      </div>
                    )}
                  </div>

                  {/* <button style={{width: '100%'}} type="button" className="btn btn-danger">Khóa Tài khoản</button> */}
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
          <LeftMenu isActive="reportmanager" />
        </div>
        <div className="col-md-9">
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col d-none d-md-block">
              <Header>
                <div className="header">
                  <div className="reading-list">
                    <h1>Danh sách đơn báo cáo</h1>
                  </div>
                </div>
              </Header>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", fontSize: "19px" }}>
                    Người báo cáo
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "19px" }}
                    align="right"
                  >
                    Kiểu
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "19px" }}
                    align="right"
                  >
                    Thời gian yêu cầu
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
                {/* {listreport.map((report: any, index: number) => ( */}
                {listreport.map((rp: Reports, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex" }}>
                        <Avatar src={rp.from_user.avatar} />
                        <h5 style={{ marginTop: "10px", marginLeft: "10px" }}>
                          {rp.from_user.name}
                        </h5>
                      </div>
                    </TableCell>
                    {rp.type === "user" ? (
                      <TableCell align="right">Báo cáo người dùng</TableCell>
                    ) : (
                      <TableCell align="right">Báo cáo blog</TableCell>
                    )}
                    <TableCell align="right">
                      {moment(rp.createdAt).fromNow()}
                    </TableCell>
                    <TableCell style={{ color: "red" }} align="right">
                      Đang chờ
                    </TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => {
                          handleOpenlock();
                          setItemreport(rp);
                        }}
                        style={{ marginLeft: "5px" }}
                        type="button"
                        className="btn btn-info"
                      >
                        Chi tiết
                      </button>
                      <button
                      onClick={()=> readingReport(rp._id, index)}
                        style={{ marginLeft: "5px" }}
                        type="button"
                        className="btn btn-danger"
                      >
                       Đã xử lý
                      </button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default ReportManage;

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

const Model = styled.div`
  width: 800px;
  height: auto;
  padding: 20px 40px;
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
