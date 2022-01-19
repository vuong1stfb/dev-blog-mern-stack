import React,{useEffect, useState} from "react";
import styled from "styled-components";
import LeftMenu from "../LeftMenu";
import RightContent from "../RightContent";
import { getAPI } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import Loading from "../../../components/global/Loading";
import { useHistory } from "react-router-dom";
import { checkTokenExp } from '../../../utils/checkTokenExp'
import { useDispatch } from "react-redux";

const FollowingTags = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state);
  const [listtags, setlisttags] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fectdata() {
      if(!auth.access_token) return;
      window.scrollTo(0, 0);
      setLoading(true)
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await getAPI("get-tag-follow", access_token).then(res => {
        setlisttags(res.data.listTags)
        setLoading(false)
      })
    }
    fectdata()
  }, [auth.access_token])
  return (
    <Container>
      {/* secction@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <h2>Bảng điều khiển » Tags đang theo dõi</h2>

      {/* body@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <div className="row mt-3">
        <div className="col-md-3">
          <LeftMenu isActive="following-tags" ></LeftMenu>
        </div>
        {/* content right@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <div className="col-md-9">
              {loading ? <Loading/> : <>
              {listtags.length === 0 ?<div className="notfound">
            Bạn chưa theo dõi bất kỳ thẻ tag nào ...
          </div> :  <div  style={{display: "flex", flexWrap: "wrap"}}>
          {listtags.map((tag:any, index: number) => (
              <ItemBody key={index}>
              <Top></Top>
              <Nametag onClick={() => history.push(`/tags/${tag._id}`)}>
                #{tag.name}
              </Nametag>
              <Desctag>{tag.description}</Desctag>
              <Totaltagblog>
                {tag.total_blog} bài viết được xuất bản
              </Totaltagblog>
             
            </ItemBody>
          ))}
              </div> }
              </>}


      
          
        </div>
      </div>
    </Container>
  );
};

export default FollowingTags;

const Container = styled.div`
  background-color: rgb(239, 239, 239);
  padding: 50px;
  min-height: 90vh;
  width: 100%;
  .notfound {
    border: 1px solid #d8d8d8;
    background-color: rgb(249, 249, 249);
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  .notice {
    background-color: #dddeee;
    padding: 18px;
    border-radius: 10px;
    > span {
      border-color: #3b49df;
      border-radius: 6px;
      border-style: solid;
      border-width: 1px;
      color: #3b49df;
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      margin: 0px 0px 0px 12px;
      padding: 4px;
      text-align: center;
    }
  }
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
  margin: 20px 20px 0px 20px;
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
  width: 315px;
  height: auto;
  margin: 15px;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  padding-bottom: 25px;
`;

