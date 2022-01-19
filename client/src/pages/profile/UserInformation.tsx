import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import OptionBlockMenu from "./OptionBlockMenu";
import { ALERT } from "../../redux/types/alertType";
import { useDispatch } from "react-redux";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { IParams, RootStore } from "../../utils/TypeScript";
import { useParams } from "react-router-dom";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import moment from "moment";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import AskLogin from "../../components/global/AskLogin";
import { patchAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { updateUser, updateUserImage, updateUserImageCover } from "../../redux/actions/userAction";

const Container = styled.div`
  background: transparent;
  
`;
const BackgrondUserdiv = styled.div`

  position: relative;
  width: 100%;
  height: 200px;

  margin-bottom: 20px;
  .button-upload-cover {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    :hover {
      background-color: #efefef;
    }
  }
`;
const BackgrondUser = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0px 0px 10px 10px;
  
`;
const UserInforContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  top: -20px;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #d8d8d8;
`;
const RowButon = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  z-index: 2;
`;
const ButtonFlow = styled.button`
  background: transparent;
  border: none;
`;
const ButtonOption = styled.button`
  background: transparent;
  border: none;
`;

const RowFlexCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const SpanName = styled.span`
  font-weight: bold;
  font-size: 30px;
`;
const SpanDecsription = styled.span`
  margin-right: 10px;
`;
const WraperDesc = styled.div`
  display: inline-block;

  margin-right: 20px;
`;

const SpanWork = styled.p`
  padding: 0px;
  margin: 0px;
  font-weight: 500;
`;
const WraperAvatar = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: calc(50% - 50px);
  top: -70px;
  z-index: 1;

  @media only screen and (max-width: 768px) {
    left: 20px;
  }
`;
const WraperBtnUpfile = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;

  :hover {
    .button-custom {
      visibility: visible;
      opacity: 1;
      // background-color: #ffffff;
    }
  }

  .button-custom {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s linear, opacity 0.3s linear;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: black;
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
      // "& .MuiSvgIcon-root": {
      //   fontSize: 18,
      //   color: theme.palette.text.secondary,
      //   marginRight: theme.spacing(1.5),
      // },
      // "&:active": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     theme.palette.action.selectedOpacity
      //   ),
      // },
    },
  },
}));

const SpanWorkDetail = styled.span``;

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

const WraperBottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const WraperWork = styled.div``;

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const WrapMidContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const UserInformation = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { slug }: never = useParams();
  const { auth } = useSelector((state: RootStore) => state);
  const [check, setcheck] = useState(false);
  const [fl, setfl] = useState(false);
  const [unfl, setunfl] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openmenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosemenu = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!props.user) return;
    if (!auth) return;
    const c: any = auth.user?.my_follow.includes(slug);
    setcheck(c);
  }, [props.user]);

  const followuser = async () => {
    if (!auth.access_token) return handleOpen();
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    setfl(true);
    await patchAPI(
      `follow-user`,
      { iduserfolow: slug },
      access_token
    ).then((res) => {
      setcheck(true);
      setfl(false);
    });
  };

  const unfollowuser = async () => {
    if (!auth.access_token) return handleOpen();
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    setunfl(true);
    await patchAPI(
      `unfollow-user`,
      { iduserfolow: slug },
      access_token
    ).then((res) => {
      setcheck(false);
      setunfl(false);
    });
  };

  const handleChangeFileImage = (e: any) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      dispatch(updateUserImage(file, auth));
    }
  };
  const handleChangeFileImageCover = (e: any) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      dispatch(updateUserImageCover(file, auth));
    }
  };
  
  return (
    <>
      <Container>
        <DivCenter>
          <BackgrondUserdiv>
          {auth.user?._id === props?.user.userinfor._id ? 
            <BackgrondUser
              src={auth.user?.coverimage}
            ></BackgrondUser>
            : 
            <BackgrondUser
            src={props?.user.userinfor.coverimage}
          ></BackgrondUser>}
            {auth.user?._id === props?.user.userinfor._id ? 
            <div className="button-upload-cover">
              <input
                accept="image/*"
                id="icon-button-file-cover"
                type="file"
                style={{ display: "none" }}
                onChange={handleChangeFileImageCover}
              />
              <label htmlFor="icon-button-file-cover">
                <span>
                  
                  <PhotoCameraOutlinedIcon></PhotoCameraOutlinedIcon> Cập nhật ảnh bìa
                </span>
              </label>
            </div>
            : null}
          </BackgrondUserdiv>
        </DivCenter>

        <DivCenter>
          <UserInforContainer>
            <div>
              {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                        Chúng tôi là nơi các lập trình viên chia sẻ, cập nhật và
                        phát triển sự nghiệp của họ. Nơi chia sẻ những kiến thức
                        bổ ích thuộc lĩnh vực lập trình{" "}
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

            <RowButon>
              {auth.user?._id === slug ? (
                <ButtonFlow>
                  <button
                    onClick={() => history.push(`/settings/${slug}`)}
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: "20px" }}
                  >
                    Cập nhật Profile
                  </button>
                </ButtonFlow>
              ) : (
                <RowButon>
                  <ButtonFlow>
                    {check ? (
                      <button
                        disabled={unfl}
                        onClick={() => unfollowuser()}
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{ marginRight: "20px" }}
                      >
                        Đang theo dõi
                      </button>
                    ) : (
                      <button
                        disabled={fl}
                        onClick={() => followuser()}
                        type="button"
                        className="btn btn-primary"
                        style={{ marginRight: "20px" }}
                      >
                        Theo dõi
                      </button>
                    )}
                  </ButtonFlow>
                  {auth.access_token ? <ButtonOption>
                  <div onClick={handleClick} style={{display:"inline"}}><MoreHorizOutlinedIcon ></MoreHorizOutlinedIcon></div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={openmenu}
        onClose={handleClosemenu}
      >
        {/* <MenuItem onClick={handleClosemenu} disableRipple>
          <BlockOutlinedIcon />
          Block User $Name
        </MenuItem> */}
        <MenuItem onClick={() => {handleClosemenu(); history.push(`/report/${props?.user.userinfor._id}`)}} disableRipple>
          <ReportProblemOutlinedIcon />
          Báo cáo tài khoản
        </MenuItem>
        
      </StyledMenu>
                    </ButtonOption> : null}
                  
                </RowButon>
              )}
            </RowButon>
            <RowFlexCenter>
              <SpanName>{props?.user.userinfor.name}</SpanName>
            </RowFlexCenter>
            {props?.user.userinfor.story === "" ? null : (
              <RowFlexCenter>
                <SpanDecsription>{props?.user.userinfor.story}</SpanDecsription>
              </RowFlexCenter>
            )}
            <WrapMidContent>
              {props?.user.userinfor.location === "" ? null : (
                <WraperDesc>
                  <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                  <SpanDecsription>
                    {props?.user.userinfor.location}
                  </SpanDecsription>
                </WraperDesc>
              )}

              <WraperDesc>
                <CakeOutlinedIcon
                  style={{ marginRight: "10px" }}
                ></CakeOutlinedIcon>
                <SpanDecsription>
                  Tham gia ngày{" "}
                  {moment(props?.user.userinfor.createdAt).format("DD/MM/YYYY")}
                </SpanDecsription>
              </WraperDesc>
              {props?.user.userinfor.account && (
                <a href={`mailto:${props?.user.userinfor.account}`}>
                  <WraperDesc>
                    <EmailOutlinedIcon></EmailOutlinedIcon>
                    <SpanDecsription>
                      {props?.user.userinfor.account}
                    </SpanDecsription>
                  </WraperDesc>
                </a>
              )}
              {props?.user.userinfor.web_url === "" ? null : (
                <a href={props?.user.userinfor.web_url}>
                  <WraperDesc>
                    <LanguageOutlinedIcon></LanguageOutlinedIcon>
                    <SpanDecsription>
                      {props?.user.userinfor.web_url}
                    </SpanDecsription>
                  </WraperDesc>
                </a>
              )}
            </WrapMidContent>
            <hr />
            <WraperBottom>
              {props?.user.userinfor.work === "" ? null : (
                <WraperWork>
                  <RowFlexCenter style={{ marginBottom: "0px" }}>
                    <SpanWork>Công việc</SpanWork>
                  </RowFlexCenter>
                  <RowFlexCenter>
                    <SpanWorkDetail>{auth.user?.work}</SpanWorkDetail>
                  </RowFlexCenter>
                </WraperWork>
              )}
              {props?.user.userinfor.education === "" ? null : (
                <WraperWork>
                  <RowFlexCenter style={{ marginBottom: "0px" }}>
                    <SpanWork>Giáo dục</SpanWork>
                  </RowFlexCenter>
                  <RowFlexCenter>
                    <SpanWorkDetail>
                      {props?.user.userinfor.education}
                    </SpanWorkDetail>
                  </RowFlexCenter>
                </WraperWork>
              )}

              {/* {auth.user?.learning === '' ? null : <WraperWork>
              <RowFlexCenter style={{ marginBottom: "0px" }}>
                <SpanWork>Học vấn</SpanWork>
              </RowFlexCenter>
              <RowFlexCenter>
                <SpanWorkDetail>{auth.user?.learning}</SpanWorkDetail>
              </RowFlexCenter>
            </WraperWork>} */}
            </WraperBottom>

            <WraperAvatar >
            {auth.user?._id === props?.user.userinfor._id ? <> 
              <Avatar
              // {auth.user?._id === props?.user.userinfor._id ?
                alt={auth.user?.name}
                src={auth.user?.avatar}
                sx={{ width: 100, height: 100,backgroundColor:"black",border:"4px solid white" }}
              />
              </> : 
              <Avatar
              // {auth.user?._id === props?.user.userinfor._id ?
                alt={props?.user.userinfor.name}
                src={props?.user.userinfor.avatar}
                sx={{ width: 100, height: 100,backgroundColor:"black",border:"4px solid white" }}
              />}
              {auth.user?._id === props?.user.userinfor._id ? <>
              <WraperBtnUpfile>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChangeFileImage}
                />
                <label htmlFor="icon-button-file" className="button-custom">
                  <PhotoCameraIcon></PhotoCameraIcon>
                  <span>Chọn ảnh</span>
                </label>
              </WraperBtnUpfile>
              </> : null}
            </WraperAvatar>
          </UserInforContainer>
        </DivCenter>
      </Container>
    </>
  );
};
