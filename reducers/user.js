import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, dateCreation:null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.dateCreation = action.payload.dateCreation;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.dateCreation = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
