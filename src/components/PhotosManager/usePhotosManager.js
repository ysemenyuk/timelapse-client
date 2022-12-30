import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import format from 'date-fns/format';
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

  const queryString = `?${searchParams.toString()}`;
  console.log(1111, queryString);

  const { data: currentFiles, isLoading, isSuccess, isError, refetch } = useGetFilesQuery({ cameraId, queryString });
  const fetchStatus = { isLoading, isSuccess, isError };

  const [deleteOneFile] = useDeleteFileMutation();

  const [show, setShow] = useState(false);
  const [select, setSelect] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  // const [fileType, setFileType] = useState(searchParams.get('fileType'));
  const [date, setDate] = useState(new Date());

  const onChangeDate = (d) => {
    setSelectedIndexes([]);
    setDate(d);
  };

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
    searchParams.set('fileType', 'photo,phtoByTime');
    searchParams.set('oneDate', format(date, 'yyyy-MM-dd'));

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

  const onSelectClick = () => {
    if (!_.isEmpty(selectedIndexes)) {
      setSelectedIndexes((prew) => ([_.head(prew)]));
    }
    setSelect(!select);
  };

  const onFileDoubleClick = (file, index) => {
    setSelectedIndexes([index]);
    setShow(true);
  };

  const onFileClick = (index) => {
    if (select) {
      if (!_.includes(selectedIndexes, index)) {
        setSelectedIndexes((prew) => ([...prew, index]));
      } else {
        console.log(selectedIndexes, index, _.filter(selectedIndexes, (i) => i !== index));
        setSelectedIndexes((prew) => _.filter(prew, (i) => i !== index));
      }
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
    select,
    showImageViewer: show,

    onCloseImageViewer,

    onRefetchClick,

    onSetAvatarClick,
    onDeleteSelected,
    onSelectClick,

    setSelect,
    setSelectedIndexes,

    onFileClick,
    onFileDoubleClick,

    date,
    onChangeDate,
  };
}
