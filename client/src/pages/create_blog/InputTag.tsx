import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { IBlog, RootStore } from "../../utils/TypeScript";

const animatedComponents = makeAnimated();
interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}
const InputTag: React.FC<IProps> = ({ blog, setBlog }) => {
  const { tags } = useSelector((state: RootStore) => state);



  // const newArrayObj = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const handleOnchange = (e: any) => {
    setBlog({
      ...blog,
      tags: e,
    });
    
  };

  return (
    <Select
      placeholder="chọn thể loại tag"
      onChange={handleOnchange}
      closeMenuOnSelect={false}
      components={animatedComponents}
      value={blog.tags}
      getOptionValue={x=> x._id}
      getOptionLabel={x=> x.name}
      isMulti
      options={tags}
    />
  );
};
export default InputTag;

// const tags = [
//   {
//     _id: "61d558590d82a921fcbb32ab",
//     name: "beginners",
//     description: "A journey of a thousand miles begins with a single step",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 9,
//     createdAt: "2022-01-05T08:35:37.681Z",
//     updatedAt: "2022-01-06T09:42:37.289Z",
//     __v: 0,
//   },
//   {
//     _id: "61d558620d82a921fcbb32b0",
//     name: "programming",
//     description: "",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 8,
//     createdAt: "2022-01-05T08:35:46.679Z",
//     updatedAt: "2022-01-06T09:42:37.289Z",
//     __v: 0,
//   },
//   {
//     _id: "61d558860d82a921fcbb32bc",
//     name: "css",
//     description:
//       "Cascading Style Sheets (CSS) is a simple language for adding style (e.g., fonts, colors, spacing) to HTML documents. It describes how HTML",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 8,
//     createdAt: "2022-01-05T08:36:22.458Z",
//     updatedAt: "2022-01-06T09:42:37.289Z",
//     __v: 0,
//   },
//   {
//     _id: "61d5580d0d82a921fcbb329c",
//     name: "tutorial",
//     description: "",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 7,
//     createdAt: "2022-01-05T08:34:21.839Z",
//     updatedAt: "2022-01-06T09:42:37.289Z",
//     __v: 0,
//   },
//   {
//     _id: "61d558780d82a921fcbb32b7",
//     name: "react",
//     description:
//       "Official tag for Facebook's React JavaScript library for building user interfaces",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 2,
//     createdAt: "2022-01-05T08:36:08.119Z",
//     updatedAt: "2022-01-05T15:27:48.476Z",
//     __v: 0,
//   },
//   {
//     _id: "61d558420d82a921fcbb32a1",
//     name: "javascript",
//     description:
//       "Once relegated to the browser as one of the 3 core technologies of the web, JavaScript can now be found almost anywhere you find code JavaScript developers",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 1,
//     createdAt: "2022-01-05T08:35:14.042Z",
//     updatedAt: "2022-01-05T08:38:32.303Z",
//     __v: 0,
//   },
//   {
//     _id: "61d5584c0d82a921fcbb32a6",
//     name: "webdev",
//     description: "",
//     moderators: ["61d456bc37f08fa10f868555"],
//     total_blog: 1,
//     createdAt: "2022-01-05T08:35:24.878Z",
//     updatedAt: "2022-01-05T08:38:32.303Z",
//     __v: 0,
//   },
// ];
