import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { RootStore } from "../../utils/TypeScript";
import Loadmore from "../../components/alert/Loadmore";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "../../components/homePage/sidebar/Sidebar";
import Feed from "../../components/homePage/feed/Feed";
import Feedhome from "../../components/homePage/feed/Feedhome";
import Rightbar from "../../components/homePage/rightbar/Rightbar";
import styled from "styled-components";
import Loading from "../../components/global/Loading";
import CardPostDetail from "../../components/homePage/feed/CardPostDetail";
import { getAPI } from "../../utils/FetchData";
import { useParams, useHistory } from "react-router-dom";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { useDispatch } from "react-redux";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { homeBlogs } = useSelector((state: RootStore) => state);
  const [listblog, setListblog] = useState([]);
  const [listblogtag, setListblogtag] = useState([]);
  const [page, setPage] = useState(2);
  const [loadmore, setLoadmore] = useState(false);
  const { auth } = useSelector((state: RootStore) => state);
  const [hasmore, setHasmore] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeButton, setActiveButton] = useState({
    follow: false, // all
    new: true, // comment
    old: false, // post
    top: false,
  });
  const [activefilter, setActivefilter] = useState({
    week: false,
    month: false,
    year: false,
    all: true,
  });
  const _handleButtonnew = () => {
    setActiveButton({ follow: false, new: true, old: false, top: false });
  };
  const _handleButtonfollow = () => {
    if (!auth.access_token) return handleOpen();
    setActiveButton({ follow: true, new: false, old: false, top: false });
  };
  const _handleButtonold = () => {
    setActiveButton({ follow: false, new: false, old: true, top: false });
  };

  const _handleButtontop = () => {
    setActiveButton({ follow: false, new: false, old: false, top: true });
  };
  // filter
  const _handleButtonweek = () => {
    setActivefilter({ week: true, month: false, year: false, all: false });
  };
  const _handleButtonmonth = () => {
    setActivefilter({ week: false, month: true, year: false, all: false });
  };
  const _handleButtonyear = () => {
    setActivefilter({ week: false, month: false, year: true, all: false });
  };
  const _handleButtonall = () => {
    setActivefilter({ week: false, month: false, year: false, all: true });
  };
  useEffect(() => {
    async function fetchMyAPI1() {
      await getAPI(`list-blogest-tag`).then((res) => {
        setListblogtag(res.data.listBlogtag);
      });
    }

    fetchMyAPI1();
  }, []);

  const fetchData = async () => {
    if (activeButton.new) {
      setPage(Number(page + 1));
      await getAPI(`list-home?filter=new&page=${page}`).then((res) => {
        if (res.data.datablog.length < 2) {
          setHasmore(false);
        }
        let array = listblog.concat(res.data.datablog);
        setListblog(array);
        setLoadmore(false);
      });
    } else if (activeButton.old) {
      setPage(Number(page + 1));
      await getAPI(`list-home?filter=old&page=${page}`).then((res) => {
        if (res.data.datablog.length < 2) {
          setHasmore(false);
        }
        let array = listblog.concat(res.data.datablog);
        setListblog(array);
        setLoadmore(false);
      });
    } else if (activeButton.top) {
      setPage(Number(page + 1));
      await getAPI(`list-home?filter=top&page=${page}`).then((res) => {
        if (res.data.datablog.length < 2) {
          setHasmore(false);
        }
        let array = listblog.concat(res.data.datablog);
        setListblog(array);
        setLoadmore(false);
      });
    } else if (activeButton.follow) {
      if (!auth.access_token) return handleOpen();
      setPage(Number(page + 1));
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI(`list-home?filter=follow&page=${page}`, access_token).then(
        (res) => {
          if (res.data.datablog.length < 2) {
            setHasmore(false);
          }
          let array = listblog.concat(res.data.datablog);
          setListblog(array);
          setLoadmore(false);
        }
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadmore(true);
    setHasmore(true);
    setPage(2);
    async function fetchMyAPI() {
      if (activeButton.new) {
        await getAPI(`list-home?filter=new&page=1`).then((res) => {
          if (res.data.datablog.length < 2) {
            setHasmore(false);
          }
          setListblog(res.data.datablog);
          setLoadmore(false);
        });
      } else if (activeButton.old) {
        await getAPI(`list-home?filter=old&page=1`).then((res) => {
          if (res.data.datablog.length < 2) {
            setHasmore(false);
          }
          setListblog(res.data.datablog);
          setLoadmore(false);
        });
      } else if (activeButton.top) {
        await getAPI(`list-home?filter=top&page=1`).then((res) => {
          if (res.data.datablog.length < 2) {
            setHasmore(false);
          }
          setListblog(res.data.datablog);
          setLoadmore(false);
        });
      } else if (activeButton.follow) {
        if (!auth.access_token) return handleOpen();
        const result = await checkTokenExp(auth.access_token, dispatch);
        const access_token = result ? result : auth.access_token;
        await getAPI(`list-home?filter=follow&page=1`, access_token).then(
          (res) => {
            if (res.data.datablog.length < 2) {
              setHasmore(false);
            }
            setListblog(res.data.datablog);
            setLoadmore(false);
          }
        );
      }
    }

    fetchMyAPI();
  }, [activeButton]);
  return (
    <HomeContainer>
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
                <div style={{ display: "flex" }}>
                  <Titlemodel>Đăng nhập để tiếp tục</Titlemodel>
                </div>
                <Descmodel>
                  Chúng tôi là nơi các lập trình viên chia sẻ, cập nhật và phát
                  triển sự nghiệp của họ. Nơi chia sẻ những kiến thức bổ ích
                  thuộc lĩnh vực lập trình{" "}
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
      <div className="divside">
        <Sidebar />
      </div>

      {/* <Feedhome /> */}

      <FeedContainer>
        <FeedSectionWraper>
          <ListNav>
            <ItemNav>
              <ContainerItemNav>
                <TextNav active={activeButton.new} onClick={_handleButtonnew}>
                  Mới nhất
                </TextNav>
              </ContainerItemNav>
            </ItemNav>
            <ItemNav>
              <ContainerItemNav>
                <TextNav active={activeButton.old} onClick={_handleButtonold}>
                  Cũ nhất
                </TextNav>
              </ContainerItemNav>
            </ItemNav>
            <ItemNav>
              <ContainerItemNav>
                <TextNav
                  active={activeButton.follow}
                  onClick={_handleButtonfollow}
                >
                  Đang follow
                </TextNav>
              </ContainerItemNav>
            </ItemNav>
            <ItemNav>
              <ContainerItemNav>
                <TextNav
                  active={activeButton.top}
                  onClick={() => {
                    _handleButtontop();
                    _handleButtonall();
                  }}
                >
                  Top Blog
                </TextNav>
              </ContainerItemNav>
            </ItemNav>
          </ListNav>
        </FeedSectionWraper>
        {loadmore ? (
          <Loading />
        ) : (
          <>
            {listblog.length === 0 ? (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #d8d8d8'
                }}
              >
                <h5 style={{color: "#999399"}}>Bạn chưa theo dõi bất kỳ mục nào</h5>
              </div>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={listblog.length}
                  next={fetchData}
                  hasMore={hasmore}
                  loader={<Loading />}
                  endMessage={<p></p>}
                >
                  {listblog.map((blog, index) => (
                    <CardPostDetail blog={blog} />
                  ))}
                </InfiniteScroll>
              </>
            )}
          </>
        )}
      </FeedContainer>

      <Rightbar listtagblog={listblogtag} />
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 70px;
  background-color: #efefef;
  .divside {
    @media only screen and (max-width: 768px) {
      /* For everything bigger than 768px */
      display: none;
    }
  }
`;

export default Home;

const FeedContainer = styled.div`
  flex: 5;
  margin-top: 15px;
`;
const FeedSectionWraper = styled.div`
  width: 100%;
  height: 65px;
`;
const ListNav = styled.ul`
  list-style: none;
  padding: 10px;
`;
const ListNavfilter = styled.ul`
  list-style: none;
  padding: 5px;
`;
const ItemNav = styled.li`
  display: inline;
`;
const ContainerItemNav = styled.div`
  display: inline-block;
  padding: 7px;
  margin-right: 10px;
  :hover {
    background-color: #dddeee;
    border-radius: 5px;
  }
  cursor: pointer;
`;
const TextNav = styled.span<{ active?: boolean }>`
  font-size: 19px;
  font-weight: ${(props) => (props.active ? "bold" : "")};
`;

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
