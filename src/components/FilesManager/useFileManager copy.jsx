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
import { useGetDateInfoQuery } from '../../api/dateInfo.api.js';

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
    if (searchParams.get('date_gte')) {
      return new Date(searchParams.get('date_gte'));
    }
    if (selectedCamera.firstVideo && selectedCamera.firstVideo.date) {
      return new Date(selectedCamera.firstVideo.date);
    }
    return new Date();
  };

  const initEndDate = () => {
    if (searchParams.get('date_lte')) {
      return new Date(searchParams.get('date_lte'));
    }
    if (selectedCamera.lastVideo && selectedCamera.lastVideo.date) {
      return new Date(selectedCamera.lastVideo.date);
    }
    return new Date();
  };

  const initOneDate = () => {
    if (searchParams.get('date')) {
      return new Date(searchParams.get('date'));
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

  //

  useEffect(() => {
    if (isPhotos) {
      searchParams.set('date', format(oneDate, 'yyyy-MM-dd'));
    }
    if (isVideos) {
      searchParams.set('date_gte', format(startDate, 'yyyy-MM-dd'));
      searchParams.set('date_lte', format(endDate, 'yyyy-MM-dd'));
    }
    // searchParams.set('fileType', fileType);
    setSearchParams(searchParams);
  }, [isPhotos, isVideos, startDate, endDate, oneDate]);

  //

  const queryString = useMemo(
    () => `?type=${fileType}&${searchParams.toString()}`,
    [fileType, searchParams.toString()],
  );

  const getFilesQuery = useGetFilesQuery(
    { cameraId: selectedCamera._id, query: queryString },
    { skip: !searchParams.toString() },
  );

  const { data: fetchedFiles, refetch } = getFilesQuery;

  const [currentFiles, setCurrentFiles] = useState([]);

  useEffect(() => {
    setCurrentFiles((files) => {
      const fetched = fetchedFiles ? fetchedFiles.files : [];
      return [...files, ...fetched];
    });
  }, [fetchedFiles]);

  //

  const queryDate = useMemo(
    () => searchParams.get('date'),
    [searchParams.get('date')],
  );

  const getDateInfoQuery = useGetDateInfoQuery(
    { cameraId: selectedCamera._id, date: queryDate },
    { skip: isVideos || !queryDate },
  );

  //

  useEffect(() => {
    // TODO if addedFile in queryString
    if (currentFiles) {
      refetch();
    }
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

    currentFiles,
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

    resetSelect,
  };
}
