import { useState } from 'react'
import './article.css'
import '../App.css'
import {  Stack } from 'react-bootstrap'

import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { selectPageAction } from './pageSlice.js'
import {CloseButton} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
//import LanguageSelector from '../util/multiselector.js'





function Chapter() {



    const dispatch = useAppDispatch()
    const data = useAppSelector(state=> state.pages.data  )
   // const [data, setData]  = useState([] )


    const t = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;
    const {name} = useParams()
    const [language, setLanguage] = useState(localStorage.getItem('language') ?? "EN");

    useEffect(()=>{localStorage.setItem('value', t + 1)}, [])
      
    useEffect(  ()=> { dispatch( selectPageAction(name))},[])  




return (
    <>
      <div class="container">
        <h1 id="article-title">{data.find(item => item.component === "Chapters/Title")?.value["text"]}</h1>
        <div class="author">
             <span id="article-author">  {data.find(item => item.component === "Chapters/Part")?.value["value"]}</span>
        </div>
        <div class="content" id="article-content">
            <p>
            <div dangerouslySetInnerHTML={{ __html:data.find(item => item.component === "Chapters/Content")?.value["text"]}}/>
            </p>
        </div>
        <footer>
            &copy; 2025 <span id="footer-author">  {data.find(item => item.component === "Chapters/Author")?.value["value"]}</span>. Todos los derechos reservados.
        </footer>
    </div>


</>


)

}

export default Chapter
