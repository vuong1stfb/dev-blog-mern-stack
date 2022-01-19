import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { WraperIconReact } from "./[slug]";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Badge, Tooltip } from "@mui/material";
import CommentCreate from "./CommentCreate";
import { Link } from "react-router-dom";
import { IComment, RootStore } from "../../utils/TypeScript";
import moment from "moment";
import Loadmore from "../../components/alert/Loadmore";
import { deleteComment, replyComment, updateComment } from "../../redux/actions/commentAction";
import Menu, { MenuProps } from "@mui/material/Menu";

interface IProps {
  comment: IComment;
  showreply: IComment[];
  setShowReply: (showreply: IComment[]) => void;
}

const CommentList: React.FC<IProps> = ({
  children,
  comment,
  showreply,
  setShowReply,
}) => {
  const [onReply, setOnReply] = useState(false);
  const [edit, setEdit] = useState<IComment>();
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;
    const dataReply = {
      user: auth.user,
      id_blog: comment.id_blog,
      id_user_blog: comment.id_user_blog,
      content: body,
      // replyComment: IComment[],
      user_reply: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };
    setShowReply([dataReply, ...showreply]);
    dispatch(replyComment(dataReply, auth.access_token));
    setOnReply(false);
  };


  const handleUpdate = (body: string) => {
    if (!auth.user || !auth.access_token || !edit) return;
    if(body === edit.content)
    return setEdit(undefined)

    const commentUpdate = {...edit, content: body}

    dispatch(updateComment(commentUpdate, auth.access_token))

    setEdit(undefined)
  }

  const handelDelete = (comment: IComment) => {
    if (!auth.user || !auth.access_token) return;
    dispatch(deleteComment(comment, auth.access_token))
  }

  return (
    <>
      <Container>
        <Row2>
          {
              edit ? <CommentCreate 
              callback={handleUpdate} 
              imageuser={auth.user?.avatar}
              edit={edit}
              setEdit={setEdit}
              /> :
              <>
              <Comment
            className="border rounded"
            style={{
              borderColor: "black",
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? "initial" : "none",
            }}
          >
            <Textarea
              style={{
                display: "flex",
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            >
              <Link
                to={`/profile/${comment.user?._id}`}
                style={{
                  textDecoration: "none",
                  color: "#3D3D3D",
                  marginRight: "10px",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                  fontSize: "18px",
                  height: "10px",
                }}
              >
                <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                  {comment.user?.name}
                </span>
              </Link>
              {/* <div style={{ display: "inline-block" }}>
              <Tooltip title="Author" placement="top">
                <MilitaryTechOutlinedIcon></MilitaryTechOutlinedIcon>
              </Tooltip>
            </div> */}
              <p
                style={{
                  paddingTop: "3px",
                  color: "#747378",
                  marginBottom: "0px",
                }}
              >
                • {moment(comment.createdAt).fromNow()}
              </p>
              {/* menu ẩn */}
              {comment.id_user_blog === auth.user?._id || comment.user?._id === auth.user?._id ? 
              <div>
              <WraperIconReact onClick={handleClick}>
                <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
              </WraperIconReact>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {/* <Divider sx={{ my: 0.5 }} /> */}
                <MenuItem onClick={() => {handleClose(); handelDelete(comment)}} disableRipple>
                  <DeleteOutlineOutlinedIcon />
                  Xóa bình luận
                </MenuItem>
                {comment.user?._id === auth.user?._id ? 
                <MenuItem onClick={() => {handleClose(); setEdit(comment)}} disableRipple>
                  <EditIcon />
                  Chỉnh sửa
                </MenuItem> : null}
                
              </StyledMenu>
            </div>
            : null
            }
              
            </Textarea>
            <div className="ql-snow" style={{ fontSize: "18px" }}>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: comment.content,
                }}
              />
            </div>
          </Comment>
          {comment.comment_root ? null : 
           <Button>
           <WraperReaction onClick={() => setOnReply(!onReply)}>
             {onReply ? (
               <p>Trả lời {comment.user?.name}</p>
             ) : (
               <Badge badgeContent={0} color="primary">
                 <ChatBubbleOutlineOutlinedIcon
                   color="action"
                   style={{ marginRight: "6px" }}
                 />
                 Phản hồi
               </Badge>
             )}
           </WraperReaction>
         </Button>
          }
         
              </>
          }
          {onReply && (
            <CommentCreate
              callback={handelReply}
              imageuser={auth.user?.avatar}
            />
          )}

          {children}
        </Row2>
      </Container>
    </>
  );
};
export default CommentList;

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
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  background-color: #ffffff;
`;
const Row1 = styled.div`
  margin-right: 10px;
`;
const Row2 = styled.div`
  flex: 1;
`;
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  justify-content: space-between;
`;

const TextCmt = styled.input`
  height: 100%;
`;
const Option = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OptionLeft = styled.div`
  padding: 5px;
`;
const OptionRight = styled.div`
  padding: 5px;
`;
const Button = styled.div`
  margin-top: 5px;
`;
const Textarea = styled.p`
  background: transparent;
`;
const Icon = styled.button`
  padding: 10px;
  display: inline;
  border: none;
  margin-right: 10px;
  border-radius: 5px;
  background: transparent;
  :hover {
    background-color: #efefef;
  }
  cursor: pointer;
`;

const WraperReaction = styled.button`
  display: inline;
  padding: 3px 6px;
  border: none;
  background: transparent;
  :hover {
    border-radius: 5px;
    background-color: #ebe3e3;
  }
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    //   marginTop: theme.spacing(1),
    minWidth: 180,
    //   color:
    //     theme.palette.mode === "light"
    //       ? "rgb(55, 65, 81)"
    //       : "",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        //   color: theme.palette.text.secondary,
        //   marginRight: theme.spacing(1.5),
      },
      // "&:active": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     theme.palette.action.selectedOpacity
      //   ),
      // },
    },
  },
}));
