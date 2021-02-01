import React from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Registration from "./Registration.component"
import App from "./App"
import { Root } from './Root';
import Homepage from './Homepage.component';
import Login from './Login.component'
import Edituser from './Edituser.component';
import Deleteuser from './Deleteuser.component';
import Viewuser from './Viewuser.component';


class Header extends React.Component{
    constructor(props){
        super(props);    this.state = {
          menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        
    }

    toggleMenu(){
      this.setState({ menu: !this.state.menu })
    }
    render(){
      const show = (this.state.menu) ? "show" : "" ;

        return(
            <Router>
            <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to={'/'} className="navbar-brand">Dashboard</Link>
  <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className={"collapse navbar-collapse " + show}>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to={'/'} className="nav-link">Home <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item ">
        <Link to={'/register'} className="nav-link">Sign Up <span className="sr-only"></span></Link>
      </li>
    </ul>
  </div>
</nav>







                {/* <Link to={'/'}>HomePage</Link>
                <Link to={'/register'}>Sign Up</Link> */}
        
                <Route exact path='/' component={Homepage} />
                <Route  path={"/register"} component={Registration} />
                <Route path={"/edit/:id"} component={Edituser} />
                <Route path={"/delete/:id"} component={Deleteuser} />
                <Route path={"/view/:id"} component={Viewuser} />

            </div>
          </Router>
       );
    }
}
  
  export default Header;