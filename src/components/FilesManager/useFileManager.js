import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
// import format from 'date-fns/format';
import { useOutletContext, useSearchParams } from 'react-router-dom';
// import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
// import { fileManagerSelectors, fileManagerActions } from '../../redux/fileManager/fileManagerSlice.js';
// import { fileType } from '../../utils/constants.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManagerApi.js';
// import fileManagerService from '../../api/fileManager.service.js';

export default function useFileManager() {
  const dispatch = useDispatch();
  const { selectedCamera } = useOutletContext();
  const [searchParams] = useSearchParams();
  const cameraId = selectedCamera._id;

  const queryString = `?${searchParams.toString()}`;
  console.log(1111, queryString);

  const { data: currentFiles, isLoading, isSuccess, isError, refetch } = useGetFilesQuery({ cameraId, queryString });
  const fetchStatus = { isLoading, isSuccess, isError };

  const [deleteOneFile] = useDeleteFileMutation();

  const [isShowImageViewer, setIsShowImageViewer] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isSelectFiles, setIsSelectFiles] = useState(false);

  // const [fileType, setFileType] = useState(() => {
  //   if (tabName === 'videos') {
  //     return 'video,videoByTime';
  //   }
  //   return 'photo,photoByTime';
  // });
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [isRangeDate, setIsRangeDate] = useState(false);

  // const onChangeFileType = (ft) => {
  //   setFileType(ft);
  // };

  // const onChangeDateFormat = () => {
  //   setIsRangeDate(!isRangeDate);
  // };

  // const onChangeStartDate = (d) => {
  //   setSelectedIndexes([]);
  //   setStartDate(d);
  // };

  // const onChangeEndDate = (d) => {
  //   setSelectedIndexes([]);
  //   setEndDate(d);
  // };

  // useEffect(() => {
  //   searchParams.set('fileType', fileType);
  //   if (!isRangeDate) {
  //     searchParams.set('oneDate', format(startDate, 'yyyy-MM-dd'));
  //     searchParams.delete('startDate');
  //     searchParams.delete('endDate');
  //   } else {
  //     searchParams.set('startDate', format(startDate, 'yyyy-MM-dd'));
  //     searchParams.set('endDate', format(endDate, 'yyyy-MM-dd'));
  //     searchParams.delete('oneDate');
  //   }
  //   setSearchParams(searchParams);
  // }, [fileType, startDate, endDate, isRangeDate]);

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

  const onRefetchClick = () => {
    setSelectedIndexes([]);
    refetch();
  };

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

  return {
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
    isSelectFiles,
    onSelectButtonClick,

    // fileType,
    // onChangeFileType,
    // isRangeDate,
    // onChangeDateFormat,
    // startDate,
    // onChangeStartDate,
    // endDate,
    // onChangeEndDate,
  };
}
