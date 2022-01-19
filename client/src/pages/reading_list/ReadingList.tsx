import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { postAPI, getAPI, patchAPI } from "../../utils/FetchData";
import { RootStore } from "../../utils/TypeScript";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import Loading from "../../components/global/Loading";
import { Formik, Form, Field, useFormik } from "formik";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { useDispatch } from "react-redux";

const ReadingList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  const [totalblog, setTotalblog] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [hasmore, setHasmore] = useState(true);
  const [search, setSearch] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    setPage(Number(page + 1));
    await getAPI(`get-blog-saved/${page}`, auth.access_token).then((res) => {
      if (res.data.listblogsaved.length + blogs.length === totalblog) {
        setHasmore(false);
      } else {
        setHasmore(true);
      }
      let array = blogs.concat(res.data.listblogsaved);
      setBlogs(array);
    });
  };

  const searchBlog = async (valuesearch: string) => {
    setLoading(true);
    if(!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await getAPI(
      `search-reading-list?search=${valuesearch}`,
      access_token
    ).then((res) => {
      setBlogs(res.data.resultSearch);
      setLoading(false);
      setHasmore(false);
    });
  };

  const unSaveBlog = async (idblog: any, index: number) => {
    if (!auth.access_token) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    await patchAPI(`unsave-post`, { idblog: idblog }, access_token).then(
      async (res) => {
        blogs.splice(index, 1);
        setTotalblog(totalblog - 1);
      }
    );
  };

  useEffect(() => {
    async function fecthdata() {
      setPage(2);
      setHasmore(true);
      if (!auth.access_token) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      setLoading(true);
      await getAPI("get-blog-saved/1", access_token).then((res) => {
        setTotalblog(res.data.count);
        setBlogs(res.data.listblogsaved);
        if (res.data.listblogsaved.length === res.data.count) {
          setHasmore(false);
        } else {
          setHasmore(true);
        }
        console.log(res.data.listblogsaved);
        setLoading(false);
      });
    }
    fecthdata();
  }, [auth.access_token, search]);
  return (
    <>
      {blogs && (
        <Container>
          <Header>
            <div className="header">
              <div className="reading-list">
                <h1>Danh sách đọc ({totalblog})</h1>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={{ valuesearch: "" }}
                onSubmit={(values, { resetForm }) => {
                  if (values.valuesearch === "") return setSearch(!search);
                  searchBlog(values.valuesearch);
                  // resetForm();
                  // setSearch(false)
                }}
              >
                <Form>
                  <Field
                    className="search"
                    name="valuesearch"
                    autocomplete="off"
                    type="text"
                    placeholder="Tìm kiếm...."
                  />
                </Form>
              </Formik>
            </div>
          </Header>
          <Content>
            <div className="body">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <InfiniteScroll
                    dataLength={blogs.length}
                    next={fetchData}
                    hasMore={hasmore}
                    loader={<Loading />}
                    endMessage={<p></p>}
                  >
                    {blogs.length === 0 ? (
                      <div
                        style={{
                          height: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: 'center'
                        }}
                      >
                        <h4 style={{color: "#a0a0a0"}}>Danh sách đọc trống</h4>
                      </div>
                    ) : (
                      <>
                        {blogs.map((blog: any, index: number) => (
                          <ItemPost key={index}>
                            <Avatar
                              style={{ width: "50px", height: "50px" }}
                              src={blog.poster.avatar}
                            ></Avatar>

                            <div className="content">
                              <h2
                                onClick={() =>
                                  history.push(`/blog/${blog._id}`)
                                }
                                className="content-title"
                              >
                                {blog.title}
                              </h2>
                              <p className="content-bot">
                                <span
                                  onClick={() =>
                                    history.push(`/profile/${blog.poster._id}`)
                                  }
                                  className="name"
                                >
                                  {blog.poster.name}
                                </span>
                                <span> • </span>
                                <span className="create-time">
                                  {moment(blog.createdAt).fromNow()}
                                </span>
                                {/* <span> • </span>
                    <span className="read-time">1 min read</span> */}
                                <span> • </span>
                                {blog.tags.map((tag: any, index: number) => (
                                  <span
                                    onClick={() =>
                                      history.push(`/tags/${tag._id}`)
                                    }
                                    className="tag"
                                  >
                                    #{tag.name}
                                  </span>
                                ))}
                              </p>
                            </div>

                            <div
                              onClick={() => unSaveBlog(blog._id, index)}
                              className="item-button"
                            >
                              Hủy lưu
                            </div>
                          </ItemPost>
                        ))}
                      </>
                    )}
                  </InfiniteScroll>
                </>
              )}
            </div>
          </Content>
        </Container>
      )}
    </>
  );
};
export default ReadingList;
// LayOut @@@@@@@@@@@@@@@@@@
const Container = styled.div`
  padding: 20px 150px;
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
