import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Registration from './Registration.component';
import { BrowserRouter as Router, Route,Switch, Link } from "react-router-dom";
import Header from './Header.component';
import {withRouter} from 'react-router';
const routing = (
    <Router >
      <Switch>
     <Route exact path='/' component={Header}></Route>
      <Route  path={"/register"} component={Registration} />
     
      </Switch>
    </Router>
  )

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
