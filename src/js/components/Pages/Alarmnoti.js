import React, { Component } from 'react'
import './Alarmnoti.css'
import { Collapse, Button,Badge, CardBody, Card } from 'reactstrap';
export default class Alarmnoti extends Component {

    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
        this.state = {
            btnDropright: false,
            dropdownOpen: false
        }
    }
    getKeys = function(){
            
        return Object.keys(this.props.Alarmprop[0]);
    }      
    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
    })
    }       
    getRowsData = function(){
        var items = this.props.Alarmprop;
        var keys = this.getKeys();
        return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.btnDropright 
        });
      }


    render() {
       var AlarmHtml = ""
       var btnBlink =""
       var count = 0
        if(this.props.Alarmprop != "" ){
           count = Object.keys(this.props.Alarmprop).length;
           if(count > 0){
            btnBlink = <button class="btn-blink" color="primary"  onClick={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}  >
            Alarm <Badge color="secondary">{count}</Badge></button>
           }
           else{
            btnBlink = <button  color="primary"  onClick={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}  >
            Alarm <Badge color="secondary">{count}</Badge></button>
           }
           AlarmHtml =  
           <div class ="table-alarm-noti">
           <div id="scrolltable">
           <table class="table table-striped table-dark">
           <thead>
           <tr>{this.getHeader()}</tr>
           </thead>
           <tbody>
                   {this.getRowsData()}
           </tbody>
           </table>
           </div>
           </div>
        }
        else{
            AlarmHtml = "No Record"
        }
        
        return (
            <div >

                {btnBlink}
                <Collapse isOpen={this.state.btnDropright} >
                <Card>
                <CardBody>
                {AlarmHtml}
                </CardBody>
                </Card>
            </Collapse>
               
            </div>
            // <div>
            //     <h5> Alarm <Badge color="secondary">{count}</Badge></h5>
            //     {AlarmHtml}
            // </div>
        )
    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }
