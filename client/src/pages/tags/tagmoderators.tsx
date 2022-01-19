import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 100%;
`;
const Guidelines = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const Content = styled.div`
  margin-bottom: 10px;
`;
const CreateButton = styled.button`
  border: none;
`;
const tagmoderators = (infortag: any) => {
  return (
    <Container>
      <Guidelines>Quản trị Tag</Guidelines>
      <Content>
        <AvatarGroup total={10}>
          {/* {infortag?.moderators.map} */}
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        </AvatarGroup>
      </Content>
    </Container>
  );
};

export default tagmoderators;
