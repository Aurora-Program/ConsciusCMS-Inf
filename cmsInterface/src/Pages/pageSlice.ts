
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {  iEditorState, iSchemaField, iPage, iListComponent, iPageValue} from "../types";

import {fetchPageByPage, fetchPages, addPage, savePage, deletePage  } from './pageService.ts'




const noError =  {status:false, titulo: "No error", descripcion: "No error"}

const initialState : iEditorState = {

        data:[],
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

export const selectPageAction = createAsyncThunk("WebPage/SelectPage",async (payload: string) =>{
    return (fetchPageByPage(payload))

})

export const savePageAction = createAsyncThunk("Page/SavePage", async(payload: iPage)=>
{


    return(savePage(payload))
})

export const deletePageAction = createAsyncThunk("Page/DeletePage", async(payload: {Page: string})=>
    {
 
        return(deletePage(payload))
    })
    // export const uploadImageAction = createAsyncThunk("Page/UploadImage", async(payload: any)=>
    //     {
    //       
    //         return(uploadImage(payload))
    //     })






const pageSlice =  createSlice(
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
            updateSelectedPage: (state, action) =>{

                state.selectedPage.values = action.payload
               
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
                console.log(action.payload)
                state.pages = action.payload
            
            }),
            builder.addCase(loadPages.rejected,(state,action)=>{
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}
            
            }),


            builder.addCase(addPageAction.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.pages.push(action.payload)
            
            }),
            builder.addCase(addPageAction.rejected,(state,action)=>{
                console.log(action.payload)
                console.log("what is happening")
                state.Error = {status: true, titulo: action.error.message, description:action.error.stack}
            
            }),

            builder.addCase(selectPageAction.fulfilled,(state,action)=>{

                // Temporarily cast the response to handle type mismatch
                if (action.payload && action.payload.selectedPage) {
                    // Create a proper iPage structure from the response
                    state.selectedPage = {
                        Page: '',
                        Template: '',
                        values: action.payload.selectedPage || []
                    } as any
                    state.data = action.payload.data
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

            builder.addCase(deletePageAction.fulfilled,(state,action)=>{
                // The action.payload should contain the deleted page info  
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

    

export default pageSlice.reducer

export const {editComponent, loadNewPage, addNewPage, updateSelectedPage, removeError} =  pageSlice.actions