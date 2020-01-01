import React, { Component } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Registration from "./Registration.component"
import App from "./App"

export class Root extends Component{
    render(){
        return(
            <div>
            <div>
            <div>
            
            </div>
            <div>
                {this.props.children}
            </div>
            </div>
            </div>
        )
    }
}