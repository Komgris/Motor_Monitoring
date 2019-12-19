import React, { Component } from 'react'
import {  Line  } from 'react-chartjs-2';
import './Chart.css'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state ={
        chartData: {},
        API : txt
        }
    }
    query =()=>{
    }
    convertJson = (graph) =>{

        if(graph.Value !== "Access denied!")
        {
            var jso2 = JSON.parse(graph.Value);
            var count = Object.keys(jso2).length;
            var i;

            const pumpOne = jso2.filter( p => p.PumpId == 1 );
            const pumpTwo = jso2.filter( p => p.PumpId == 2 );

            

            const arr_time =  jso2.map((time) =>{
                return time.Time;
            })

            const arr_Actionone =  pumpOne.map((time) =>{
                if(time.Event === "PumpStart")
                {
                    return true
                }
                else
                {
                    return false
                }
            })



            const arr_Actiontwo =  pumpTwo.map((time) =>{
                if(time.Event === "PumpStart")
                {
                    return true
                }
                else
                {
                    return false
                }
            })

            var newjson = {
                labels: arr_time,
                datasets:[
                    {
                        fill: true,
                        label:'Pump1',
                        data:arr_Actionone,
                        backgroundColor:['#33DDFF'],
                        borderColor:['#3364FF'],
                    }
                    // {
                    //     fill: true,
                    //     label:'Pump2',
                    //     data:arr_Actiontwo,
                    //     backgroundColor:['#FFFF70'],
                    //     borderColor:['#F9FF33'],
                    // }
                ]
            }
             this.setState({ chartData :  newjson });
        }
    }


    componentDidMount(){
        if(this.props.keytoapi === "")
        {
            const token =  localStorage.getItem('userToken');
            Axios.get(`${this.state.API}/Pump/StatusHistory/${token}`)
            .then(res => {
                const persons = JSON.parse(res.data);
                if(persons.IsSuccess)
                {
                    this.convertJson(persons);
                }})  
        }
        else
        {
            const token =  this.props.keytoapi;
            Axios.get(`${this.state.API}/Pump/StatusHistory/${token}`)
            .then(res => {
                const persons = JSON.parse(res.data);
                if(persons.IsSuccess)
                {
                    this.convertJson(persons);
                }
            })
        }       
      
    }

    render() {
        
        return (
            
            <div  className = "chart" >    
            <Line data={this.state.chartData}
             options={{ 
                 layout: {
                     padding: {
                         left: 20,
                         right: 20,
                         top: 0,
                         bottom: 0
                     }
                    
                 },
                 title: {
                     display: true,
                     text: 'PUMP STATUS HISTORY'
                 },
                 
                 responsiveAnimationDuration:2000
             }
             }
             />
          
         </div>
        )
    }
}
