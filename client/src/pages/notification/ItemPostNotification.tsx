import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useState } from "react";
import moment from "moment";
const ItemPostNotification = (props:any) => {
  const [isActiveButtonLike, setActiveButtonLike] = useState(false);
  const [isActiveButtonSave, setActiveButtonSave] = useState(false);
  const [isRead, setIsRead] = useState(true)
  const _handleButtonLike = () => {
    setActiveButtonLike(!isActiveButtonLike);
    alert("handle like Post")
  };
  const _handleButtonSave = () => {
    setActiveButtonSave(!isActiveButtonSave);
    alert("handle Save Post")
  };

  // console.log(props.notifiblog)

  return (
    //neu bai viet da doc 
    <Container wasRead={props.notifiblog.is_reading}>
      <div className="wrapercontent row p-2 mb-2">
        <div className="col-auto">
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Avatar style={{height: '50px', width: '50px'}} src={props.notifiblog.from_user.avatar}></Avatar>
          </Link>
        </div>

        <div className="col">
          <div className="row mb-3">
            <div className="">
              <Link to={`/profile/${props.notifiblog.from_user._id}`} style={{ textDecoration: "none", color: "black" }}>
                <span
                  className="name"
                  style={{ fontWeight: "bold", cursor: "pointer", fontSize: "20px" }}
                >
                  {props.notifiblog.from_user.name}
                </span>
              </Link>
              <span> </span>
              <span style={{fontSize: "20px", fontWeight: "400"}}> &nbsp;{props.notifiblog.message}</span>
            </div>

            <span style={{color: "#737575"}}>{moment(props.notifiblog.createdAt).fromNow()}</span>
          </div>
          <Link
            className="link"
            to={`/blog/${props.notifiblog.idpost._id}`}
            style={{ textDecoration: "none", color: "#3D3D3D" }}
          >
            <div className="row border rounded-3 mb-0 ">
              <div className="row pt-3">
                <h2 className="nametitle">{props.notifiblog.idpost.title}</h2>
              </div>
              <div className="row mb-4 ">
                {props.notifiblog.idpost.tags.map((tag: any, index:number) => (
                  <div className="col-auto" key={index}>
                  <span className="nametag">#{tag.name}</span>
                </div>
                ))}
                
               
              </div>
            </div>
          </Link>

          {/* <div className="row border p-1">
            <div className="col">
              <div className="wrapreact d-flex flex-row">
                <ButtonLike
                  onClick={_handleButtonLike}
                  active={isActiveButtonLike}
                >
                  <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon> Like
                </ButtonLike>
              </div>
            </div>
            <div className="col">
              <div className="wrapreact d-flex flex-row justify-content-end ">
                <ButtonSave
                  onClick={_handleButtonSave}
                  active={isActiveButtonSave}
                >
                  Save <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
                </ButtonSave>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default ItemPostNotification;

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


const Container = styled.div<{ wasRead?: boolean }>`
  width: 100%;
  .name {
    cursor: pointer;
    :hover {
      color: blue;
    }
  }
  .wrapercontent {
    border-radius: 5px;
    border-left: 15px solid ${(props) => (props.wasRead ? "tranparent" : "blue")};
    background-color: white;
    border: 1px solid #d8d8d8;
  }
  .button {
    text-decoration: none;
    border: none;
    background: transparent;
    border-radius: 5px;
    padding: 5px;
    :hover {
      background-color: #efefef;
    }
  }
  .link {
    :hover {
      .nametitle {
        color: blue;
      }
      .nametag {
        color: blue;
      }
    }
  }
`;
const ButtonSave = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  background-color: ${(props) => (props.active ? "#FAE7E7" : "")};
  background: ${(props) => (props.active ? "" : "transparent")};
  text-align: start;
  padding: 5px;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => (props.active ? "" : "#EFEFEF")};
    color: blue;
  }
`;
const ButtonLike = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  background-color: ${(props) => (props.active ? "#EBECFC" : "")};
  background: ${(props) => (props.active ? "" : "transparent")};
  text-align: start;
  padding: 5px;
  border-radius: 5px;
  :hover {
    background-color: ${(props) => (props.active ? "" : "#EFEFEF")};
    color: blue;
  }
`;
