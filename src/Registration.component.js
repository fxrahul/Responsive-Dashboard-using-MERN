import React from 'react';
import style from './styles.module.css'
import {Button} from 'react-bootstrap' 
import Header from './Header.component'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Registration extends React.Component{
    constructor(props){
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeProfilePic = this.onChangeProfilePic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username : '',
            name : '',
            password : '',
            address : '',
            selectedFile : null,
            loaded : 0

        };
    }

   
    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onChangeName(e){
        this.setState({
            name : e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            address : e.target.value
        });
    }

    onChangeProfilePic(e){
        
        this.setState({
            selectedFile : e.target.files[0],
            
        });
    }

    onSubmit(e){
        e.preventDefault();
        
        // console.log(`Form submitted:`);
        // console.log(`Username: ${this.state.username}`);
        // console.log(`Name: ${this.state.name}`);
        // console.log(`Password: ${this.state.password}`);
        // console.log(`Address: ${this.state.address}`);

        const data = new FormData();
        
            data.append('file',this.state.selectedFile);
        

        const formData = {
            username : this.state.username,
            name : this.state.name,
            password : this.state.password,
            address : this.state.address,
        };
        if(formData.username === '' || formData.name === '' || formData.password === '' || formData.address === '' || this.state.selectedFile === null){
            toast.success("Please fill all fields and then try again!!");
            return;
        }

        axios.post('http://localhost:4000/crud/add', formData)
        .then(res => {
            const id = res.data.userId;
        
            axios.post('http://localhost:4000/crud/upload/'+id,data,{
            
                onUploadProgress: ProgressEvent => {
                    this.setState({
                      loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                  })
              },
        })
       
        toast.success("user added!!");
        console.log(res.data);

    })
    .catch(err => {
        toast.error('user adding failed')
    })
    
    this.setState({
        username : '',
        name : '',
        password : '',
        address : '',
        selectedFile : null,
        loaded : 0
    });
    }

    render(){
        return(
            
                <div className = {style.formDiv} id = {style.bodyMain}>
                    <form className = {style.formInside} onSubmit = {this.onSubmit} >
                    <ToastContainer />
                        <h1>Registration Form</h1>
                        <input type = "text" id = "username" placeholder = "Enter Username" value = {this.state.username} onChange = {this.onChangeUsername} />
                        <input type = "text" id = "name" placeholder = "Enter Name" value = {this.state.name} onChange = {this.onChangeName} />
                        <input type = "password" id = "password" placeholder = "Enter Password" value = {this.state.password} onChange = {this.onChangePassword} /> <br/> <br/>
                        <textarea id="address" value = {this.state.address} onChange = {this.onChangeAddress}  placeholder="Enter Address" /><br/>
                        <input type="file" name="profilePic"   onChange = {this.onChangeProfilePic} />
                        <br/>
                        <br/>
                        <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>

                        <br/>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>

                // <div>
                //     <h1>This is Registration Page</h1>
                // </div>
            
        );
    }
}

export default Registration;