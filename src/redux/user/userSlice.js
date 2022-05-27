import { createSlice } from '@reduxjs/toolkit';
import userAsyncActions from './userAsyncActions.js';

const { singup, login, tokenVerification, uploadAvatar, deleteAvatar, updateOne } = userAsyncActions;

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const verification = userInfo && userInfo.userId && userInfo.token;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    tokenVerification: verification,
    isLoggedIn: false,
    user: null,
    userId: null,
    token: null,
  },
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
      state.userId = action.payload.user._id;
      state.token = action.payload.token;
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
