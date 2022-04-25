import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fileManagerActions } from '../store/fileManagerSlice.js';
import useThunkStatus from './useThunkStatus.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();

  const fetchStatus = useThunkStatus(fileManagerActions.fetchFiles);

  const { files, folders, parent, stack } = useSelector((state) => state.fileManager);

  const parentFolder = parent[selectedCamera._id] || null;
  const foldersStack = stack[selectedCamera._id] || [];

  const currentFolders = parentFolder ? folders[parentFolder._id] : null;
  const currentFiles = parentFolder ? files[parentFolder._id] : null;

  useEffect(() => {
    if (!parentFolder) {
      dispatch(
        fileManagerActions.setParentFolder({
          cameraId: selectedCamera._id,
          folder: selectedCamera.mainFolder,
        }),
      );
    }

    if (parentFolder && !currentFolders && !currentFiles) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: parentFolder._id,
        }),
      );
    }
  }, [parentFolder, selectedCamera]);

  return {
    folders: currentFolders,
    files: currentFiles,
    parentFolder,
    foldersStack,
    fetchStatus,
  };
}
