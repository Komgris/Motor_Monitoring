import React, { Component } from 'react'
import Panel from './PumpPanel'
import './PumpMonitor.css'
import Remote from './Remote'
import Axios from 'axios';

export default class PumpMonitor extends Component {
    constructor(props) {
        super(props);
        this.state ={
            propRemote:"",
            propFsw:"",
            propRundry:""
        }
    }

   
    render() {
        return (
            <div class = "background">
            <div class = "container">
                <div class = "container-n">
                    <h1>Pump Station</h1>
                    <div class = "container-s">
                        <div class = "panel-1">
                        <Panel pumpNum = "1" keyAPI ={this.props.keytoapi} IP = {this.props.apiIP} />
                        </div>
                        <div class = "panel-2"> 
                        <Panel pumpNum = "2" keyAPI ={this.props.keytoapi} IP = {this.props.apiIP} />
                        </div>
                    </div>   
                    </div>
                   
            </div>
            
            </div>
        )
    }
}
const imgStyle = {
    width: "auto", 
    height: "auto",
  }