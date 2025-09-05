import { createAsyncThunk, createSlice,  PayloadAction } from '@reduxjs/toolkit'
import { iSchemaField, iSchemaPage} from '../types'
import { getSettingByArea, editSetting } from './SettingsService'
import { getSettingSecByArea, editSettingSec } from './SettingsSecService'

interface SettingPayload {
  Area: string;
  Setting: string;
  Value: string;
}

const emptyComponent: iSchemaField = {name:"", component:"", CType:"", page:"", description:"", max:0}
const emptyPage: iSchemaField = {page:"", component:"", CType:"", name:"", description:"", max:0}
const noError =  {status:false, titulo: "No error", descripcion: "No error"}

const initialState=  {
  logo:"",
  websiteName:"",
  loginPicture :"",
  contactName:"",
  PhoneNumber:"",
  EmailAddress:"",
  error : noError,
  licenseModel: "",
  licenseExpiration: "",
  eulaAccepted: false,
  eulaAcceptedDate: ""

}


  export const editSettingAction = createAsyncThunk<any, SettingPayload>("Settings/EditSetting", async (payload: SettingPayload) =>{
    const component = payload
    return (editSetting(component))
  })

export const getSettingAction = createAsyncThunk("Settings/GetSettings", async (payload: any) =>{
return ( getSettingByArea(payload)) 
})

export const editSettingSecAction = createAsyncThunk<any, SettingPayload>("Settings/EditSettingSec", async (payload: SettingPayload) =>{
  const component = payload
  return (editSettingSec(component))
})

export const getSettingSecAction = createAsyncThunk("Settings/GetSettingsSec", async (payload) =>{
return ( getSettingSecByArea(payload)) 
})






export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    removeSettingError: (state, action )=>{
      state.Error = noError
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
    },

   
  

  },
    extraReducers: (builder) => {
      builder.addCase(getSettingAction.fulfilled, (state, action) =>{
        state.loginPicture = action.payload.find((i)=> i.Setting == "LoginPicture").Value
        state.logo = action.payload.find((i) => i.Setting == "Logo").Value
        state.websiteName = action.payload.find((i)=> i.Setting == "WebsiteName").Value

        

      }),


      builder.addCase(getSettingSecAction.fulfilled, (state, action) =>{

        state.contactName = action.payload?.find((i)=> i.Setting == "ContactName")?.Value
        state.PhoneNumber = action.payload?.find((i) => i.Setting == "ContactPhone")?.Value
        state.EmailAddress = action.payload?.find((i)=> i.Setting == "ContactEmail")?.Value
        state.licenseModel = action.payload?.find((i)=> i.Setting == "LicenseModel")?.Value
        state.licenseExpiration = action.payload?.find((i) => i.Setting == "LicenseExpiration")?.Value
        

      }),
   
    builder.addCase(editSettingAction.fulfilled,(state,action)=>{
    

               
            switch (action.payload.Setting){
                case "Logo":
                    state.logo =  action.payload.Value
                     break;
                case "WebsiteName":
                    state.websiteName =  action.payload.Value
                    break;
                case "LoginPicture":
                        state.loginPicture =  action.payload.Value
                        break;

                
                
            }}),
   
            builder.addCase(editSettingSecAction.fulfilled,(state,action)=>{
            
        
                       
                    switch (action.payload.Setting){
                      
                    
                        case "ContactName":
                                state.contactName =  action.payload.Value
                                break;
                        case "ContactPhone":
                                state.PhoneNumber =  action.payload.Value
                                break;
                        case "ContactEmail":
                              state.EmailAddress =  action.payload.Value
                              break;
                        case "LicenseModel":
                                state.licenseModel =  action.payload.Value
                                break;
                        case "LicenseExpiration":
                              state.licenseExpiration =  action.payload.Value
                              break;
                        case  "eulaAccepted":
                              state.eulaAccepted = action.payload.Value ?? false
                              break;
                        case  "eulaAcceptedDate":
                              state.eulaAcceptedDate = new Date()
                        
                        
                    }
        

                
      
    }),

    builder.addCase(editSettingAction.rejected,(state,action)=>{
      state.error = {status: true, titulo: action.error.message, description:action.error.stack}
      
    })



  }
})

// Action creators are generated for each case reducer function
export const { addPage, setDeletingComponent,  selectComponent,addSubcomponent, removeSettingError } = settingsSlice.actions

export default settingsSlice.reducer

