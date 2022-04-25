import { createSlice } from '@reduxjs/toolkit';

import userThunks from '../thunks/userThunks.js';

const { singup, login, tokenVerification, uploadAvatar, deleteAvatar, updateOne } = userThunks;

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

export const userActions = { ...userSlice.actions, userThunks };

export default userSlice.reducer;
