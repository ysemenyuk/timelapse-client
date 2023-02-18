import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import _ from 'lodash';
// import format from 'date-fns/format';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { fileSelectors } from '../../redux/file/fileSlice.js';
import { useGetFilesQuery, useDeleteFileMutation } from '../../api/fileManager.api.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import { useGetDateInfoQuery } from '../../api/dateInfo.api.js';

export default function useFileManager(props) {
  const dispatch = useDispatch();
  const { selectedCamera } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [deleteOneFile] = useDeleteFileMutation();
  const addedFile = useSelector(fileSelectors.addedFile);

  const searchString = searchParams.toString();

  const [isShowViewer, setIsShowViewer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(props.limit);

  const [currentData, setCurrentData] = useState({
    items: { 1: [] },
    currentPage: 1,
    totalPages: 1,
    totalFiles: 0,
  });

  //

  const queryFiles = useMemo(
    () => `?${searchString}&page=${page}&limit=${limit}`,
    [page, limit, searchString],
  );

  const getFilesQuery = useGetFilesQuery(
    { cameraId: selectedCamera._id, query: queryFiles },
    { skip: !searchString },
  );

  const { data: fetchedData, refetch } = getFilesQuery;

  useEffect(() => {
    setCurrentData((current) => {
      if (fetchedData && searchString) {
        const isEqualSearch = current.searchString === searchString;
        return {
          items: {
            ...(isEqualSearch && current.items),
            [fetchedData.page]: fetchedData.items,
          },
          currentPage: fetchedData.page,
          totalPages: fetchedData.pages,
          totalFiles: fetchedData.total,
          searchString,
        };
      }
      return current;
    });
  }, [fetchedData]);

  useEffect(() => {
    setPage(1);
  }, [searchString]);

  //

  useEffect(() => {
    // TODO: refetch if addedFile in query
    if (searchString) {
      refetch();
    }
  }, [addedFile]);

  //

  const queryDate = useMemo(
    () => searchParams.get('date'),
    [searchParams.get('date')],
  );

  const getDateInfoQuery = useGetDateInfoQuery(
    { cameraId: selectedCamera._id, date: queryDate },
    { skip: !queryDate },
  );

  //

  const onDeleteSelected = (item) => {
    deleteOneFile({
      cameraId: item.camera,
      fileId: item._id,
    });
  };

  const onFileClick = (index) => {
    setSelectedIndex(index);
    setIsShowViewer(true);
  };

  const onCloseViewer = () => {
    setSelectedIndex(null);
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

    currentData,
    getFilesQuery,
    getDateInfoQuery,
    selectedIndex,
    isShowViewer,
    setSelectedIndex,
    onCloseViewer,
    onSetAvatar,
    onDeleteSelected,
    onFileClick,
    setPage,
  };
}
