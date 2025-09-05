
import { Outlet } from 'react-router-dom';
import Menu  from './Layout/menu.tsx';
import Head from './Layout/head.tsx'
import Footer from './Layout/Footer.tsx'

import "./admin.css"
import AppAlert from './util/appalert.tsx';
import { useAppSelector } from './hooks.tsx';
import { useAppDispatch } from './hooks.tsx';
import {removeError} from "./Editor/editorSlice.ts"
import { removeSchemaError } from './Schema/schemaSlice.tsx';
import { removeSettingError } from './Settings/settingsSlice.tsx';

import "./custom.scss"

function Admin() {
  
  const dispatch= useAppDispatch()
  const errorEditor = useAppSelector((state)=> state.editor.Error)
  const errorSchema = useAppSelector((state)=> state.schema.error)
  const errorSetting = useAppSelector((state)=> state.settings.error)
 

  function closeEditorError(){
    console.log("from function sent")
    dispatch(removeError())
  }
  function closeSchemaError(){
    console.log("from function sent")
    dispatch(removeSchemaError())
  }
  function closeSettingError(){
    console.log("from function sent")
    dispatch(removeSettingError())
  }
 


  return (
    <>
    <div style={{position:"fixed", top:"0px", right:"0px", zIndex:"10"}} >
      <AppAlert error = {errorEditor} onClose={closeEditorError} ></AppAlert>
      <AppAlert error = {errorSchema} onClose={closeSchemaError} ></AppAlert>
      <AppAlert error = {errorSetting} onClose={closeSettingError} ></AppAlert>
      </div>
      <div className='adminDiv'>

    
     
      <div className="headDiv">
        <Head /> 
       </div>
       
        <div className='menuDiv'>
       <Menu /> 
    </div>
   
                <div  className='mainContentDiv'> 
                  <Outlet/> 
                </div>
            
                <div className='footDiv'>
                  <Footer />
                </div>
            </div>
         
         

    </>
  );
}

export default Admin;