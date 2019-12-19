import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Dropdown,Spinner, DropdownToggle, DropdownMenu, DropdownItem,Modal, ModalBody, ModalFooter,Button,Badge  } from 'reactstrap';
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';
import MaterialUIPickers from './Timepicker'
import Popup from "reactjs-popup";
import './PumpPanel.css'

var lastStatusMode;
var lastStatusReset;
class PumpPanel extends Component {
    constructor(props) {
        super(props);
        this.f2s = this.f2s.bind(this);
        this.Status_text = this.Status_text.bind(this);
        this.toggle = this.toggle.bind(this);
        this.blinkStatus = this.blinkStatus.bind(this);
        this.Rundry_status = this.Rundry_status.bind(this);
        this.toggle_modal_start = this.toggle_modal_start.bind(this);
        this.toggle_modal_stop= this.toggle_modal_stop.bind(this);
        this.Modechange = this.Modechange.bind(this);
        this.ModeTimer = this.ModeTimer.bind(this);
        this.IsReset = this.IsReset.bind(this);
        this.ToggleSettime = this.ToggleSettime.bind(this);
        this.IsStatusStart = this.IsStatusStart.bind(this);
        this.IsStatusStop = this.IsStatusStop.bind(this)


        this.state = {
          modal_start: false,
          modal_stop: false,
          API: txt,
          back_Start:"",
          back_Stop:"",
          dropdownOpen: false,
          IsSpin:false,
          pumpnum: this.props.pumpNum,
          
         
          accessToken:this.props.keyAPI,
          currentPumpstatus:[],
          tooltipOpen: false,
          colorwarning:"",
          realPumpstatus:[],
          Remote:"Local",
          Fsw:"",
          Rundry:"",
        };
      }
      
      onCallbackstart(Tstart) {
        
        this.setState({back_Start:Tstart})
        
      }
      onCallbackstop(Tstop) {
        this.setState({back_Stop:Tstop})
       
      }

      toggle() {
        this.setState({
          dropdownOpen: !this.state.btnDropright 
        });
      }
      toggle_modal_start() {
        this.setState(prevState => ({
          modal_start: !prevState.modal_start
        }));
      }
      toggle_modal_stop() {
        this.setState(prevState => ({
          modal_stop: !prevState.modal_stop
        }));
      }
  f2s = () =>{
    switch(this.props.F2S){
      case true:
          return <Badge color="danger">Fault to Start</Badge>
      case false:
          return ""
  }
}
    blinkStatus = () =>{
      switch(this.props.status){
        case "Error":
           return  <div  style ={{ backgroundColor :`black`}} class="border-noblink"> </div>
          
        case "Run":
            return  <div  style ={{ backgroundColor :`#66ff33`}} class="border-noblink"> </div>
        case "Stop":
            return  <div  style ={{ backgroundColor :`red`}} class="border-noblink">  </div>    
        case "Fault":
            return  <div  style ={{ backgroundColor :`yellow`}}  class="border-blink"> </div>
        case null:
            return  <div  style ={{ backgroundColor :`grey`}}  class="border-noblink"> </div>
        default: 
            return <div  style ={{ backgroundColor :`grey`}}  class="border-noblink"> </div>
           
      }
    }
   
    Rundry_status = () =>{
      switch(this.props.runDry){
        case true:
            return <Badge color="danger">Rundry</Badge>
        case false:
            return ""
      
      }
    }

    Modechange = () =>{
      
      if(this.props.Pmode === "True" || this.props.Pmode === "False"){
        lastStatusMode = this.props.Pmode
      }
      switch(lastStatusMode){
        case "True":
            return <button onClick={this.ToggleMode.bind(this)} type="button" class="btn btn-success block" aria-label="Left Align">
            AUTO
           </button>
        case "False":
            return <button onClick={this.ToggleMode.bind(this)} type="button" class="btn btn-secondary block" aria-label="Left Align">
           MANUAL
           </button>
      }
    }
    IsReset = () =>{

      if(this.props.reset === "True" || this.props.reset === "False"){
        lastStatusReset = this.props.reset
      }
      switch(lastStatusReset){
        case "True":
            return  <button id="reset-btn" type="button" class="btn btn-warning block" aria-label="Left Align"  onClick = {this.Pumpreset.bind(this)} >
            RESET
            </button>
        case "False":
            return ""
      }
    }
    ModeTimer = () =>{
      switch(lastStatusMode){
        case "True":
    return <Popup trigger={<button type="button" class="btn btn-success block"> SET TIME </button>}  closeOnDocumentClick>
            <div>
           <MaterialUIPickers  timeFormat ={"Time Start"} pumpid = {this.props.pumpNum} timeback={this.onCallbackstart.bind(this)}/>
           <MaterialUIPickers  timeFormat ={"Time Stop"} pumpid = {this.props.pumpNum} timeback={this.onCallbackstop.bind(this)}/>
           <Button color="warning" onClick={this.Settimer.bind(this)}  style = {{ width :'100%' }} >Start Timer</Button>
           </div>
          </Popup>
          
        case "False":
            return ""
      }
    }
    IsStatusStart =()=>{
      switch(this.props.status){
        case "Run":
            return  false
        case "Stop":
            return    true
            default: 
            return null
           
      }
    }
    IsStatusStop =()=>{
      switch(this.props.status){
        case "Run":
            return  true
        case "Stop":
            return    false
            default: 
            return null
           
      }
    }

    Status_text = () =>{
      switch(this.props.status){
        case null:
            return "null"
        default: 
          return this.props.status
      }
    }
    Pumpreset(){
      Axios.get(`${this.state.API}/Pump/Reset/${this.props.pumpNum}/${this.props.keyAPI}`)
      this.Pumpget()
    }

    PumpStart(){
        Axios.get(`${this.state.API}/Pump/Start/${this.props.pumpNum}/${this.props.keyAPI}`)
        this.Pumpget()
      
      }

      PumpStop(){
        Axios.get(`${this.state.API}/Pump/Stop/${this.props.pumpNum}/${this.props.keyAPI}`)
        this.Pumpget()

      }

      Settimer(){
        var Start = this.state.back_Start.split(":");
        var Stop = this.state.back_Stop.split(":");
        Axios.get(`${this.state.API}/Pump/SetTime/${this.props.keyAPI}/${this.props.pumpNum}/${Start[0]}/${Start[1]}/${Stop[0]}/${Stop[1]}`)
      }
      ToggleMode(){
        var PumpMode
        if(this.props.Pmode === "True"){
          PumpMode ="Manual"
        }
        else if (this.props.Pmode === "False") {
          PumpMode ="Auto"
        }
        const api = `${this.state.API}/Pump/Mode/${this.props.keyAPI}/${this.props.pumpNum}/${PumpMode}`
        Axios.get(api)
      }
      ToggleSettime(){
        if(this.props.Pmode === "True"){
          return true
        }
        else if (this.props.Pmode === "False") {
          return false
        }
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.status !== this.props.status || this.props.runDry === true|| this.props.F2S === true){
          this.setState({IsSpin : false })
        }
      }
      
    Pumpget =() =>{
        if(this.state.modal_start)
        {
          this.setState(prevState => ({
            modal_start: !prevState.modal_start,
            IsSpin: true
          }));
        }
        else if(this.state.modal_stop)
        {
          this.setState(prevState => ({
            modal_stop: !prevState.modal_stop,
            IsSpin: true
          }));
        }
    }
    render() {

      const fault2start = this.f2s();
      const colorwarning = this.blinkStatus();
      const Remote = this.props.remote;
      const Pumpstatus = this.Status_text()
      const rundry = this.Rundry_status();
      const mode = this.Modechange();
      const popUp = this.ModeTimer();
      const isReset = this.IsReset();
      const isAuto = this.ToggleSettime();
      const isStatusStart = this.IsStatusStart();
      const isStatusStop = this.IsStatusStop();
      
      
        return (
          
            <div class="border-panel" style ={{

                width : "100%",
                height : "100%",
                backgroundColor : "#e6e6e6",
                
            }}>
             <div class = "position-border"> {colorwarning}    </div>          
              <div class = "content-border"> 
              <div class = "status-warning"> 
         
              
              <h4><Badge color="primary">{Remote}</Badge></h4>
              { isAuto &&  <h4><Badge color="info">Start  { this.props.timestart }</Badge><Badge color="info">Stop  { this.props.timestop }</Badge></h4>}
              <h4><div class ="blink">{rundry}</div></h4>
              <h4><div class ="blink">{fault2start}</div></h4>
              </div>
                {this.props.disconnect ? <a style={{ color : "red" }} className ="blink"> Disconnected From PLC</a>  : <a>Status :  {Pumpstatus} </a>}
               {this.state.IsSpin && <Spinner color="primary" />  }
                <div class = "btnContain">
                
                <Dropdown isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }} style ={{    
                }}>
                <DropdownToggle caret color="primary">
                PUMP  {this.props.pumpNum}
                </DropdownToggle>
                <DropdownMenu>

               {isStatusStart && <div><DropdownItem onClick = {this.toggle_modal_start} >START</DropdownItem>
                <Modal isOpen={this.state.modal_start} toggle={this.toggle_modal_start} className={this.props.className}>   
                  <ModalBody>
                   START ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.PumpStart.bind(this)}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_modal_start}>Cancel</Button>
                  </ModalFooter>
                </Modal></div> }

             
                 {isStatusStop && <div> <DropdownItem onClick = {this.toggle_modal_stop}  >STOP</DropdownItem>
                 <Modal isOpen={this.state.modal_stop} toggle={this.toggle_modal_stop} className={this.props.className}>   
                  <ModalBody>
                  STOP ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.PumpStop.bind(this)}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_modal_stop}>Cancel</Button>
                  </ModalFooter>
                </Modal> </div>}

                </DropdownMenu>
                </Dropdown>
               
                  {isReset}
                  {mode}
                  {popUp}
                </div>
                </div>
            </div>
            
        )
    }
}


export default withRouter(PumpPanel)
