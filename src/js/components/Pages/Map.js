import React, { Component } from 'react'
import './Map.css'
import txt from '!!raw-loader!../config/Config.txt'
import Axios from 'axios';


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state ={ 
        mapSCR : "",
        API : txt
        }
    }
    componentDidMount(){
        if(this.props.keytoapi === "")
        {
            const token = localStorage.getItem('userToken');
            Axios.get(`${this.state.API}/StationControl/${token}/sk`)
            .then(res => {
                const persons =(res.data);
                if(persons !== "")
                {
                    this.setState({ mapSCR : persons });
                }
            })
        }
        else{
            const token = this.props.keytoapi;
            Axios.get(`${this.state.API}/StationControl/${token}/sk`)
            .then(res =>{
                const persons = (res.data);
                if(persons !== "")
                {
                    this.setState({ mapSCR : persons })
                }
            })
        }
    }


    render() {
        return (
            <div  >
                <br/>
                <div className = "headerStyle">
               <h5> สถานีวิจัยสิ่งแวดล้อมสะแกราช วว. </h5>     
               ตำบลอุดมทรัพย์ อำเภอวังน้ำเขียว จังหวัดนครราชสีมา 30370<br/>
               โทรศัพท์ : 044-009556, คุณอรุณวดี 086-1253793 <br/>
                Website : www.tistr.or.th/sakaerat <br/>
                e-mail : sakaerat@tistr.or.th     
                </div>      
                <br/>    
                    <iframe src={this.state.mapSCR} width="100%" height="500" frameBorder="0"></iframe>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d494409.99819789303!2d101.953729!3d14.508892!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe787bb9155f72f0c!2z4Liq4LiW4Liy4LiZ4Li14Lin4Li04LiI4Lix4Lii4Liq4Li04LmI4LiH4LmB4Lin4LiU4Lil4LmJ4Lit4Lih4Liq4Liw4LmB4LiB4Lij4Liy4LiK!5e0!3m2!1sth!2sus!4v1403510312502" width="100%" height="450" frameBorder="0"></iframe> */}
                  
                </div>
        )
    }
}
