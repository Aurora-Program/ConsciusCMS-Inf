import { configureStore } from '@reduxjs/toolkit'
import schemaReducer from "./Schema/schemaSlice"
import userReducer from './users/userSlice'
import editorReducer from './Editor/editorSlice'
import imagesReducer from './images/imagesSlice'
import settingsReducer from './Settings/settingsSlice'
import pageReducer from './Pages/pageSlice'
import languageReducer from './store/languageSlice'


export const store = configureStore({

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['Page/SavePage/pending','Page/SavePage/fulfilled' ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.res.headers', 'payload.5.value.file','payload.res.config.transformRequest.0','payload.res.config.transformResponse.0'],
        // Ignore these paths in the state
        ignoredPaths: ['editor.selectedPage.values.5.value.file'],
      },
    }),

  reducer: {
    schema: schemaReducer,
    user: userReducer,
    editor: editorReducer,
    images: imagesReducer,
    settings: settingsReducer,
  language: languageReducer,
    pages: pageReducer



  },
}) as any



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

