import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Modal, ModalHeader, ModalBody, ModalFooter,Button,Badge  } from 'reactstrap';
// import txt from '!!raw-loader!./js/components/config/Config.txt'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';
import './PumpPanel.css'

class PumpPanel extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggle_modal_start = this.toggle_modal_start.bind(this);
        this.toggle_modal_stop= this.toggle_modal_stop.bind(this);

        this.state = {
          modal_start: false,
          modal_stop: false,
          API: txt,
          dropdownOpen: false,
          pumpnum:0,
          IsSuccess: false, 
          isSpinner: "",
          accessToken:"",
          Value :"",
          IP:"",
          Isfirstopen: true,
          currentPumpstatus:[],
          tooltipOpen: false,
          colorwarning:"",
          realPumpstatus:[],
          Remote:"",
          Fsw:"",
          Rundry:"",
        };
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
    // componentDidUpdate(prevState){
    //   if(prevState.colorwarning != this.state.colorwarning){
    //     this.blinkWarning();
    //   }
    // }

    
    componentDidMount()
      {
        // if (localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === "")
        // {   
        //   this.props.history.push(`/`);
        // }
        // else if(this.props.keytoapi === null || this.props.keytoapi ==="")
        // {
        //   this.props.history.push(`/`);
        // }
        // else
        // {
        //   this.checkToken();
        //   this.loadData();
        //   setInterval(this.loadData, 5000);    
        // }
        this.loadData();
        setInterval(this.loadData, 5000);    
    }
    async loadData() {
      {
          Axios.get(`${this.state.API}/Pump/WebUpdateStatus/${this.props.pumpNum}/${token}`)
          //Axios.get(`http://192.168.10.36/skapi/SystemAPI/Pump/RestAPI`)
          .then(res => {
              const result = JSON.parse(res.data);
              
              if(result.IsSuccess)
              {
                
                  var update_status = result.Value;
                  // console.log(result.Value)
                  //const aa = {"IsSuccess":true,"Value":{"RemoteLocal":"Remote","Fsw":false,"Rundry":false,"PumpStart":true,"PumpStop":false}}
                

                 const colorFsw = (fsw) => {
                  switch(fsw){
                    case false :
                       return "secondary";
                    case true :
                       return  "success"
                  }
                 }

                 const IsRundry = (is) => {
                  switch(is){
                    case false :
                       return '';
                    case true :
                       return '<div class ="blink"><Badge color="danger">Rundry</Badge></div>'
                  }
                 }
                  this.setState({
                    Remote : update_status.RemoteLocal,
                    Fsw : colorFsw(update_status.Fsw),
                    Rundry  : IsRundry(update_status.Rundry)
                  });
              }
              
          })
          console.log("loop")
        }
   }
    blinkWarning = () =>{
      switch(this.state.currentPumpstatus.Value){
        case "Error":
            this.setState((state) => ({ colorwarning : "yellow"}));
            break;
        case "Running":
            this.setState((state) => ({ colorwarning : "green"}));
            break;
        case "Stop":
            this.setState((state) => ({ colorwarning : "red"}));
            break;
      }
    }
    

    checkToken =()=>{
        var token;
        if(this.props.keyAPI === "")
        {
           token =  localStorage.getItem('userToken');
          //  console.log(token + "  from local")
        }
        else
        {
           token =  this.props.keyAPI 
          //  console.log(token + "  from prop")
        }
        // this.setState({ accessToken : token  });
        this.setState((state) => ({ accessToken : token}));
        Axios.get(`${this.state.API}/Pump/ReadStatus/${this.props.pumpNum}/${token}`)
       .then(res => {
        const status = JSON.parse(res.data);
       
            if(status.Value === "Access denied!")
            {

              localStorage.setItem('userToken', "");
              this.props.history.push(`/`);
              
            }
            else
            {
              // this.setState({currentPumpstatus : status});
              this.setState((state) => ({ currentPumpstatus : status}));
              this.blinkWarning();
            }
      })
    }
    Pumpreset(){
      Axios.get(`${this.state.API}/Pump/Reset/${this.props.pumpNum}/${this.state.accessToken}`)
    }

    PumpStart(){
        Axios.get(`${this.state.API}/Pump/Start/${this.props.pumpNum}/${this.state.accessToken}`)
        this.Pumpget()
        // .then(res => {
        //   this.Pumpget()
        // })       
      }

      PumpStop(){
        Axios.get(`${this.state.API}/Pump/Stop/${this.props.pumpNum}/${this.state.accessToken}`)
        this.Pumpget()
        // .then(res => {
        //   this.Pumpget()
        // })
      }
      
    Pumpget =() =>{
        Axios.get(`${this.state.API}/Pump/ReadStatus/${this.props.pumpNum}/${this.state.accessToken}`)
        .then(res => this.setState({ currentPumpstatus: JSON.parse(res.data) } ))   

        this.loadData();
        this.checkExpried();
        if(this.state.modal_start)
        {
          this.setState(prevState => ({
            modal_start: !prevState.modal_start
          }));
        }
        else if(this.state.modal_stop)
        {
          this.setState(prevState => ({
            modal_stop: !prevState.modal_stop
          }));
        }
    }
      
      checkExpried =() =>{
        Axios.get(`${this.state.API}/Pump/ReadStatus/${this.props.pumpNum}/${this.state.accessToken}`)
        .then(res => {
            const status = JSON.parse(res.data);
            if(status.Value === "Access denied!")
            {
              localStorage.setItem('userToken', "");
              this.props.history.push(`/`);
            }
            else{
              this.blinkWarning(); 
              
            }
           
          })
      }
      

    render() {
        return (
            <div class="border" style ={{

                width : "100%",
                height : "100%",
                backgroundColor : "#e6e6e6",
            }}>
          <div  style ={{
             backgroundColor :`${this.state.colorwarning}`
          }} class="border-blink"> </div>
            <div class = "content-border">
              <div class = "status-warning">
              <h4><Badge color="primary">{this.state.Remote}</Badge></h4>
              <h4><Badge color={this.state.Fsw}>Flow Switch</Badge></h4>
              {this.state.Rundry}
              </div>
                <a1>Status :  {this.state.currentPumpstatus.Value} </a1>
                <div class = "btnContain">            
                <Dropdown isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }} style ={{    
                }}>
                <DropdownToggle caret>
                PUMP NO. {this.props.pumpNum}
                </DropdownToggle>
                <DropdownMenu>
                
                <DropdownItem onClick = {this.toggle_modal_start} >START</DropdownItem>
                {/* -----------------------------------START-------------------------------------*/}
                <Modal isOpen={this.state.modal_start} toggle={this.toggle_modal_start} className={this.props.className}>   
                  <ModalBody>
                   START ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.PumpStart.bind(this)}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_modal_start}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                 {/* -----------------------------------START-------------------------------------*/}
                <DropdownItem onClick = {this.toggle_modal_stop}  >STOP</DropdownItem>

                 {/* -----------------------------------STOP-------------------------------------*/}
                 <Modal isOpen={this.state.modal_stop} toggle={this.toggle_modal_stop} className={this.props.className}>   
                  <ModalBody>
                  STOP ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.PumpStop.bind(this)}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_modal_stop}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                 {/* -----------------------------------STOP-------------------------------------*/}




                {/* <DropdownItem onClick = {this.PumpStop.bind(this)} >STOP</DropdownItem> */}

                </DropdownMenu>
                </Dropdown>
                <button  type="button" class="btn btn-primary " aria-label="Left Align" onClick = {this.Pumpget.bind(this)}>
                <div class="icon"><a class="fas fa-redo-alt"></a></div>
                </button>
                <button  type="button" class="btn btn-warning " aria-label="Left Align"  onClick = {this.Pumpreset.bind(this)} >
                RESET
                </button>
                </div>
                {/* <p>{this.state.accessToken}</p> */}
                
                    {/* <div class = "dropdown">
                    <button   class="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        PUMP
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a style= {btn_drop_item} class = "dropdown-item" >START</a>
                        <a style= {btn_drop_item} class = "dropdown-item" >STOP</a>
                    </div>
                    </div> */}
                
            </div>
            </div>
        )
    }
}
const btn_drop_item={
    padding: "auto"
}

export default withRouter(PumpPanel)
