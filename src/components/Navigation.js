import React, {Component} from 'react';
//import {Button, Form, Container, Row, Navbar, Nav, NavDropdown, Table, Modal,} from "react-bootstrap";
import { Container,Navbar, Nav} from "react-bootstrap";
//import { Link, withRouter } from 'react-router-dom';
import {  withRouter } from 'react-router-dom';

class Navigation extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/')
  }
 
  render() {
    
    if (window.location.href.indexOf("/#/listingdetails/") > -1) {
      //alert("your url contains the name franky");
    }
    else if(window.location.href.indexOf("/#/listingdetails") > -1){
      this.props.history.push('/')
    }


    const loginRegLink = (
      <ul className="navbar-nav">
        {/* <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
      
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        {/* <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link to="/todoapp" className="nav-link">
            Pagination
          </Link>
        </li> */}
      
        <li className="nav-item">
          <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    ) 
    
    return(
        <header>
          <Container fluid>
       
          <Navbar expand="lg">
        {/* <Navbar.Brand href="#" className="logo"><img src="/logo.png" alt="" /></Navbar.Brand> */}
          <span className="logo"><img src="/logo.png" alt="" /></span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="right-nav">
            <Nav className="mr-auto"></Nav>
              {/* <Nav className="top-menu">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>Logout</Nav.Link>
                <Nav.Link>HI, SAJJAD AMIR</Nav.Link>
              </Nav> */}
              { (localStorage.usertoken!==undefined) ? userLink : loginRegLink }
                {/* <Nav style={{display:'none'}}>
                <Nav.Link>
                <div className="user-img">
                    <img src="/images/user.png"/>
                </div>
                <div className="user-profile">
                    Admin 
                 </div>
                  <NavDropdown>
                    <NavDropdown.Item href="#action/3.1">Sign Out</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Edit Profile</NavDropdown.Item>
                  </NavDropdown>
                  </Nav.Link>
                </Nav> */}
           
          </Navbar.Collapse>
          </Navbar>
        
        </Container>
        </header>
    )

  }

}

export default withRouter(Navigation);
