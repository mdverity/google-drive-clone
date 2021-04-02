import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    // Basic password confirmation checks.
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.')
    }
    if (passwordRef.current.value.length < 6) {
      return setError('Password must be at least 6 characters long.')
    }

    // Create array of promises, in case user wants to update multiple fields.
    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    // Resolve all the promises that were added.
    Promise.all(promises)
      .then(() => {
        history.push('/user')
      })
      .catch(() => {
        setError('Failed to update account info.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && (
            <Alert variant='danger' style={{ textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                required
                placeholder='Leave blank to keep current password.'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                required
                placeholder='Leave blank to keep current password.'
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 btn-dark' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/user' className='text-dark'>
          Return to Profile
        </Link>
      </div>
    </CenteredContainer>
  )
}

export default UpdateProfile
