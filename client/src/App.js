import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import CommentSection from "./pages/CommentSection/CommentSection";
import Transactions from "./pages/Transactions/Transactions";
import Friends from "./pages/Friends/Friends";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";

import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import axios from "axios"

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
        <Route path="/comments">
          <CommentSection/>
        </Route>
        <Route path="/friends">
          <Friends/>
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
