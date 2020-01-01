import React from 'react';
import style from './styles.module.css'
import {Button} from 'react-bootstrap' 
import Header from './Header.component'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Login extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {};
    //}
    render(){
        return(
            <Router>
                <div className = {style.formDiv} >
                    <form className = {style.formInside}>
                        <h1>Login</h1>
                        <input type = "text" id = "userName" placeholder = "Enter Username" />
                        <input type = "text" id = "fullName" placeholder = "Enter Name" />
                        <input type = "password" id = "password" placeholder = "Enter Password" /> <br/> <br/>
                        <textarea id="address" /><br/>
                        <input type="file" name = "file" />
                        <br/>
                        <Button>Submit</Button>
                    </form>
                </div>
            </Router>
        );
    }
}

export default Login;