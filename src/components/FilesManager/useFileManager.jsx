import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import format from 'date-fns/format';
import { useOutletContext, useSearchParams } from 'react-router-dom';
// import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
// import { fileManagerSelectors, fileManagerActions } from '../../redux/fileManager/fileManagerSlice.js';
// import { fileType } from '../../utils/constants.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManagerApi.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
// import fileManagerService from '../../api/fileManager.service.js';

export default function useFileManager() {
  const dispatch = useDispatch();
  const { selectedCamera, tabName } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteOneFile] = useDeleteFileMutation();

  const isPhotos = tabName === 'photos';
  const isVideos = tabName === 'videos';

  const [fileType, setFileType] = useState(() => {
    if (searchParams.get('type')) {
      return searchParams.get('type');
    }
    if (isVideos) {
      return 'video';
    }
    return 'photo';
  });

  const [startDate, setStartDate] = useState(() => {
    if (searchParams.get('startDate')) {
      return new Date(searchParams.get('startDate'));
    }
    if (isVideos && selectedCamera.firstVideo) {
      return new Date(selectedCamera.firstVideo.date);
    }
    if (isPhotos && selectedCamera.lastPhoto) {
      return new Date(selectedCamera.lastPhoto.date);
    }
    return new Date();
  });

  const [endDate, setEndDate] = useState(() => {
    if (searchParams.get('endDate')) {
      return new Date(searchParams.get('endDate'));
    }
    if (searchParams.get('oneDate')) {
      return new Date(searchParams.get('oneDate'));
    }
    if (isVideos && selectedCamera.lastVideo) {
      return new Date(selectedCamera.lastVideo.date);
    }
    if (isPhotos && selectedCamera.lastPhoto) {
      return new Date(selectedCamera.lastPhoto.date);
    }
    return new Date();
  });

  const [isRangeDate, setIsRangeDate] = useState(() => {
    if (isVideos) {
      return true;
    }
    return false;
  });

  const [isShowImageViewer, setIsShowImageViewer] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isSelectFiles, setIsSelectFiles] = useState(false);

  //

  const queryString = useMemo(() => {
    if (isRangeDate) {
      const start = format(startDate, 'yyyy-MM-dd');
      const end = format(endDate, 'yyyy-MM-dd');
      const query = `?type=${fileType}&startDate=${start}&endDate=${end}`;
      return query;
    }
    const oneDate = format(endDate, 'yyyy-MM-dd');
    const query = `?type=${fileType}&oneDate=${oneDate}`;
    return query;
  }, [fileType, startDate, endDate, isRangeDate]);

  // eslint-disable-next-line max-len
  const { data: currentFiles, isLoading, isSuccess, isError, refetch } = useGetFilesQuery({ cameraId: selectedCamera._id, queryString });
  const fetchStatus = { isLoading, isSuccess, isError };

  //

  useEffect(() => {
    searchParams.set('type', fileType);
    if (!isRangeDate) {
      searchParams.set('oneDate', format(endDate, 'yyyy-MM-dd'));
      searchParams.delete('startDate');
      searchParams.delete('endDate');
    } else {
      searchParams.set('startDate', format(startDate, 'yyyy-MM-dd'));
      searchParams.set('endDate', format(endDate, 'yyyy-MM-dd'));
      searchParams.delete('oneDate');
    }
    setSearchParams(searchParams);
  }, [fileType, startDate, endDate, isRangeDate]);

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

  const onChangeFileType = (e) => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    setFileType(e.currentTarget.value);
  };

  const onChangeDateFormat = () => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    setIsRangeDate(!isRangeDate);
  };

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

  const onRefetchClick = () => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
    refetch();
  };

  const onDeleteSelected = (selectedItems) => {
    if (_.isEmpty(selectedIndexes) || !selectedItems) {
      return;
    }

    // setSelectedIndexes((prew) => ([_.head(prew)]));

    Promise.all(selectedItems.map((item) => deleteOneFile({
      cameraId: item.camera,
      fileId: item._id,
    })));
  };

  const onSelectButtonClick = () => {
    if (!_.isEmpty(selectedIndexes)) {
      setSelectedIndexes([]);
    }
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
      setIsShowImageViewer(true);
    }
  };

  const onCloseImageViewer = () => {
    setSelectedIndexes([]);
    setIsShowImageViewer(false);
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

  const onCreatePhotoFile = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_PHOTO_BY_HAND }));
  };

  const onCreateVideoFile = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_VIDEO_BY_HAND }));
  };

  return {
    onCreatePhotoFile,
    onCreateVideoFile,

    fetchStatus,
    currentFiles,
    selectedIndexes,
    isShowImageViewer,
    onCloseImageViewer,
    onRefetchClick,
    setSelectedIndexes,
    onSetAvatarClick,
    onDeleteSelected,
    onFileClick,
    onSelectButtonClick,

    isSelectFiles,
    isPhotos,
    isVideos,
    isRangeDate,
    startDate,
    endDate,

    onChangeFileType,
    onChangeDateFormat,
    onChangeStartDate,
    onChangeEndDate,
  };
}
