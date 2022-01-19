import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LiteQuill from "../../components/editor/LiteQuill";
import { useRef } from "react";
import { callbackify } from "util";
import { IComment } from "../../utils/TypeScript";
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

  /* border-width: 1px;
  border-color: black; */
  height: auto;
  border-radius: 10px;
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
  margin-top: 10px;
`;
const Textarea = styled.textarea`
  height: 100%;
  box-shadow: none;
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

interface IProps {
  callback: (body: string) => void
  imageuser: string | undefined
  edit?: IComment
  setEdit?:(edit?: IComment) => void
}

const CommentCreate: React.FC<IProps> = ({ callback, imageuser, edit, setEdit }) => {
  const [body, setBody] = useState("")
  const divref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(edit) setBody(edit.content)
  }, [edit])

  const handerSubmit = (cancel?: any) => {
    const div = divref.current;
    const text = (div?.innerText as string)
    if(cancel){
      if(setEdit) return setEdit(undefined);
      return;
    }
    if(!text.trim()) {
      if(setEdit) return setEdit(undefined);
      return;
    }; // nếu trống thì return

    callback(body)

    setBody('')

  }

  return (
    <Container>
      {edit ? null : <Row1>
        <Avatar alt="Remy Sharp" src={imageuser} />
      </Row1>}
      <Row2>
        <Comment>
          <LiteQuill body={body} setBody={setBody}/>
          <div ref={divref} dangerouslySetInnerHTML={{
            __html: body
          }} style={{display: 'none'}}></div>
        </Comment>

        <Button>
          {edit ? <>
            <button
            style={{ marginRight: "10px" }}
            type="button"
            className="btn btn-primary"
            onClick={() => handerSubmit()}
          >
            Cập nhật
          </button>
          <button
            style={{ marginRight: "10px" }}
            type="button"
            className="btn btn-primary"
            onClick={() => {return handerSubmit(true)}}
          >
            Hủy bỏ
          </button>
          </> :
          <button
          style={{ marginRight: "10px" }}
          type="button"
          className="btn btn-primary"
          onClick={() => handerSubmit()}
        >
          Gửi bình luận
        </button>}
          
          {/* <button type="button" className="btn btn-secondary">
            Xem trước
          </button> */}
        </Button>
      </Row2>
    </Container>
  );
};

export default CommentCreate
