import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import {addImage, fetchImage, deleteImage} from './imagesService.jsx'

export const fetchImages = createAsyncThunk("Image/getImage",  fetchImage )
export const addingImage = createAsyncThunk("Image/addImage", addImage)  
export const deletingImage = createAsyncThunk("Image/deleteImage", deleteImage)
 

const initialState = {
    
    Images: [],
    Files: []


  }

const ImagesSlice = createSlice({
  name: 'images',
  initialState: initialState,
  reducers: {
    removeImage: (state, action) => {
        state.Images.remove(action.payload);
    }
},
extraReducers: (builder) => {

  builder.addCase(fetchImages.pending, (state) => {
      state.loadInProgress = true;

  }),
  builder.addCase(fetchImages.fulfilled, (state,action) => {
      
      state.loadInProgress = false;
      state.Images=action.payload.data;
      state.Files = action.payload.files
      
     
  }),
  builder.addCase(fetchImages.rejected, (state) => {

      state.loadInProgress = false;
      state.loadError= true;

  }),
  builder.addCase(addingImage.pending, (state) => {
    state.loadInProgress = true;

}),
builder.addCase(addingImage.fulfilled, (state,action) => {
    
    state.loadInProgress = false;
    state.Images.push(action.payload.image);
    state.Files.push(action.payload.file)
    
   
}),
builder.addCase(addingImage.rejected, (state) => {

    state.loadInProgress = false;
    state.loadError= true;

}),
builder.addCase(deletingImage.pending, (state) => {
    state.loadInProgress = true;

}),
builder.addCase(deletingImage.fulfilled, (state,action) => {
    
    state.loadInProgress = false;
    const pos = state.Images.map(e => e.name).indexOf(action.payload,1);
    state.Images.splice(pos)
    
   
}),
builder.addCase(deletingImage.rejected, (state) => {

    state.loadInProgress = false;
    state.loadError= true;

})



 
}
})


export const { removeImage } = ImagesSlice.actions

export default ImagesSlice.reducer