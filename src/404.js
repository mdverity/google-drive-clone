import React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CenteredContainer from './components/authentication/CenteredContainer'

const NotFoundPage = () => {
  return (
    <CenteredContainer>
      {/* <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <title>Page Not Found</title>

    <style media="screen">
      #message {
        background: white;
        max-width: 360px;
        margin: 100px auto 16px;
        padding: 32px 24px 16px;
        border-radius: 3px;
      }

      @media (max-width: 600px) {
        #message {
          margin-top: 0;
          background: white;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <div id="message">
      <div class="alert alert-danger text-center" role="alert">
        <h1>404</h1>
        <h4>Page Not Found</h4>
        <br />
        <br />
        Whoops!
        <br />
        Looks like this page doesn't exist.
      </div>

      <div class="w-100 d-flex justify-content-center mt-5">
        <a href="/" class="nowrap btn btn-dark w-50">Back Home</a>
      </div>
    </div>
  </body>
</html> */}
    </CenteredContainer>
  )
}

export default NotFoundPage
