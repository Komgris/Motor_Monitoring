import React, { Component } from 'react'
import Panel from './PumpPanel'
import './PumpMonitor.css'
import Remote from './Remote'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import txt from '!!raw-loader!../config/Config.txt';
import Flowswitch from './Flowswitch'

 class PumpMonitor extends Component {
    intervalID = 0;
    constructor(props) {
        super(props);
        this.state ={
            pump1:"",
            Remote1:"",
            Fsw1:"",
            Rundry1:"",
            pump2:"",
            Remote2:"",
            Fsw2:"",
            Rundry2:"",
            accessToken:"",
            API:txt,
            Fault2S1:"",
            Fault2S2:""
        }
    }
    // if (localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === "")
        // {   
        // this.props.history.push(`/`);
        // }
        // else if(this.props.keytoapi === null || this.props.keytoapi ==="")
        // {
        // this.props.history.push(`/`);
        // }
    componentDidMount()
    {   
        if (localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === "")
        {   
            this.props.history.push(`/`);
            console.log(1)
        }
        this.checkToken();
        this.loadData();
        this.intervalID = setInterval(this.loadData.bind(this), 2000);    
    }
    componentWillUnmount(){
        clearInterval(this.intervalID);
    }
    checkToken =()=>{
        var token;

        if(this.props.keytoapi === "")
        {
           token =  localStorage.getItem('userToken');
         
        }
        else
        {
           token =  this.props.keytoapi;
        }
        console.log(token)
        this.setState((state) => ({ accessToken : token}));
    }

    async loadData() {

            {
                Axios.get(`${this.state.API}/Pump/WebUpdateStatus/${this.state.accessToken}`)
                //Axios.get(`http://192.168.10.36/skapi/SystemAPI/Pump/RestAPI`)
                .then(res => { const result = JSON.parse(res.data);
                        if(result.Value === "Access denied!")
                            {
                              localStorage.setItem('userToken', "");
                              this.props.history.push(`/`);
                            }
                            else
                            {
                                if(result.IsSuccess)
                                {
                                    //console.log(this.state.accessToken)
                                    var update_status =  JSON.parse(result.Value);
                                    
                                    this.setState({
                                        Remote1 : update_status.RemoteLocal1,
                                        Fsw1 : update_status.Fsw1,
                                        Rundry1  : update_status.Rundry1,
                                        pump1  : update_status.PumpStatus1,
                                        Fault2S1 : update_status.sFault1,
                                        
                                        Remote2 : update_status.RemoteLocal2,
                                        Fsw2 : update_status.Fsw2,
                                        Rundry2  : update_status.Rundry2,
                                        pump2  : update_status.PumpStatus2,
                                        Fault2S2 : update_status.sFault2,
                                      });
                                }
                                
                            }
                })
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
                        <Panel pumpNum = "1" keyAPI ={this.state.accessToken} status = {this.state.pump1}  runDry = {this.state.Rundry1} remote = {this.state.Remote1} F2S = {this.state.Fault2S1}/>
                       
                        </div>
                        <div class = "panel-2"> 
                        <Panel pumpNum = "2" keyAPI ={this.state.accessToken}  status = {this.state.pump2} runDry = {this.state.Rundry2} remote = {this.state.Remote2} F2S = {this.state.Fault2S2}/>
                        </div>
                        
             
                    </div>   
                     
                    </div>
                   
            </div>
            <div class = "symbol">
            <div class = "container-pump-status">
             <div class = "border-pump" ><Remote   status = {this.state.pump1}></Remote> </div>
            <div class = "border-pump-2" ><Remote   status = {this.state.pump2}></Remote> </div> 
            </div>
            <div class = "container-pump-flow">
            <div class = "border-flow-panel" ><Flowswitch flow = {this.state.Fsw1}></Flowswitch></div>
            <div class = "border-flow-panel2" ><Flowswitch flow = {this.state.Fsw2}></Flowswitch></div>
            </div>
            </div>
            
 
            
            </div>
            
            
        )
    }
}


export default withRouter(PumpMonitor)



