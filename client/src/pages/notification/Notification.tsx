import { useState, useEffect } from "react";
import styled from "styled-components";
import ItemCommentNotification from "./ItemCommentNoti";
import ItemPostNotification from "./ItemPostNotification";
import ItemLikenoti from "./itemLikenoti";
import ItemFollowNoti from "./ItemFollowNoti";
import { useSelector } from "react-redux";
import { IParams, RootStore } from '../../utils/TypeScript';
import { getAPI, patchAPI } from "../../utils/FetchData";
import Loading from "../../components/global/Loading";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { useDispatch } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)
  const [filter, setFilter] = useState("all")
  const [listnoti, setListnoti] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [activeButton, setActiveButton] = useState({
    all: true,
    comment: false,
    post: false,
    like: false
  });
  const _handleButtonComment = () => {
    setActiveButton({ all: false, comment: true, post: false, like: false });
  };
  const _handleButtonAll = () => {
    setActiveButton({ all: true, comment: false, post: false, like: false });
  };
  const _handleButtonPost = () => {
    setActiveButton({ all: false, comment: false, post: true, like: false });
  };
  const _handleButtonLike = () => {
    setActiveButton({ all: false, comment: false, post: false, like: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if(!auth.user || !auth.access_token) return;
    
    setLoading(true)
    async function fetchdata() {
      if(activeButton.all){
        if(!auth.access_token) return;
        const result = await checkTokenExp(auth.access_token, dispatch);
        const access_token = result ? result : auth.access_token;
        await getAPI(`getnotify?type=all`, access_token).then(res => {
          setListnoti(res.data.listnoti)
          const isevery: any = res.data.listnoti.some((check: any) => {
            return check.is_reading == false;
          });
          if(isevery){
            patchAPI('readingnoti', {ok:" ok"}, access_token )
            console.log("read")
          }
          setLoading(false)
        })
      }
      if(activeButton.comment){
        if(!auth.access_token) return;
        const result = await checkTokenExp(auth.access_token, dispatch);
        const access_token = result ? result : auth.access_token;
        await getAPI(`getnotify?type=comment`, access_token).then(res => {
          setListnoti(res.data.listnoti)
          setLoading(false)
        })
      }
      if(activeButton.post){
        if(!auth.access_token) return;
        const result = await checkTokenExp(auth.access_token, dispatch);
        const access_token = result ? result : auth.access_token;
        await getAPI(`getnotify?type=blog`, access_token).then(res => {
          setListnoti(res.data.listnoti)
          setLoading(false)
        })
      }
      if(activeButton.like){
        if(!auth.access_token) return;
        const result = await checkTokenExp(auth.access_token, dispatch);
        const access_token = result ? result : auth.access_token;
        await getAPI(`getnotify?type=like`, access_token).then(res => {
          setListnoti(res.data.listnoti)
          setLoading(false)
        })
      }
    }
    fetchdata()
  }, [auth.user, activeButton])
  return (
    <Container>
      <div className="container">
        <div className="row ">
          <div className="col">
            <h1>Thông báo</h1>
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
                Tất cả
              </Button>
            </Wrapbutton>
            <Wrapbutton>
              <Button
                active={activeButton.comment}
                onClick={_handleButtonComment}
              >
                Bình luận
              </Button>
            </Wrapbutton>
            <Wrapbutton>
              <Button active={activeButton.post} onClick={_handleButtonPost}>
                Blog
              </Button>
            </Wrapbutton>
            <Wrapbutton>
              <Button active={activeButton.like} onClick={_handleButtonLike}>
                Tương tác
              </Button>
            </Wrapbutton>
          </div>
          <div className="col-8">
            {loading ? <Loading/> : <>
          
            {listnoti && <>
            {listnoti.length === 0 ? <NoResult>Danh sách thông báo trống</NoResult> : <>
            {activeButton.all && 
              <div> 

                {listnoti.map((notifi:any, index: number) => (
                  <>
                    {notifi.type === "blog" ? <ItemPostNotification notifiblog={notifi}/> : null}
                    {notifi.type === "comment" ? <ItemCommentNotification notifycomment={notifi}/> : null}
                    {notifi.type === "like" ? <ItemLikenoti notifilike={notifi}/> : null}
                    {notifi.type === "follow" ? <ItemFollowNoti notififollow={notifi}/> : null}
                    {notifi.type === "different" ? <div>ok different</div> : null}
                  </>
                ))}
              </div>
            }
            {activeButton.post && (
              <div>
                {listnoti.map((notifi:any, index: number) => (
                  <>
                    {notifi.type === "blog" ? <ItemPostNotification notifiblog={notifi}/> : null}
                  </>
                ))}
              </div>
            )}
            {activeButton.comment && (
              <div>
                {listnoti.map((notifi:any, index: number) => (
                  <>
                     {notifi.type === "comment" ? <ItemCommentNotification notifycomment={notifi}/> : null}
                  </>
                ))}
              </div>
            )}
            {activeButton.like && (
              <div>
                {listnoti.map((notifi:any, index: number) => (
                  <>
                     {notifi.type === "like" ? <ItemLikenoti notifilike={notifi}/> : null}
                    {notifi.type === "follow" ? <ItemFollowNoti notififollow={notifi}/> : null}
                  </>
                ))}
              </div>
            )}
            </>}
            </>}
            </>}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Notification;

const Container = styled.div`
  background-color: #efefef;
  width: 100%;
  height: auto;
  min-height: 90vh;
  padding-top: 30px;
  padding-bottom: 30px
`;

const Wrapbutton = styled.div``;

const Button = styled.button<{ active?: boolean }>`
  border: none;
  width: 100%;
  background-color: ${(props) => (props.active ? "white" : "")};
  border: ${(props) => (props.active ? "1px solid #d8d8d8" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => (props.active ? "" : "#dddeee")};
    color: blue;
  }
`;

const NoResult = styled.div`
  width: 100%;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  color: #A7A8A5;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #d8d8d8;
`;
