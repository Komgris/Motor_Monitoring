import React, { Component } from 'react'
import './App.css'
import txt from '!!raw-loader!./js/components/config/Config.txt'
// import IPtxt from './js/components/config/configApi.json'
import Header from './js/components/layout/Header'
import { HashRouter as Router, Route  } from 'react-router-dom'
import Login from './js/components/Login'
import Assemblypump from './js/components/Pages/Assemblypump'

export default class App extends Component {
    state ={
        Pumpstatus:[],
        keyValid:'',
        logStatus:'',
        textIP:''
      }

    componentDidMount(){
       this.setState({ textIP : txt })
       console.log(txt)
    }

    callbackFunction = ( key ) =>{
     this.setState({ keyValid : key }) 
    }

 

    render() {
        return (
            <div className ="App">
                <div>
                <Router>
                <Header/>
            
                <Route  exact path ="/" render = {props =>(
                    <React.Fragment>
                    <Login parentCall = {this.callbackFunction}  IP = {this.state.textIP} /> 
                   
                    </React.Fragment> 
                )}/>
                <Route   path ="/pump" render = {props =>(
                    <React.Fragment>
                    <Assemblypump  sendApi = {this.state.keyValid} IP = {this.state.textIP} /> 
                   
                    </React.Fragment>
                )} /> 
                </Router> 
                </div>
            </div>
        )
    }
}
