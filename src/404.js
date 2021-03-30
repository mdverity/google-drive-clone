import React from 'react'
// import { Alert } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import CenteredContainer from './components/authentication/CenteredContainer'

const NotFoundPage = () => {
  return (
    <CenteredContainer>
      <div class='alert alert-danger text-center' role='alert'>
        <h1>404</h1>
        <h4>Page Not Found</h4>
        <br />
        <br />
        Whoops!
        <br />
        Looks like this page doesn't exist.
      </div>

      <div class='w-100 d-flex justify-content-center mt-5'>
        <a href='/' class='nowrap btn btn-dark w-50'>
          Back Home
        </a>
      </div>
    </CenteredContainer>
  )
}

export default NotFoundPage
