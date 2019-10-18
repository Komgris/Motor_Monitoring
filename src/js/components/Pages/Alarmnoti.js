import React, { Component } from 'react'
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
       //console.log(this.props.Alarmprop)
       var AlarmHtml = ""
       var count = 0
        if(this.props.Alarmprop != ""){

           AlarmHtml =  <table class="table table-striped table-dark">
           <thead>
           <tr> {this.getHeader()} </tr>
           </thead>
           <tbody>
                   {this.getRowsData()}
           </tbody>
           </table>

             count = Object.keys(this.props.Alarmprop).length;

        }
        
        return (
            <div  >
                 <Button color="primary"  onClick={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}  >
                    Alarm <Badge color="secondary">{count}</Badge>
                </Button>
                <Collapse isOpen={this.state.btnDropright} >
                <Card>
                <CardBody>
                {AlarmHtml}
                </CardBody>
                </Card>
            </Collapse>
               
            </div>
        )
    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }
