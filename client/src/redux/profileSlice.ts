import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProfileTheme = "dark" | "light" | "unspecified";

interface ProfileState {
  theme: ProfileTheme;
}

const initialState: ProfileState = {
  theme: "unspecified",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleTheme(oldState, action: PayloadAction<ProfileTheme>) {
      return { ...oldState, theme: action.payload };
    },
  },
});

export const { toggleTheme } = profileSlice.actions;
export const { reducer: profileReducer } = profileSlice;
