import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { postAPI, getAPI, patchAPI } from "../../utils/FetchData";
import { RootStore } from "../../utils/TypeScript";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory,useParams } from "react-router-dom";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";
import Loading from "../../components/global/Loading";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { ALERT } from "../../redux/types/alertType";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { IParams } from "../../utils/TypeScript";
import { checkTokenExp } from "../../utils/checkTokenExp";

const ReportUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { slug }: IParams = useParams()
  const { auth } = useSelector((state: RootStore) => state);
  const [blogs, setBlogs] = useState([]);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [textInput, setTextInput] = useState("");

  const handleTextInputChange = (event: any) => {
    setTextInput(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === "") {
      dispatch({
        type: ALERT,
        payload: { errors: "Vui lòng chọn thông tin báo cáo" },
      });
    } else {
      if (value === "Khác") {
            if(textInput === ""){
                dispatch({
                    type: ALERT,
                    payload: { errors: "Vui lòng nhập thông tin báo cáo" },
                  });
            }else{
              dispatch({ type: ALERT, payload: { loading: true } })
              if(!auth.access_token) return;
              const result = await checkTokenExp(auth.access_token, dispatch);
              const access_token = result ? result : auth.access_token;
              await patchAPI("mod-remove-blog", {message: textInput, idblog: slug}, access_token).then(res => {
              dispatch({ type: ALERT, payload: { loading: false } })
                
                handleOpen()
              }).catch(err => {
                dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
              })
            }

      } else {
        dispatch({ type: ALERT, payload: { loading: true } })
        if(!auth.access_token) return;
        const result = await checkTokenExp(auth.access_token, dispatch);
        const access_token = result ? result : auth.access_token;
        await patchAPI("mod-remove-blog", {message: value, idblog: slug}, access_token).then(res => {
            dispatch({ type: ALERT, payload: { loading: false } })

          handleOpen()
        }).catch(err => {
          dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        })
      }
    }
  };

  return (
    <>
      {blogs && (
        <Container>
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
                    borderRadius: "10px"
                  }}
                >
                  <Model>
                    <div style={{display: 'flex'}}>
                      <Titlemodel>Thông báo</Titlemodel>
                    </div>
                    <Descmodel>Xóa Blog thành công</Descmodel>
                       <button
                  onClick={() => history.push('/')}
                  type="button"
                  className="btn btn-primary"
                  style={{ marginRight: "20px", width: '100%', padding: '13px', fontWeight: 'bold' }}
                >
                  Đồng ý
                </button>
                  </Model>
                </Box>
              </Fade>
            </Modal>
          </div>
          {/* <Header>
        <div className="header">
          <div className="reading-list">
            <h1>Báo cáo Cao quốc đạt</h1>
          </div>
        </div>
      </Header> */}
          <Content>
            <div className="body">
              <div className="header">
                <div className="reading-list">
                  <h1 style={{ fontWeight: "bold" }}>Xóa Blog</h1>
                  <p style={{ fontSize: "20px" }}>
                    Cảm ơn bạn đã quan tâm bất kỳ sự lạm dụng nào vi phạm quy tắc
                    ứng xử hoặc các điều khoản và điều kiện của chúng tôi .
                    Chúng tôi tiếp tục cố gắng làm cho môi trường này trở thành
                    một môi trường tuyệt vời cho tất cả mọi người.
                  </p>
                </div>
              </div>
              <Containerreport>
                <form style={{width: '100%'}} onSubmit={handleSubmit}>
                  <FormControl
                  style={{width: "90%"}}
                    sx={{ m: 3 }}
                    component="fieldset"
                    error={error}
                    variant="standard"
                  >
                    <RadioGroup
                      aria-label="quiz"
                      name="quiz"
                      value={value}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="Thô lỗ hoặc thô tục"
                        control={<Radio />}
                        label="Thô lỗ hoặc thô tục"
                      />
                      <FormControlLabel
                        value="Quấy rối hoặc lời nói thiếu văn hóa"
                        control={<Radio />}
                        label="Quấy rối hoặc lời nói thiếu văn hóa"
                      />
                      <FormControlLabel
                        value="Spam hoặc vấn đề bản quyền"
                        control={<Radio />}
                        label="Spam hoặc vấn đề bản quyền"
                      />
                      <FormControlLabel
                        value="Hành động lăng mạ"
                        control={<Radio />}
                        label="Hành động lăng mạ"
                      />
                      <FormControlLabel
                        value="Khác"
                        control={<Radio />}
                        label="Khác"
                      />
                      {value === "Khác" ? (
                        <TextField
                        style={{width: '100%', marginTop: '20px'}}
                          label="Phản hồi khác"
                          value={textInput}
                          onChange={handleTextInputChange}
                        />
                      ) : null}
                    </RadioGroup>
                    <button style={{marginTop: '30px'}} className="btn btn-danger" type="submit">Xóa bài đăng</button>
                  </FormControl>
                </form>
              </Containerreport>
            </div>
          </Content>
        </Container>
      )}
    </>
  );
};
export default ReportUser;
// LayOut @@@@@@@@@@@@@@@@@@
const Container = styled.div`
  padding: 20px 250px;
  background-color: #efefef;
  height: auto;
  min-height: 90vh;
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
      display: flex;
      width: 500px;
      background-color: #ffffff;
      border-color: #a3a3a3;
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
  width: 600px;
  height: auto;
  padding: 20px
`;

const Titlemodel = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const Descmodel = styled.p`
  font-size: 19px;
`;


const Content = styled.div`
  // display: grid;
  // grid-template-columns: 2fr 8fr;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  gap: 20px;
  .sidebar {
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
  .body {
    background-color: white;
    margin-top: 30px;
    width: 100%;
    padding: 24px;
    border-radius: 10px;
    border: 1px solid #d8d8d8;
  }
`;

const Containerreport = styled.div`
  background-color: #efefef;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
`;
//Component@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const ButtonAll = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 6px;
  font-weight: 500;
  line-height: 24px;
  padding: 8px;
  text-align: left;
`;
const ItemMenu = styled.div`
  display: flex;
  align-items: center;

  border-radius: 6px;
  font-weight: 500;
  line-height: 24px;
  padding: 8px;
  text-align: left;

  :hover {
  }
`;
const ItemPost = styled.div`
  margin: 10px 0px;
  display: flex;
  gap: 10px;
  .avatar {
  }
  .content {
    .content-title {
      /* font-family: -apple-system; */
      font-size: 22px;
      font-weight: 700;
      margin: 0px;
      line-height: 30px;
      cursor: pointer;
      :hover {
        color: #323ebe;
      }
    }
    .content-bot {
      .name {
        display: inline;
        /* font-family: -apple-system; */
        font-size: 17px;
        font-weight: 500;
        line-height: 21px;
        cursor: pointer;
        :hover {
          color: #323ebe;
        }
      }
      .create-time {
        color: #636363;
        display: inline;
        font-size: 14px;
        line-height: 21px;
      }
      .read-time {
        display: inline;
        font-size: 14px;
        line-height: 21px;
      }
      .tag {
        align-items: center;
        border-radius: 6px;
        display: inline-flex;
        /* font-family: -apple-system; */
        font-size: 14px;
        line-height: 21px;
        padding: 4px 7px;
        cursor: pointer;
        :hover {
          background-color: #f2f2f2;
          box-shadow: #090909 0px 0px 0px 1px;
        }
      }
    }
  }
  .item-button {
    margin-left: auto;
    align-self: center;
    align-items: flex-start;
    border-radius: 6px;
    color: #090909;
    font-weight: bold;
    display: inline-block;
    /* font-family: -apple-system; */
    font-size: 14px;
    line-height: 24px;
    padding: 4px 12px;
    text-align: center;
    cursor: pointer;
    :hover {
      background-color: #7e898c;
      color: #ffffff;
    }
  }
`;

const Button = styled.button<{ active?: boolean }>`
  border: none;
  width: 100%;
  background-color: ${(props) => (props.active ? "white" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => (props.active ? "" : "#dddeee")};
    color: blue;
  }
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
