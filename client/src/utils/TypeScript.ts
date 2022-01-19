import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  coverimage:string;
  account: string;
  avatar: string;
  block_account: [];
  createdAt: string;
  education: string;
  follower: string[];
  learning: string;
  location: string;
  my_follow: [];
  my_tags: [];
  name: string;
  post_saved: [];
  role: string;
  story: string;
  type: string;
  updatedAt: string;
  web_url: string;
  work: string;
  __v: 0;
  _id: string;
}

export interface IProfile extends IUser {
  userinfor?: IUser;
  blogPin?: IBlog[];
  blogPublishedCount?: number;
  commentsCount?: number;
  tagfollowCount?: number;
  commentRecent?: IComment[];
}


export interface IUserProfile extends IUserRegister {
  avatar: string | File;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  _id?: string;
  poster?: string|IUser;
  title: string;
  content: string;
  description: string;
  // category?: string;//cai nay k sai
  createdAt: string;
  imagepost: string | File;
  tags: any[];
  likecount?: number;
  viewer?: string;
  pin?: boolean;
  status?: string;
  is_detroy?: string;
}



export interface ITag {
  _id?: string;
  name? : string;
  description?: string;
  moderators: [];
  total_blog: number;
  createdAt: string;
  updatedAt: string;
}




export interface IComment {
  _id?: string;
  user?: IUser;
  id_blog: string | IBlog[];
  id_user_blog: string;
  content: string;
  replyComment?: IComment[];
  user_reply?: IUser;
  comment_root?: string;
  createdAt?: string;
}





//@@@@@@@@@@@@@@@@@@@@@@@@@@@@ interface cua vuong
export interface Poster {
  _id: string;
  name: string;
  story: string;
  location: string;
  learning: string;
  work: string;
  avatar: string;
  createdAt: Date;
}

export interface ListTag {
  _id: string;
  name: string;
  moderators: string;
}

export interface Blog {
  _id: string;
  content: string;
  title: string;
  description: string;
  imagepost: string;
  poster: Poster;
  tags: ListTag[];
  likecount: number;
  commentcount: number;
  saved: number;
  viewer: string[];
  pin: boolean;
  status: string;
  is_detroy: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}



export interface BlogSameUser {
  _id: string;
  content: string;
  title: string;
  description: string;
  imagepost: string;
  poster: string;
  tags: ListTag[];
  likecount: number;
  commentcount: number;
  saved: number;
  viewer: any[];
  pin: boolean;
  status: string;
  is_detroy: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}





export interface BlogSameTag {
  _id: string;
  content: string;
  title: string;
  description: string;
  imagepost: string;
  poster: Poster;
  tags: ListTag[];
  likecount: number;
  commentcount: number;
  saved: number;
  viewer: any[];
  pin: boolean;
  status: string;
  is_detroy: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ObjectFromGetApiBlogByID {
  blog: Blog;
  blogSameUser: BlogSameUser[];
  blogSameTag: BlogSameTag[];
  liked: boolean;
}
