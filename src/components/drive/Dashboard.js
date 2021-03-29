import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import { useFolder } from '../../hooks/useFolder'
import File from './File'
import Folder from './Folder'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'
import FolderBreadcrumbs from './FolderBreadcrumbs'
import { useParams, useLocation } from 'react-router-dom'

const Dashboard = () => {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

  return (
    <div className='p-5'>
      <Navbar />
      <Container>
        <div className='d-flex align-items-center'>
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>

        {/* If there are any child folders (there will always be a root), */}
        {/* map through them and display them all before the current folder. */}
        {childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: '250px' }}
                className='p-2'
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}

        {/* Add in a little horizontal rule if there's both child folders and files. */}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}

        {/* If there is any files in the childFiles array, map through them and render each file component. */}
        {childFiles.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{ maxWidth: '250px' }}
                className='p-2'
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Dashboard
