import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { storage, database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap'

const AddFileButton = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const { currentUser } = useAuth()

  function handleUpload(e) {
    const file = e.target.files[0]
    // If the user doesn't select a file or isn't in a folder somehow, return immediately.
    if (currentFolder == null || file == null) return

    // Generate a unique ID for each file
    const id = uuidV4()

    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ])

    // Generate the file's path
    const filePath =
      currentFolder === ROOT_FOLDER
        ? // If the current folder is the root folder, add that path onto the file's path.
          `${currentFolder.path.join('/')}/${file.name}`
        : // If the file is inside a folder, map the parent folders plus the current folder onto the path.
          `${currentFolder.path.map((parent) => parent.name).join('/')}/${
            currentFolder.name
          }/${file.name}`

    // Create an uploadTask and '.put' it into the Firebase storage.
    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file)

    // Prep to add the file to the database as well
    // Use uploadTask.on('state-changed', ...) to determine when upload is finished
    // Takes 3 functions:
    // 1st: Gets called repeatedly to check upload progress.
    // 2nd: Occurs on error
    // 3rd: Runs on upload completion
    uploadTask.on(
      'state_changed',
      // First function
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress }
            }

            return uploadFile
          })
        })
      },
      // Second Function
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
      },
      // Third Function
      () => {
        // Save files that haven't finished, mostly so we can trigger the toast to be removed.
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id
          })
        })

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            // Firebase query syntax
            // Checking if the user already has the same file in the current folder
            .where('name', '==', file.name)
            .where('userId', '==', currentUser.uid)
            .where('folderId', '==', currentFolder.id)
            .get()
            .then((existingFiles) => {
              // set existingFile to any file that currently exists and matches the query
              const existingFile = existingFiles.docs[0]
              if (existingFile) {
                // If that file exists, update it's url.
                existingFile.ref.update({ url: url })
              } else {
                // Otherwise, just add a new file to the database
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                })
              }
            })
        })
      }
    )
  }

  return (
    <>
      <label className='btn btn-outline-success btn-md m-0 mr-2'>
        <FontAwesomeIcon icon={faFileUpload} size='lg' />
        <input
          type='file'
          onChange={handleUpload}
          style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
        />
      </label>
      {/* Bunch of gross conditional rendering for the toasts. */}
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '35%',
              maxWidth: '250px',
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles) => {
                    return prevUploadingFiles.filter((uploadFile) => {
                      return uploadFile.id !== file.id
                    })
                  })
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className='text-truncate w-100 d-block'
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? 'danger' : 'primary'}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? 'Error'
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}

export default AddFileButton
