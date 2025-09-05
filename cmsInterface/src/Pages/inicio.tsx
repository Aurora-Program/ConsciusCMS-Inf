import { useState } from 'react'
import './inicio.css'
import '../App.css'
import { Stack } from 'react-bootstrap'

import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { selectPageAction } from './pageSlice.js'
import {CloseButton} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
//import LanguageSelector from '../util/multiselector.js'
import {Helmet} from "react-helmet";
import { TouchEvent as ReactTouchEvent } from 'react'

// Interfaces
interface ISlide {
  image: string;
  imageAlt?: string;
  layout?: string;
  layoutAlt?: string;
  name?: string;
  nameDesAlt?: string;
  nameDes?: string;
  color?: string;
}

interface IProject {
  name: string;
  slides: ISlide[];
  description?: string;
  descriptionEs?: string;
  descriptionCat?: string;
  fichero?: string;
}

interface IComponent {
  container: number;
  clase: string;
  slide: ISlide;
  transition: string;
}



function Inicio() {


  const url_bucket = import.meta.env.VITE_CONTENT_BUCKET_URL 
    const dispatch = useAppDispatch()
    const values=useAppSelector(state=> state.pages.selectedPage?.values) 
    const data = useAppSelector(state=> state.pages.data  ) as IProject[]
   // const [data, setData]  = useState([] )
    const [components, setComponets] = useState<IComponent[]>([])
    const [showDescription, setShowDescription] = useState(false)
    const [showProjectDescription, setShowProjectDescription] = useState(false)
    const [searchParams,setSearchParameter] = useSearchParams()
    const [startProject, setStartProject] = useState<number>(0)
    const [logos, setLogos] = useState(false)



    const t = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    const language = localStorage.getItem('language') ?? "EN";

    useEffect(()=>{localStorage.setItem('value', (t + 1).toString())}, [])
 

    const [project, setProject] = useState(-1)
    const [slide, setSlide] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    const [touches, setTouches] = useState<React.Touch[]>([])

 
     
    useEffect(  ()=> { dispatch( selectPageAction("Example"))},[])  
  

 

  
   
  useEffect (()=>{if (searchParams.get('proyecto')){
    const p = searchParams.get('proyecto')
    if (data) {

      console.log(p)
      console.log (data.findIndex(i => i.name == p))
      if (data.findIndex(i => i.name == p) != -1) {
        
        setProject( data.findIndex(i => i.name == p))
        setStartProject( data.findIndex(i => i.name == p))

      } 
      else {setProject(0)}
    }}
  else{setProject(0); setStartProject(0)}
  
  }, [data])

  useEffect( ()=> { 

    // Variables calculadas para el proyecto inicial
        const sprevProject =  project == 0 ? data.length - 1 : project - 1
        const snextProject = project == data.length - 1 ? 0  : project + 1
        const snextSlide = (startProject: number) => slide[startProject] == data[startProject].slides.length -1 ? 0 : slide[startProject] + 1
        const sfprevSlide =  (startProject: number) =>  slide[startProject] == 0 ? data[startProject].slides.length -1  : slide[startProject] -1 ;
   
      setComponets( 


  [
    {container: 1, clase:"center", slide: data[startProject]?.slides[slide[startProject]], transition:"yes"},
    {container: 2, clase:"top", slide:data[sprevProject]?.slides[slide[sprevProject]], transition:"no"},
    {container: 3, clase:"button", slide:data[snextProject]?.slides[slide[snextProject]],transition:"no"}, 
    {container: 4, clase:"left", slide:data[startProject]?.slides[sfprevSlide(startProject)],transition:"no"},
    {container: 5, clase:"right", slide:data[startProject]?.slides[snextSlide(startProject)],transition:"no"},
    ]


)
    
}, [startProject, data] )

  


  

  
 


 

  const container = useCallback((inputElement: HTMLElement | null) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const keyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  console.log("key down")
    if (event.key.includes("Arrow")) {
      switch (event.key.toLowerCase()) {
        case "arrowup":
          clickTop();
          break;
        case "arrowdown":
          clickButton();
          break;
        case "arrowleft":
          clickLeft();
          break;
        case "arrowright":
          clickRight();
          break;
        default:
          break;
      }
    }
  };
  

  
  const [transition, setTransition] = useState(false)
 


  const nextSlide =  slide[project] == data[project]?.slides.length -1 ? 0 : slide[project] + 1
  const nextnextSlide = slide[project] == data[project]?.slides.length -1 ? 1 :  slide[project] == data[project]?.slides.length -2 ?  0 : slide[project] + 2
  const prevSlide =   slide[project] == 0 ? data[project]?.slides.length -1 : slide[project] -1 
  const preprevSlide =   slide[project] == 0 ? data[project]?.slides.length -2 : slide[project] == 1 ? data[project]?.slides.length -1 : slide[project] -2
  const nextProject = project == data.length - 1 ? 0  : project + 1
  const nextnextProject = project == data.length - 1 ? 1  :  project==data.length - 2 ? 0 : project + 2
  const preprePreoject = project == 0 ? data.length - 2 :  project==1  ? data.length -1 : project - 2
  const prevProject =  project == 0 ? data.length - 1 : project - 1
  const fnextSlide = (project: number) => slide[project] == data[project].slides.length -1 ? 0 : slide[project] + 1
  const fprevSlide =  (project: number) =>  slide[project] == 0 ? data[project].slides.length -1  : slide[project] -1 

  
  const startTransition = (time: number)=>{
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
  }, time)
  }

  const clickLeft = ()=>{
    setSearchParameter()
    if (!transition){
    startTransition(750)
    let temp: IComponent[] = []
    components.map( (item) => {
      switch (item.clase){
        case "center":
            temp.push ({container: item.container, clase: "right", slide: item.slide,transition:"yes"})
          break;
        case "top":
             temp.push ({container: item.container, clase: "top", slide: item.slide, transition:"no"})
          break;
        case "button":
             temp.push ({container: item.container, clase: "button", slide: item.slide, transition:"no"})
             break;
        case "left":
             temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
              break;
        case "right":
             temp.push ({container: item.container, clase: "left", slide: data[project].slides[preprevSlide], transition:"no"})
              break;
      }
    })

    setComponets(temp)

    let tempslide
    tempslide = slide
    tempslide[project] = prevSlide

    setSlide(tempslide)
  
  
   
  }
  }
  const clickRight = ()=>{
    if (!transition){
      startTransition(750)
    let temp: IComponent[] = []
    components.map( (item) => {
      switch (item.clase){
        case "center":
            temp.push ({container: item.container, clase: "left", slide: item.slide,transition:"yes"})
          break;
        case "top":
             temp.push ({container: item.container, clase: "top", slide: item.slide, transition:"no"})
          break;
        case "button":
             temp.push ({container: item.container, clase: "button", slide: item.slide, transition:"no"})
             break;
        case "left":
             temp.push ({container: item.container, clase: "right", slide: data[project].slides[nextnextSlide], transition:"no"})
              break;
        case "right":
             temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
              break;
      }
    })

    setComponets(temp)
    let tempslide
    tempslide = slide
    tempslide[project] = nextSlide

    setSlide(tempslide)


  
    console.log("clicked right")
  }
  }
  const clickTop = ()=>{
   

    

    if (!transition){
      startTransition(1000)
      if (project==0 && logos==false)
      {
        setLogos(true)
        let temp: IComponent[] = []
        components.map( (item) => {
          switch (item.clase){
            case "center":
                temp.push ({container: item.container, clase: "button", slide: item.slide, transition:"yes"})
              break;
            case "top":
                 temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
              break;
            case "button":
                 temp.push ({container: item.container, clase: "top", slide:  data[prevProject].slides[slide[prevProject]], transition:"no"})
                 break;
                 case "left":
                  temp.push ({container: item.container, clase: "left", slide: data[project].slides[fprevSlide(project)], transition:"no"})
                   break;
             case "right":
                  temp.push ({container: item.container, clase: "right", slide: data[project].slides[fnextSlide(project)], transition:"no"})
                   break;

          }
        })
           setComponets(temp)
      }
    else {
      if (logos){
        setLogos(false)
        setProject(data.length -1)
        let temp: IComponent[] = []
        components.map( (item) => {
          switch (item.clase){
            case "center":
                temp.push ({container: item.container, clase: "button", slide: item.slide, transition:"yes"})
              break;
            case "top":
                 temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
              break;
            case "button":
                 temp.push ({container: item.container, clase: "top", slide: data[data.length -2].slides[slide[data.length -2]], transition:"no"})
                 break;
            case "left":
                 temp.push ({container: item.container, clase: "left", slide: data[data.length -1].slides[fprevSlide(data.length -1)], transition:"no"})
                  break;
            case "right":
                 temp.push ({container: item.container, clase: "right", slide: data[data.length -1].slides[fnextSlide(data.length -1)], transition:"no"})
                  break;
          }
        })
           setComponets(temp)


      }
      else{

      setLogos(false)
    let temp: IComponent[] = []
    components.map( (item) => {
      switch (item.clase){
        case "center":
            temp.push ({container: item.container, clase: "button", slide: item.slide, transition:"yes"})
          break;
        case "top":
             temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
          break;
        case "button":
             temp.push ({container: item.container, clase: "top", slide: data[preprePreoject].slides[slide[preprePreoject]], transition:"no"})
             break;
        case "left":
             temp.push ({container: item.container, clase: "left", slide: data[prevProject].slides[fprevSlide(prevProject)], transition:"no"})
              break;
        case "right":
             temp.push ({container: item.container, clase: "right", slide: data[prevProject].slides[fnextSlide(prevProject)], transition:"no"})
              break;
      }
    })
       setComponets(temp)
      setProject(prevProject)
  
  }
}}
}
  const clickButton = ()=>{
    // if the current slid is in transition don't do anytghing
    if (!transition){
      // start a count down, to determinate when the tranistion finish
      startTransition(750)
    // temporal components variable

    if (project==data.length -1 && logos==false)
      {
        setLogos(true)
        let temp: IComponent[] = [] 
        // para cada slide del actual components variable empieza a cambair
        components.map( (item) => {
          switch (item.clase){
            // la del centro la manda arriaba
            case "center":
                temp.push ({container: item.container, clase: "top", slide: item.slide, transition:"yes"})
              break;
              // la de arriba la manda abajo con nueva data.
            case "top":
                 temp.push ({container: item.container, clase: "button", slide: data[nextProject].slides[slide[nextProject]], transition:"no"})
              break;
            case "button":
                 temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
                 break;
            case "left":
                  temp.push ({container: item.container, clase: "left", slide: data[project].slides[fprevSlide(nextProject)], transition:"no"})
                   break;
             case "right":
                  temp.push ({container: item.container, clase: "right", slide: data[project].slides[fnextSlide(nextProject)], transition:"no"})
                   break;
          
              
          }
        })
    
          setComponets(temp)
      }
    else {
        if (logos){
          setLogos(false)
          setProject(0)
          let temp: IComponent[] = [] 
          // para cada slide del actual components variable empieza a cambair
          components.map( (item) => {
            switch (item.clase){
              // la del centro la manda arriaba
              case "center":
                  temp.push ({container: item.container, clase: "top", slide: item.slide, transition:"yes"})
                break;
                // la de arriba la manda abajo con nueva data.
              case "top":
                   temp.push ({container: item.container, clase: "button", slide: data[1].slides[slide[1]], transition:"no"})
                break;
              case "button":
                   temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
                   break;
              case "left":
                    temp.push ({container: item.container, clase: "left", slide: data[0].slides[fprevSlide(0)], transition:"no"})
                     break;
               case "right":
                    temp.push ({container: item.container, clase: "right", slide: data[0].slides[fnextSlide(0)], transition:"no"})
                     break;
            
                
            }
          })
      
            setComponets(temp)

        }
        else{

      setLogos(false)
    let temp: IComponent[] = [] 
    // para cada slide del actual components variable empieza a cambair
    components.map( (item) => {
      switch (item.clase){
        // la del centro la manda arriaba
        case "center":
            temp.push ({container: item.container, clase: "top", slide: item.slide, transition:"yes"})
          break;
          // la de arriba la manda abajo con nueva data.
        case "top":
             temp.push ({container: item.container, clase: "button", slide: data[nextnextProject].slides[slide[nextnextProject]], transition:"no"})
          break;
        case "button":
             temp.push ({container: item.container, clase: "center", slide: item.slide, transition:"yes"})
             break;
        case "left":
             temp.push ({container: item.container, clase: "left", slide: data[nextProject].slides[fprevSlide(nextProject)], transition:"no"})
              break;
        case "right":
             temp.push ({container: item.container, clase: "right", slide: data[nextProject].slides[fnextSlide(nextProject)], transition:"no"})
              break;
          
      }
    })

      setComponets(temp)
      setProject(nextProject)

  }
  }}
}

const touch = (event: ReactTouchEvent<HTMLDivElement>) => {
  console.log("evento: " + event.touches[0])

  setTouches( [...touches, event.touches[0]])

}

 const onTouchEnd = (_event: ReactTouchEvent<HTMLDivElement>) => {

  console.log(touches.length)

  if (touches.length > 2){

  console.log("touche end")
  const ftx = touches[0].screenX
  const fty = touches[0].screenY
  const ltx = touches[touches.length-1].screenX
  const lty = touches[touches.length-1].screenY

  const diffx = ftx -ltx
  const diffy = fty - lty

  const direction =(Math.abs(diffx) -  Math.abs(diffy)) > 0 ?  "horizontal" : "vertical"
  
  let result

  if (direction == "vertical"){
    
      result =  diffy > 1 ? "up" : "down"
    }  
  else{
      result = diffx > 0 ? "left" : "right"
  }
  

  switch (result) {
    case "up":
      clickButton()
      break
    case "down":
      clickTop()
      break
    case "left":
      clickRight()
      break
    case "right":
      clickLeft()
      break
  }
  setTouches([])
}
  
}

  if(!(components[0]?.slide?.image)) {

  
    return (
<>
<Helmet>
                <meta charSet="utf-8" />
                <title>consciusCMS Website</title>
                <link rel="canonical" href="https://d2vp9tpwoisslx.cloudfront.net/" />

                <meta property="og:title" content="Jorid Baron" />
                <meta property="og:description" content="consciusCMS website, Fotografo de barcelona" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://d2vp9tpwoisslx.cloudfront.net" />
                <meta property="og:image" content="https://pma-demo1-content-paris.s3.eu-west-3.amazonaws.com/logo.png" />


</Helmet>
      
    <div style={{height:"100%", width:"100%" , verticalAlign:"center", alignContent:"center", display:"flex", backgroundColor: "rgb(218, 209, 193)"  }}>
  
    </div>
    
    </>)
  }

  else { 

 

  return (
   <>

<Helmet>
                <meta charSet="utf-8" />
                <title>consciusCMS Website</title>
                <link rel="canonical" href="https://d2vp9tpwoisslx.cloudfront.net/" />

                <meta property="og:title" content="Jorid Baron" />
                <meta property="og:description" content="consciusCMS website, Fotografo de barcelona" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://d2vp9tpwoisslx.cloudfront.net" />
                <meta property="og:image" content="https://pma-demo1-content-paris.s3.eu-west-3.amazonaws.com/logo.png" />


</Helmet>



  <div className='a' tabIndex={0} onKeyDown={keyDown} ref={container}onTouchMove={touch} onTouchEnd={onTouchEnd} style={{verticalAlign:"top"}}  >
  
  {



components.sort((a, b) => a.container - b.container).map(item =>

  ((logos && item.clase =="center") || (!logos && project == 0 && item.clase == "top") || (!logos  && project == data.length -1 && item.clase == "button") ) ?
  <>
  <div className={item.clase}  data-transition={item.transition}  >
  <div className='areatoplogos' onClick={clickTop}></div>
 <div className='areabuttonlogos' onClick={clickButton}></div>

 <div  className='inicioLogosContainerDiv'>
  <div className='inicioLogosWrapperDiv'>
   <div className='inicioFinanciacionDiv'>
     Finaciado por <br/> la Union Europea <br/> NextGenerationUE.
   </div>
   <div className='inicioEuropaDiv'>

     
   </div>
   
   <div className='inicioPlanDiv'>
   </div>

   </div>
 </div>
 </div>
   </>

  :

    <div className={item.clase}  data-transition={item.transition}  >
      <div>
      <div className='topElementsDescription' style={{  width:"97vw", display:"flex" }}>
      
       <span className='pagination' style={{color:"black", marginRight:"0px", marginLeft:"auto"}}>{slide[project] +1 }/{data[project]?.slides.length}</span>
      </div>
 <div className='pictureContainer' >

 
    { item.slide.imageAlt && window.innerWidth < 481 ? 
        item.slide?.layoutAlt == "Centro" ? <> <img src={item.slide?.imageAlt} className="imageVertical" ></img></>:<img src={item.slide?.imageAlt} className='image'  ></img> 
        :
         item.slide?.layout == "Centro" ? <> <img src={item.slide?.image} className="imageVertical" ></img></>
:
 <img src={item.slide?.image} className='image'  >
 </img>
  
  }  
  </div>
  
  <div  className='topElementsDescription' style={{zIndex:"10", position:"absolute", top:"80vh", width:"auto", marginLeft:"4%", textAlign:"left"}} >
   
      <button className='siteTitleMobile' onClick={(e)=>{ setShowDescription(true); e.stopPropagation(); e.preventDefault();}} style={{color:"black",  zIndex:"20"}}>{values.find(v => v.component == "Inicio/Titulo")?.value.text}.   </button>
          <br/>
     
          <button className='projectTitleMobile' onClick={(e)=>{setShowProjectDescription(true); e.stopPropagation(); e.preventDefault();} }  style={{color:"black"}}>{data[project]?.name}. </button> 
    
      </div>
    
    <div className='areatop' onClick={clickTop}></div>
    <div className='arealeft' onClick={clickLeft}></div>
    <div className='arearight' onClick={clickRight}></div>
    <div className='areabutton' onClick={clickButton}>

   
    </div>
   </div> 
   </div>
    )
  }


    <div style={{position: "absolute", display:"flex", bottom:"2%", left:"1.9%", width: "100%"}}>
    <div style= {{position:"relative", width:"100%"}}>
    <div className='buttonElementsDescription'> 
    
    
    {logos ? "" :  <>
    { 
    
    
    
    data[project]?.slides[slide[project]]?.color == "Negro" ? 

 
    <table style={{width:"97.5%"}}>
        <tr>
          <td>
     
          <span className='slideName'  style={{color:"black"}}>  <span className='siteTitle' onClick={()=> setShowDescription(true)} style={{color:"black"}}>{values.find(v => v.component == "Inicio/Titulo")?.value.text}</span>.</span><span className='slideName'  style={{color:"black"}}> <span className='projectTitle' onClick={()=>setShowProjectDescription(true)}  style={{color:"black"}}> {data[project]?.name}</span>.</span> 
  

      <span className='slideName' onClick={()=>setShowProjectDescription(true)}  style={{color:"black"}}>{data[project]?.slides[slide[project]]?.name ? <>{data[project]?.slides[slide[project]]?.name}.</> : ""} </span> 
     
      </td>
      <td style={{textAlign: "right", width:"4%"}}  >
       <span className='pagination' style={{color:"black"}}>{slide[project] +1 }/{data[project]?.slides.length}</span>
       </td>
      </tr>
      </table>
   
    : 
    
    <table style={{width:"97.5%"}}>
    <tr>
      <td >
      <span className='slideName'>  <span className='siteTitle' onClick={()=> setShowDescription(true)} >{values.find(v => v.component == "Inicio/Titulo")?.value.text}</span>.</span><span className='slideName'>    <span className='projectTitle' onClick={()=>setShowProjectDescription(true)}> {data[project]?.name}</span>. </span>
     
      <span className='slideName' onClick={()=>setShowProjectDescription(true)}>{data[project]?.slides[slide[project]]?.name ? <>{data[project]?.slides[slide[project]]?.name}.</> : ""}</span> 
      </td>
      <td style={{textAlign: "right", width:"4%"}}  >
     
       <span className='pagination'>{slide[project] +1 }/{data[project]?.slides.length}</span>
       </td>
      </tr>
      </table>
   
    }
    </>
    }
   </div>
    </div>

</div>
</div>
   

{/*************************************************site*************************************************/}




                <Modal show={showDescription} fullscreen style={{background:"rgb(218, 209, 193)",  overflowX: "hidden"}} >
              
                    <Modal.Body  style={{background:"rgb(218, 209, 193)",  overflowX: "hidden"}}  >
                      
                    <div className='closeDiv'><button className='closeButton' onClick={ ()=> setShowDescription(false)}><CloseButton/></button> </div>
                      <Stack>

                       
                    <div className='topElementsDescription'  >
                      <div style={{marginLeft:"1%", marginBottom:"1.5em"}}>
                    
                    {/* <LanguageSelector language={language} onSelect={(e)=>{ setLanguage(e) }} ></LanguageSelector>*/}

<br/><br/>

<span className='siteTitleOnModalMobile'   style={{color:"black"}}   >{values.find(v => v.component == "Inicio/Titulo")?.value.text}. </span> 
<br/>


<span className='projectTitleOnModalMobile'  style={{color:"black"}} >{values.find(v => v.component == "Inicio/Subtitulo")?.value.text}. </span> <br/>


  <Link className='siteLinks' to={url_bucket + "/" + values.find(v => v.name == "Curriculum")?.value.name} target="_blank" download >CV</Link> / <a className='siteLinks' href={values.find(v => v.component == "Inicio/Instagram")?.value.link} target='_blank'>{values.find(v => v.component == "Inicio/Instagram")?.value.caption} </a>
  <br/><br/>
  <span className='phoneInfoMobile'> {values.find(v => v.component == "Inicio/Telefono")?.value.text} </span><br/>
  <a className='contactInfoMobile' href= {"mailto:" + values.find(v => v.component == "Inicio/Email")?.value.text}>{values.find(v => v.component == "Inicio/Email")?.value.text}</a>
 
<br/>
</div>
</div>
</Stack>
               
    <div style={{display:'flex', width:"100%", minHeight:"96%" }} >

                     <Stack direction='horizontal' style={{marginBottom:"2%"}}>
                     
                       
                    <div className='DescriptionLeftColumn'>

  <div  style={{float:"left", height:"auto", width:"auto"}} className='phoneInfo'>
  <Link className='siteLinks' to={url_bucket + "/" + values.find(v => v.name == "Curriculum")?.value.name} target="_blank" download >CV</Link>/<a className='siteLinks' href={values.find(v => v.component == "Inicio/Instagram")?.value.link} target='_blank'>{values.find(v => v.component == "Inicio/Instagram")?.value.caption} </a>

<br></br>
<span className='phoneInfo'> {values.find(v => v.component == "Inicio/Telefono")?.value.text} </span> <br/>

  <a className='contactInfo' href= {"mailto:" + values.find(v => v.component == "Inicio/Email")?.value.text}>{values.find(v => v.component == "Inicio/Email")?.value.text}</a>
  
  </div>
  <div style={{ display:"flex" }} ></div>



  <div style={{display:"block", height:"100%", width:"100%"}} ></div>
 
  </div>
 
  
  
 

  
  <div  className='DescriptionRightColumn'>
     
    
      <p>
      {<div dangerouslySetInnerHTML={{ __html: language == "EN" ?  values.find(v => v.component == "Inicio/Descripcion")?.value.text : 
         language == "ES" ?  values.find(v => v.component == "Inicio/DescripcionEs")?.value.text : values.find(v => v.component == "Inicio/DescripcionCat")?.value.text   } } className='textDescription'/>  }
      </p>
    </div>

 
    </Stack>

    </div>
    <div className='buttonElementsDescription' style={{display:"flex", width: "100%"}}>
 
    
      <table style={{width:"100%", marginLeft:"0.9%"}} >
    <tr>
      <td >

     <span className='siteTitleOnModal'  style={{color:"black"}}   > <span className='titleInPlace' >{values.find(v => v.component == "Inicio/Titulo")?.value.text}</span>.</span>
 
 <span className='projectTitleOnModal' style={{color:"black"}} >{values.find(v => v.component == "Inicio/Subtitulo")?.value.text}. </span> 
 
 </td>



 <td style={{textAlign: "right", paddingRight:"1.6%"}}  >

  
  {/* <LanguageSelector language={language} onSelect={(e)=>{ setLanguage(e) }} ></LanguageSelector>*/}
</td>
 </tr>
 </table>
</div>

                    </Modal.Body>
                    
                </Modal>


{/*********************************************project*****************************************************/}





                <Modal show={showProjectDescription} fullscreen onHide={()=>setShowProjectDescription(false)}>
                     
                     <Modal.Body style={{display:"flex", background:"rgb(218, 209, 193)"}}  >
<Stack>

<div className='closeDiv'><button className='closeButton' onClick={ ()=> setShowProjectDescription(false)}> <CloseButton/> </button> </div>
                    
                     <div className='topElementsDescription' >
                     <div style={{paddingLeft:"1%", paddingBottom:"15%"}}>
                     {/*  <LanguageSelector language={language} onSelect={(e)=>{ setLanguage(e) }} ></LanguageSelector>  */}
<br/><br/>



{/*<span className='siteTitleOnModalMobile'     >{values.find(v => v.component == "Inicio/Titulo")?.value.text}. </span> <br/>*/}



<span className='projectTitleOnModalMobile'    >{data[project]?.name}. </span> <br/>

{ 
        data[project]?.slides[slide[project]]?.imageAlt  && window.innerWidth < 481 ? 
     <> <p className='projectTitleOnModalMobile'  >{data[project]?.slides[slide[project]]?.nameDesAlt ? <> {data[project]?.slides[slide[project]]?.nameDesAlt}.</> :  ""}</p> <br/> </> :
     <> <p className='projectTitleOnModalMobile' >{data[project]?.slides[slide[project]]?.nameDes ?<>{data[project]?.slides[slide[project]]?.nameDes}.</>:   ""}</p> <br/> </>
      }


</div>



</div>

                      <div style={{width: "100%", minHeight: "96.5%"}}  >
                      <div className='divTextProyect'  style={{ minHeight: "100%"}} >
                     
 
  <div dangerouslySetInnerHTML={{ __html: (language == "EN" ? data[project]?.description : language == "ES" ?  data[project]?.descriptionEs : data[project]?.descriptionCat) || ""}}  className='textDescriptionProject' />
 
  {data[project]?.fichero ? <a className='info' href={url_bucket+ "/" + data[project]?.fichero } target="_blank" onClick={(e)=> {e.stopPropagation();}}>+info</a> : " "}

  </div>
 
  
  </div>
 
  <div className='buttonElementsDescription' style={{minWidth: "100%", paddingLeft:"0.7%"}}>
 
    
 <table style={{width:"100%"}} >
   
<tr>
 <td >


    <span className='siteTitleOnModal' onClick={(_e)=> {setShowProjectDescription(false); setShowDescription(true)}} > <span className='titleNoInPlace'>{values.find(v => v.component == "Inicio/Titulo")?.value.text}</span>.</span>


<span className='projectTitleOnModal'  ><span className="titleInPlace">{data[project]?.name}</span>. </span> 
<span className='projectTitleOnModal'  style={{color:"black"}}>{data[project]?.slides[slide[project]]?.nameDes ??  ""}.</span>  
</td>


<td  >


</td>

<td style={{textAlign: "right", paddingRight:"0.8%"}}  >
 {/*  <LanguageSelector language={language} onSelect={(e)=>{ setLanguage(e) }} ></LanguageSelector> */}


</td>
</tr>
</table>

</div>
 
</Stack>

                     </Modal.Body>
                     
                 </Modal>
               



</>
  

  )}
}

export default Inicio
