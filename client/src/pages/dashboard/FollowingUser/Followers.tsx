import React,{useEffect, useState} from "react";
import styled from "styled-components";
import LeftMenu from "../LeftMenu";
import RightContent from "../RightContent";
import { getAPI } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import Loading from "../../../components/global/Loading";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkTokenExp } from '../../../utils/checkTokenExp'

const Follower = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state);
  const [listuser, setlistuser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fectdata() {
      window.scrollTo(0, 0);
      if(!auth.access_token) return;
      setLoading(true)
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI("get-follower", access_token).then(res => {
        setlistuser(res.data.listTags)
        setLoading(false)
      })
    }
    fectdata()
  }, [auth.access_token])
  return (
    <Container>
      {/* secction@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <h2>Bảng điều khiển » Người theo dõi</h2>

      {/* body@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <div className="row mt-3">
        <div className="col-md-3">
          <LeftMenu isActive="followers"></LeftMenu>
        </div>
        {/* content right@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        
        <div className="col-md-9 ">
        {loading ? <Loading/> : <>
        {listuser.length === 0 ? <div className="notfound">
            Bạn chưa có bất kỳ người theo dõi nào ...
          </div> :
          <div className="list-item-user">
          {listuser.map((user: any, index: number) => (
            <>
            <div style={{cursor: "pointer"}} className="item-user" key={index}>
            <div className="item-user-image">
              <img
                src={user.avatar}
                alt=""
              />
            </div>
            <div  onClick={() => history.push(`/profile/${user._id}`)} className="item-user-name">
              <h3>{user.name}</h3>
            </div>
            <button  onClick={() => history.push(`/profile/${user._id}`)} className="btn btn-primary">Xem trang cá nhân</button>
          </div>
          
          </>
          ))}   
          </div>}
          </>}
        </div>
        
      </div>
    </Container>
  );
};

export default Follower;

const Container = styled.div`
  background-color: rgb(239, 239, 239);
  padding: 50px;
  min-height: 90vh;
  width: 100%;
  .notfound {
    border: 1px solid #d8d8d8;
    background-color: rgb(249,249,249);
    width: 100%;
    display: inline-block;
    font-size: 18px;
    line-height: 12px;
   padding: 62px;
    border-radius: 10px;
    text-align: center;
  }
  .item-section {
    background-color: #f9f9f9;
  }
  .list-item-user {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 240px));
    gap: 16px;

    .item-user {
      display: grid;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #d8d8d8;
      padding: 20px;
      .item-user-image {
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
        > img {
          border-radius: 50%;
          width: 64px;
          height: 64px;
        }
      }
      .item-user-name {
        display: flex;
        justify-content: center;
        > h3 {
          color: blue;
          font-weight: 700;
          font-size: 18px;
          text-align: center;
        }
      }
    }
  }
`;
