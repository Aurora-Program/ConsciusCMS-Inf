
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {  iEditorState, iSchemaField, iListComponent, iPageValue} from "../types";

import {fetchPageByPage, fetchPages, addPage, savePage, deletePage, updatePage  } from './editorService.ts'




const noError =  {status:false, titulo: "No error", descripcion: "No error"}

const initialState : iEditorState = {

        pages:[],
        selectedPage:{values:[],
        Page:"", 
        Template:""
        },
        loading: false,
        Error: noError
      
}


export const loadPages = createAsyncThunk("Page/LoadPage",async () =>{
    return (fetchPages())
})


export const addPageAction = createAsyncThunk("Page/AddPage",async (payload: {Page: string, Template: string}) =>{
    return (addPage({Page:payload.Page, Template:payload.Template, values:[]}))
})

export const selectPageAction = createAsyncThunk("Page/SelectPage",async (payload: string) =>{
    return (fetchPageByPage(payload))
})

export const savePageAction = createAsyncThunk("Page/SavePage", async(payload: any)=>
{
    return(savePage(payload))
})

export const updatePageAction = createAsyncThunk("Page/updatePage", async(payload: any)=>
{
    return(updatePage(payload))
})

export const deletePageAction = createAsyncThunk("Page/DeletePage", async(payload: {Page: string})=>
{
    return(deletePage(payload))
})
// export const uploadImageAction = createAsyncThunk("Page/UploadImage", async(payload: any)=>
// {
//     return(uploadImage(payload))
// })






const editorSlice =  createSlice(
    {
        name: "editor",
        initialState: initialState,
        reducers:{
           
            removeError: (state, _action )=>{
                state.Error = noError
            },

            editComponent : (state, action) =>{
                    let temp : iPageValue[] = state.selectedPage.values.filter((item: iPageValue) => item.name === action.payload.name )
                    temp[0].value = action.payload.value
                    state.selectedPage.values = [...state.selectedPage.values.filter((item: iPageValue)=> item.name !== action.payload.name), ...temp]

                },
            addNewPage: (state, action) =>{
                state.pages.push(action.payload)
            },

            newSelectedPage: (state, action) =>{

                state.selectedPage = action.payload
               
            },


            updateSelectedPage: (state, action) =>{
                state.selectedPage.Page = action.payload.Page
                state.selectedPage.values = action.payload.values
               
            },
            renameSelectedPage: (state, action) =>{

                state.selectedPage.Page = action.payload
               
            },


            loadNewPage : (state, action) =>{
                state.selectedPage.name = action.payload.name
                action.payload.componets.map((item: iSchemaField  ) => state.selectedPage.values.push({name:item.name, value:"", component: item.component}))

                action.payload.listComponets.map((item : iListComponent ) => 
                {
                    state.selectedPage.name = item.name
                    state.selectedPage.values.push({name:item.name, value:"", component: item.component})
                    
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
                // If the payload is a full page object (Page/Template/values), use it directly.
                if (action.payload) {
                    if (typeof action.payload === 'object' && ('Page' in action.payload || 'Template' in action.payload)) {
                        // payload already includes Page and Template
                        state.selectedPage = action.payload as any
                    } else {
                        // fallback for older shape: payload contains values array
                        state.selectedPage = {
                            Page: '',
                            Template: '',
                            values: action.payload || []
                        } as any
                    }
                }
            
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

            builder.addCase(updatePageAction.fulfilled,(state,action)=>{
                state.selectedPage = action.payload.res.data

            }),
            builder.addCase(updatePageAction.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}

            }),


            builder.addCase(deletePageAction.fulfilled,(state,action)=>{
                // Use action.meta.arg to get the original payload
                if (action.meta.arg && action.meta.arg.Page) {
                    state.pages = state.pages.filter(i => i.Page !== action.meta.arg.Page)
                }
                state.selectedPage = {values:[], Page:"", Template:""}
                
            
            }),
            builder.addCase(deletePageAction.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}

            })

            // builder.addCase(uploadImageAction.fulfilled,(state,action)=>{    
            // }),

            // builder.addCase(uploadImageAction.rejected,(state,action)=>{    
            //     state.Error = {status: true, titulo: action.error.message, description:action.error.stack}
            // })

        }

        })

    

export default editorSlice.reducer

export const {editComponent, loadNewPage, addNewPage, updateSelectedPage, removeError, newSelectedPage, renameSelectedPage} =  editorSlice.actions

