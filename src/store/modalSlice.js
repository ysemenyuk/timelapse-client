import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    type: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.show = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.show = false;
      state.type = null;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
