import React, { Component,useState}  from 'react'
import './table.css'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';
import DatePicker from 'react-datetime-picker';


export default class table extends Component {

  

    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);

        this.state = {
            dateStart: new Date(),
            dateEnd: new Date(),
            accessToken:"",
            API : txt,
         result:"",

                // result:[ {'frit': 'Apple', 'cost': 100},
                // {'fruit': 'Orange', 'cost': 50},
                // {'fruit': 'Banana', 'cost': 35},
                // {'fruit': 'Mango', 'cost': 70},
                // {'fruit': 'Pineapple', 'cost': 45},
                // {'fruit': 'Papaya', 'cost': 40},
                // {'fruit': 'Watermelon', 'cost': 35}],

            // rresult:"{\"IsSuccess\":true,\"Value\":\"[{\\\"Pump\\\":\\\"1\\\",\\\"Event\\\":\\\"test3\\\",\\\"Time\\\":\\\"17/10/2019 00:00:00\\\"},{\\\"Pump\\\":\\\"1\\\",\\\"Event\\\":\\\"test3\\\",\\\"Time\\\":\\\"17/10/2019 00:00:00\\\"},{\\\"Pump\\\":\\\"1\\\",\\\"Event\\\":\\\"test3\\\",\\\"Time\\\":\\\"17/10/2019 00:00:00\\\"}]\"}"
               

                // {'Pump':1,'Event':'test3','Time':'17/10/2019 00:00:00'},
                // {'Pump':1,'Event':'test3','Time':'17/10/2019 00:00:00'},
                // {'Pump':1,'Event':'test3','Time':'17/10/2019 00:00:00'},
                // {'Pump':1,'Event':'test3','Time':'17/10/2019 00:00:00'},

                
                
                //"{\"IsSuccess\":true,\"Value\":\"[{\\\"Pump\\\":\\\"1\\\",\\\"Event\\\":\\\"test3\\\",\\\"Time\\\":\\\"17/10/2019 00:00:00\\\"},{\\\"Pump\\\":\\\"1\\\",\\\"Event\\\":\\\"test3\\\",\\\"Time\\\":\\\"17/10/2019 00:00:00\\\"},{\\\"Pump\\\":\\\"1\\\",\\\"Event\\\":\\\"test3\\\",\\\"Time\\\":\\\"17/10/2019 00:00:00\\\"}]\"}"
        }    
    }


    componentDidMount(){

        if(this.props.keytoapi === "")
        {
            const token = localStorage.getItem('userToken');
            this.setState({ accessToken : token});
        }
        else{
            const token = this.props.keytoapi;
           this.setState({ accessToken : token});
        }

        //this.query();
    }
    convertDate =(day)=>{
        var dateold = new Intl.DateTimeFormat('en-GB').format(day);
        return dateold;
    }
    // TimeBegin:this.convertDate(this.state.dateStart),
    //             TimeEnd:this.convertDate(this.state.dateEnd),
        query =()=>{
          const body ={ 
                TimeBegin:this.convertDate(this.state.dateStart),
                TimeEnd:this.convertDate(this.state.dateEnd),
          };
          
          // Axios.put(`${this.state.API}/Pump/AlarmTable/${this.state.accessToken}`
          // Axios.get(`${this.state.API}/Pump/AlarmTable/skr`, { body })
          Axios.get(`${this.state.API}/Pump/TestAlarmTable/skr/${this.convertDate(this.state.dateStart)}/${this.convertDate(this.state.dateEnd)}`)
          .then(res => {
        //     { console.log(res.data) })
        //   console.log(this.convertDate(this.state.dateStart) + this.convertDate(this.state.dateEnd))
              const result = JSON.parse(res.data); 
            if(result.IsSuccess){
                const alarm = JSON.parse(result.Value);
                console.log(alarm)
                //const Result = JSON.parse(alarm.Value); 
                this.setState({ result : alarm });
            }});


        //   const start = this.convertDate(this.state.dateStart);
        //   const end = this.convertDate(this.state.dateEnd);
          
        //   console.log(this.convertDate(this.state.dateStart));
        //   console.log(this.convertDate(this.state.dateEnd));
           
            //Axios.get(`${this.state.API}/Pump/AlarmTable/skr/${this.state.dateStart}/${this.state.dateEnd}`)
           
            // fetch('http://192.168.10.42/skapi/SystemAPI/Pump/AlarmTable', {
            //     method: 'POST',
            //     headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            //     },
            //     body: {body}
            // });
     
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
        onChangestart = dateStart => this.setState({ dateStart })
        onChangeend = dateEnd => this.setState({ dateEnd })
       
        
      
    render() {
        var htmlTable =  "";
        if(this.state.result == "")
        {
            htmlTable = "";
            console.log(1);
        }
        else{
            console.log(this.state.result);
            htmlTable = <div class="border-table">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr> {this.getHeader()} </tr>
                </thead>
                <tbody>
                    {this.getRowsData()}
                </tbody>
            </table>
        </div>
        }
        return (
            
            <div class="center">
            <div class = "wrapper">
            <div class = "search-panel">
                <div class ="date-content">
                <a>Date Start</a><br/>
                    <DatePicker
                    onChange={this.onChangestart}
                    value={this.state.dateStart}
                    format ="dd-MM-y"
                    />
                </div>
                <div class ="date-content"> 
               <a>Date End</a><br/>
                    <DatePicker
                    onChange={this.onChangeend}
                    value={this.state.dateEnd}
                    format ="dd-MM-y"
                    />
                </div>
            </div>
            <button  type="button" id="center" class="btn btn-primary btn-lg " style ={{ width : "20%" }} onClick = {this.query.bind(this)}><a>Search</a> </button>
            </div>
            {htmlTable}
          
            {/* <JsonToTable json={this.state.result} /> */}
            
            </div> 
       
        )
    }
}
const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }