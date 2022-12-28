import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useLocation, useSearchParams } from 'react-router-dom';
import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { fileManagerSelectors, fileManagerActions } from '../../redux/fileManager/fileManagerSlice.js';
import { fileType } from '../../utils/constants.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const cameraId = selectedCamera._id;

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(1111, searchParams.toString());
  // &startDate=2022-06-01&endDate=2022-06-02

  const parentId = searchParams.get('parentId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const fetchStatus = useThunkStatus(fileManagerActions.fetchFiles);
  const currentFiles = useSelector(fileManagerSelectors.currentFiles);

  const [show, setShow] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    if (state && state.stack) {
      setStack(state.stack);
    } else {
      // fetch parent folder and make stack
    }
  }, [parentId]);

  useEffect(() => {
    const query = _.pickBy({ parentId, startDate, endDate }, _.identity);
    dispatch(fileManagerActions.fetchFiles({ cameraId, query }));
  }, [parentId, startDate, endDate]);

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
    const query = _.pickBy({ parentId, startDate, endDate }, _.identity);
    dispatch(fileManagerActions.fetchFiles({ cameraId, query }));
  };

  const onBackButtonClick = () => {
    setSelectedIndexes([]);
    const newStask = _.initial(stack);
    const lastId = _.last(newStask)._id;
    setSearchParams({ parentId: lastId }, { state: { stack: newStask } });
  };

  const onBreadCrumbClick = (folder) => {
    setSelectedIndexes([]);
    const index = _.findIndex(stack, (item) => item._id === folder._id);
    const newStask = _.slice(stack, 0, index + 1);
    const lastId = _.last(newStask)._id;
    setSearchParams({ parentId: lastId }, { state: { stack: newStask } });
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
    if (file.type === fileType.FOLDER) {
      setSelectedIndexes([]);
      setSearchParams({ parentId: file._id }, { state: { stack: [...stack, file] } });
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
    dispatch(cameraActions.updateOne({
      cameraId: selectedCamera._id,
      payload: { ...selectedCamera, avatar: file._id },
    }));
  };

  return {
    fetchStatus,
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
