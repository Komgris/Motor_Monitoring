import React, { Component } from 'react'
import Panel from './PumpPanel'
import  scada  from '../Img/scada.png' 
import './PumpMonitor.css'

export default class PumpMonitor extends Component {
    render() {
        return (
            <div class = "background">
            <div class = "container">
                <div class = "container-n">
                    <h1>Pump Station</h1>
          
                    <div class = "container-s">
                        <div class = "panel">
                        <Panel pumpNum = "1" keyAPI ={this.props.keytoapi} IP = {this.props.apiIP} />
                        </div>
                        <div class = "panel"> 
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