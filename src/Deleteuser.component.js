import axios from 'axios';
import React from 'react';
import {Button} from 'react-bootstrap' ;
import style from './styles.module.css';

class Deleteuser extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.delete('http://localhost:4000/crud/delete/' + this.props.match.params.id)
        .then(res => console.log(res.data))

        this.props.history.push('/');
    }
    render(){
        return(
            <div id={style.bodyMain}>

            </div>
        );
    }
}

export default Deleteuser;