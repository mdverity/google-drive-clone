import React from 'react'
import SignUp from './authentication/SignUp'
import Profile from './authentication/Profile'
import Login from './authentication/Login'
import ForgotPassword from './authentication/ForgotPassword'
import UpdateProfile from './authentication/UpdateProfile'
import PrivateRoute from './authentication/PrivateRoute'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './drive/Dashboard'
import NotFoundPage from '../404'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Drive */}
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/folder/:folderId' component={Dashboard} />

          {/* Profile */}
          <PrivateRoute path='/user' component={Profile} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />

          {/* Authentication */}
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
