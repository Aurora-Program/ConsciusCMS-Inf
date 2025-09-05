import { useState } from "react"
import { useAppSelector } from "../hooks"
import TranslatedContent from "../components/TranslatedContent"


function Web (){
   
const values=useAppSelector(state=> state.editor.selectedPage.values)

 


    return (
        <>

        <h1>{values.find(v => v.name == "Title")?.value.text} </h1>
        
        <TranslatedContent 
          content={values.find(v => v.name == "Body")?.value.text || ''} 
        />
   
        <TranslatedContent 
          content={values.find(v => v.name == "Foot")?.value.text || ''} 
        />
        </>

    )



   
}

export default Web