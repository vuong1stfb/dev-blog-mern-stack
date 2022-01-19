import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Drawer from "./components/global/Drawer";
import Blogremod from "./pages/manageAdmin/managerpage/Blogremoved";
import { Alert } from "./components/alert/Alert";

import { refreshToken } from "./redux/actions/authAction";
import { getCategories } from "./redux/actions/categoryAction";
import { getHomeBlogs } from "./redux/actions/blogAction";

import io from "socket.io-client";
import Tags from "./pages/Listtags/Tags";
import DashboardAdmin from "./pages/manageAdmin/dashboard";
import SocketClient from "./SocketClient";
import NotFound from "./components/global/NotFound";
import Home from "./pages/home/home";
import Footer from "./components/global/Footer";
import CustomizedMenus from "./pages/CustomizedMenus";
import Search from "./pages/search/Search";
import Notification from "./pages/notification/Notification";
import CreateBlog from "./pages/create_blog/create_blog";
import Dashboard from "./pages/dashboard/dashboard";
import FollowingUsers from "./pages/dashboard/FollowingUser/FollowingUser";
import Follower from "./pages/dashboard/FollowingUser/Followers";
import FollowingTags from "./pages/dashboard/FollowingUser/FollowingTags";
import ReadingList from "./pages/reading_list/ReadingList";
import Pinblog from "./pages/dashboard/Pinblog/Pinblog";
import BlogPrivate from "./pages/dashboard/BlogPrivate/BlogPrivate";
import TagManage from "./pages/manageAdmin/managerpage/TagManage";
import ReportManage from "./pages/manageAdmin/managerpage/ReportManage";
import UserManage from "./pages/manageAdmin/managerpage/UserManager";
import ModManage from "./pages/manageAdmin/managerpage/ModManager";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <SocketClient />
      <Router>
        <Alert />
        <Header />
        <Switch>
      
          <Route exact path="/notification" component={Notification} /> 
          <Route exact path="/toptags" component={Tags} /> 
          <Route exact path="/test" component={Drawer} />
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/create-blog" component={CreateBlog} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/reading_list" component={ReadingList} />


          <Route exact path="/dashboard/post" component={Dashboard} />
          <Route exact path="/dashboard/following-users" component={FollowingUsers} />
          <Route exact path="/dashboard/followers" component={Follower} />
          <Route exact path="/dashboard/following-tags" component={FollowingTags} />
          <Route exact path="/dashboard/pinblog" component={Pinblog} />
          <Route exact path="/dashboard/blog-private" component={BlogPrivate} />
          <Route exact path="/manager/home" component={DashboardAdmin} />
          <Route exact path="/manager/tagmanager" component={TagManage} />
          <Route exact path="/manager/reportmanager" component={ReportManage} />
          <Route exact path="/manager/usermanager" component={UserManage} />
          <Route exact path="/manager/modmanager" component={ModManage} />
          <Route exact path="/manager/blogmanager" component={Blogremod} />


          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
          <Route exact path="/" component={Home} />




          
       
        </Switch>

        <Footer/>
      </Router>
    </>
  );
};

export default App;
