import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { faBoxes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavbarComponent = () => {
  return (
    <Container>
      <Navbar bg='light' expand='true'>
        <Navbar.Brand as={Link} to='/'>
          <FontAwesomeIcon icon={faBoxes} /> &nbsp;gDrive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to='/user'>
            Profile
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  )
}

export default NavbarComponent
