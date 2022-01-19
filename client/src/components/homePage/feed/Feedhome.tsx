import React, { useEffect, useState } from "react";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { IParams, RootStore } from "../../../utils/TypeScript";
import { IBlog } from "../../../utils/TypeScript";
import moment from "moment";
// import { IBlogsUser }
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardPostDetail } from "./Feed";
import { getAPI } from "../../../utils/FetchData";

const FeedContainer = styled.div`
  flex: 5;
  margin-top: 15px;
`;
const FeedSectionWraper = styled.div`
  width: 100%;
  height: 65px;
`;
const ListNav = styled.ul`
  list-style: none;
  padding: 10px;
`;
const ListNavfilter = styled.ul`
  list-style: none;
  padding: 5px;
`;
const ItemNav = styled.li`
  display: inline;
`;
const ContainerItemNav = styled.div`
  display: inline-block;
  padding: 7px;
  margin-right: 10px;
  :hover {
    background-color: #dddeee;
    border-radius: 5px;
  }
  cursor: pointer;
`;
const TextNav = styled.span<{ active?: boolean }>`
  font-size: 19px;
  font-weight: ${(props) => (props.active ? "bold" : "")};
`;

export default function Feedhome() {
  const [listblog, setListblog] = useState([]);
  const [activeButton, setActiveButton] = useState({
    follow: false, // all
    new: true, // comment
    old: false, // post
    top: false,
  });
  const [activefilter, setActivefilter] = useState({
    week: false,
    month: false,
    year: false,
    all: true,
  });
  const _handleButtonnew = () => {
    setActiveButton({ follow: false, new: true, old: false, top: false });
  };
  const _handleButtonfollow = () => {
    setActiveButton({ follow: true, new: false, old: false, top: false });
  };
  const _handleButtonold = () => {
    setActiveButton({ follow: false, new: false, old: true, top: false });
  };

  const _handleButtontop = () => {
    setActiveButton({ follow: false, new: false, old: false, top: true });
  };
  // filter
  const _handleButtonweek = () => {
    setActivefilter({ week: true, month: false, year: false, all: false });
  };
  const _handleButtonmonth = () => {
    setActivefilter({ week: false, month: true, year: false, all: false });
  };
  const _handleButtonyear = () => {
    setActivefilter({ week: false, month: false, year: true, all: false });
  };
  const _handleButtonall = () => {
    setActivefilter({ week: false, month: false, year: false, all: true });
  };

  useEffect(() => {
    async function fetchMyAPI() {
      switch (activeButton) {
        case { follow: false, new: true, old: false, top: false }: // new
            console.log("new")
          break;
        case { follow: false, new: false, old: true, top: false }: // old
        console.log("old")

          break;
        case { follow: false, new: false, old: false, top: true }: // top
        console.log("top")

          break;
        case { follow: true, new: false, old: false, top: false }: // follow
        console.log("follow")

          break;
      }
      // const blogtag = await getAPI(`list-home?filter=top&page=1`);
    }

    fetchMyAPI();
  }, [activeButton]);

  return (
    <FeedContainer>
      <FeedSectionWraper>
        <ListNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav active={activeButton.new} onClick={_handleButtonnew}>
                Mới nhất
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav active={activeButton.old} onClick={_handleButtonold}>
                Cũ nhất
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav
                active={activeButton.follow}
                onClick={_handleButtonfollow}
              >
                Đang follow
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav
                active={activeButton.top}
                onClick={() => {
                  _handleButtontop();
                  _handleButtonall();
                }}
              >
                Top Blog
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
        </ListNav>
      </FeedSectionWraper>
      {/* fillter */}
      {activeButton.top ? (
        <ListNavfilter>
          <ItemNav>
            <ContainerItemNav>
              <TextNav active={activefilter.all} onClick={_handleButtonall}>
                Tất cả
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav active={activefilter.week} onClick={_handleButtonweek}>
                Tuần
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav active={activefilter.month} onClick={_handleButtonmonth}>
                Tháng
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
          <ItemNav>
            <ContainerItemNav>
              <TextNav active={activefilter.year} onClick={_handleButtonyear}>
                Năm
              </TextNav>
            </ContainerItemNav>
          </ItemNav>
        </ListNavfilter>
      ) : null}

      {CardPostDetail()}
      {CardPostDetail()}
      {CardPostDetail()}
    </FeedContainer>
  );
}
