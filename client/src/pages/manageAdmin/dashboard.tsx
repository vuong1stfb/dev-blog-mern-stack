import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LeftMenu from "./LeftMenu";
import { getAPI, patchAPI } from "../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { WraperIconReact } from "../blog/[slug]";
import Loading from "../../components/global/Loading";
import Menu, { MenuProps } from "@mui/material/Menu";
import InfiniteScroll from "react-infinite-scroll-component";
import { ALERT, IAlertType } from '../../redux/types/alertType';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkTokenExp } from "../../utils/checkTokenExp";

const DashboardAdmin = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state);
  const [listblog, setlistblog] = useState([]);
  const [page, setPage] = useState(2);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [totalall, setTotalAll] = useState({
    tagCount: 0,
    blogCount: 0,
    userCount: 0,
    interactive: []
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fecthdata() {
      window.scrollTo(0, 0);
      if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI("homeadmin", access_token).then((res) => {
          setTotalAll({
            tagCount: res.data.tagCount,
            blogCount: res.data.blogCount,
            userCount: res.data.userCount,
            interactive: res.data.interactive
          })
          console.log(res.data)
      });
    }
    fecthdata();
  }, [auth]);

  return (
    <Container>
      {/* secction@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
     
      <div className="row mt-3">
        <div className="col-md-3">
        <h2 style={{fontWeight: 'bold', marginBottom: "20px"}}>Quản lý trang</h2>
          <LeftMenu isActive="home" />
        </div>
        <div className="col-md-9">
          <div style={{paddingLeft: "80px"}}>

          <div className="row g-3">
        <div className="col-md-5">
        <h3 style={{fontWeight: "bold"}}>Blog</h3>
          <div style={{backgroundColor: '#137FFA'}}  className="p-4 border rounded-3">
            <h2 style={{color: "white"}}>{totalall.blogCount}</h2>
            <p style={{color: "white"}}>Blog đã đăng</p>
          </div>
        </div>
        <div style={{marginLeft: '30px'}} className="col-md-5">
        <h3 style={{fontWeight: "bold"}}>Thành viên</h3>
          <div style={{backgroundColor: '#137FFA'}} className="p-4 border rounded-3">
            <h2 style={{color: "white"}}>{totalall.userCount}</h2>
            <p style={{color: "white"}}>Người dùng</p>
          </div>
        </div>
        <div style={{ marginTop: '60px'}} className="col-md-5">
        <h3 style={{fontWeight: "bold"}}>Thẻ tags</h3>
          <div style={{backgroundColor: '#137FFA'}} className="p-4 border rounded-3">
            <h2 style={{color: "white"}}>{totalall.tagCount}</h2>
            <p style={{color: "white"}}>Tổng số</p>
          </div>
        </div>
        <div style={{marginLeft: '30px', marginTop: '60px'}} className="col-md-5">
        <h3 style={{fontWeight: "bold"}}>Tương tác</h3>
          <div  style={{backgroundColor: '#137FFA'}}  className="p-4 border rounded-3">
            {totalall.interactive.map((inter: any, index: any) => (
              <h2 style={{color: "white"}}>{inter.amount}</h2>
            ))}
            <p style={{color: "white"}}>Lượt tương tác</p>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardAdmin;


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
