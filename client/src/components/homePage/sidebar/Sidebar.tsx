import styled from "styled-components";
import SettingIcon from "@mui/icons-material/Settings";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { IParams, RootStore } from "../../../utils/TypeScript";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import SettingsApplicationsTwoToneIcon from "@mui/icons-material/SettingsApplicationsTwoTone";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
const Container = styled.div`
  flex: 2;
  width: 250px;
  @media only screen and (max-width: 768px) {
    /* For everything bigger than 768px */
    /* display: none; */
  }
`;
const WraperContainer = styled.div`
  position: fixed;
  margin-top: 20px;
`;
const WraperCategory = styled.div`
  width: 100%;
`;
const ListCategory = styled.ul`
  list-style: none;
  padding: 10px;
`;
const ItemCategory = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: #dddeee;
    border-radius: 10px;
  }
`;

const TextCategory = styled.span`
  font-size: 18px;
`;

const ImageCategory = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

/////////////////////Othe//////////////////////////
const WraperOther = styled.div`
  width: 100%;
`;
const ListOther = styled.ul`
  list-style: none;
  padding: 10px;
`;
const ItemOther = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: #dddeee;
    border-radius: 10px;
  }
`;

const ImageOther = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;
const TextOther = styled.span``;
const NameOther = styled.span`
  display: flex;
  font-weight: bold;
  justify-content: center;
`;

///////////////////////SOCIAL WRAPER////////////////////
const WraperSocial = styled.div`
  width: 100%;
`;

const ListSocial = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  list-style: none;
`;

const ItemSocial = styled.li`
  float: left;
  :hover {
    background-color: #dddeee;
    border-radius: 20%;
  }
  cursor: pointer;
`;
const WraperImageSocial = styled.div`
  padding: 10px;
`;
const ImageSocial = styled.img`
  width: 32;
  height: 32;
`;

/////////////////Tags Section////////////////
const WraperMyTags = styled.div`
  width: 100%;
`;
const MyTagSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;
const TagTextSection = styled.span`
  font-weight: bold;
  font-size: 16;
`;
const TagWraperImage = styled.div`
  padding: 10px;
  :hover {
    background-color: #dddeee;
  }
  cursor: pointer;
`;
const TagImage = styled.img`
  width: 32;
  height: 32;
`;
const ListTagItem = styled.ul`
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
`;

const TagItem = styled.li`
  padding: 10px;
  :hover {
    background-color: #dddeee;
  }
  cursor: pointer;
`;
const TagText = styled.span``;

function Sidebar() {
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);
  return (
    <Container>
      <WraperContainer>
        <WraperCategory>
          <ListCategory>
            <ItemCategory onClick={() => history.push("/")}>
              <HomeTwoToneIcon style={{ marginRight: "10px" }} />
              <TextCategory>Trang chủ </TextCategory>
            </ItemCategory>

            <ItemCategory onClick={() => {
              history.push(`/create_blog`);
            }}>
              <BorderColorTwoToneIcon style={{ marginRight: "10px" }} />
              <TextCategory>Tạo Blog</TextCategory>
            </ItemCategory>

            <ItemCategory onClick={() => {
              history.push(`/reading_list`);
            }}>
              <MenuBookTwoToneIcon style={{ marginRight: "10px" }} />
              <TextCategory>Danh sách đọc</TextCategory>
            </ItemCategory>

            <ItemCategory onClick={() => history.push("/toptags")}>
              <LocalOfferTwoToneIcon style={{ marginRight: "10px" }} />
              <TextCategory>Top Tags </TextCategory>
            </ItemCategory>
          </ListCategory>
        </WraperCategory>

        {/* <WraperOther>
        <NameOther>Other</NameOther>
        <hr />
        <ListOther>
          <ItemOther>
            <ImageOther src="no"></ImageOther>
            <TextOther>Code of Conduct</TextOther>
          </ItemOther>
          <ItemOther>
            <ImageOther src="no"></ImageOther>
            <TextOther>Privacy Policy</TextOther>
          </ItemOther>
          <ItemOther>
            <ImageOther src="no"></ImageOther>
            <TextOther>Terms of use</TextOther>
          </ItemOther>
        </ListOther>
      </WraperOther> */}

        {/* <WraperSocial>
        <ListSocial>
          <ItemSocial>
            <WraperImageSocial>
              <ImageSocial src="ww"></ImageSocial>
            </WraperImageSocial>
          </ItemSocial>

          <ItemSocial>
            <WraperImageSocial>
              <ImageSocial src="ww"></ImageSocial>
            </WraperImageSocial>
          </ItemSocial>

          <ItemSocial>
            <WraperImageSocial>
              <ImageSocial src="ww"></ImageSocial>
            </WraperImageSocial>
          </ItemSocial>

          <ItemSocial>
            <WraperImageSocial>
              <ImageSocial src="ww"></ImageSocial>
            </WraperImageSocial>
          </ItemSocial>

          <ItemSocial>
            <WraperImageSocial>
              <ImageSocial src="ww"></ImageSocial>
            </WraperImageSocial>
          </ItemSocial>
        </ListSocial>
      </WraperSocial> */}

        {/* <WraperMyTags>
          <MyTagSection>
            <TagTextSection>Tags đang theo dõi</TagTextSection>
            <Link to={`/profile/${""}`}>
              <SettingsApplicationsTwoToneIcon />
            </Link>
          </MyTagSection>
          <ListTagItem>
            {auth.user?.my_tags.map((tag: any, index) => {
              console.log(tag)
              return (
                <TagItem>
                  <TagText>#{tag.idtag}</TagText>
                </TagItem>
              );
            })} */}
            {/* <TagItem>
            <TagText>#vuejs</TagText>
          </TagItem>

          <TagItem>
            <TagText>#android</TagText>
          </TagItem>

          <TagItem>
            <TagText>#vuejs</TagText>
          </TagItem> */}
          {/* </ListTagItem>
        </WraperMyTags> */}
      </WraperContainer>
    </Container>
  );
}

export default Sidebar;
