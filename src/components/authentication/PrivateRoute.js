import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

// Wrapper for our current route
export default function PrivateRoute({ component: Component, ...rest }) {
  // Get current user from our Auth Context
  const { currentUser } = useAuth()

  return (
    <Route
      // Pass all the rest of the props as per normal
      {...rest}
      // Conditionally render the component passed based on if there is a user signed in
      render={() => {
        return currentUser ? (
          <Component />
        ) : (
          // Otherwise redirect them to the login
          <Redirect to='/login' />
        )
      }}
    ></Route>
  )
}
