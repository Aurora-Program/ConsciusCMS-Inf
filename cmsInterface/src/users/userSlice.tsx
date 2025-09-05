import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getLogins, acceptEula } from './authService'
import { getSettingSecByArea, editSettingSec } from '../Settings/SettingsSecService'






const initialState = {
    email: "",
    name: "",
    isAuthenticated: false,
    role:"",
    lastLogin : [],
    mfa: false,
    eulaAccepted: false,
    eulaAcceptedDate: ""
  }

  export const editUserProfileAction = createAsyncThunk("User/EditUserProfile", async (payload) =>{
    const component = payload
    return (editSettingSec(component))
  })

  export const acceptEulaAction = createAsyncThunk("User/acceptEula", async (payload) =>{
    
    return (acceptEula(payload))
  })
  

export const getLoginsAction = createAsyncThunk("users/getlogins", getLogins  )

export const getUserProfileAction = createAsyncThunk("user/GetUserProfile", async (payload) =>{
    return ( getSettingSecByArea(payload)) 
    })

export const userSlice = createSlice ({
    
    name: "user",
    initialState,
    reducers: {

        authenticate: (state, action ) => {
        state.email = action.payload.email
        state.name =  action.payload.name 
        state.role = action.payload.role 
        state.isAuthenticated = true   
      
        } ,

        logout: (state) => {
            state.email = ""
            state.name =  ""
            state.isAuthenticated = false 
            state.role = ""

        }
    },
    extraReducers: (builder)=> {

        builder.addCase(getLoginsAction.fulfilled, (state, action)=>{
            
       
        state.lastLogin = action.payload
    }),
        builder.addCase(getUserProfileAction.fulfilled, (state, action)=>{
            console.log(action.payload)
            action.payload.map((i) =>{
            switch (i.Setting){

                case "MFA":
                        state.mfa =  i.Value
                        break;
                case  "eulaAccepted":
                        state.eulaAccepted =  i.Value
                        break;
                case  "eulaAcceptedDate":
                        state.eulaAcceptedDate =  i.Value
                        break;

                
            }})
        }

    

        ),
        builder.addCase(editUserProfileAction.fulfilled, (state, action)=>{
        switch (action.payload.Setting){

            case "MFA":
                    state.mfa =  action.payload.Value
                    break;
            case  "eulaAccepted":
                    state.eulaAccepted = action.payload.Value ?? false
                    break;
            case  "eulaAcceptedDate":
                    state.eulaAcceptedDate = new Date()
                    break;
            
            
        }}),

        builder.addCase(acceptEulaAction.fulfilled, (state)=>{
            
    

              
                        state.eulaAccepted = true
                        state.eulaAcceptedDate = new Date()
                       
                
                
            }
    
        )

}

})
export const { authenticate, logout} = userSlice.actions
export default userSlice.reducer