import React, { Component } from 'react'

export default class table extends Component {

    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);

        this.state = {
            result:[
                {'fruit': 'Apple', 'cost': 100},
                {'fruit': 'Orange', 'cost': 50},
                {'fruit': 'Banana', 'cost': 35},
                {'fruit': 'Mango', 'cost': 70},
                {'fruit': 'Pineapple', 'cost': 45},
                {'fruit': 'Papaya', 'cost': 40},
                {'fruit': 'Watermelon', 'cost': 35}
                ]
        }
    }
        getKeys = function(){
            return Object.keys(this.state.result[0]);
        }      
        getHeader = function(){
            var keys = this.getKeys();
            return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
        }       
        getRowsData = function(){
            var items = this.state.result;
            var keys = this.getKeys();
            return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
            })
        }
        
    render() {
        return (
            <div>
                <table class="table">
                    <thead>
                        <tr> {this.getHeader()} </tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }