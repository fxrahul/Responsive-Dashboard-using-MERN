import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import style from './styles.module.css'

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Switch, Link } from "react-router-dom";
import Header from "./Header.component"
import Registration from "./Registration.component"
import Login from "./Login.component"
import axios from 'axios';

const Users = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.name}</td>
    <td>{props.user.address}</td>
    <td><Link to= {'/edit/'+props.user._id}>Edit </Link> &nbsp;<Link to= {'/delete/'+props.user._id}>Delete </Link>
    &nbsp;<Link to= {'/view/'+props.user._id}>View </Link>
     </td>
    
  </tr>
)

class Homepage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        users : []
      };
    }
    componentDidMount(){
      axios.get("http://localhost:4000/crud/")
        .then(res => {
            this.setState({
              users : res.data
            });
        })
        .catch(function(error){
          console.log(error)
        })
    }

    componentDidUpdate(){
      axios.get("http://localhost:4000/crud/")
        .then(res => {
            this.setState({
              users : res.data
            });
        })
        .catch(function(error){
          console.log(error)
        })
    }

    userList(){
      return this.state.users.map(function(currentUser,i){
        return <Users user = {currentUser} key = {i} />;
      });
    }

    render(){
        return(
          <div id = {style.bodyMain}>
          <h3 align="center"> Users List </h3>
          <table className="table table-striped" style={{ marginTop: 20 }} >
              <thead>
                  <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  { this.userList() }
              </tbody>
          </table>
      </div>
          
        );
    }
}

export default Homepage;
