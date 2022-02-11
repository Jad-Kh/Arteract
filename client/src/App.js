import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import CommentSection from "./pages/CommentSection/CommentSection";
import EditPostSection from "./pages/EditPostSection/EditPostSection";
import Transactions from "./pages/Transactions/Transactions";
import Friends from "./pages/Friends/Friends";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import "./App.css";

import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user ? <Home/> : <Login/> }
        </Route>
        <Route path="/profile/:username">
          <Profile/>
        </Route>
        <Route path="/transactions">
          <Transactions/>
        </Route>
        <Route path="/postInfo/:postId">
          <CommentSection/>
        </Route>
        <Route path="/editPost/:postId">
          <EditPostSection/>
        </Route>
        <Route path="/friends/:username">
          <Friends/>
        </Route>
        <Route path="/chat">
          <Chat/>
        </Route>
        <Route path="/login">
          { user ? <Redirect to="/"/> : <Login/> }
        </Route>
        <Route path="/register">
          { user ? <Redirect to="/"/> : <Register/> }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
