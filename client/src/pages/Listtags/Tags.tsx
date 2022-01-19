import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Backdrop, Box, Modal, Fade } from "@mui/material";
import { ALERT } from "../../redux/types/alertType";
import { useDispatch } from "react-redux";
import { getAPI,patchAPI } from "../../utils/FetchData";
import { useSelector } from "react-redux";
import { IParams, RootStore } from "../../utils/TypeScript";

const Tags = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  const [listtag, setListtag] = useState([]);
  const [open, setOpen] = useState(false);
  const [taguser, setTaguser] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!auth.user) return;
    var c:any = auth.user?.my_tags
    setTaguser(c)

  }, [auth]);

  useEffect(() => {
    dispatch({ type: ALERT, payload: { loading: true } });
    async function fetchMyAPI() {
      await getAPI("get-list-tag-top")
        .then((res) => {
          setListtag(res.data.listtag);
          // console.log(res.data.listtag);
          dispatch({ type: ALERT, payload: { loading: false } });
        })
        .catch((err) => {
          history.replace("/not-found");
        });
    }
    fetchMyAPI();
  }, []);

  const followtag = async (id:any) => {
    if (!auth.access_token) return handleOpen();
    await patchAPI(
      `follow-tag`,
      { idtag: id },
      auth.access_token
    ).then((res) => {
        setTaguser(res.data.result.my_tags)
    }).catch(err => {
        // dispatch({ type: ALERT, payload: { errors: err.response.msg } });
    })
  };

  const unfollowtag = async (id: any) => {
    if (!auth.access_token) return handleOpen();
    await patchAPI(
        `unfollow-tag`,
        { idtag: id },
        auth.access_token
      ).then((res) => {
        setTaguser(res.data.result.my_tags)
      }).catch(err => {
        // dispatch({ type: ALERT, payload: { errors: "Có lỗi sảy ra" } });
      })
  };

  return (
    <Container>
      {(listtag && taguser) && (
        <>
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
                      Chúng tôi là nơi các lập trình viên chia sẻ, cập nhật và
                      phát triển sự nghiệp của họ. Nơi chia sẻ những kiến thức
                      bổ ích thuộc lĩnh vực lập trình{" "}
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
          <div className="container">
            <div className="row " style={{ paddingTop: "30px" }}>
              <div className="col">
                <h1 style={{ fontWeight: "bold" }}>Các thẻ Tag hàng đầu</h1>
              </div>
              {/* <div className="col">
                <div className="d-flex justify-content-end">
                    {auth.access_token ? <button type="button" className="btn btn-outline-secondary">
                    <span className="font-weight-bold">Thẻ đang theo dõi</span>
                  </button> : null}
                  
                </div>
              </div> */}
            </div>
          </div>

          <Listtag className="container">
            {listtag.map((tag: any, index) => (
              <ItemBody key={index}>
                <Top></Top>
                <Nametag onClick={() => history.push(`/tags/${tag._id}`)}>
                  #{tag.name}
                </Nametag>
                <Desctag>{tag.description}</Desctag>
                <Totaltagblog>
                  {tag.total_blog} bài viết được xuất bản
                </Totaltagblog>
                
                  {taguser.some((check: any) => {
                    return check.idtag.toString() == tag._id;
                  }) ? (
                    <button style={{
                        marginLeft: '20px',
                        fontWeight: '600'
                        }} onClick={() => unfollowtag(tag._id)} type="button" className="btn btn-outline-secondary">
                    Bỏ theo dõi
                  </button>
                  ) : (
                    <button style={{
                        marginLeft: '20px',
                        fontWeight: '600'
                        }} onClick={() => followtag(tag._id)} type="button" className="btn btn-primary">
                    Theo dõi
                  </button>
                  )}
              </ItemBody>
            ))}
          </Listtag>
        </>
      )}
    </Container>
  );
};
export default Tags;

const Container = styled.div`
  background-color: #efefef;
  width: 100%;
  height: auto;
`;

const Listtag = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
`;

const Top = styled.div`
  background-color: #0C6AF7;
  width: 100%;
  height: 20px;
  border-radius: 7px 7px 0px 0px;
`;

const Nametag = styled.p`
  cursor: pointer;
  font-size: 23px;
  font-weight: bold;
  display: inline-flex;
  margin: 20px;
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
  width: 400px;
  height: auto;
  margin: 15px;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  padding-bottom: 25px;
`;

const Wrapbutton = styled.div``;

// const Button = styled.button<{ active?: boolean }>`
//   border: none;
//   width: 100%;
//   background-color: ${(props) => (props.active ? "white" : "")};
//   font-weight: ${(props) => (props.active ? "bold" : "")};
//   text-align: start;
//   padding: 10px;
//   border-radius: 5px;
//   :hover {
//     background-color: ${(props) => (props.active ? "" : "#dddeee")};
//     color: blue;
//   }
// `;
// model
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
