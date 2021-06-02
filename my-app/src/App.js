import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Wrapper from "./js/App/Game/Wrapper.js";
import Home from "./js/App/Home/Home.js"
import socket from './js/config';
import './App.css'

function App() {
  return (
    <Router>
      <div className="main">
        <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/game/" render={() => <Wrapper />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
