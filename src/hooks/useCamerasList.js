import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from './useThunkStatus.js';

export default function useCameraList() {
  const dispatch = useDispatch();

  const fetchStatus = useThunkStatus(cameraThunks.fetchAll);
  const cameras = useSelector((state) => state.camera.allCameras);

  useEffect(() => {
    if (cameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  return { cameras, fetchStatus };
}
