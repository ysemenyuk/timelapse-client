import { useSelector } from 'react-redux';

export default function useThunkStatus(thunk) {
  const thunkStatus = useSelector((state) => state.thunk[thunk.typePrefix]) || 'uninitialized';

  const isLoading = thunkStatus === 'pending';
  const isSuccess = thunkStatus === 'fulfilled';
  const isError = thunkStatus === 'rejected';

  return { thunkStatus, isLoading, isSuccess, isError };
}
