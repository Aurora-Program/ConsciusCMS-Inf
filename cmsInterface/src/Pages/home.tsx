import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { selectPageAction } from "../Editor/editorSlice"
import { useDispatch } from "react-redux"
import { downloadFile } from "../Editor/editorService"
import TranslatedContent from "../components/TranslatedContent"


function Home (){


const dispatch = useAppDispatch()
const [image, setImage] = useState()
const values=useAppSelector(state=> state.editor.selectedPage.values) 


useEffect( ()=> {dispatch( selectPageAction("Home"))},[values])



    return (
        <>
        <h1>{values.find(v => v.name == "Title")?.value.text} </h1>
        <h3>{values.find(v => v.name == "SubTitle")?.value.text}   </h3>
        <TranslatedContent 
          content={values.find(v => v.name == "Body")?.value.text || ''} 
        />
        <img src=  {"https://pma-cv-content.s3.amazonaws.com/" +  values.find(v => v.name == "Image")?.value.name} style={{width:"80%"}}></img>
        <div>
        <a href={values.find(v => v.name == "Curriculum")?.value.link}> {values.find(v => v.name == "Curriculum")?.value.caption}</a>        
        </div>
        </>

    )



   
}

export default Home