import React, { Component } from 'react'
import {Nav,NavItem,NavLink,TabContent,TabPane } from 'reactstrap'
import { Container,Row,Col } from 'react-bootstrap';
import Pumpmoni from './PumpMonitor'
import Location from './Map'
import Chart from './Chart'
import classnames from 'classnames';
import './Assemblypump.css'
import Table from './table'


class Assemblypump extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          logStatus:'',
          IP:''
        };
      }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
    render() {
      const key = this.props.sendApi;
      
        return (
            <div>          
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                ><i class="fas fa-desktop"></i>
                  PUMP MONITOR
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                ><i class="fas fa-chart-bar"></i>
                  START/STOP HISTORY
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                ><i class="fas fa-map-marked-alt"></i>
                  LOCATION
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                ><i class="far fa-bell"></i>
                  ALARM HISTORY
                </NavLink>
              </NavItem>
             
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">

                  <div class ="wrapper fadeInDown">
            
          
                     
                      <Pumpmoni keytoapi ={key} apiIP = {this.props.IP}  />
                     
                    {/* apiIP = {IP} */}
                    {/* <Pumpmoni keytoapi = {key} /> */}
                    </div>

              </TabPane>
              <TabPane tabId="2">
         
                  <Chart keytoapi ={key} apiIP = {this.props.IP}/>
                  {/* <Table/> */}
                  {/* <Chart keytoapi = {key}/> */}
            
              </TabPane>
              <TabPane tabId="3">
                <Location keytoapi ={key} apiIP = {this.props.IP}/>
                {/* apiIP = {IP}  */}
                    {/* <Location keytoapi = {key} /> */}
              
              </TabPane>
              <TabPane tabId="4">
                <Table keytoapi ={key} apiIP = {this.props.IP}/>
                {/* apiIP = {IP}  */}
                    {/* <Location keytoapi = {key} /> */}
              
              </TabPane>
            </TabContent>
          </div>
        )
    }
}
export default Assemblypump;