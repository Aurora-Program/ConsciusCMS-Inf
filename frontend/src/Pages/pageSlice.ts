
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {  iEditorState, iSchemaField} from "../types";

import {fetchPageByPage, fetchPages, addPage, savePage, deletePage  } from './pageService.ts'




const noError =  {status:false, titulo: "No error", descripcion: "No error"}

const initialState : iEditorState = {

        data:[],
        components:[],
        pages:[],
        selectedPage:{values:[],
        Page:"", 
        Template:""
        },
        Error: noError
      
}


export const loadPages = createAsyncThunk("Page/LoadPage", async (filter?: string | RegExp) => {
    return (fetchPages(filter))
})


export const addPageAction = createAsyncThunk("Page/AddPage",async (payload) =>{
    return (addPage({Page:payload.Page, Template:payload.Template, values:[]}))

})

export const selectPageAction = createAsyncThunk("WebPage/SelectPage", async (pageId: string) => {
    return (fetchPageByPage(pageId))
})

export const savePageAction = createAsyncThunk("Page/SavePage", async(payload)=>
{


    return(savePage(payload))
})

export const deletePageAction = createAsyncThunk("Page/DeletePage", async(payload)=>
    {
 
        return(deletePage(payload))
    })
    export const uploadImageAction = createAsyncThunk("Page/UploadImage", async(payload)=>
        {
          
            return(uploadImage(payload))
        })






const pageSlice =  createSlice(
    {
        name: "editor",
        initialState: initialState,
        reducers:{
           
            removeError: (state, action )=>{
                state.Error = noError
            }, 
            editComponent : (state, action) =>{
                    let temp : iSchemaField[] = state.selectedPage.components.filter((item: iSchemaField) => item.name == action.payload.name )
                    temp[0].value = action.payload.value
                    state.selectedPage.components = [...state.selectedPage.components.filter((item: iSchemaField)=> item.name != action.payload.name), ...temp]

                },
            addNewPage: (state, action) =>{
                state.pages.push(action.payload)
            },
            updateSelectedPage: (state, action) =>{

                state.selectedPage.values = action.payload
               
            },


            loadNewPage : (state, action) =>{
                state.selectedPage.name = action.payload.name
                action.payload.componets.map((item: iSchemaField  ) => state.selectedPage.components.push({name:item.name, value:""}))

                action.payload.listComponets.map((item : iListComponent ) => 
                {
                    state.selectedPage.name = item.name
                    state.selectedPage.components.push({name:item.name, value:""})
                    
                })

                }

            },
        extraReducers: (builder) => {
            builder.addCase(loadPages.fulfilled,(state,action)=>{
                state.pages = action.payload
            }),
            builder.addCase(loadPages.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}
            
            }),


            builder.addCase(addPageAction.fulfilled,(state,action)=>{
                state.pages.push(action.payload)
            }),
            builder.addCase(addPageAction.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}
            }),

            builder.addCase(selectPageAction.fulfilled,(state,action)=>{

                
                state.selectedPage = action.payload.selectedPage
                state.data = state.data.concat( action.payload.data)
                
            
            }),
            builder.addCase(selectPageAction.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}

            }),

            builder.addCase(savePageAction.fulfilled,(state,action)=>{
                state.selectedPage = action.payload.res.data

            }),
            builder.addCase(savePageAction.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}

            }),

            builder.addCase(deletePageAction.fulfilled,(state,action)=>{
                state.pages = state.pages.filter(i => i.Page != action.payload.Page)
                state.selectedPage = {values:[], Page:"", Template:""}
                
            
            }),
            builder.addCase(deletePageAction.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}

            }),

            builder.addCase(uploadImageAction.fulfilled,(state,action)=>{    
            }),

            builder.addCase(uploadImageAction.rejected,(state,action)=>{    
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}
            })

        }

        })

    

export default pageSlice.reducer

export const {editComponent, loadNewPage, addNewPage, updateSelectedPage, removeError} =  pageSlice.actions