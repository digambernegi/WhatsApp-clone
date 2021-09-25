import React from "react";
import "./App.css";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./LogIn";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, ] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <LogIn />
      ) : (
        <div className="app__Body">
          <Router>
            <Switch>
              <Route path="/Chatroom/:roomId">
                <Leftbar />
                <Rightbar />
              </Route>

              <Route exact path="/">
                <Leftbar />
                <Rightbar />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
