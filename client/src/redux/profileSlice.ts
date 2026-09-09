import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProfileTheme = "dark" | "light";

interface ProfileState {
  theme: ProfileTheme;
}

const initialState: ProfileState = {
  theme: "light",
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
