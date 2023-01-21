import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import format from 'date-fns/format';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { fileManagerSelectors } from '../../redux/fileManager/fileManagerSlice.js';
// import { fileType } from '../../utils/constants.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManager.api.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import dateInfoService from '../../api/dateInfo.service.js';
// import { useGetDateInfoQuery } from '../../api/dateInfo.api.js';

export default function useFileManager() {
  const dispatch = useDispatch();
  const { selectedCamera, tabName } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const addedFile = useSelector(fileManagerSelectors.addedFile);
  const [deleteOneFile] = useDeleteFileMutation();

  const isPhotos = tabName === 'photos';
  const isVideos = tabName === 'videos';

  console.log(1111, searchParams.toString());

  // const initFileType = () => {
  // };

  // const initIsRangeDate = () => {
  // };

  const initStartDate = () => {
    if (searchParams.get('startDate')) {
      return new Date(searchParams.get('startDate'));
    }
    if (selectedCamera.firstVideo && selectedCamera.firstVideo.date) {
      return new Date(selectedCamera.firstVideo.date);
    }
    return new Date();
  };

  const initEndDate = () => {
    if (searchParams.get('endDate')) {
      return new Date(searchParams.get('endDate'));
    }
    if (selectedCamera.lastVideo && selectedCamera.lastVideo.date) {
      return new Date(selectedCamera.lastVideo.date);
    }
    return new Date();
  };

  const initOneDate = () => {
    if (searchParams.get('oneDate')) {
      return new Date(searchParams.get('oneDate'));
    }
    if (selectedCamera.lastPhoto && selectedCamera.lastPhoto.date) {
      return new Date(selectedCamera.lastPhoto.date);
    }
    return new Date();
  };

  const [isShowViewer, setIsShowViewer] = useState(false);
  const [isSelectFiles, setIsSelectFiles] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  // const [fileType, setFileType] = useState(initFileType);
  // const [isRangeDate, setIsRangeDate] = useState(initIsRangeDate);
  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);
  const [oneDate, setOneDate] = useState(initOneDate);

  const [isReady, setIsReady] = useState(false);
  console.log(2222, isReady);

  //

  useEffect(() => {
    if (isPhotos) {
      searchParams.set('oneDate', format(oneDate, 'yyyy-MM-dd'));
    }
    if (isVideos) {
      searchParams.set('startDate', format(startDate, 'yyyy-MM-dd'));
      searchParams.set('endDate', format(endDate, 'yyyy-MM-dd'));
    }
    // searchParams.set('fileType', fileType);
    // searchParams.set('isRangeDate', isRangeDate);
    setSearchParams(searchParams);
    setIsReady(true);
  }, [isPhotos, isVideos, startDate, endDate, oneDate]);

  //

  const queryString = useMemo(() => {
    if (isPhotos) {
      // const date = format(oneDate, 'yyyy-MM-dd');
      // return `?type=photo&oneDate=${date}`;
      return `?type=photo&${searchParams.toString()}`;
    }
    if (isVideos) {
      // const start = format(startDate, 'yyyy-MM-dd');
      // const end = format(endDate, 'yyyy-MM-dd');
      // return `?type=video&startDate=${start}&endDate=${end}`;
      return `?type=video&${searchParams.toString()}`;
    }
    return '';
  }, [isPhotos, isVideos, startDate, endDate, oneDate]);

  // eslint-disable-next-line max-len
  const { data: currentFiles, isLoading, isFetching, isSuccess, isError, isUninitialized, refetch } = useGetFilesQuery({ cameraId: selectedCamera._id, queryString }, { skip: !isReady });
  const fetchStatus = { isLoading, isSuccess, isError };

  console.log(3333, isFetching, isUninitialized, currentFiles);

  //

  useEffect(() => {
    // TODO if addedFile in queryString
    refetch();
  }, [addedFile]);

  //

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

  //

  useEffect(() => {
    dateInfoService.getOne({ cameraId: selectedCamera._id, date: '2023-01-21' });
  }, []);

  //

  // const onChangeFileType = () => {
  //   setSelectedIndexes([]);
  //   setIsSelectFiles(false);
  //   // setFileType(e.currentTarget.value);
  // };

  // const onChangeDateFormat = () => {
  //   setSelectedIndexes([]);
  //   setIsSelectFiles(false);
  //   // setIsRangeDate(!isRangeDate);
  // };

  const onChangeStartDate = (date) => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    setStartDate(date);
  };

  const onChangeEndDate = (date) => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    setEndDate(date);
  };

  const onChangeOneDate = (date) => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    setOneDate(date);
  };

  const onRefetchClick = () => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    refetch();
  };

  //

  const onDeleteSelected = (selectedItems) => {
    if (_.isEmpty(selectedItems)) {
      return;
    }

    Promise.all(selectedItems.map((item) => deleteOneFile({
      cameraId: item.camera,
      fileId: item._id,
    })));
  };

  const onSelectButtonClick = () => {
    setSelectedIndexes([]);
    setIsSelectFiles(!isSelectFiles);
  };

  const onFileClick = (index) => {
    if (isSelectFiles) {
      if (!_.includes(selectedIndexes, index)) {
        setSelectedIndexes((prew) => ([...prew, index]));
      } else {
        setSelectedIndexes((prew) => _.filter(prew, (i) => i !== index));
      }
    } else {
      setSelectedIndexes([index]);
      setIsShowViewer(true);
    }
  };

  const onCloseViewer = () => {
    setSelectedIndexes([]);
    setIsShowViewer(false);
  };

  const onSetAvatar = (file) => {
    if (!file) {
      return;
    }
    dispatch(cameraActions.updateOne({
      cameraId: selectedCamera._id,
      payload: { ...selectedCamera, avatar: file._id },
    }));
  };

  const onCreatePhotoFile = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_PHOTO }));
  };

  const onCreateVideoFile = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_VIDEO }));
  };

  //

  return {
    onCreatePhotoFile,
    onCreateVideoFile,

    fetchStatus,
    currentFiles,
    selectedIndexes,
    isShowViewer,

    onCloseViewer,
    onRefetchClick,
    setSelectedIndexes,
    onSetAvatar,
    onDeleteSelected,
    onFileClick,
    onSelectButtonClick,

    isSelectFiles,
    isPhotos,
    isVideos,

    startDate,
    endDate,
    oneDate,

    // onChangeFileType,
    // onChangeDateFormat,
    onChangeStartDate,
    onChangeEndDate,
    onChangeOneDate,
  };
}
