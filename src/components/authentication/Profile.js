import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

const Profile = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out.')
    }
  }

  return (
    <CenteredContainer>
      <div className='w-100 text-center mb-5'>
        <Link to='/' className='btn btn-dark w-50'>
          Back Home
        </Link>
      </div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && (
            <Alert variant='danger' style={{ textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          <strong>Email: </strong> {currentUser.email}
          <Link to='/update-profile' className='btn btn-dark w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button
          variant='link-secondary'
          className='underline'
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </CenteredContainer>
  )
}

export default Profile
