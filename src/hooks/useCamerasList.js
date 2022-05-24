import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cameraActions, cameraSelectors } from '../redux/slices/cameraSlice.js';
import useThunkStatus from './useThunkStatus.js';

export default function useCameraList() {
  const dispatch = useDispatch();

  const allCameras = useSelector(cameraSelectors.allCameras);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const fetchStatus = useThunkStatus(cameraActions.fetchAll);

  useEffect(() => {
    if (allCameras.length < 2) {
      dispatch(cameraActions.fetchAll());
    }
  }, []);

  return { allCameras, selectedCamera, fetchStatus };
}
