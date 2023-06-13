import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const util = createSlice({
  name: "util",
  initialState: {
    loading: false,
    loadingSync: false,
    internetState: false,
    messageLoading: "",
  },

  reducers: {
    Loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    LoadingSync(state, action: PayloadAction<boolean>) {
      state.loadingSync = action.payload;
    },
    messageLoading(state, action: PayloadAction<string>) {
      state.messageLoading = action.payload;
    },
    internetState(state, action: PayloadAction<boolean>) {
      state.internetState = action.payload;
    },
  },
});

export const { Loading, LoadingSync, messageLoading, internetState } =
  util.actions;

export default util.reducer;
