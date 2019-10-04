import React, { Component } from 'react'
import './Flowswitch.css'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';

export default class Remote extends Component {
    constructor(props) {
        super(props);
        // this.CheckPump = this.CheckPump.bind(this);
        this.state ={
        };
       
    }
    


     CheckPump =() =>{
            switch(this.props.flow){
              case true :
                 return <div class ="border-flow" style ={{  backgroundColor :`#66ff33`}}></div>
              case false :
                 return  <div class ="border-flow" style ={{  backgroundColor :`grey`}}></div>
            
            }
    }


     

    render() {
         const flow = this.CheckPump();
        
        return (
             <div>{flow}</div>
            //<div class = "border-flow" style ={{  backgroundColor :'#66ff33'}} ></div>
            
           
        )
    }
}
