import { useState } from 'react'
import './bio.css'
import '../App.css'


import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { selectPageAction } from './pageSlice.js'

import { useParams } from 'react-router-dom';

//import LanguageSelector from '../util/multiselector.js'





function Bio() {



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
    <div className='container'>
<h2>
{data.find(item => item.component === "Bios/Name")?.value["text"]}
</h2>
<h4>
{data.find(item => item.name === "ShortDescription")?.value["text"]}
    
    </h4>


<div dangerouslySetInnerHTML={{ __html:data.find(item => item.name === "Bio")?.value["text"]}}/>


</div>
  


</>


)

}

export default Bio
