import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Switch, Link } from "react-router-dom";
import Header from "./Header.component"
import Registration from "./Registration.component"
import Login from "./Login.component"
import Homepage from './Homepage.component'
import Footer from './Footer.component';
import style from './styles.module.css'



function App() {
  return (
    <div id = {style.container}>
    <Header />
    <Footer />
    </div>
  );
}

export default App;
