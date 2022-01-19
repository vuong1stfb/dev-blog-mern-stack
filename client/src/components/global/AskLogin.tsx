import React from 'react'
import styled from "styled-components";
import { Overlay } from 'react-portal-overlay';
import {Backdrop , Box, Modal ,Fade ,Button ,Typography} from '@mui/material';


const styless = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AskLogin = (props: any) => {
  const [open, setOpen] = React.useState(props.ask);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{}}>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
        <Box style={{position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400',
  backgroundColor: '#fff',
  border: '2px solid #000',
}}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default AskLogin

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  z-index: 100
`;
