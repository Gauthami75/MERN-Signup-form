import React,{Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'; 
import Login from './login';
//import { useRoutes } from "react-router-dom";
import { BrowserRouter as Router,
    Route, Redirect, Routes,Link,} from "react-router-dom";

class App extends React.Component{
    constructor(){
        super()
        this.state={
            imageUrl:"",
            firstName:"",
            userName:"",
            emailId:"",
            password:""
        }
        this.changeFirstName =this.changeFirstName.bind(this)
        this.changeUserName =this.changeUserName.bind(this)
        this.changeEmail =this.changeEmail.bind(this)
        this.changePassword =this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.changeImageUrl = this.changeImageUrl.bind(this)
    }

    changeFirstName(event){
        this.setState({
            firstName:event.target.value
        })
    }

    changeUserName(event){
        this.setState({
            userName:event.target.value
        })
    }

    changeEmail(event){
        this.setState({
            emailId:event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    changeImageUrl(event){
        
        this.setState({
            imageUrl:URL.createObjectURL(event.target.files[0])
        })
        console.log(this.state.imageUrl)
    }

    onSubmit(event){
        event.preventDefault()

        const register ={
            imageUrl: this.state.imageUrl,
            firstName: this.state.firstName,
            userName: this.state.userName,
            emailId: this.state.emailId,
            password: this.state.password
        }
        axios.post('http://localhost:4000/app/signup', register)
        .then(response => console.log(response.data))

        this.setState({
            imageUrl:"",
            firstName:"",
            userName:"",
            emailId:"",
            password:""
        })
    }
    render(){
        return(
            <div>
                <div className="container">
                    <div className="form-div">
                        <form onSubmit={this.onSubmit}>

                        <input type="file" 
                            name="profile picture"
                            onChange={this.changeImageUrl}
                            className="form-control form-group"></input>

                            <input type="text" 
                            placeholder="Full Name"
                            onChange={this.changeFirstName}
                            value={this.state.firstName} 
                            className="form-control form-group"></input>

                            <input type="text"
                             placeholder="User Name"
                             onChange={this.changeUserName}
                             value={this.state.userName}
                             className="form-control form-group"></input>

                            <input type="text"
                             placeholder="E-mail"
                             onChange={this.changeEmail}
                             value={this.state.emailId}
                             className="form-control form-group"></input>

                            <input type="password"
                             placeholder="password"
                             onChange={this.changePassword}
                             value={this.state.password}
                             className="form-control form-group"></input>

                             <input type="submit" className="btn btn-primary btn-block form-control form-group" value="Submit"></input>
                            <Link to="/login.jsx">Already have an accout</Link>
                        </form>
                           
                    </div>
                </div>
            </div>
        )
    }
}

export default App;