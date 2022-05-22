import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { fileManagerActions } from '../../store/fileManagerSlice.js';
import useThunkStatus from '../../hooks/useThunkStatus.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();

  const { files } = useSelector((state) => state.fileManager);
  const fetchStatus = useThunkStatus(fileManagerActions.fetchFiles);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [show, setShow] = useState(false);
  const [stack, setStack] = useState([selectedCamera.mainFolder]);

  const currentFolder = useMemo(() => _.last(stack), [stack]);
  const currentFiles = useMemo(() => files[currentFolder._id], [currentFolder, files]);

  useEffect(() => {
    setStack([selectedCamera.mainFolder]);
  }, [selectedCamera]);

  useEffect(() => {
    if (selectedCamera && currentFolder && !currentFiles) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: currentFolder._id,
        }),
      );
    }
  }, [currentFolder, selectedCamera]);

  useEffect(() => {
    if (currentFiles) {
      const currentFilesCount = currentFiles.length;

      if (currentFilesCount === 0) {
        setSelectedIndexes([]);
        return;
      }

      if (_.head(selectedIndexes) > currentFilesCount - 1) {
        setSelectedIndexes([currentFilesCount - 1]);
      }
    }
  }, [currentFiles]);

  const onRefreshClick = () => {
    setSelectedIndexes([]);
    if (selectedCamera && currentFolder) {
      dispatch(fileManagerActions.fetchFiles({
        cameraId: selectedCamera._id,
        parentId: currentFolder._id,
      }));
    }
  };

  const onBackButtonClick = () => {
    setSelectedIndexes([]);
    setStack((currentStack) => _.initial(currentStack));
  };

  const onBreadCrumbClick = (folder) => {
    setSelectedIndexes([]);
    setStack((currentStack) => {
      const index = _.findIndex(currentStack, (item) => item._id === folder._id);
      return _.slice(currentStack, 0, index + 1);
    });
  };

  //

  const onDeleteSelected = (allFiles) => {
    // delete selectedIndexes
    setSelectedIndexes((prew) => ([_.head(prew)]));
    const selectedItems = selectedIndexes.map((index) => allFiles[index]);
    Promise.all(selectedItems.map((item) => dispatch(fileManagerActions.deleteOneFile({
      cameraId: item.camera,
      file: item,
    }))));
  };

  const onMultiSelectClick = () => {
    if (multiSelect) {
      setSelectedIndexes((prew) => ([_.head(prew)]));
    }
    setMultiSelect(!multiSelect);
  };

  const onFileDoubleClick = (file, index) => {
    if (file.type === 'folder') {
      setSelectedIndexes([]);
      setStack((currentStack) => _.concat(currentStack, file));
    } else {
    // if file is image
      setSelectedIndexes([index]);
      setShow(true);
    }
  };

  const onFileClick = (index) => {
    if (multiSelect) {
      setSelectedIndexes((prew) => ([...prew, index]));
    } else {
      setSelectedIndexes([index]);
    }
  };

  const onCloseImageViewer = () => {
    setShow(false);
  };

  return {
    fetchStatus,
    currentFolder,
    currentFiles,
    navigationStack: stack,
    selectedIndexes,
    multiSelect,
    showImageViewer: show,

    onCloseImageViewer,

    onRefreshClick,
    onBackButtonClick,
    onBreadCrumbClick,

    onDeleteSelected,
    onMultiSelectClick,

    setMultiSelect,
    setSelectedIndexes,

    onFileClick,
    onFileDoubleClick,
  };
}
