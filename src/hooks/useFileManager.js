import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { fileManagerActions } from '../store/fileManagerSlice.js';
import useThunkStatus from './useThunkStatus.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();

  const [stack, setStack] = useState([selectedCamera.mainFolder]);
  const selectedFolder = useMemo(() => _.last(stack), [stack]);

  const { files, folders } = useSelector((state) => state.fileManager);
  const fetchStatus = useThunkStatus(fileManagerActions.fetchFiles);

  const currentFolders = selectedFolder ? folders[selectedFolder._id] : null;
  const currentFiles = selectedFolder ? files[selectedFolder._id] : null;

  useEffect(() => {
    setStack([selectedCamera.mainFolder]);
  }, [selectedCamera]);

  useEffect(() => {
    if (selectedCamera && selectedFolder && !currentFolders && !currentFiles) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: selectedFolder._id,
        }),
      );
    }
  }, [selectedFolder, selectedCamera]);

  const onRefreshClick = () => {
    if (selectedCamera && selectedFolder) {
      dispatch(fileManagerActions.fetchFiles({
        cameraId: selectedCamera._id,
        parentId: selectedFolder._id,
      }));
    }
  };

  const onFolderDoubleClick = (folder) => {
    setStack((currentStack) => _.concat(currentStack, folder));
  };

  const onBackButtonClick = () => {
    if (stack.length === 1) {
      return;
    }
    setStack((currentStack) => _.initial(currentStack));
  };

  const onBreadCrumbClick = (folder) => {
    setStack((currentStack) => {
      const index = _.findIndex(currentStack, (item) => item._id === folder._id);
      return _.slice(currentStack, 0, index + 1);
    });
  };

  return {
    fetchStatus,
    folders: currentFolders,
    files: currentFiles,
    navigationStack: stack,
    selectedFolder,
    onRefreshClick,
    onBreadCrumbClick,
    onFolderDoubleClick,
    onBackButtonClick,
  };
}
