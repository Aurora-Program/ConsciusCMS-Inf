import { useState } from "react"
import { useAppSelector } from "../hooks"




function News (){
   
const values=useAppSelector(state=> state.editor.selectedPage.values)

 


    return (
        <>

        <h1>{values.find(v => v.name == "Title")?.value.text} </h1>
        
        <div dangerouslySetInnerHTML={{ __html: values.find(v => v.name == "Body")?.value.text }} />
   
        <div dangerouslySetInnerHTML={{ __html: values.find(v => v.name == "Foot")?.value.text }} />
        </>

    )



   
}

export default News