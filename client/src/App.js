import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import CommentSection from "./pages/CommentSection/CommentSection";
import Transactions from "./pages/Transactions/Transactions";
import Friends from "./pages/Friends/Friends";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/profile">
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
      </Switch>
    </Router>
  );
}

export default App;
