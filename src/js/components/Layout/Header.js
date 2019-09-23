import React, { Component } from 'react'
import logo from '../Img/tistr_sitename.png'
import { withRouter } from 'react-router-dom';
import {Navbar,NavbarBrand,Nav,Collapse,NavItem,NavLink }from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      collapsed: true,
      loginState : "LOG IN"
    };
  }


  checkState = () =>{
    if(this.props.location.pathname === "/pump")
    {
      this.setState({loginState : "LOG OUT"})
    }
    else{
      this.setState({loginState : "LOG IN"})
    }
  }

  componentDidMount(){
    this.checkState();

  }
  componentDidUpdate(prevProp){
    if( prevProp.location.pathname !== this.props.location.pathname )
    {
      this.checkState();
     
    }
  }


  render() {
    return (
      <div>
        <Navbar   color="light" light expand="md"  >
          <NavbarBrand href="/" className="mr-auto" >
          <img src={logo} width="300" height="50" alt=""/>
          </NavbarBrand>
            <NavItem>
              <NavLink  href="/">{this.state.loginState}</NavLink>
              {/* <NavLink href="/" active>LOG IN</NavLink> */}
            </NavItem>
              <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
              </Nav>
            </Collapse>
        </Navbar>
      </div>
    )
  }
}
export default withRouter(Header)