import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useOutletContext, useSearchParams } from 'react-router-dom';
// import useThunkStatus from '../../hooks/useThunkStatus.js';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
// import { fileManagerSelectors, fileManagerActions } from '../../redux/fileManager/fileManagerSlice.js';
// import { fileType } from '../../utils/constants.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManagerApi.js';
// import fileManagerService from '../../api/fileManager.service.js';

export default function useFileManager() {
  const dispatch = useDispatch();
  const selectedCamera = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const cameraId = selectedCamera._id;

  // const fileType = searchParams.get('fileType');
  const startDate = searchParams.get('startDate') || '2022-06-01';
  const endDate = searchParams.get('endDate') || '2022-06-30';

  const queryString = `?${searchParams.toString()}`;

  console.log(1111, queryString);

  const { data: currentFiles, isLoading, isSuccess, isError, refetch } = useGetFilesQuery({ cameraId, queryString });
  const fetchStatus = { isLoading, isSuccess, isError };

  const [deleteOneFile] = useDeleteFileMutation();

  const [show, setShow] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  // const [fileType, setFileType] = useState(searchParams.get('fileType'));
  const [date, setDate] = useState({ startDate, endDate });

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

  useEffect(() => {
    // searchParams.set('fileType', fileType);
    searchParams.set('startDate', date.startDate);
    searchParams.set('endDate', date.endDate);

    setSearchParams(searchParams);
  }, [date]);

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

  const onMultiSelectClick = () => {
    if (!_.isEmpty(selectedIndexes)) {
      setSelectedIndexes((prew) => ([_.head(prew)]));
    }
    setMultiSelect(!multiSelect);
  };

  const onFileDoubleClick = (file, index) => {
    // if file is image
    setSelectedIndexes([index]);
    setShow(true);
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
    selectedIndexes,
    multiSelect,
    showImageViewer: show,

    onCloseImageViewer,

    onRefetchClick,

    onSetAvatarClick,
    onDeleteSelected,
    onMultiSelectClick,

    setMultiSelect,
    setSelectedIndexes,

    onFileClick,
    onFileDoubleClick,

    date,
    setDate,
    // fileType,
    // setFileType,
    // filesCount,
    // onSearch,
  };
}
