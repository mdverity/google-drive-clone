import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <Navbar bg='light'>
      <Navbar.Brand as={Link} to='/'>
        gDrive
      </Navbar.Brand>
      <Nav className='justify-content-center'>
        <Nav.Link as={Link} to='/user'>
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavbarComponent
