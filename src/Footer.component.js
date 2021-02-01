import React from 'react';
import logo from './logo.svg';
import './App.css';
import style from './styles.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Switch, Link } from "react-router-dom";
import Header from "./Header.component"
import Registration from "./Registration.component"
import Login from "./Login.component"


class Footer extends React.Component{
    render(){
        return(
          <footer className="page-footer font-small blue ">


          <div className="footer-copyright text-center py-3" id = {style.foot}>
            © 2019 Copyright:Rahul Niraj Singh
        
          </div>
        
        
        </footer>
        );
    }
}

export default Footer;
