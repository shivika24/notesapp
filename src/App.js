import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/home';
class App extends Component{
  render()
  {
    return (
      <div>
      <Router>
      <Switch>
      <Route exact path="/"><Home/></Route>
      </Switch>
      </Router>
      </div>
    )
  }
}

export default App;
