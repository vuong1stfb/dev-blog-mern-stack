import { yupToFormErrors } from 'formik';
import * as Yup from 'yup';

const addtag = Yup.object().shape({
    name: Yup.string()
    .required('vui lòng nhập tên thẻ')
    .max(20, 'Tối đa tên 20 kí tự'),

    description: Yup.string()
    .required('vui lòng nhập mô tả thẻ')
    .max(1000, 'Tối đa mô tả 1000 kí tự'),

    abount: Yup.string()
    .required('vui lòng nhập giới thiệu thẻ')
    .max(1000, 'Tối đa giới thiệu 1000 kí tự'),
    moderators: Yup.string()
    .required('vui lòng chọn quản trị thẻ'),

  });


export const valid = {addtag}