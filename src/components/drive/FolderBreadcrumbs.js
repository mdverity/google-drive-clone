import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../hooks/useFolder'

const FolderBreadcrumbs = ({ currentFolder }) => {
  // If the current folder is the root folder, the path is empty
  // Otherwise, start the current path with the root folder.
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]

  // If there is a current folder, add the path of the previous folders onto it
  if (currentFolder) path = [...path, ...currentFolder.path]

  return (
    <Breadcrumb
      className='flex-grow-1'
      listProps={{ className: 'bg-white pl-0 m-0' }}
    >
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : '/',
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className='text-truncate d-inline-block'
          style={{ maxWidth: '150px' }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className='text-truncate d-inline-block'
          style={{ maxWidth: '200px' }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export default FolderBreadcrumbs
