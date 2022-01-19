import { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field, useFormik } from "formik";
import "../../styles/inputform.css";
import { IParams, RootStore } from "../../utils/TypeScript";
import { patchAPI } from "../../utils/FetchData";
import { useSelector } from "react-redux";
import { valid } from "./validform";
import { ALERT, IAlertType } from "../../redux/types/alertType";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../../redux/actions/userAction";
export interface UserParamUpdate {
  name: string;
  story?: string;
  location?: string;
  web_url?: string;
  learning?: string;
  work?: string;
  education?: string;
  
}

const Setting = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  const [UserParams, setUserParams] = useState<UserParamUpdate>();
  const [activeButton, setActiveButton] = useState({
    all: true,
    comment: false,
  });
//  console.log(JSON.stringify(auth))
  const _handleButtonComment = () => {
    setActiveButton({ all: false, comment: true });
  };
  const _handleButtonAll = () => {
    setActiveButton({ all: true, comment: false });
  };

  const Changpass = async (values: any) => {
    dispatch({ type: ALERT, payload: { loading: true } });
    await patchAPI(
      "changepassword",
      { password: values.passold, passwordnew: values.passnew },
      auth.access_token
    )
      .then((res) => {
        dispatch({ type: ALERT, payload: { success: res.data.msg } });
      })
      .catch((err) => {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
      });
  };

  const _handleSummit = (values: any) => {
    if(values)
      dispatch(updateUser(values, auth))
  };
  return (
    <>
      <Container>
        <div className="container" style={{ paddingTop: "30px" }}>
          <div className="row ">
            <div className="col">
              <h1>Cài đặt tài khoản</h1>
            </div>
            {/* <div className="col">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-outline-secondary">
                <span className="font-weight-bold">Settings</span>
              </button>
            </div>
          </div> */}
          </div>

          <div className="row">
            <div className="col-3">
              <Wrapbutton>
                <Button active={activeButton.all} onClick={_handleButtonAll}>
                  Hồ sơ cá nhân
                </Button>
              </Wrapbutton>
              <Wrapbutton>
                <Button
                  active={activeButton.comment}
                  onClick={_handleButtonComment}
                >
                  Tài khoản
                </Button>
              </Wrapbutton>
              {/* <Wrapbutton>
              <Button active={activeButton.post} onClick={_handleButtonPost}>
                Posts
              </Button>
            </Wrapbutton> */}
            </div>
            <div className="col-8">
              {activeButton.all === true ? (
                <>
                  <Profilsetting>
                    <Namesetting>Hồ sơ cá nhân</Namesetting>

                    <Formik
                      initialValues={{
                        name: auth.user?.name,
                        story: auth.user?.story,
                        location: auth.user?.location,
                        web_url: auth.user?.web_url,
                        learning: auth.user?.learning,
                        work: auth.user?.work,
                        education: auth.user?.education,
                      }}
                      validationSchema={valid.updateProfile}
                      onSubmit={(values) => {
                        _handleSummit(values);
                      }}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                          <Divinput>
                            <Lable>Tên người dùng</Lable>
                            <Field
                              className="input-setting"
                              name="name"
                              autocomplete="off"
                            />
                            <div className="notifi">
                              {errors.name && touched.name ? (
                                <p className="input-error-update-profile">
                                  {errors.name}
                                </p>
                              ) : null}
                              <small className="text-length">
                                {values.name?.length}/20
                              </small>
                            </div>
                          </Divinput>
                          <Divinput>
                            <Lable>URL trang web</Lable>
                            <Field
                              as="input"
                              className="input-setting"
                              name="web_url"
                              autocomplete="off"
                            />
                          </Divinput>
                          <div className="notifi">
                            {errors.web_url && touched.web_url ? (
                              <p className="input-error-update-profile">
                                {errors.web_url}
                              </p>
                            ) : null}
                            <small className="text-length">
                              {values.web_url?.length}/50
                            </small>
                          </div>
                          <Divinput>
                            <Lable>Địa chỉ</Lable>
                            <Field
                              className="input-setting"
                              name="location"
                              autocomplete="off"
                            />
                            <div className="notifi">
                              {errors.location && touched.location ? (
                                <p className="input-error-update-profile">
                                  {errors.location}
                                </p>
                              ) : null}
                              <small className="text-length">
                                {values.location?.length}/50
                              </small>
                            </div>
                          </Divinput>
                          <Divinput>
                            <Lable>Tiểu sử</Lable>
                            <Field
                              className="input-setting"
                              name="story"
                              autocomplete="off"
                            />
                            <div className="notifi">
                              {errors.story && touched.story ? (
                                <p className="input-error-update-profile">
                                  {errors.story}
                                </p>
                              ) : null}
                              <small className="text-length">
                                {values.story?.length}/200
                              </small>
                            </div>
                          </Divinput>
                          <Divinput>
                            <Lable>Học vấn</Lable>
                            <Field
                              className="input-setting"
                              name="learning"
                              autocomplete="off"
                            />
                            <div className="notifi">
                              {errors.learning && touched.learning ? (
                                <p className="input-error-update-profile">
                                  {errors.learning}
                                </p>
                              ) : null}
                              <small className="text-length">
                                {values.learning?.length}/100
                              </small>
                            </div>
                          </Divinput>
                          <Divinput>
                            <Lable>Công việc hiện tại</Lable>
                            <Field
                              className="input-setting"
                              name="work"
                              autocomplete="off"
                            />
                            <div className="notifi">
                              {errors.work && touched.work ? (
                                <p className="input-error-update-profile">
                                  {errors.work}
                                </p>
                              ) : null}
                              <small className="text-length">
                                {values.work?.length}/100
                              </small>
                            </div>
                          </Divinput>
                          <Divinput>
                            <Lable>Giáo dục</Lable>
                            <Field
                              className="input-setting"
                              name="education"
                              autocomplete="off"
                            />
                            <div className="notifi">
                              {errors.education && touched.education ? (
                                <p className="input-error-update-profile">
                                  {errors.education}
                                </p>
                              ) : null}
                              <small className="text-length">
                                {values.education?.length}/100
                              </small>
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
                            Lưu thông tin hồ sơ
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </Profilsetting>
                </>
              ) : (
                <Accountsetting>
                  <Namesetting>Đặt mật khẩu mới</Namesetting>
                  <Reviewtypelogin>
                    Nếu tài khoản của bạn đăng nhập nhanh bằng google hoặc
                    facebook.
                    <Link to={"/forgot_password"}>
                      {" "}
                      vui lòng đặt lại mật khẩu{" "}
                    </Link>
                    cho địa chỉ email của bạn trong lần đầu tiên đổi mật khẩu{" "}
                  </Reviewtypelogin>
                  <Formik
                    initialValues={{
                      passold: "",
                      passnew: "",
                      cfpassnew: "",
                    }}
                    validationSchema={valid.validChangpasswprd}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      // Changpass(values);
                      dispatch({ type: ALERT, payload: { loading: true } });
                      await patchAPI(
                        "changepassword",
                        {
                          password: values.passold,
                          passwordnew: values.passnew,
                        },
                        auth.access_token
                      )
                        .then((res) => {
                          dispatch({
                            type: ALERT,
                            payload: { success: res.data.msg },
                          });
                          resetForm();
                        })
                        .catch((err) => {
                          dispatch({
                            type: ALERT,
                            payload: { errors: err.response.data.msg },
                          });
                        });
                    }}
                  >
                    {({ values, errors, touched, setFieldValue }) => (
                      <Form>
                        <Divinput>
                          <Lable>Mật khẩu hiện tại</Lable>
                          <Field
                            className="input-setting"
                            type="password"
                            name="passold"
                            autocomplete="off"
                          />
                          <div className="notifi">
                            {errors.passold && touched.passold ? (
                              <p className="input-error-update-profile">
                                {errors.passold}
                              </p>
                            ) : null}
                          </div>
                        </Divinput>
                        <Divinput>
                          <Lable>Mật khẩu mới</Lable>
                          <Field
                            className="input-setting"
                            type="password"
                            name="passnew"
                            autocomplete="off"
                          />
                          <div className="notifi">
                            {errors.passnew && touched.passnew ? (
                              <p className="input-error-update-profile">
                                {errors.passnew}
                              </p>
                            ) : null}
                          </div>
                        </Divinput>
                        <Divinput>
                          <Lable>Xác nhận mật khẩu mới</Lable>
                          <Field
                            className="input-setting"
                            type="password"
                            name="cfpassnew"
                            autocomplete="off"
                          />
                          <div className="notifi">
                            {errors.cfpassnew && touched.cfpassnew ? (
                              <p className="input-error-update-profile">
                                {errors.cfpassnew}
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
                          Đặt mật khẩu mới
                        </button>
                      </Form>
                    )}
                  </Formik>
                </Accountsetting>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Setting;

const Container = styled.div`
  background-color: #efefef;
  width: 100%;
  height: auto;
`;

const Reviewtypelogin = styled.p`
  font-size: 17px;
`;

const Divinput = styled.div`
  margin-top: 20px;
`;

const Lable = styled.p`
  font-size: 17px;
  font-weight: 600;
`;

// const Lable = styled.p`
//   font-size: 20px;
// `;

const Profilsetting = styled.div`
  padding: 20px 35px;
  background-color: #fff;
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
`;

const Namesetting = styled.p`
  font-size: 25px;
  font-weight: bold;
`;
const Accountsetting = styled.div`
  padding: 20px 35px;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
`;

const Wrapbutton = styled.div``;

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
