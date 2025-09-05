import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguage: 'ES' | 'EN' | 'FR';
  isLoading: boolean;
}

const getInitialLanguage = (): 'ES' | 'EN' | 'FR' => {
  try {
    const stored = localStorage.getItem('aurora_lang');
    if (stored === 'ES' || stored === 'EN' || stored === 'FR') return stored as 'ES' | 'EN' | 'FR';
  } catch (e) {
    // ignore (e.g., SSR or restricted storage)
  }
  return 'ES';
};

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
  isLoading: false
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'ES' | 'EN' | 'FR'>) {
      state.currentLanguage = action.payload;
      try {
        localStorage.setItem('aurora_lang', action.payload);
      } catch (e) {
        // ignore storage errors
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const { setLanguage, setLoading } = languageSlice.actions;
export default languageSlice.reducer;
