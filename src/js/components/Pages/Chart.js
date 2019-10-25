import React, { Component } from 'react'
import {  Line  } from 'react-chartjs-2';
import './Chart.css'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state ={
        chartData: {
        //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //     datasets: [{
        //         label: ['# of Votes'],
        //         data: [12, 19, 3, 5, 2, 3],
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.2)',
        //             'rgba(54, 162, 235, 0.2)',
        //             'rgba(255, 206, 86, 0.2)',
        //             'rgba(75, 192, 192, 0.2)',
        //             'rgba(153, 102, 255, 0.2)',
        //             'rgba(255, 159, 64, 0.2)'
        //         ],
        //         borderColor: [
        //             'rgba(255, 99, 132, 1)',
        //             'rgba(54, 162, 235, 1)',
        //             'rgba(255, 206, 86, 1)',
        //             'rgba(75, 192, 192, 1)',
        //             'rgba(153, 102, 255, 1)',
        //             'rgba(255, 159, 64, 1)'
        //         ],
        //         borderWidth: 1
        //     },{
        //         label: ['# of Votes2'],
        //         data: [1, 10, 7, 6, 5, 4],
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.2)',
        //             'rgba(54, 162, 235, 0.2)',
        //             'rgba(255, 206, 86, 0.2)',
        //             'rgba(75, 192, 192, 0.2)',
        //             'rgba(153, 102, 255, 0.2)',
        //             'rgba(255, 159, 64, 0.2)'
        //         ],
        //         borderColor: [
        //             'rgba(255, 99, 132, 1)',
        //             'rgba(54, 162, 235, 1)',
        //             'rgba(255, 206, 86, 1)',
        //             'rgba(75, 192, 192, 1)',
        //             'rgba(153, 102, 255, 1)',
        //             'rgba(255, 159, 64, 1)'
        //         ],
        //         borderWidth: 1
        //     }]
          
        // },
        // options: {
        //     scales: {
        //         yAxes: [{
        //             ticks: {
        //                 beginAtZero: true
        //             }
        //         }]
        //     }
        },
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
            // 

            var newjson = {
                labels: arr_time,
                datasets:[
                    {
                        fill: true,
                        label:'Pump1',
                        data:arr_Actionone,
                        backgroundColor:['#33DDFF'],
                        borderColor:['#3364FF'],
                    },
                    {
                        fill: true,
                        label:'Pump2',
                        data:arr_Actiontwo,
                        backgroundColor:['#FFFF70'],
                        borderColor:['#F9FF33'],
                    }
                ]
            }

            //return newjson;
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
