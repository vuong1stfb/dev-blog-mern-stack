import { borderRadius, height } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IParams } from "../../utils/TypeScript";
import styled from "styled-components";
import { Formik, Form, Field, useFormik } from "formik";
import { valid } from "../settings/validform";
import "../../styles/inputform.css";
import { ALERT } from "../../redux/types/alertType";
import { patchAPI } from "../../utils/FetchData";

import { FormSubmit } from "../../utils/TypeScript";

const ResertPassword = () => {
  const token = useParams<IParams>().slug;
  const [account, setAccount] = useState("");
  const dispatch = useDispatch();

  //   const handleSubmit = (e: FormSubmit) => {
  //     e.preventDefault()
  //     dispatch(forgotPassword(account))
  //   }

  return (
    <Container>
      <div
        style={{
          width: "600px",
          height: "auto",
          backgroundColor: "#ffffff",
          padding: "20px 30px",
          border: "1px solid #e5e0e0",
          borderRadius: "10px",
        }}
      >
        <h2>Resert mật khẩu</h2>

        <Formik
          initialValues={{
            passnew: "",
            cfpassnew: "",
          }}
          validationSchema={valid.validresertpass}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // Changpass(values);
            dispatch({ type: ALERT, payload: { loading: true } });
            await patchAPI(
                "reset_password",
                {
                  password: values.passnew,
                },
                token
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
      </div>
    </Container>
  );
};

export default ResertPassword;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
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
