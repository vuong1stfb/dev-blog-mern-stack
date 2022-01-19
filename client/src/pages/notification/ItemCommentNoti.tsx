import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import { useState } from "react";
import moment from "moment";
const ItemCommentNotification = (props: any) => {
  const [isActiveButtonLike, setActiveButtonLike] = useState(false);
  return (
    //chua doc thi mau xanh, doc roi thi k co màu
    <Container wasRead={props.notifycomment.is_reading}>
      <div className="wrapercontent row p-2 mb-2">
        <div className="col-auto">
          <Link to={`/profile/${props.notifycomment.from_user._id}`} style={{ textDecoration: "none", color: "black" }}>
            <Avatar  style={{height: '50px', width: '50px'}} src={props.notifycomment.from_user.avatar}></Avatar>
          </Link>
        </div>

        <div className="col">
          <div className="row mb-3">
            <div className="">
              <Link to={`/profile/${props.notifycomment.from_user._id}`} style={{ textDecoration: "none", color: "black" }}>
                <span
                  className="name"
                  style={{ fontWeight: "bold", cursor: "pointer", fontSize: "20px" }}
                >
                  {props.notifycomment.from_user.name}
                </span>
              </Link>
              <span> </span>
              <span style={{fontSize: "20px", fontWeight: "400"}}> &nbsp;{props.notifycomment.message}</span>
              <Link to={`/blog/${props.notifycomment.idpost._id}`} style={{ textDecoration: "none", color: "black" }}>
                <span
                  className="name"
                  style={{ fontWeight: "bold", cursor: "pointer", fontSize: "20px" }}
                >
                  &nbsp; {props.notifycomment.idpost.title}
                </span>
              </Link>
            </div>

            <span style={{color: "#737575"}}>{moment(props.notifycomment.createdAt).fromNow()}</span>
          </div>
          {/* <Link
            className="link"
            to={"/"}
            style={{ textDecoration: "none", color: "#3D3D3D" }}
          >
            <div className="row border rounded-3 mb-0 p-4 ">
              <span>
                {" "}
                noi dung comment Great article. Love it's simplicity. And the
                test your knowledge option
              </span>
            </div>
          </Link>

          <div className="row border p-1">
            <div className="col">
              <div className="wrapreact d-flex gap-3">
                <ButtonLike
                  onClick={_handleButtonLike}
                  active={isActiveButtonLike}
                >
                  <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon> Like
                </ButtonLike>
                <ButtonView
                  onClick={_handleButtonView}
                  active={isActiveButtonSave}
                >
                  <PreviewIcon></PreviewIcon>
                  View
                </ButtonView>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default ItemCommentNotification;

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
const ButtonView = styled.button<{ active?: boolean }>`
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
