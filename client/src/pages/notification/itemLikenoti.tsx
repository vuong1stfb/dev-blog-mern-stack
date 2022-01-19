import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import { useState } from "react";
import moment from "moment";
const ItemLikenoti = (props: any) => {
  return (
    //chua doc thi mau xanh, doc roi thi k co màu
    <Container wasRead={props.notifilike.is_reading}>
      <div className="wrapercontent row p-2 mb-2">
        <div className="col-auto">
          <Link to={`/profile/${props.notifilike.from_user._id}`} style={{ textDecoration: "none", color: "black" }}>
            <Avatar  style={{height: '50px', width: '50px'}} src={props.notifilike.from_user.avatar}></Avatar>
          </Link>
        </div>

        <div className="col">
          <div className="row mb-3">
            <div className="">
              <Link to={`/profile/${props.notifilike.from_user._id}`} style={{ textDecoration: "none", color: "black" }}>
                <span
                  className="name"
                  style={{ fontWeight: "bold", cursor: "pointer", fontSize: "20px" }}
                >
                  {props.notifilike.from_user.name}
                </span>
              </Link>
              <span> </span>
              <span style={{fontSize: "20px", fontWeight: "400"}}> &nbsp;{props.notifilike.message}</span>
              <Link to={`/blog/${props.notifilike.idpost._id}`} style={{ textDecoration: "none", color: "black" }}>
                <span
                  className="name"
                  style={{ fontWeight: "bold", cursor: "pointer" ,fontSize: "20px"}}
                >
                  &nbsp; {props.notifilike.idpost.title}
                </span>
              </Link>
            </div>

            <span style={{color: "#737575"}}>{moment(props.notifilike.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ItemLikenoti;

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
