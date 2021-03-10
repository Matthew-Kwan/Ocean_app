import React, {useState, useEffect} from 'react'
// import './navbar.css'

import Navbar from 'react-bootstrap/Navbar'


const Nav = ({user}) => {
  
    return (
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
       
      </Navbar>
    )
}



export default Nav;