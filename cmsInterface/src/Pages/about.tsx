import { useState } from "react"
import { useAppSelector } from "../hooks"
import TranslatedContent from "../components/TranslatedContent"
import PlatformsExample from "../components/PlatformsExample"


function About (){
   
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

        {/* Componente de prueba temporal */}
        <div className="mt-5 border-top pt-4">
          <PlatformsExample />
        </div>
        </>

    )



   
}

export default About