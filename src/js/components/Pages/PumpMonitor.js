import React, { Component } from 'react'
import Panel from './PumpPanel'
import './PumpMonitor.css'
import Remote from './Remote'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import txt from '!!raw-loader!../config/Config.txt';
import Flowswitch from './Flowswitch';
import Alarmnoti from './Alarmnoti';

 class PumpMonitor extends Component {
    intervalID = 0;
    constructor(props) {
        super(props);
        this.sendTable = this.sendTable.bind(this);
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
            Fault2S2:"",
            Alarm:"",
            Mode1:"",
            Mode2:"",
            timeStart1:"",
            timeStop1:"",
            timeStart2:"",
            timeStop2:"",
            emergency:"",
            reSet1:"",
            reSet2:"",
            timeOut1:"",
            timeOut2:"",
            isDisconnect:"",
        }
    }

    componentDidMount()
    {   
         if (localStorage.getItem('userToken') === null)
         {   
            this.props.history.push(`/`);
         }
         else{
            this.checkToken();
            this.loadData();
            this.intervalID = setInterval(this.loadData.bind(this), 2500);    
       }
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
        this.setState((state) => ({ accessToken : token}));
    }

    sendTable =()=>{
        this.props.confirm(this.state.Alarm);
    }
    SplitText=(text)=>{
        if(text.includes('o'))
        {
            return "null"
        }
        else{
            return text.substring(0, 2) + ":" + text.substring(2);
        }
    }

    async loadData() {
            {
                Axios.get(`${this.state.API}/Pump/WebUpdateStatus/${this.state.accessToken}`)
                .then(res => { const result = JSON.parse(res.data);
                        if(result.Value === "Access denied!")
                            {
                              localStorage.removeItem('userToken');
                              this.props.history.push(`/`);
                            }
                            else
                            { 
                                if(result.IsSuccess)
                                {
                                    var update_status =  JSON.parse(result.Value);
                                    var update_alarm =  JSON.parse(result.Alarm);
                                    this.sendTable(this);
                                    this.setState({
                                        Remote1 : update_status.RemoteLocal1,
                                        Fsw1 : update_status.Fsw1,
                                        Rundry1  : update_status.Rundry1,
                                        pump1  : update_status.PumpStatus1,
                                        Fault2S1 : update_status.sFault1,
                                        Mode1 : update_status.Mode1,
                                        Mode2 : update_status.Mode2,
                                        emergency : update_status.Emer,
                                        reSet1 : update_status.IsReset1,
                                        reSet2 : update_status.IsReset2,
                                        Remote2 : update_status.RemoteLocal2,
                                        Fsw2 : update_status.Fsw2,
                                        Rundry2  : update_status.Rundry2,
                                        pump2  : update_status.PumpStatus2,
                                        Fault2S2 : update_status.sFault2,
                                        
                                        isDisconnect : update_status.Disconnect,
                                        timeOut1 :  update_status.TimeOut1,
                                        timeOut2 :  update_status.TimeOut2,

                                        timeStart1 : this.SplitText(update_status.TimeStart1),
                                        timeStop1 : this.SplitText(update_status.TimeStop1),
                                        timeStart2 : this.SplitText(update_status.TimeStart2),
                                        timeStop2 : this.SplitText(update_status.TimeStop2),

                                        Alarm :  update_alarm,



                                      });
                                }
                            }
                })
              }
         }
   
  
    render() {
      
        var IsEmer
        if(this.state.emergency === "True"){
            IsEmer = true;
        }
        else if(this.state.emergency === "False"){
            IsEmer = false;
        }
        else{
            IsEmer = false;
        }

       //console.log(this.state.emergency)
        return (
            <div class = "mainLayout">
            <div class = "background">
    
            <div class = "container">
                <div class = "container-n">
                    <h1>Pump Station</h1>
              
                   
                        
                { IsEmer ?    <div class="emergency blink"> <h1>EMERGENCY</h1></div> : <div class = "container-s">
                        <div class = "panel-1">
                        <Panel disconnect = {this.state.isDisconnect} pumpNum = "1" time = {this.state.timeOut1} keyAPI ={this.state.accessToken} status = {this.state.pump1}  runDry = {this.state.Rundry1} remote = {this.state.Remote1} F2S = {this.state.Fault2S1}  Pmode = {this.state.Mode1} timestart = {this.state.timeStart1} timestop = {this.state.timeStop1} reset = {this.state.reSet1}  />                    
                        </div>
                        <div class = "panel-2"> 
                        <Panel disconnect = {this.state.isDisconnect} pumpNum = "2" time = {this.state.timeOut2} keyAPI ={this.state.accessToken}  status = {this.state.pump2} runDry = {this.state.Rundry2} remote = {this.state.Remote2} F2S = {this.state.Fault2S2}  Pmode = {this.state.Mode2} timestart = {this.state.timeStart2} timestop = {this.state.timeStop2} reset = {this.state.reSet2} />
                        </div>
                </div> 
          }


                    </div>       
            </div>
            { IsEmer ?        null : <div class = "symbol">   
            <div class = "container-pump-status">
             <div class = "border-pump" ><Remote   status = {this.state.pump1}></Remote> </div>
            <div class = "border-pump-2" ><Remote   status = {this.state.pump2}></Remote> </div> 
            </div>
            <div class = "container-pump-flow">
            <div class = "border-flow-panel" ><Flowswitch flow = {this.state.Fsw1}></Flowswitch></div>
            <div class = "border-flow-panel2" ><Flowswitch flow = {this.state.Fsw2}></Flowswitch></div>
            </div>    
            </div>

      }

            </div>
            </div>
        )
    }
}


export default withRouter(PumpMonitor)



