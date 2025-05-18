import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    userSession: null,
  },
  reducers: {
    setSession(state, action) {
      state.userSession = action.payload;
    },
    clearSession(state) {
      state.userSession = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;