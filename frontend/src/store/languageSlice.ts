import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguage: 'ES' | 'EN';
  isLoading: boolean;
}

const initialState: LanguageState = {
  currentLanguage: (localStorage.getItem('language') as 'ES' | 'EN') || 'ES',
  isLoading: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'ES' | 'EN'>) => {
      state.currentLanguage = action.payload;
      localStorage.setItem('language', action.payload);
    },
    setLanguageLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLanguage, setLanguageLoading } = languageSlice.actions;
export default languageSlice.reducer;
