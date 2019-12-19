import React, { Component } from 'react'
import logo from '../components/Img/tistr-logo-sq.png'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import './Login.css';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            notiPassword:'',
            result:[]
        }

    }
    onSubmit = (e) =>{
        e.preventDefault();

        Axios.get(`${this.props.IP}/Authorize/Login/${this.state.username}/${this.state.password}`)
         .then(res => { const value = JSON.parse(res.data);

            if(value.IsSuccess)
            {
                this.setState({ result : value,
                notiPassword: ''  });
                localStorage.setItem('userToken', this.state.result.Value);
                this.props.parentCall(this.state.result.Value);
                this.toHome();
            }
            else{
                this.setState({ notiPassword : 'Invalid Password or Username'});
            }
        })
        this.setState({username: ''})
        this.setState({password: ''})
    }
    toHome=()=>{
        
        
        this.props.history.push('/pump');
    }

    componentDidMount(){
        if (localStorage.getItem('userToken') != null )
        {
            this.toHome();
        }
    }

    onChange = (e) => this.setState({[e.target.name] : e.target.value });

    render() {
        return (
           <div className ="wrapper fadeInDown">
               
                 <div id = "formContent">
                    <div className="fadeIn first">
                        <img src={logo} id="icon" alt="User Icon" />
                    </div>

                        <form onSubmit = {this.onSubmit} >
                        <h2>Pump Control</h2><h6>ver 1.5</h6>
                        <input type="text" id="login" class="fadeIn second" name="username" placeholder="username" onChange={this.onChange} value ={this.state.username} />
                        <br/>
                        
                        <input type="password" id="password" class="fadeIn third" name="password" placeholder="password" onChange={this.onChange} value ={this.state.password} />
                        <div class ="textNotiLogin">
                        {this.state.notiPassword}
                        </div>
                        
                        <input type="submit" class="fadeIn fourth" value="Log In"/>
                    </form>

                 </div>
             </div>
            
        )
    }
}
export default withRouter(Login);
