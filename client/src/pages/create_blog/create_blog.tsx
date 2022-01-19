import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IBlog, IUser, RootStore } from "../../utils/TypeScript";
import { shallowEqual, validCreateBlog } from "../../utils/Valid";
import CreateForm from "./CreateForm";
import CardHoriz from "./CardHoriz";
import ReactQuill from "../../components/editor/ReactQuill";
import { ALERT } from "../../redux/types/alertType";
import NotFound from "../../components/global/NotFound";
import { getListTag } from "../../redux/actions/tagAction";
import { createBlog, updateBlog } from "../../redux/actions/blogAction";
import { useParams } from "react-router-dom";
import { getAPI } from "../../utils/FetchData";
import { useHistory } from "react-router-dom";


interface IProps {
  id?: string;
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
  const { auth } = useSelector((state: RootStore) => state);

  // const id = useParams<IParams>().slug;
  const initState = {
    poster: "",
    title: "",
    content: "",
    description:
      "This post is not a complete list, more a list of stuff I found compelling in 2021 that will keep you set in 2022 and build off of my previous list",
    imagepost: "",
    tags: [],
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState<IBlog>(initState);
  const [body, setBody] = useState("");

  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const history = useHistory()
  const dispatch = useDispatch();

  const [oldData, setOldData] = useState(initState);
  if (!id) {
    console.log("create new");
  }
  const localSaveEdit: any = localStorage.getItem("test");
  const objSaveEdit: any = JSON.parse(localSaveEdit);
  // set local edit to local
  useEffect(() => {
    if (!id) {
      let newData = { content: body || "", title: blog.title || "" };
      if (newData.content || body) {
        localStorage.setItem("test", JSON.stringify(newData));
        console.log("save local: ", newData);
      }
    }
  }, [body, blog.title]);

  //get local fist to set innitState
  useEffect(() => {
    if (!id) {
      if (objSaveEdit) {
        setBlog({
          ...blog,
          title: objSaveEdit.title || "",
          content: objSaveEdit.content || "",
        });
        setBody(objSaveEdit.content);
    
        console.log("get  local", objSaveEdit);
      }
     
    }
    
  }, []);
  console.log("state now", blog);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getListTag());
  }, [dispatch]);
  //lay thong tin update blog
  useEffect(() => {
    if (!id) return;
    
    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data.blog);
        setBody(res.data.blog.content);
        setOldData(res.data.blog);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = div?.innerText as string;
    setText(text);
  }, [body]);

  // console.log(blog);

  const handleSubmit = async () => {
    //validate
    if (!auth.access_token) return;
    const check = validCreateBlog({ ...blog, content: text });
    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }
    let newData = { ...blog, content: body, poster: auth.user?._id };
    //dispath to action@@@@@@@@@@@@@@@@@@@@@@@@@@@
    if (id) {
      if ((blog.poster as IUser)._id !== auth.user?._id)
        //k the sua bai viet cua nguoi khac
        return dispatch({
          type: ALERT,
          payload: { errors: "Bạn không thể sửa bài viết của người khác" },
        });

      dispatch(updateBlog(newData, auth.access_token, history));
    } else {
      dispatch(createBlog(newData, auth.access_token, history));

    }
  };

  if (!auth.access_token) return <NotFound />;
  return (
    <div
      className="my-4 create_blog"
      style={{ margin: "0px 200px", padding: "20px 0px" }}
    >
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Tạo Blog</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        {/* dj4xe8zhd */}
        <div className="col-md-6">
          <h5>Xem trước thẻ</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>

      <ReactQuill setBody={setBody} body={body} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <small>{text.length}/20000</small>

      <button
        className="btn btn-dark mt-4 d-block mx-auto"
        onClick={handleSubmit}
      >
        {id ? "Cập nhật Blog" : "Tạo Blog"}
      </button>
    </div>
  );
};

export default CreateBlog;
