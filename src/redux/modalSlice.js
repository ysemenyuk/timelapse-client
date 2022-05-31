import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    type: null,
    data: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, data } = action.payload;
      state.show = true;
      state.type = type;
      state.data = data;
    },
    closeModal: (state) => {
      state.show = false;
      state.type = null;
      state.data = null;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
