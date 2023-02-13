import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
// import format from 'date-fns/format';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { fileManagerSelectors } from '../../redux/fileManager/fileManagerSlice.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManager.api.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import { useGetDateInfoQuery } from '../../api/dateInfo.api.js';

export default function useFileManager() {
  const dispatch = useDispatch();
  const { selectedCamera, tabName } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [deleteOneFile] = useDeleteFileMutation();
  const addedFile = useSelector(fileManagerSelectors.addedFile);

  const isPhotos = tabName === 'photos';
  const isVideos = tabName === 'videos';

  const fileType = useMemo(
    () => {
      if (isPhotos) return 'photo';
      if (isVideos) return 'video';
      return '';
    },
    [isPhotos, isVideos],
  );

  const [isShowViewer, setIsShowViewer] = useState(false);
  const [isSelectFiles, setIsSelectFiles] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const [limit, setLimit] = useState(6);
  // const [skip, setSkip] = useState(0);

  //

  const queryString = useMemo(
    () => `?type=${fileType}&limit=${limit}&${searchParams.toString()}`,
    [fileType, limit, searchParams.toString()],
  );

  const getFilesQuery = useGetFilesQuery(
    { cameraId: selectedCamera._id, query: queryString },
    { skip: !searchParams.toString() },
  );

  const { data: fetchedFiles, refetch } = getFilesQuery;

  const [currentFiles, setCurrentFiles] = useState([]);

  const currentFilesCount = currentFiles.length;
  const totalFilesCount = fetchedFiles ? fetchedFiles.total : 0;

  useEffect(() => {
    setCurrentFiles(() => {
      const fetched = fetchedFiles ? fetchedFiles.files : [];
      return fetched;
    });
  }, [fetchedFiles]);

  useEffect(() => {
    // TODO if addedFile in queryString
    if (searchParams.toString()) {
      refetch();
    }
  }, [addedFile]);

  const queryDate = useMemo(
    () => searchParams.get('date'),
    [searchParams.get('date')],
  );

  const getDateInfoQuery = useGetDateInfoQuery(
    { cameraId: selectedCamera._id, date: queryDate },
    { skip: isVideos || !queryDate },
  );

  // const { data: dateInfo } = getDateInfoQuery;

  useEffect(() => {
    if (currentFiles) {
      const currentFilesNumber = currentFiles.length;
      if (currentFilesCount === 0) {
        setSelectedIndexes([]);
        return;
      }
      if (_.head(selectedIndexes) > currentFilesNumber - 1) {
        setSelectedIndexes([currentFilesNumber - 1]);
      }
    }
  }, [currentFiles]);

  const resetSelect = () => {
    setSelectedIndexes([]);
    setIsSelectFiles(false);
  };

  const onRefetchClick = () => {
    resetSelect();
    refetch();
  };

  const onLoadMoreClick = () => {
    setLimit((current) => current + 6);
  };

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
    currentFilesCount,
    totalFilesCount,
    getFilesQuery,
    getDateInfoQuery,
    selectedIndexes,
    isShowViewer,
    isSelectFiles,

    onCloseViewer,
    onRefetchClick,
    setSelectedIndexes,
    onSetAvatar,
    onDeleteSelected,
    onFileClick,
    onSelectButtonClick,
    onLoadMoreClick,
  };
}
