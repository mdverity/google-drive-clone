import { useReducer, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'

// Object used for clarity, values are irrelevent.
const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files',
}

// Fake folder to mimic root of storage
export const ROOT_FOLDER = {
  name: 'Root',
  id: null,
  path: [],
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    // Any time a folder is selected. Breadcrumbs clicked, etc.
    // Set default state and prep for new data.
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      }

    // Only passed when 'folder' changes.
    // Pass the current state, and update it's new folder attribute.
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      }

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      }

    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      }

    // "This action does not exist."
    default:
      return state
  }
}

export const useFolder = (folderId = null, folder = null) => {
  // useReducer chosen due to complexity of the folder's state
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  })
  const { currentUser } = useAuth()

  // Dispatch function to reset default state of folder
  // if 'folderId' or 'folder' changes to give us a baseline
  // from which our next functions can run seamlessly.
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  }, [folderId, folder])

  // useEffect to trigger when folderId changes
  useEffect(() => {
    // Identify and set root folder if applicable
    //     (the root folder has no folderId)
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      })
    }

    // If we have a folderId, get that item in the database.
    //     Returns a promise
    database.folders

      // A 'doc' is an item in the firebase collection
      .doc(folderId)
      .get()

      // Update the folder ID with the new folderId
      // formatDoc is a helper function:
      //     It calls the doc.data method for parsing useless doc propeties
      //     and adds an additional id field.
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        })
      })

      // Catch for edge cases, reset folder to root folder.
      //     Accessing folder without permissions, etc.
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        })
      })
  }, [folderId])

  // Populate child folders if folderId or currentUser changes
  useEffect(() => {
    // Returning this 'cleans' data (snapshot) every time the data is manipulated
    // onSnapshot returns a function, so we return it to maintain a sole 'listener'
    database.folders
      // Firebase query syntax
      .where('parentId', '==', folderId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        })
      })
  }, [folderId, currentUser])

  // Populate files inside current folder
  useEffect(() => {
    // Returning this 'cleans' data (snapshot) every time the data is manipulated
    // onSnapshot returns a function, so we return it to maintain a sole 'listener'
    database.files
      // Firebase query syntax
      .where('folderId', '==', folderId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        })
      })
  }, [folderId, currentUser])

  return state
}
