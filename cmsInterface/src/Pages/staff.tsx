import { useState } from "react"
import { useAppSelector } from "../hooks"




function Staff (){
   
const values=useAppSelector(state=> state.editor.selectedPage.values)

 


    return (
        <>

        <h1>{values.find(v => v.name == "Nombre")?.value.text} </h1>
        <h3>{values.find(v => v.name == "Titulo")?.value.text} </h3>
        
        <div dangerouslySetInnerHTML={{ __html: values.find(v => v.name == "Descripcion")?.value.text }} />
   
       
        </>

    )



   
}

export default Staff