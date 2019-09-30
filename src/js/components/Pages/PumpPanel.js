import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Modal, ModalHeader, ModalBody, ModalFooter,Button  } from 'reactstrap';
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
          realPumpstatus:[]
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

    
    componentDidMount(){
        if (localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === "")
        {   
          
          this.props.history.push(`/`);
        }
        else if(this.props.keytoapi === null || this.props.keytoapi ==="")
        {
          this.props.history.push(`/`);
        }
        else
        {
          this.checkToken();       
        }
        
    }
    blinkWarning = () =>{
      switch(this.state.currentPumpstatus.Value){
        case "Error":
            this.setState((state) => ({ colorwarning : "red"}));
            break;
        case "Running":
            this.setState((state) => ({ colorwarning : "green"}));
            break;
        case "Stop":
            this.setState((state) => ({ colorwarning : "grey"}));
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

    PumpStart(){
        Axios.get(`${this.state.API}/Pump/Start/${this.props.pumpNum}/${this.state.accessToken}`)
        .then(res => {
          this.Pumpget()
        })       
      }

      PumpStop(){
        Axios.get(`${this.state.API}/Pump/Stop/${this.props.pumpNum}/${this.state.accessToken}`)
        .then(res => {
          this.Pumpget()
        })
      }
      
    Pumpget =() =>{
        Axios.get(`${this.state.API}/Pump/ReadStatus/${this.props.pumpNum}/${this.state.accessToken}`)
        .then(res => this.setState({ currentPumpstatus: JSON.parse(res.data) } ))   
           
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
                // top: "10%",
                // left: "40%"
            }}>
          <div  style ={{
             backgroundColor :`${this.state.colorwarning}`
          }} class="border-blink"> </div>
            <div class = "content-border">
                <a1>Status :  {this.state.currentPumpstatus.Value} </a1>
                {/* <Popup trigger={<button className="button"> Open Modal </button>} modal>
                  {close => (
                    <div className="modal">
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <div className="header"> Modal Title </div>
                      <div className="content">
                        {" "}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                        Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                        delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                        commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                        explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                      </div>
                      <div className="actions">
                        <Popup
                          trigger={<button className="button"> Trigger </button>}
                          position="top center"
                          closeOnDocumentClick
                        >
                          <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                            magni omnis delectus nemo, maxime molestiae dolorem numquam
                            mollitia, voluptate ea, accusamus excepturi deleniti ratione
                            sapiente! Laudantium, aperiam doloribus. Odit, aut.
                          </span>
                        </Popup>
                        <button
                          className="button"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                          }}
                        >
                          close modal
                        </button>
                      </div>
                    </div>
                  )}
                </Popup> */}
                <div class = "btnContain">
                  
                <Dropdown isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
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
                <button  type="button" class="btn btn-primary " aria-label="Left Align" onClick = {this.Pumpget.bind(this)} >
                <div class="icon"><a class="fas fa-redo-alt"></a></div>
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
