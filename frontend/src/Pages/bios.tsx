import { useState } from 'react'
import './bios.css'
import '../App.css'


import { useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import {loadPages } from './pageSlice.js'

//import LanguageSelector from '../util/multiselector.js'





function Bios() {



    const dispatch = useAppDispatch()
    const pages = useAppSelector(state=> state.pages.pages  )
   // const [data, setData]  = useState([] )


    const t = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;
   
    const [language, setLanguage] = useState(localStorage.getItem('language') ?? "EN");

    useEffect(()=>{localStorage.setItem('value', t + 1)}, [])
      
    useEffect(  ()=> { dispatch( loadPages())},[])  




return (
    <>
   <div class="container">
   <h1>Colaboradores</h1>
   <div class="bio-card">
   <h2 class="bio-title">


{
    pages.filter(i => i.Template == "Bios").map(item=><> <a href={"/bio/" + item.Page}>{item.Page} </a> <br/></>)
}
  </h2>
</div>
</div>
</>


)

}

export default Bios
