import axios from 'axios';
import React from 'react';
import {Button} from 'react-bootstrap' ;
import style from './styles.module.css';
import Img from 'react-image';


class Viewuser extends React.Component{
    constructor(props){
        super(props);
        this.state ={
        username : '',
        name : '',
        password : '',
        address : '',
        selectedFile : null,
    
        };
    }

    componentDidMount(){
        axios.get("http://localhost:4000/crud/"+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    username : response.data.username,
                    name : response.data.name,
                    password : response.data.password,
                    address : response.data.address,
                    selectedFile : response.data.files,
                
                })
                console.log(this.state.imagePath);
            })
                .catch(function(error){
                    console.log(error);
                
            })
    }

    render(){
        return(
            <div className="container" id = {style.bodyMain}>
                <h3 align="center"> User List </h3>
                <div align="center">
                    <label>Profile Picture:</label>
                    <br/>
                <img className = {style.profilePic} src = {`../files/${this.state.selectedFile}`} />
                </div>
                <div align="center">
                    <label>Username:</label> &nbsp;{this.state.username}
                </div>
                <div align="center">
                <label>Name:</label> &nbsp;{this.state.name}
                </div>
                 <div align="center">   
                    <label>Address:</label> &nbsp;{this.state.address}
                </div>
            </div>
        );
    }


}

export default Viewuser;