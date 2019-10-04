import React, { Component } from 'react'
import './Remote.css'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';

export default class Remote extends Component {
    constructor(props) {
        super(props);
        this.CheckPump = this.CheckPump.bind(this);
        this.state ={
            remoteStatus : "REMOTE",
            Fsw :"",
            API : txt,
            //pumpnum : this.props.pumpNum,
            // accessToken:this.props.keyAPI
        };
       
    }
    
    componentDidMount()
    {
        // console.log(this.state.Fsw);
        // switch(this.props.status){
        //     case "Start" :
        //           this.setState((state) => ({ Fsw :<div class ="border-remote" style ={{  backgroundColor :`green`}}></div>}))
        //           console.log("Start");
        //           break;
                
        //     case "Stop" :
        //           this.setState((state) => ({ Fsw :<div class ="border-remote" style ={{  backgroundColor :`red`}}></div>}))
        //           console.log("Stop");
        //           break;
              
        //     case "False" :
        //           this.setState((state) => ({ Fsw :<div class ="border-remote-blink" style ={{  backgroundColor :`yellow`}}></div>}))
        //           console.log("Fasle");
        //           break;
              
        //     case "error" :
        //           this.setState((state) => ({ Fsw :<div class ="border-remote-blink" style ={{  backgroundColor :`grey`}}></div>}))
        //           console.log("error");
        //           break;
              
        //   }
        // this.CheckPump();
        // const colorFsw = (PumpStatus) => {
        //     switch(PumpStatus){
        //       case "Run" :
        //          return <div class ="border-remote" style ={{  backgroundColor :`green`}}></div>
        //       case "Stop" :
        //          return  <div class ="border-remote" style ={{  backgroundColor :`red`}}></div>
        //       case "False" :
        //          return  <div class ="border-remote-blink" style ={{  backgroundColor :`yellow`}}></div>
        //       case "error" :
        //          return  <div class ="border-remote-blink" style ={{  backgroundColor :`grey`}}></div>
        //     }
        //    }
        //    this.setState({Fsw : colorFsw(this.props.status) });
        //     //this.setState({Fsw :<div class ="border-remote" style ={{  backgroundColor :`red`}}></div>})
    }
  
    componentWillReceiveProps(nextProps)
    {
    
      
    }

    // async loadData() {
    //     {
    //         Axios.get(`${this.state.API}/Pump/WebUpdateStatus/${this.state.pumpnum}/${this.state.accessToken}`)
    //         //Axios.get(`http://192.168.10.36/skapi/SystemAPI/Pump/RestAPI`)
    //         .then(res => {
    //             const result = JSON.parse(res.data);
    //             console.log(result)
    //             if(result.IsSuccess)
    //             {
                  
    //                var update_status =  JSON.parse(result.Value);
    //                 //console.log(update_status.PumpStatus)
    //                const colorFsw = (PumpStatus) => {
    //                 switch(PumpStatus){
    //                   case "Start" :
    //                      return <div class ="border-remote" style ={{  backgroundColor :`green`}}></div>
    //                   case "Stop" :
    //                      return  <div class ="border-remote" style ={{  backgroundColor :`red`}}></div>;
    //                   case "False" :
    //                      return  <div class ="border-remote-blink" style ={{  backgroundColor :`yellow`}}></div>;
    //                   case "error" :
    //                      return  <div class ="border-remote-blink" style ={{  backgroundColor :`grey`}}></div>;
    //                 }
    //                }
    //                 this.setState({
    //                   Fsw : colorFsw(update_status.PumpStatus)
    //                 });
    //             }
                
    //         })
    //         console.log("loop")
    //       }
    //  }
     CheckPump =() =>{
            switch(this.props.status){
              case "Run" :
                 return <div class ="border-remote" style ={{  backgroundColor :`#66ff33`}}></div>
              case "Stop" :
                 return  <div class ="border-remote" style ={{  backgroundColor :`red`}}></div>
              case "Fault" :
                 return  <div class ="border-remote-blink" style ={{  backgroundColor :`yellow`}}></div>
              case "error" :
                 return  <div class ="border-remote-blink" style ={{  backgroundColor :`grey`}}></div>
            }
    }

            // switch(this.props.status){
            //   case "Start" :
            //         this.setState((state) => ({ Fsw :<div class ="border-remote" style ={{  backgroundColor :`green`}}></div>}))
            //         break;
                  
            //   case "Stop" :
            //         this.setState((state) => ({ Fsw :<div class ="border-remote" style ={{  backgroundColor :`red`}}></div>}))
            //         break;
                
            //   case "False" :
            //         this.setState((state) => ({ Fsw :<div class ="border-remote-blink" style ={{  backgroundColor :`yellow`}}></div>}))
            //         break;
                
            //   case "error" :
            //         this.setState((state) => ({ Fsw :<div class ="border-remote-blink" style ={{  backgroundColor :`grey`}}></div>}))
            //         break;
                
            // }
           
     

    render() {
        const result = this.CheckPump();
        
        return (
             <div>{result}</div>
            //<div class ="border-remote" style ={{  backgroundColor :`green`}}></div>
           
        )
    }
}
