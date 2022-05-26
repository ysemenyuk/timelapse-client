import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { fileManagerSelectors, fileManagerActions } from '../../redux/fileManager/fileManagerSlice.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();

  const fetchStatus = useThunkStatus(fileManagerActions.fetchFiles);

  const [show, setShow] = useState(false);
  const [stack, setStack] = useState([selectedCamera.mainFolder]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const filesByParent = useSelector(fileManagerSelectors.filesByParent);
  const currentFolder = useMemo(() => _.last(stack), [stack]);
  const currentFiles = useMemo(() => filesByParent[currentFolder._id], [currentFolder, filesByParent]);

  useEffect(() => {
    setStack([selectedCamera.mainFolder]);
  }, [selectedCamera._id]);

  useEffect(() => {
    if (selectedCamera && currentFolder && !currentFiles) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: currentFolder._id,
        }),
      );
    }
  }, [currentFolder]);

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

  const onDeleteSelected = (selectedItems) => {
    if (_.isEmpty(selectedIndexes) || !selectedItems) {
      return;
    }

    setSelectedIndexes((prew) => ([_.head(prew)]));
    Promise.all(selectedItems.map((item) => dispatch(
      fileManagerActions.deleteOneFile({
        cameraId: item.camera,
        file: item,
      }),
    )));
  };

  const onMultiSelectClick = () => {
    if (!_.isEmpty(selectedIndexes)) {
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

  const onSetAvatarClick = (file) => {
    if (_.isEmpty(selectedIndexes) || !file) {
      return;
    }
    dispatch(cameraActions.updateOne({ cameraId: selectedCamera._id, payload: { avatar: file._id } }));
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

    onSetAvatarClick,
    onDeleteSelected,
    onMultiSelectClick,

    setMultiSelect,
    setSelectedIndexes,

    onFileClick,
    onFileDoubleClick,
  };
}
