import { yupToFormErrors } from 'formik';
import * as Yup from 'yup';
var r = /^(ftp|http|https):\/\/[^ "]+$/;
const updateProfile = Yup.object().shape({
    name: Yup.string()
    .required('Tên người dùng bắt buộc phải nhập')
    .max(20, 'Tối đa tên 20 kí tự'),

    web_url: Yup.string()
    .matches(r, 'URL không đúng định dạng')
    .max(50, 'Tối đa URL website 50 kí tự'),

    story: Yup.string()
    .max(200, 'Tối đa tiểu sử 200 kí tự'),
    location: Yup.string()
    .max(50, 'Tối đa 50 kí tự'),
    learning: Yup.string()
    .max(100, 'Tối đa 100 kí tự'),
    work: Yup.string()
    .max(100, 'Tối đa tiểu sử 100 kí tự'),
    education: Yup.string()
    .max(100, 'Tối đa tiểu sử 100 kí tự'),

  });

  const validChangpasswprd = Yup.object().shape({
    passold: Yup.string()
    .required('Vui lòng nhập mật khẩu'),

    passnew: Yup.string()
    .required('Vui lòng không để trống')
    .min(8, 'Mật khẩu tối thiểu 8 ký tự'),

    cfpassnew: Yup.string()
    .required('Vui lòng không để trống')
    .oneOf([Yup.ref('passnew'), null], 'Confirm mật khẩu không khớp')

  });
  const validresertpass = Yup.object().shape({
    passnew: Yup.string()
    .required('Vui lòng không để trống')
    .min(8, 'Mật khẩu tối thiểu 8 ký tự'),

    cfpassnew: Yup.string()
    .required('Vui lòng không để trống')
    .oneOf([Yup.ref('passnew'), null], 'Confirm mật khẩu không khớp')

  });

export const valid = {updateProfile,validChangpasswprd,validresertpass}