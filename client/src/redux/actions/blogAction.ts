import { Dispatch } from 'redux'
import { IBlog } from '../../utils/TypeScript'
import { imageUpload } from '../../utils/ImageUpload'
import { postAPI, getAPI, putAPI, deleteAPI, patchAPI } from '../../utils/FetchData'
import { ALERT, IAlertType } from '../types/alertType'
import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  GET_BLOGS_CATEGORY_ID,
  IGetBlogsCategoryType,
  GET_BLOGS_USER_ID,
  IGetBlogsUserType,
  CREATE_BLOGS_USER_ID,
  ICreateBlogsUserType,
  DELETE_BLOGS_USER_ID,
  IDeleteBlogsUserType
} from '../types/blogType'

import { checkTokenExp } from '../../utils/checkTokenExp'

export const createBlog =
  (blog: IBlog, token: string, history: any) =>
  async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.imagepost !== "string") {
        const photo = await imageUpload(blog.imagepost);
        url = photo.url;
      } else {
        url = blog.imagepost;
      }

      const objRenameKeyToSendServer = {
        title: blog.title,
        content: blog.content,
        desc: blog.description,
        img: url,
        tag: blog.tags.map((i)=>i._id)
      };
  
      // console.log(objRenameKeyToSendServer)
      const res = await postAPI(
        "create-blog",
        objRenameKeyToSendServer,
        access_token
      );
      dispatch({
        type: CREATE_BLOGS_USER_ID,
        payload: res.data
      })

      dispatch({ type: ALERT, payload: { loading: false } });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      localStorage.removeItem("test")
      history.push('/')
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const updateBlog =
  (blog: IBlog, token: string, history: any) =>
  async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.imagepost !== "string") {
        const photo = await imageUpload(blog.imagepost);
        url = photo.url;
      } else {
        url = blog.imagepost;
      }

      const objRenameKeyToSendServer = {
        idblog: blog._id,
        title: blog.title,
        content: blog.content,
        desc: blog.description,
        img: url,
        tag: blog.tags.map((i)=>i._id)
      };
  
      // console.log(objRenameKeyToSendServer)
      const res = await patchAPI(
        "update-blog",
        objRenameKeyToSendServer,
        access_token
      );
      // dispatch({
      //   type: CREATE_BLOGS_USER_ID,
      //   payload: res.data
      // })

      
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      history.push('/')
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const getHomeBlogs = () =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI('home/blogs')
      // console.log('getAPI:Home/blogs ' + JSON.stringify(res))
      dispatch({
        type: GET_HOME_BLOGS,
        payload: res.data
      })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }


export const getBlogsByCategoryId = (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      let limit = 8;
      let value = search ? search : `?page=${1}`;

      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`)

      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, search }
      })
      

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }


export const getBlogsByUserId = (id: string, page: number) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {

      const res = await getAPI(`blog-by-user/${id}/${page}`)

      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data.result }
      })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }


// export const updateBlog = (blog: IBlog, token: string) =>
//   async (dispatch: Dispatch<IAlertType>) => {
//     const result = await checkTokenExp(token, dispatch)
//     const access_token = result ? result : token
//     let url;
//     try {
//       dispatch({ type: ALERT, payload: { loading: true } })

//       if (typeof (blog.thumbnail) !== 'string') {
//         const photo = await imageUpload(blog.thumbnail)
//         url = photo.url
//       } else {
//         url = blog.thumbnail
//       }

//       const newBlog = { ...blog, thumbnail: url }

//       const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token)

//       dispatch({ type: ALERT, payload: { success: res.data.msg } })
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
//     }
//   }


export const deleteBlog = (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token
    try {
      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog
      })

      await deleteAPI(`blog/${blog._id}`, access_token)

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }