import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useLocation, useSearchParams } from 'react-router-dom';
// import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
// import { fileManagerSelectors, fileManagerActions } from '../../redux/fileManager/fileManagerSlice.js';
import { fileType } from '../../utils/constants.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManagerApi.js';
import fileManagerService from '../../api/fileManager.service.js';

export default function useFileManager(selectedCamera) {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const cameraId = selectedCamera._id;

  const [searchParams, setSearchParams] = useSearchParams();
  const parentId = searchParams.get('parentId');
  const startDate = searchParams.get('startDate') || '2022-06-01';
  const endDate = searchParams.get('endDate') || '2022-06-30';
  const fileType = searchParams.get('type');

  const queryString = `?${searchParams.toString()}`;

  console.log(1111, queryString);

  const { data: currentFiles, isLoading, isSuccess, isError, refetch } = useGetFilesQuery({ cameraId, queryString });
  const fetchStatus = { isLoading, isSuccess, isError };

  const [deleteOneFile] = useDeleteFileMutation();

  const [show, setShow] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [stack, setStack] = useState([]);
  const [date, setDate] = useState({ startDate, endDate });

  useEffect(() => {
    if (state && state.stack) {
      setStack(state.stack);
    } else {
      // fetch parent folder and make stack
    }
  }, [parentId]);

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

  const [filesCount, setFilesCount] = useState(0);

  useEffect(() => {
    const query = `?type=photoByTime&startDate=${date.startDate}&endDate=${date.endDate}`;
    fileManagerService.getCount(cameraId, query)
      .then((resp) => {
        setFilesCount(resp.data.count);
      });
  }, [parentId, date]);

  const onSearch = () => {
    // setSelectedIndexes([]);
    const { startDate, endDate } = date;
    searchParams.set('startDate', startDate);
    searchParams.set('endDate', endDate);

    setSearchParams(searchParams);
    // refetch();
  };

  const onRefreshClick = () => {
    setSelectedIndexes([]);
    refetch();
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

    Promise.all(selectedItems.map((item) => deleteOneFile({
      cameraId: item.camera,
      fileId: item._id,
    })));
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

    date,
    setDate,
    filesCount,
    onSearch,
  };
}
