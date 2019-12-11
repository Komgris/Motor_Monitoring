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
      
    }
    componentWillReceiveProps(nextProps)
    {

    }

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
             case null :
                return  <div class ="border-remote" style ={{  backgroundColor :`grey`}}></div>
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
