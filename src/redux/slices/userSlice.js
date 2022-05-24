import { createSlice } from '@reduxjs/toolkit';
import userAsyncActions from '../asyncActions/userAsyncActions.js';

const { singup, login, tokenVerification, uploadAvatar, deleteAvatar, updateOne } = userAsyncActions;

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = userInfo && userInfo.userId && userInfo.token
  ? { tokenVerification: true, isLoggedIn: false, user: null }
  : { tokenVerification: false, isLoggedIn: false, user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo'); // TODO: remove from reducer

      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [singup.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [deleteAvatar.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [updateOne.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [tokenVerification.fulfilled]: (state, action) => {
      state.tokenVerification = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [tokenVerification.rejected]: (state) => {
      state.tokenVerification = false;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const userActions = { ...userSlice.actions, ...userAsyncActions };

export default userSlice.reducer;
