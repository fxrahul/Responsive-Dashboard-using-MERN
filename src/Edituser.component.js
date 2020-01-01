import axios from 'axios';
import React from 'react';
import {Button} from 'react-bootstrap' ;
import style from './styles.module.css';



class Edituser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            name : '',
            password : '',
            address : '',
            selectedFile : null,
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeProfilePic = this.onChangeProfilePic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        console.log(e.target.files[0]);
        
        this.setState({
            selectedFile : e.target.files[0],
            
        });
    }

    onSubmit(e){
        e.preventDefault();
        const data = new FormData();
        
            data.append('file',this.state.selectedFile);
        const formData = {
            username : this.state.username,
            name : this.state.name,
            password : this.state.password,
            address : this.state.address
        };

        axios.post('http://localhost:4000/crud/update/' + this.props.match.params.id, formData)
        .then(res => {
        axios.post('http://localhost:4000/crud/uploadEdit/'+this.props.match.params.id,data).then(res =>{
            console.log(res.data);
        })
            
        });

        this.props.history.push('/');

    }

    componentDidMount(){
        axios.get("http://localhost:4000/crud/"+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    username : response.data.username,
                    name : response.data.name,
                    password : response.data.password,
                    address : response.data.address,
                    selectedFile : response.data.files
                })
            })
                .catch(function(error){
                    console.log(error);
                
            })
    }


    render(){
        return(
            <div className = {style.formDiv} id = {style.bodyMain} >
            <form className = {style.formInside} onSubmit = {this.onSubmit}>

                <h3 align="center">Update User</h3>
                <input type = "text" required id = "username" placeholder = "Enter Username" value = {this.state.username} onChange = {this.onChangeUsername} />
                <input type = "text" required id = "name" placeholder = "Enter Name" value = {this.state.name} onChange = {this.onChangeName} />
                <input type = "password" required id = "password" placeholder = "Enter Password" value = {this.state.password} onChange = {this.onChangePassword} /> <br/> <br/>
                <textarea id="address" required value = {this.state.address} onChange = {this.onChangeAddress} placeholder="Enter Address" /><br/>
                <input type="file" name="profilePic"   onChange = {this.onChangeProfilePic} />
                <br/>
                <Button type="submit">Submit</Button>
            </form>
        </div>
        );
    }
}

export default Edituser;
