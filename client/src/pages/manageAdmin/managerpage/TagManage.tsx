import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LeftMenu from "../LeftMenu";
import { getAPI, postAPI, patchAPI } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import { Avatar, AvatarGroup } from "@mui/material";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { valid } from "../valid";
import Paper from "@mui/material/Paper";
import { Formik, Form, Field, useFormik } from "formik";
import { ALERT } from "../../../redux/types/alertType";
import Loading from "../../../components/alert/Loading";
import { useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { checkTokenExp } from "../../../utils/checkTokenExp";
import LockIcon from '@mui/icons-material/Lock';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const TagManage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  const [listtags, setlisttags] = useState([]);
  const [listmod, setListmod] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idtag, setIdtag] = useState("");
  const [open, setOpen] = React.useState(false);
  const [opendetail, setOpendetail] = React.useState(false);
  const handleOpendetail = () => setOpendetail(true);
  const handleClosedetail = () => setOpendetail(false);
  const [openupdate, setOpenupdate] = React.useState(false);
  const handleOpenupdate = () => setOpenupdate(true);
  const handleCloseupdate = () => setOpenupdate(false);
  const [openlock, setOpenlock] = React.useState(false);
  const handleOpenlock = () => setOpenlock(true);
  const handleCloselock = () => setOpenlock(false);
  const [openunlock, setOpenunlock] = React.useState(false);
  const handleOpenunlock = () => setOpenunlock(true);
  const handleCloseunlock = () => setOpenunlock(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [infortag, setInfortag] = useState({
    id: "",
    name: "",
    desc: "",
    abount: "",
    moderators: {_id : '', name: '', avatar: '', createdAt: '', role: ''},
  });

  const lockTag = async () => {
    if(!auth.access_token) return;
    dispatch({ type: ALERT, payload: { loading: true } });
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      await patchAPI(
        "lockTag",
        {
          idtags: idtag
        },
        access_token
      )
        .then((res) => {
          getAPI("get-listtag", access_token).then((res) => {
            setlisttags(res.data.listtag);
        
            setListmod(res.data.listmod);
            setLoading(false);
            handleCloselock();
            dispatch({
              type: ALERT,
              payload: { success: "Đã khóa thẻ" },
            });
          });
        })
    } catch (error) {
      dispatch({
        type: ALERT,
        payload: { errors: "Có lỗi xảy ra" },
      });
    }
  }

  const unlockTag = async () => {
    dispatch({ type: ALERT, payload: { loading: true } });
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      await patchAPI(
        "unlockTag",
        {
          idtags: idtag
        },
        access_token
      )
        .then((res) => {
          getAPI("get-listtag", access_token).then((res) => {
            setlisttags(res.data.listtag);
            setListmod(res.data.listmod);
            setLoading(false);
            handleCloseunlock();
            dispatch({
              type: ALERT,
              payload: { success: "Đã mở khóa thẻ" },
            });
          });
        })
    } catch (error) {
      dispatch({
        type: ALERT,
        payload: { errors: "Có lỗi xảy ra" },
      });
    }
  }


  useEffect(() => {
    async function fectdata() {
      window.scrollTo(0, 0);
      if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      // setLoading(true);
      await getAPI("get-listtag", access_token).then((res) => {
        setlisttags(res.data.listtag);
        setListmod(res.data.listmod);
        setLoading(false);
      });
    }
    fectdata();
  }, [auth]);

  return (
    <Container>
      {/* model add tag */}
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
                <Formik
                  initialValues={{
                    name: "",
                    description: "",
                    abount: "",
                    moderators: "",
                  }}
                  validationSchema={valid.addtag}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    dispatch({ type: ALERT, payload: { loading: true } });
                    if(!auth.access_token) return;
                    const result = await checkTokenExp(auth.access_token, dispatch);
                    const access_token = result ? result : auth.access_token;
                    try {
                      await postAPI(
                        "create-tags",
                        {
                          name: values.name,
                          description: values.description,
                          abount: values.abount,
                          moderators: values.moderators,
                        },
                        access_token
                      )
                        .then((res) => {
                          getAPI("get-listtag", access_token).then((res) => {
                            setlisttags(res.data.listtag);
                            setListmod(res.data.listmod);
                            setLoading(false);
                            handleClose();
                            dispatch({
                              type: ALERT,
                              payload: { success: "Thêm Thẻ thành công" },
                            });
                          });
                        })
                    } catch (error) {
                      dispatch({
                        type: ALERT,
                        payload: { errors: "Có lỗi xảy ra" },
                      });
                    }
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      <Divinput>
                        <Lable>Tên thẻ</Lable>
                        <Field
                          className="input-addtag"
                          type="text"
                          name="name"
                          placeholder="tên thẻ"
                          autocomplete="off"
                        />
                        <div className="notifi">
                          {errors.name && touched.name ? (
                            <p className="input-error-add-tag">{errors.name}</p>
                          ) : null}
                        </div>
                      </Divinput>
                      <Divinput>
                        <Lable>Mô tả</Lable>
                        <Field
                          className="input-addtag"
                          as="textarea"
                          type="text"
                          rows="4"
                          placeholder="Mô tả"
                          name="description"
                          autocomplete="off"
                        />
                        <div className="notifi">
                          {errors.description && touched.description ? (
                            <p className="input-error-add-tag">
                              {errors.description}
                            </p>
                          ) : null}
                        </div>
                      </Divinput>

                      <Divinput>
                        <Lable>Quản trị thẻ</Lable>
                        <Field
                          className="select-mod"
                          as="select"
                          name="moderators"
                        >
                          <option value="">Chọn quản trị</option>
                          {listmod.map((mod: any) => (
                            <option value={mod._id}>{mod.name}</option>
                          ))}
                        </Field>
                        <div className="notifi">
                          {errors.moderators && touched.moderators ? (
                            <p className="input-error-add-tag">
                              {errors.moderators}
                            </p>
                          ) : null}
                        </div>
                      </Divinput>

                      <Divinput>
                        <Lable>Giới thiệu</Lable>
                        <Field
                          className="input-addtag"
                          type="text"
                          as="textarea"
                          rows="4"
                          name="abount"
                          placeholder="Thông tin giới thiệu"
                          autocomplete="off"
                        />
                        <div className="notifi">
                          {errors.abount && touched.abount ? (
                            <p className="input-error-add-tag">
                              {errors.abount}
                            </p>
                          ) : null}
                        </div>
                      </Divinput>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          marginTop: "30px",
                          padding: "10px",
                          width: "100%",
                          fontWeight: "600",
                          fontSize: "20px",
                        }}
                      >
                        Thêm thẻ
                      </button>
                    </Form>
                  )}
                </Formik>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>
      {/* model detail tag */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={opendetail}
          onClose={handleClosedetail}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={opendetail}>
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
                <div>
                  <h1>#{infortag?.name}</h1>
                  <p>{infortag.desc}</p>
                  <div
                    style={{
                      backgroundColor: "#efefef",
                      padding: "30px",
                      borderRadius: "10px",
                      border: "1px solid #bfbfbf",
                    }}
                  >
                    {infortag.abount === '' ? null : <>
                    <h5>Giới thiệu :</h5>
                    <p>{infortag.abount}</p>
                    </>}
                    </div>
                    
                    <h5 style={{marginBottom: "20px", marginTop: "20px"}}>Quản trị :</h5>
                        {/* {infortag.moderators.role !== "moderators" ? <p> Không có <p/> : <></>} */}
                        <div style={{ display: "flex", marginBottom: "20px" }}>
                        {infortag.moderators.role !== "moderators" ? null : 
                          <Avatar
                            style={{ width: "50px", height: "50px" }}
                            src={infortag.moderators.avatar}
                          ></Avatar>
                          }
                          <div>
                            <h6
                              style={{ margin: "0px 10px", fontSize: "18px" }}
                            >{infortag.moderators.role !== "moderators" ? "Không có" : <>
                              {infortag.moderators.name}</>}
                            </h6>
                            {infortag.moderators.role !== "moderators" ? null : 
                            <span
                            style={{ margin: "0px 10px", fontSize: "14px" }}
                          >
                            Tham gia ngày: {moment(infortag.moderators.createdAt).format("DD/MM/YYYY")}
                          </span>}
                            
                          </div>
                        </div> 
                  
                </div>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>

      {/* locktag */}

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
                  <h3>Bạn có chắc chắn muốn khóa thẻ này ? </h3>
                  <p>Thẻ sau khi Khóa sẽ vẫn được hiển thị nhưng người dùng sẽ không thể đăng bài chứa thẻ này</p>
                  <button onClick={() => lockTag()} style={{width: '100%'}} type="button" className="btn btn-danger">Khóa thẻ</button>
                </div>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>

      {/* unlocktag */}
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
                  <h3>Bạn có chắc chắn muốn mở khóa thẻ này ? </h3>
                  <p>Thẻ sau khi mở Khóa sẽ vẫn được hiển thị và người dùng sẽ vẫn tiếp tục có thể đăng bài chứa thẻ này</p>
                  <button onClick={() => unlockTag()} style={{width: '100%'}} type="button" className="btn btn-success">mở Khóa thẻ</button>
                </div>
              </Model>
            </Box>
          </Fade>
        </Modal>
      </div>

      {/* model update tag */}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openupdate}
          onClose={handleCloseupdate}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openupdate}>
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
                <Formik
                  initialValues={{
                    name: infortag.name,
                    description: infortag.desc,
                    abount: infortag.abount,
                    moderators: infortag.moderators._id,
                  }}
                  validationSchema={valid.addtag}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    dispatch({ type: ALERT, payload: { loading: true } });
                    if(!auth.access_token) return;
                    const result = await checkTokenExp(auth.access_token, dispatch);
                    const access_token = result ? result : auth.access_token;
                    try {
                      await patchAPI(
                        "update-tag",
                        {
                          id: infortag.id,
                          name: values.name,
                          desc: values.description,
                          abount: values.abount,
                          moderators: values.moderators,
                        },
                        access_token
                      )
                        .then((res) => {
                          getAPI("get-listtag", access_token).then((res) => {
                            setlisttags(res.data.listtag);
                            setListmod(res.data.listmod);
                            setLoading(false);
                            dispatch({
                              type: ALERT,
                              payload: { success: "Cập nhật thành công" },
                            });
                            handleCloseupdate();
                          });
                        })
                    } catch (error) {
                      dispatch({
                        type: ALERT,
                        payload: { errors: "có lỗi xảy ra" },
                      });
                    }
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      <Divinput>
                        <Lable>Tên thẻ</Lable>
                        <Field
                          className="input-addtag"
                          type="text"
                          name="name"
                          placeholder="tên thẻ"
                          autocomplete="off"
                        />
                        <div className="notifi">
                          {errors.name && touched.name ? (
                            <p className="input-error-add-tag">{errors.name}</p>
                          ) : null}
                        </div>
                      </Divinput>
                      <Divinput>
                        <Lable>Mô tả</Lable>
                        <Field
                          className="input-addtag"
                          as="textarea"
                          rows="4"
                          type="text"
                          placeholder="Mô tả"
                          name="description"
                          autocomplete="off"
                        />
                        <div className="notifi">
                          {errors.description && touched.description ? (
                            <p className="input-error-add-tag">
                              {errors.description}
                            </p>
                          ) : null}
                        </div>
                      </Divinput>
                      <Divinput>
                        <Lable>Quản trị thẻ</Lable>
                        <Field
                          className="select-mod"
                          as="select"
                          name="moderators"
                        >
                          <option value="">Chọn quản trị</option>
                          {listmod.map((mod: any) => (
                            <option value={mod._id}>{mod.name}</option>
                          ))}
                        </Field>
                        <div className="notifi">
                          {errors.moderators && touched.moderators ? (
                            <p className="input-error-add-tag">
                              {errors.moderators}
                            </p>
                          ) : null}
                        </div>
                      </Divinput>

                      <Divinput>
                        <Lable>Giới thiệu</Lable>
                        <Field
                          className="input-addtag"
                          type="text"
                          as="textarea"
                          rows="4"
                          name="abount"
                          placeholder="Thông tin giới thiệu"
                          autocomplete="off"
                        />
                        <div className="notifi">
                          {errors.abount && touched.abount ? (
                            <p className="input-error-add-tag">
                              {errors.abount}
                            </p>
                          ) : null}
                        </div>
                      </Divinput>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          marginTop: "30px",
                          padding: "10px",
                          width: "100%",
                          fontWeight: "600",
                          fontSize: "20px",
                        }}
                      >
                        Cập nhật
                      </button>
                    </Form>
                  )}
                </Formik>
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
          <LeftMenu isActive="tagmanager"></LeftMenu>
        </div>
        {/* content right@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <div className="col-md-9">
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col d-none d-md-block">
              <Header>
                <div className="header">
                  <div className="reading-list">
                    <h1>Quản lý #Tags</h1>
                  </div>

                  <button
                    onClick={handleOpen}
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "200px", fontWeight: "bold" }}
                  >
                    + Thêm thẻ mới
                  </button>
                </div>
              </Header>
            </div>
          </div>
          {loading ? (
            null
          ) : (
            <>
              {listtags.length === 1 ? (
                <div className="notfound">Danh sách tag trống</div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                          >
                            Tên thẻ
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                            align="right"
                          >
                            Tổng số blog
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                            align="right"
                          >
                            Quản trị tag
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                            align="right"
                          > Trạng thái </TableCell>
                           <TableCell
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                            align="right"
                          > Tùy chỉnh </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listtags.map((tag: any, index: number) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              #{tag.name}
                            </TableCell>
                            <TableCell align="right">
                              {tag.total_blog}
                            </TableCell>
                            <TableCell align="right">
                              {tag.moderators.role === "moderators" ? <>
                              {tag.moderators.name}
                              </>
                                : <>
                                  {tag.moderators === null ? "Không có" : "Không có"}
                                </>
                              }
                           
                            </TableCell>
                            {tag.is_destroy === true ? 
                            <TableCell align="right">
                            
                            <FiberManualRecordIcon style={{color: "red", width: '9px', height: '9px', marginRight: '6px'}}/>
                            Tạm khóa
                            </TableCell> :
                            <TableCell align="right">
                            
                            <FiberManualRecordIcon style={{color: "green", width: '9px', height: '9px', marginRight: '6px'}}/>
                            Đang hoạt động
                            </TableCell>
                            }
                            
                            

                            <TableCell align="right">
                              <button
                                onClick={() => {
                                  handleOpendetail();
                                  setInfortag({
                                    id: tag._id,
                                    name: tag.name,
                                    desc: tag.description,
                                    abount: tag.abount,
                                    moderators: tag.moderators
                                  });
                                }}
                                style={{ marginLeft: "50px" }}
                                type="button"
                                className="btn btn-info"
                              >
                                Chi tiết
                              </button>
                              <button
                                onClick={() => {handleOpenupdate(); setInfortag({
                                  id: tag._id,
                                  name: tag.name,
                                  desc: tag.description,
                                  abount: tag.abount,
                                  moderators: tag.moderators
                                });} }
                                style={{ marginLeft: "5px" }}
                                type="button"
                                className="btn btn-primary"
                              >
                                <ModeEditOutlineIcon/>
                              </button>
                              {tag.is_destroy === true ? 
                              <button
                              onClick={() => {handleOpenunlock(); setIdtag(tag._id)}}
                              style={{ marginLeft: "5px" }}
                              type="button"
                              className="btn btn-success"
                            >
                              <LockOpenIcon/>
                            </button>
                            : 
                            <button
                            onClick={() => {handleOpenlock(); setIdtag(tag._id)}}
                                style={{ marginLeft: "5px" }}
                                type="button"
                                className="btn btn-danger"
                              >
                                <LockIcon/>
                              </button>
                          }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default TagManage;

const Container = styled.div`
  background-color: rgb(239, 239, 239);
  padding: 30px 50px;
  min-height: 90vh;
  width: 100%;
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
  .list-item-user {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  .notice {
    background-color: #dddeee;
    padding: 18px;
    border-radius: 10px;
    > span {
      border-color: #3b49df;
      border-radius: 6px;
      border-style: solid;
      border-width: 1px;
      color: #3b49df;
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      margin: 0px 0px 0px 12px;
      padding: 4px;
      text-align: center;
    }
  }
`;

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
const Top = styled.div`
  background-color: #0c6af7;
  width: 100%;
  height: 20px;
  border-radius: 7px 7px 0px 0px;
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

const Nametag = styled.p`
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  display: inline-flex;
  margin: 20px 20px 0px 20px;
  :hover {
    color: blue;
  }
`;

const Desctag = styled.p`
  font-size: 17px;
  margin: 20px;
`;

const Totaltagblog = styled.p`
  font-size: 17px;
  text-align: justify;
  margin: 10px 20px;
  color: #707070;
`;

const ItemBody = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: auto;
  border: 1px solid #bfbfbf;
  padding-bottom: 25px;
`;

const Divinput = styled.div`
  margin-top: 10px;
`;

const Lable = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 3px;
`;
