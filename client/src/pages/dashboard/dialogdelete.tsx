import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickNo = () => {
    setOpen(false);
  };

  return (
    <Container>
      <div onClick={handleClickOpen} className="wrapbutton">Delete</div>
      <Dialog
        open={open}
        onClose={handleClickNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa bài viết này hay không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickNo}>Không</Button>
          <Button onClick={handleClickNo} autoFocus>
            Ok!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
const Container = styled.div`
 .wrapbutton {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    :hover {
      background-color: #f6f6f6;
    }
  }
  
`;