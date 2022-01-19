import React, { useState, useEffect } from "react";
import { styled as styled1, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field, useFormik } from "formik";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import TemporaryDrawer from "./Drawer";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { logout } from "../../redux/actions/authAction";
import "../../styles/inputform.css";
import { getAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";

const Search = styled1("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled1("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled1(InputBase)(({ theme }) => ({
  color: "black",
  border: "1px solid rgb(214,214,215)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  const { socket } = useSelector((state: RootStore) => state);
  const local = localStorage.getItem("logged");
  const [countnoti, setCountNoti] = useState(Number)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

// get count noti
  useEffect(() => {
    async function fectdata() {
        if(!auth.access_token) return;
        const result = await checkTokenExp(auth.access_token, dispatch)
        const access_token = result ? result : auth.access_token
        await getAPI('get-count-notifi', access_token).then(res => {
          setCountNoti(res.data.countNoti)
        })
    }
    fectdata()
  },[auth.access_token])

  useEffect(() => {
    if(!socket) return;
    socket.on("new_noti", function (data: any) {
      if(data.msg === 'lockaccount'){
        
      }else{
        setCountNoti(countnoti => countnoti + 1)
      }
  });
  },[socket])
  

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {" "}
      {auth.user && (
        <>
          <MenuItem
            style={{
              width: "250px",
              height: "60px",
              marginBottom: "3px",
              borderBottom: "1px solid #efefef",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#053DF0 ",
            }}
            onClick={() => {
              handleMenuClose();
              history.push(`/profile/${auth.user?._id}`);
            }}
          >
            {auth.user.name}
          </MenuItem>
          {auth.user.role === "admin" ? <MenuItem
            onClick={() => {
              handleMenuClose();
              history.push("/manager/home");
            }}
          >
            Quản lý trang
          </MenuItem> : null}
          
          <MenuItem
            onClick={() => {
              handleMenuClose();
              history.push("/create_blog");
            }}
          >
            Tạo Blog
          </MenuItem>
          <MenuItem onClick={() => {
              handleMenuClose();
              history.push(`/reading_list`);
            }}>Danh sách đọc</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              history.push(`/dashboard/post`);
            }}
          >
            Bảng điều khiển
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              history.push(`/settings/${auth.user?._id}`);
            }}
          >
            Cài đặt tài khoản
          </MenuItem>
          <MenuItem
            style={{
              width: "250px",
              height: "60px",
              marginBottom: "3px",
              borderTop: "1px solid #efefef",
            }}
            onClick={() => {
              handleMenuClose();
              history.push(`/signout_confirm/${auth.user?._id}`);
            }}
          >
            Đăng xuất
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={countnoti} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Thông báo</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle style={{ fill: "black" }} />
        </IconButton>
        <p>Trang cá nhân</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <TemporaryDrawer />
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => history.push("/")}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  backgroundColor: "black",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  border: "5px",
                  cursor: "pointer",
                },
              }}
            >
              DevBlog
            </Typography>
            <Search className="Search">
              <SearchIconWrapper className="SearchIconWrapper">
                <SearchIcon style={{ fill: "black" }} />
              </SearchIconWrapper>
              {/* <StyledInputBase
                className="StyledInputBase"
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "search" }}
                onSubmit={() => console.log("ss")}
              /> */}
              {/* <input onSubmit={()=> console.log('ss')} ></input> */}
              <Formik
                enableReinitialize={true}
                initialValues={{ valuesearch: "" }}
                onSubmit={(values, { resetForm }) => {
                  if(values.valuesearch === '') return;
                  history.push(
                    `/search?v=${values.valuesearch
                      .trim()
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  );
                  resetForm();
                }}
              >
                <Form>
                  <Field
                    className="search-header"
                    name="valuesearch"
                    autocomplete="off"
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                  />
                </Form>
              </Formik>
            </Search>

            <Box sx={{ flexGrow: 1 }} />

            {!auth.access_token && !local ? (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography
                  component="div"
                  onClick={() => history.push("/login")}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                      marginRight: "17px",
                      color: "black",
                      padding: "8px",
                      fontSize: "19px",
                      border: "5px",
                      cursor: "pointer",
                    },
                  }}
                >
                  Đăng nhập
                </Typography>
                <Typography
                  component="div"
                  onClick={() => history.push("/register")}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                      color: "white",
                      backgroundColor: "#053DF0",
                      borderRadius: "4px",
                      padding: "8px 10px",
                      border: "5px",
                      fontSize: "19px",
                      cursor: "pointer",
                    },
                  }}
                >
                  Đăng ký tài khoản
                </Typography>
              </Box>
            ) : (
              <>
                {auth.user && (
                  <>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                      {/* <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                      >
                        <Badge badgeContent={4} color="error">
                          <MailIcon className="icon" />
                        </Badge>
                      </IconButton> */}
                      <IconButton
                       
                        onClick={() => {history.push("/notification"); setCountNoti(0)}}
                        size="large"
                        aria-label=""
                        color="inherit"
                      >
                    
                          <Badge badgeContent={countnoti} color="error">
                            <NotificationsIcon style={{ fill: "black" }} />
                          </Badge>
                      
                      </IconButton>
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <Avatar
                          src={auth.user.avatar}
                          alt={auth.user.avatar}
                          
                        />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                      <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon style={{ fill: "black" }} />
                      </IconButton>
                    </Box>
                  </>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Container>
  );
}
const Container = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 10;
  .toolbar {
    background-color: white;
  }

  .Search {
  }
  .StyledInputBase {
    input:focus {
      border: 1px solid blue;
    }
  }
  .SearchIconWrapper {
  }
`;
