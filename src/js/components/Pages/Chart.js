import React, { Component } from 'react'
import {  Line  } from 'react-chartjs-2';
import './Chart.css'
import Axios from 'axios';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state ={
        chartData:[]
        }
    }
    convertJson = (graph) =>{

        if(graph.Value !== "Access denied!")
        {
            var jso2 = JSON.parse(graph.Value);
            var count = Object.keys(jso2).length;
            var i;
            // var arr_time=[],arr_pump=[],arr_Action=[];
            

            const arr_time =  jso2.map((time) =>{
                return time.Time;
            })
            const arr_pump =  jso2.map((time) =>{
                return time.PumpId;
            })
            const arr_Action =  jso2.map((time) =>{
                if(time.Event === "PumpStart")
                {
                    return true
                }
                else
                {
                    return false
                }
            })


            // for(i=0;i<count; i++){
            //     arr_time[i] = jso2[i].Time
            //     arr_pump[i] = jso2[i].PumpId
            //     if(jso2[i].Event === "PumpStart")
            //     {
            //         arr_Action[i] = true
            //     }
            //     else
            //     {
            //         arr_Action[i] = false
            //     }
            // }
            var newjson = {
                labels: arr_time,
                datasets:[
                    {
                        fill: true,
                        label:'Pump1',
                        data:arr_Action,
                        backgroundColor:['rgba(255, 99, 132, 0.6)'],
                        borderColor:['rgba(153, 102, 255, 0.6)'],
                    }
                ]
            }
            this.setState({ chartData :  newjson });
     }
    }

    componentDidMount(){
        if(this.props.keytoapi === "")
        {
            const token =  localStorage.getItem('userToken');
            Axios.get(`http://192.168.10.40/skapi/SystemAPI/Pump/StatusHistory/${token}`)
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
            Axios.get(`http://192.168.10.40/skapi/SystemAPI/Pump/StatusHistory/${token}`)
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
