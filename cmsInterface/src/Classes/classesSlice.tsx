import { createAsyncThunk, createSlice,  PayloadAction } from '@reduxjs/toolkit'
import { fetchPages, fetchComponentsByPage, addItem, deleteItem, editItem  } from './classesService'
import { iSchemaField, iSchemaPage, iSchemaState } from '../types'


const emptyComponent: iSchemaField = {name:"", component:"", CType:"", page:"", description:"", max:0}
const noError = {status:false, titulo:"No Error", description:"No Error"}

const initialState : iSchemaState =  {
  pages: [],
  components: [],
  listComponents:[],
  subcomponents:[],
  selectedPage:{name:"", type:""},
  deletingComponent:emptyComponent,
  selectedComponent: emptyComponent,
  error:  noError,
  loading: false
}

export const deletePageAction = createAsyncThunk("Schema/DeleteAction", async (payload) =>{
  const Page = {page:payload.name, component:payload.name }
  return(deleteItem(Page))
})

export const deleteComponentAction = createAsyncThunk("Schema/DeleteComponentAction", async (payload) =>{
  const component = {page:payload.page, component:payload.component}
  return(deleteItem(component))
})


export const loadSchemas = createAsyncThunk<iSchemaPage[]>("Schema/PagesLoad", fetchPages)
export const addPageAction = createAsyncThunk("Schema/AddPage", async (payload) =>{
    const page = {page: payload.name, component: payload.name, CType: payload.type}
    return (addItem(page))
  })
  export const addComponentAction = createAsyncThunk("Schema/AddComponent", async (payload) =>{
    const component = payload
    return (addItem(component))
  })

  export const editComponentAction = createAsyncThunk("Schema/EditComponent", async (payload) =>{
    const component = payload
    return (editItem(component))
  })

export const selectSchema = createAsyncThunk("Schema/ComponentsLoad", async (payload) =>{
const res = await fetchComponentsByPage(payload.name)

return { components: res, "page": payload}})


export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    removeSchemaError: (state, action )=>{
      state.error = noError
  }, 

    addPage: (state, action : PayloadAction<iSchemaPage> ) => {
        state.pages.push(action.payload)
    },



    setDeletingComponent: (state,action: PayloadAction<iSchemaField>) =>{
      state.deletingComponent = action.payload
    },

    addSubcomponent: (state, action: PayloadAction<iSchemaField> ) => {
      state.subcomponents.push(action.payload)
  },
 
    selectComponent: (state, action) =>{
        state.selectedComponent = action.payload
    }
  },
    extraReducers: (builder) => {
      builder.addCase(loadSchemas.fulfilled, (state, action) =>{
        state.pages = action.payload
        state.loading = false
      }),


      builder.addCase(loadSchemas.rejected, (state, action) =>{
        state.error= {status : true, titulo: action.error.name, description: action.error.stack }
        state.loading = false
      }),
      builder.addCase(loadSchemas.pending, (state, action) =>{
        
        state.loading = true
      }),




      builder.addCase(selectSchema.fulfilled,(state,action) => {
        state.components = action.payload.components;
        state.selectedPage = action.payload.page;
        state.selectedComponent = emptyComponent;
        state.loading = false

    }),
    builder.addCase(selectSchema.rejected, (state, action) =>{
      state.error= {status : true, titulo: action.error.name, description: action.error.stack }
      state.loading = false
    }),
    builder.addCase(selectSchema.pending, (state, action) =>{
        
      state.loading = true
    }),


    builder.addCase(addPageAction.fulfilled,(state,action)=>{
      const page = {name: action.payload.page, type:action.payload.CType}
      state.pages.push(page)
      state.selectedComponent = {}
      state.selectedPage = page
      state.loading = false
    
    }),

    builder.addCase(addPageAction.rejected, (state, action) =>{
      state.error= {status : true, titulo: action.error.name, description: action.error.stack }
      state.loading = false
    }),
    builder.addCase(addPageAction.pending, (state, action) =>{
        
      state.loading = true
    }),

    builder.addCase(addComponentAction.fulfilled,(state,action)=>{
      const component = action.payload
      state.components.push(component)
      state.loading = false
      
    }),
    
    builder.addCase(addComponentAction.rejected, (state, action) =>{
      state.error= {status : true, titulo: action.error.name, description: action.error.stack }
      state.loading = false
    }),
    builder.addCase(addComponentAction.pending, (state, action) =>{
        
      state.loading = true
    }),
    builder.addCase(editComponentAction.fulfilled,(state,action)=>{
      const component = action.payload

     state.components =[ ...state.components.filter(i => i.component != action.payload.component), action.payload  ]
     state.loading = false
      
    }),
    builder.addCase(editComponentAction.rejected,(state,action)=>{
      state.error= {status : true, titulo: action.error.name, description: action.error.stack }
      state.loading = false
      
    }),
    builder.addCase(editComponentAction.pending, (state, action) =>{
        
      state.loading = true
    }),


    builder.addCase(deletePageAction.fulfilled,(state,action)=>{
      const page = action.payload
      state.error = noError
      state.pages = state.pages.filter((item) => item.name !== page.page)
      state.selectedPage = {}
      state.selectedComponent = {}
      state.loading = false
      
    }),

    builder.addCase(deletePageAction.rejected, (state, action) =>{
      state.error= {status : true, titulo: action.error.name, description: action.error.stack }
      state.loading = false
    }),
    builder.addCase(deletePageAction.pending, (state, action) =>{
        
      state.loading = true
    }),

    builder.addCase(deleteComponentAction.fulfilled,(state,action)=>{
      const component = action.payload.component

      state.components = state.components.filter((item) => item.component != component)
      state.error = noError
      state.loading = false
      
    }),
    builder.addCase(deleteComponentAction.rejected, (state, action) =>{
      state.error= {status : true, titulo: action.error.name, description: action.error.stack }
      state.loading = false
    }),
    builder.addCase(deleteComponentAction.pending, (state, action) =>{
        
      state.loading = true
    })



    }
})

// Action creators are generated for each case reducer function
export const { addPage, setDeletingComponent,  selectComponent,addSubcomponent, removeSchemaError } = schemaSlice.actions

export default schemaSlice.reducer

