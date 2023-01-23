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
// import dateInfoService from '../../api/dateInfo.service.js';
import { useGetDateInfoQuery } from '../../api/dateInfo.api.js';
// import { useGetDateInfoQuery } from '../../api/dateInfo.api.js';

export default function useFileManager() {
  const dispatch = useDispatch();
  const { selectedCamera, tabName } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const addedFile = useSelector(fileManagerSelectors.addedFile);
  const [deleteOneFile] = useDeleteFileMutation();

  const isPhotos = tabName === 'photos';
  const isVideos = tabName === 'videos';
  const fileType = isPhotos ? 'photo' : 'video';

  // const initFileType = () => {}
  // const initIsRangeDate = () => {}

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
    setSearchParams(searchParams);
    setIsReady(true);
  }, [isPhotos, isVideos, startDate, endDate, oneDate]);

  //

  const queryString = useMemo(
    () => `?type=${fileType}&${searchParams.toString()}`,
    [fileType, searchParams.toString()],
  );

  const getFilesQuery = useGetFilesQuery(
    { cameraId: selectedCamera._id, query: queryString },
    { skip: !isReady },
  );

  const { data: currentFiles, refetch } = getFilesQuery;
  // console.log(1111, currentFiles);

  //

  const getDateInfoQuery = useGetDateInfoQuery(
    { cameraId: selectedCamera._id, date: format(oneDate, 'yyyy-MM-dd') },
    { skip: isVideos },
  );

  // const { data: dateInfo } = getDateInfoQuery;
  // console.log(2222, dateInfo);

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

  // useEffect(() => {
  //   dateInfoService.getOne({ cameraId: selectedCamera._id, date: '2023-01-21' });
  // }, []);

  //

  const resetSelect = () => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
  };

  // const onChangeFileType = () => {
  //   resetSelect();
  //   setFileType(e.currentTarget.value);
  // };

  // const onChangeDateFormat = () => {
  //   resetSelect();
  //   setIsRangeDate(!isRangeDate);
  // };

  const onChangeStartDate = (date) => {
    resetSelect();
    setStartDate(date);
  };

  const onChangeEndDate = (date) => {
    resetSelect();
    setEndDate(date);
  };

  const onChangeOneDate = (date) => {
    resetSelect();
    setOneDate(date);
  };

  const onRefetchClick = () => {
    resetSelect();
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

    getFilesQuery,
    getDateInfoQuery,
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
