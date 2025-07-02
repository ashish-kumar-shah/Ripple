import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";

//
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./Privateroute";
import UserApi from "./Context/UseContext/UserApi";
import Layout from "./Layout/Layout";
import Profile from "./Pages/Profile";
import ServiceApi from "./Context/UseContext/ServiceApi";
import CreatePost from "./Pages/CreatePost";
import PostApi from "./Context/UseContext/PostApi";
import Setting from "./Pages/Setting";
import Feed from "./Pages/Feed";
import Search from "./Pages/Search";
import Notification from "./Pages/Notification";
import ShowPostById from "./Pages/ShowPostById";

function App() {
  return (
    <Router>
      <UserApi>
        <PostApi>

        <ServiceApi>

       
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/search" element={<Search />} />
            <Route  path="/notification" element={<Notification/>}/>
            <Route  path="/post/:postId" element={<ShowPostById/>}/>







          </Route>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
        </Routes>
         </ServiceApi>
        </PostApi>

      </UserApi>
    </Router>
  );
}

export default App;
