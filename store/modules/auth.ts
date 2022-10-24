import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  token: any;
}
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state: State, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logout: (state: State) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
