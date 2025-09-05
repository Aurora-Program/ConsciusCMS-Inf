import { useState, useRef, Component, useEffect } from "react";
import { useAppSelector } from "../hooks";
import { Modal, Stack, Form, Button, Container, FloatingLabel, InputGroup} from "react-bootstrap";
import {updateSelectedPage, savePageAction, renameSelectedPage} from "./editorSlice"
import { useAppDispatch } from "../hooks";
import './editor.css'
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.core.css";
import { uploadImage } from "./editorService";
import fileicon from '../assets/FILE.png'
import noImage from '../assets/noImage.jpg'
import { Table} from "react-bootstrap";

import "./fields.css"

import "react-quill/dist/quill.snow.css";
import "../util/styles.css";
import { ImageSource } from "pixi.js";


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


const toolbarOptions = [
  [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
  [{size: []}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link', 'image', 'video'],
  [{
    'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker']
    }],
  ['clean'] // remove formatting button
];
const Link = Quill.import('formats/link')
    console.log(Link)
    class linkType extends Link {
      static create (value) {
        console.log("entra")
        let node = super.create(value)
        value = this.sanitize(value)
        const re = new RegExp("^[+\d\s-]{16}$");
        if (re.test(value)) {
          node.setAttribute('href', 'tel:' + value)
          node.className = 'link--tel'
        }
        if (validateEmail(value)) {
          node.setAttribute('href', 'mailto:' + value)
          node.className = 'link--mail'
        }
        if (value.includes(location.protocol + '//' + location.host)) node.removeAttribute('target');
        else {

        if (value.includes('https://') || value.startsWith('http://')) {
          node.className = 'link--external'
         
        } else {
          node.removeAttribute('target')
        }}
        return node
      }
    }
    Quill.register(linkType)

function Field(props) {

  
  const reader = new FileReader()
  reader.onload = (e) => {
    // e.target points to the reader

    


   
  }
  reader.onerror = (e) => {
    const error = e.target.error
    console.error(`Error occured while reading ${file.name}`, error)
  }
  const [list, setList] = useState({order:0, value:[]}) // lista de campos de una lista de componentes
  const [show, setShow] = useState(false); // muestra un model
  const [value, setValue] = useState(props.value) // valor que se esta editando
  const [listIndex, setlistIndex] = useState(null) // indice del item que se esta edittando
  const [action, setAction] = useState("") // tipo de accion en el formulario de editcion de items
  const components = useAppSelector((state)=> state.schema.components) // components del template de esta pagina
  const selectedPage = useAppSelector((state) => state.editor.selectedPage) // toda la information para esta pagina
  const dispatch = useAppDispatch()
  const [showConfirmDelete, setShowConfirmDelete] = useState(false) // para mostrar el modal que elimina un item.
  const [showFile, setShowFile] = useState() // para mostrar el modal que muestra un show file
  const [noValidatedText, setNoValidatedText] = useState("")
  const pages = useAppSelector(state => state.editor.pages)
  const [file, setFile] = useState() // fichero que se esta editando
  const [tempValue, setTempValue] = useState()
  const [showWaring, setShowWarning] = useState(false)
  const [pageName, setPageName] = useState("")



  function emptyField(schema ){


    switch (schema.CType) {
        case "string":

          return {  text: ""}
        case "richtext":
            return {text: ""}     
        case "link":
            return {caption: "", link:""}
        case "image":
            return {}     
        case "numberAttribute":
            return {value:  ""}
        case "listComponents":
            return []
        case "memberOf":
            return []
        case "selectAttribute":
            return {value:   ""}
        case "date":
            return {value:   ""}
        case "memberOfS":
            return {value:   ""}
        case "color":
            return {value:  null}
              
          
}
}

 function updateField (){ // actualiz un field de una lista

  if (props.onUpdate){ // pertence a una lista
    props.onUpdate(props.Schema, value)
  }

  else{ // pertenece a a la pagina


  
  const temp  = {Page:createIdentifier(), values:[...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component,  value:value}]};

   
   dispatch(updateSelectedPage(temp))
   
 
  }
}

function createIdentifier (){

 const getPart = (i, c) =>  {

  console.log(i)
  console.log(c)
  let part = ""
     switch(c.CType ) {
      case "string":
        part = i.text
        break
      case "numberAttribute":
          part = i.value
          break
      case "memberOfS":
            part = i.value
            break
      case "file":
              part = i.name
              break
      case "link":
              part = i.caption
              break
      case "date":
              part = i.value
              break
      case "selectAttribute":
              part = i.value
              break
     }
    return part
}

  var val ="";
  [...components].sort((a,b)=>a.order - b.order).filter(i=> i.identifier).map( (ia) =>{
    if (ia.component == props.Schema.component ) val += getPart( value, props.Schema ) + " "; else 
   
    {
      if((selectedPage.values).find(id => id.component == ia.component))  val += getPart(selectedPage.values.find(id => id.component == ia.component).value, ia) + " "
    }})


  return val.trim()
}

async function updateFieldImage (){ // actualiz un field de una lista

  if (props.onUpdate){ // pertence a una lista
    props.onUpdate(props.Schema, tempValue)
  }

  else{ // pertenece a a la pagina
  console.log(tempValue)
  const temp  = {Page:createIdentifier(), values:[...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component,  value:tempValue}]};
  if(props.Schema.identifier)  setPageName(createIdentifier())

  dispatch(updateSelectedPage(temp))


 
  }

}

function stringForListComponent(item){ // esta funcion se utiliza para presentar un item  de lista de compomente

  let value ="";

  if (!item){item =[]}

  [...item].filter(a=> a.Schema.identifier==true).map( (i)=> 

    
    {

      switch (i.Schema?.CType) {
      case "string":
        value +=  i.value.text +  " "
        break;
      case "richtext":
        value += i.name  +  " "
        break
      case "image":
          value += i.value.name  +  " ";
          break
      case "link":
          value += i.value.caption  +  " ";
          break
      case "listComponents":
          value += i.name + ": Fields;  ";
            break
      case "attributeSelect":
          value += i.value.value  +  " ";
          break
      case "numberAttribute":
          value += i.value.value +  " "
          break
    }

  }

  )


  return (value.trim() )
}

function clickDelete (schema, index) // cundo hace delete a un element de una lista
{

  setlistIndex(index); 

  if (props.onDeleteItem) 
  { // si el elemento de hijo de una lista de componentes que depende directamente de la pagina
    props.onDeleteItem(props.Schema, index)
  }

  else {
  // si el elemento de hijo de una lista de componentes que NO depende directamente de la pagina


  let temp1 = [...(selectedPage.values.find(i=> i.component == props.component)?.value)].sort((a,b)=> a.order - b.order).filter((_,ind)=> ind != index)



  let res =[]
  let copy = [...temp1]

  let  v= copy.map((i, index)=>{
    let v = {...i}
    v.order = index;
    res.push(v)
  })


    const temp  = {Page:createIdentifier(), values: [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema:props.Schema,  value: res }]}
    dispatch(updateSelectedPage(temp)) // edita la pagina actual
    dispatch(savePageAction({...selectedPage, values:temp})) // guarda los datos.
  
  }
   

}

function moveup(schema, value, index){
 // setList ({order:list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value:[...list.value?.find((i)=> i.component == schema.component).value.filter((_,ind)=> ind != index),  {order: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index].order) -1 , value: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index].value)}]}]}) 
  //setList ({order:list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value:[...list.value?.find((i)=> i.component == schema.component).value.filter((_,ind)=> ind != index),  {order: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index].order) , value: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index -1].value)}]}]}) 
  
  
  
  if (props.onMoveUp){
  

    console.log()

    
    props.onMoveUp(props.Schema, index, props.value)
           
  //  console.log("add list compomenet - Liadd from naive " + selectedPage.values.find(i=> i.component == props.component)?.value.length)
     //    temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema: props.schema, value: [...selectedPage.values.find(i=> i.component == props.component)?.value, {order:selectedPage.values.find(i=> i.component == props.component)?.value.length, value:list.value}] }];

  }
  else{
   
   
    

    dispatch(updateSelectedPage({...selectedPage, values:[...selectedPage.values.filter(i => i.component != props.component),{ name:props.name, component:props.component, value:[...selectedPage.values.find(i => i.component == props.component).value.filter(i => i.order != index && i.order != index -1 ), {value:[...selectedPage.values.find(i => i.component == props.component).value].sort((a,b)=>a.order - b.order)[index -1].value ,order: index}, {value: [...selectedPage.values.find(i => i.component == props.component).value].sort((a,b)=>a.order -b.order)[index].value, order:index -1} ]}]}))

    }

   
 // dispatch(savePageAction({...selectedPage, values:temp})) // se guara los camnios en selected page. - Esto solo pasa cuando la lista de componentes depende directamente de la pagina.
}

function movingUp(schema, index, value){

  setList({name: list.name, component:list.component, order:list.order, value:[...list.value.filter( i => i.Schema.component != schema.component), {Schema:schema, name: schema.name, component:schema.component, value: [...value.filter(i => i.order!=index &&  i.order!=index-1), {order: index, value: value.find(i => i.order == index-1).value}, {order: index-1, value: value.find(i=> i.order == index).value}] } ]})
 // setList([...list.filter( i => i.Schema != component),  {schema : schema, name: schema.name, component: schema.component, value: [...(value.filter(i => i.order == index && i.order =- index-1)), {order: index, value: value.find(i.order = index-1).value}, {order:index -1, value: value.find( i => i.order == index).value }] } ])

}


function updatelist(schema, value, index) // esta funcion edita un elemento de una lista de compoenentes
{

    setList ({order:list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value:[...[...(list.value?.find((i)=> i.component == schema.component).value)].sort((a,b)=> a.order - b.order).filter((_,ind)=> ind != index),  {order: [...list.value.find(i => i.component == schema.component).value].sort((a,b)=> a.order - b.order)[index].order, value: value.value}]}]})  

}

function deleteItem (schema, index) // Esta funcion elimina un item de la lista 
{ 


  let temp =  [...list.value?.find( (i)=>  i.component == schema.component)?.value].sort((a,b)=> a.order - b.order).filter((_,ind)=> ind != index)

  let res =[]
  let copy = [...temp]

  let  v= copy.map((i, index)=>{
    let v = {...i}
    v.order = index;
    res.push(v)
  })

  setList ({order: list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value: res }]})

}


function addListComponent(){

  // Este funcion se ejecuta cuando alguin hace click en ADD button in la formulario de edicion de lista de components.

  let temp  = []
  console.log("handle acction list")
  
  if (action=="Add") {
// si el formularion de edicion esta en modo "anadir" se inicia el proces para anadir un nuevo item a la lista de components.

console.log("Adding action")

console.log(props.component)
       if (props.subComponent){
            // Si se trata de una lista de componentes hija de una lista de components
                  console.log(selectedPage.Template + "/" + props.name)
                  props.onAddItem(props.Schema, list) // se llama a la funcion para anadir un nuveo item en la lista
           }

      else{
         // si la lista de components es miembra directo de la pagina se edita directamente el selectedPage State.
          if (selectedPage.values.find(i=> i.component == props.component)){
           
         
                 temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema: props.schema, value: [...selectedPage.values.find(i=> i.component == props.component)?.value, {order:selectedPage.values.find(i=> i.component == props.component)?.value.length, value:list.value}] }];
 
          }
          else{

                temp =  [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, value:  [{order: 0 , value:list.value  }] }]
          }
      
           
        dispatch(updateSelectedPage({...selectedPage, values:temp})) // se guara los camnios en selected page. - Esto solo pasa cuando la lista de componentes depende directamente de la pagina.
        }

    }
  else {
      //  si el formulario trabaja en modo edicion se edita el campo.
    if (props.component != selectedPage.Template + "/" + props.name){
      // si el elemento no es miembor de lista que depende directamente de la paina
     
      props.onUpdateList(props.Schema, list, listIndex) // se llama a la funcion que edita la pagina
    
    }

    else{
     
      // si el elemnto es miembor de una lista de paginas que pertenece directamente a la pagina

     
      temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema:props.Schema,  value: [...[...(selectedPage.values.find(i=> i.component == props.component)?.value)].sort((a,b)=>a.order - b.order).filter((_,ind)=> ind != listIndex), list] }];
     
      dispatch(updateSelectedPage({...selectedPage, values:temp})) // se guarda la nueva selected page directamente en la base de datos

    }

  }

}

function editList(schema, value) // esta funcion edita un componente de una lista de componentes. (RENAME)
 { 

  setList({order: list.order , value:[...list.value?.filter((i)=> i.Schema.component != schema.component), {name:schema.name, component:schema.component, value:value, Schema:schema}]})
}

function addList(schema, value){ // esta funcion anade un nuevo item a una lista de components. (RENAME)
  console.log ("add list: " + list.value.find((i)=> i.Schema.component == schema.component)?.value.length)
  setList({ order: list.order, value:[...list.value?.filter((i)=> i.Schema.component !=schema.component), {Schema:schema, component: schema.component, name:schema.name,  value: [...list.value.find((i)=> i.Schema.component == schema.component)?.value,  {order: list.value.find((i)=> i.Schema.component == schema.component)?.value.length ,   value:value.value}]} ]})
}

const handleFileChange = async(e) => // Esta funcin se ejectuta cuando se cambia un imagen de un compoente de image
  {
  if (e.target.files[0]) {
    
    if (e.target.files[0].size < props.Schema.max * 1024) {
 
    setTempValue({name:(e.target.files[0].name.split(".")[0]) + (10000 +  Math.round(  100000 * Math.random())).toString() + "." + (e.target.files[0].name.split(".")[1]) });
  
    
    setFile (e.target.files[0])
    setShowFile ( URL.createObjectURL(e.target.files[0]))
    
    }
    else {
      setNoValidatedText("The file is bigger than allowed")}
    
  }
};

const fileAccept = (type: string) : string => {
  let value : string = "" 
switch (type){
  case "image":
     value = ".jpg,.jpeg,.png,.svg,.webp,.gif"
      break
    case "document":
      value = ".doc,.docx,.pdf"
      break
    case "video":
      value = ".mp4,.ogg"
      break
    case "audio":
      value = ".mp3,.ogg"
      break
    
}
    return value



}

const handleUploadClick = async () => {


  if (file) { 
      console.log(tempValue)
     
    
      await uploadImage(file, tempValue.name)
      setValue({ name: tempValue.name})
    
    return;
  } 
};

function loadNewList(schema) {
// Create una lista con todos los components de un list compoment. Todos los valores son vacios.

    let tempList =[]
    {
        components.filter((item) => 
          item.component == schema.component +"/"+ item.name).map((item)=> 
   
    { 
        switch (item.CType) {
            case "string":
              tempList = [...tempList, {name:item.name, component:item.component, value:{text: item.default || ""}, Schema:item }]
              break;
            case "richtext":
              tempList = [...tempList, {name:item.name, component:item.component, value:{text:""}, Schema:item }]
              break;
            case "link":
                tempList = [...tempList, {name:item.name, component:item.component, value:{caption:item.default || "", link:""}, Schema:item }]
                break;
            case "image":
                    tempList= [...tempList, {name:item.name,component:item.component,  value:{name:""}, Schema:item }]
                    break;
            case "listComponents":
                tempList = [...tempList, {name:item.name,component:item.component,  value:[], Schema:item }]
                break;
            case "selectAttribute":
                  tempList = [...tempList, {name:item.name, component:item.component, value:{value: item.default || ""}, Schema:item }]
                  break;
            case "numberAttribute":
                  tempList = [...tempList, {name:item.name, component:item.component, value:{value: item.default || 0 }, Schema:item }]
                   break;
            case "memberOf":
                    tempList = [...tempList, {name:item.name, component:item.component, value:{value:[]}, Schema:item }]
                     break;
            case "memberOfS":
                    tempList = [...tempList, {name:item.name, component:item.component, value:{value: item.default || ""}, Schema:item }]
                    break;
            case "color":
                    tempList = [...tempList, {name:item.name, component:item.component, value:{value: item.default || null}, Schema:item }]
                      break;
        }
      }
    
    )
    setList({order: 100, value:tempList})
 
}

}

function loadList(schema, index) {
// carga todso los valores de los components de un espcifico item de una  lista de components. Seleciona el compoent en base al indice
// TODO: En vez de buscar por el indice se tiene que busar el por nuevo valor que es el order.

  let tempList =[]
  {
      components.filter((item) => 
        item.component == props.component +"/"+ item.name).map((item)=> 
 
  { 
     
      const value = [...(props.value)].sort((a,b)=> a.order - b.order)[index].value?.find(v => v.component == item.component) ? [...(props.value)].sort((a,b)=> a.order - b.order) [index].value?.find((v) => v.component == item.component ).value  : emptyField(item) // si hay valor se anade el valor si not se pone un valor empty
      tempList = [...tempList, {name:value?.name, component:item.component, value: value, Schema:item }]
   
    }   
  
  )

  setlistIndex(index)

  setList({order: [...(props.value)].sort((a,b)=> a.order-b.order)[index].order, value:tempList})
}

} 

     
    switch(props.Schema.CType)   {

        case "string":

                  /************ STRING **********/
                /***********************************/
          return ( 
            <> 
            
            <Container className="fieldDiv">
                <Stack gap={2} className="fieldDiv">
                <Stack direction="horizontal" gap={2} >
                  <span className="tituloField">
                    {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
                  </span>
     
                </Stack>
                
               

                {props.Schema.description}
                
                <Form.Control type="text" value={value.text} onBlur={()=>{updateField()}}
                 onChange={(e) => {if (props.Schema.max >= e.target.value.length)
                   { setValue({text:e.target.value})}}} 
                 maxLength={props.Schema.max} style={{margin:"0px"}} 
                 required= {props.Schema.required} 
                 disabled ={ props.editMode== "editing" && props.Schema.identifier}
                 
                 >
                </Form.Control>

             
                {props.Schema.note}
                </Stack>
                {/*String Editor Modal*/}
            </Container>
                
           

                </>
            )
        
        case "richtext":

                 {/************ RICH TEXT **********/}
                {/***********************************/}


          return (<>
                <Container>
          
                 
                <Stack direction="horizontal" gap={2} >
                    <span className="tituloField">
                      {props.name}</span>
                     
         

                

                      <div className="ms-auto">
                      <Button variant ="primary" onClick={()=>{setValue(props.value);setShow(true)}} className="ms-auto" size="sm" >Bigger Screen</Button>
                      </div>
                      </Stack> 
                      {props.Schema.description}
                      <div onBlur={ ()=>{updateField() }}>

               
                
                      <ReactQuill  theme="snow" 
                        value={value.text}
                        onChange={(v)=>setValue({text:v})} 
                        placeholder={"Add rich text here..."}
                        modules={{ toolbar: toolbarOptions }}
                        style={{height:"300px", marginTop:"10px", marginBottom:"110px" }}  />
                        
                      
                      </div>
                      {props.Schema.note}
             
            </Container>
        
             {/*RichText Editor Modal*/}
             
              <Modal show={show} onHide={()=>setShow(false)} size="xl">
                 <Modal.Header closeButton>
                   <Modal.Title>{props.name}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                    <Container>
                    <Stack gap={3}>
                    {props.Schema.description}
      
                
                      <ReactQuill theme="snow" 
                      value={value.text} 
                      onChange={(v)=>setValue({text:v})} 
                      placeholder={"Add rich text here..."}
                      modules={{ toolbar: toolbarOptions }}
                      style={{height:"400px",
                    
                      marginBottom:"120px"}} />

                    {props.Schema.note}
                      
                        </Stack>
                       
                    </Container>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShow(false)}> Cancel</Button>
                   <Button variant="primary" onClick={ ()=>{updateField(); setShow(false)}}> Save Changes</Button>
                 </Modal.Footer>
            </Modal>
          </>

        )
      
        case "image":

           /************IMAGE*************/
           /************IMAGE*************/
        return(



            <> 
             <Container>
     
             <Stack direction="horizontal" gap={2} >

              <Stack gap={3}>
           
              
            <Stack direction="horizontal" gap={3}  >  <span className="tituloField">
                {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
              </span>
           
              </Stack>
             
            
                {props.Schema.description}
             

                
            
              </Stack>
              <div className="ms-auto"><Button variant="primary" onClick={()=> setShow(true)} size="sm" disabled = { props.editMode== "editing" && props.Schema.identifier}>Edit</Button> </div>
              </Stack>
              <Form.Control type="text" value={value.name }  required= {props.Schema.required} style={{visibility:"hidden", height:"0px", margin:"0px", padding:"0px"}} ></Form.Control>
                <Stack gap={3}>
               
              <Container style={{display:"flex", justifyContent:"center"}}>
             
              
                

               
              
                
                {props.Schema.typeOfFile== "image" ? <>
                  <div   className="fieldImageShowDiv"  style={{marginTop:"20px", boxShadow: "5px 2px 2px grey",  border: "solid 1px ",  display:"flex", justifyContent:"center" }}>

<Stack>
<div style={{justifyContent:"center", position:"relative"}}>
           
             
                { value.name ? 

                
                <img  className="fieldImageShow"  src={import.meta.env.VITE_CONTENT_BUCKET_URL +"/"+ value.name } style={{ objectFit:"cover"}}></img> :
                <img  className="fieldImageShow"  src={noImage}></img>
                }

</div>
                  <div style={{ border: "solid 1px ", height:"80px", padding:"30px", justifyContent:"center", textAlign:"center", position:"relative"}}>
                   file: {value.name} 
                   </div>
                   </Stack>
                   </div>
                </> : 
                
                <div style={{marginTop:"15px"}}>{
                
                value.name ? <>
               
                <img src={fileicon} style= {{height:"50px", marginRight:"10px"}}></img>  
                {value.name} </>
                : <div  style= {{height:"50px"}}></div>  } </div>
                
              }
              
               
                 
        
                
              
             
                </Container>
             </Stack>
          
                </Container>
                
                 {/*Image editor Modal*/}

                <Modal show={show} onHide={()=>setShow(false)} centered size="xl">
                <Modal.Header closeButton>
                <Modal.Title>{props.Schema.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Stack gap={3}>
                {props.Schema.description}
              <Container>
               Select a file:
               <Stack direction="horizontal" gap={3}>
             
              <Form.Control type="file" onChange={handleFileChange} accept={fileAccept(props.Schema.typeOfFile)} style={{width:"75%"}}>
              </Form.Control>
              { noValidatedText !="" ? <div  style={{width:"25%"}}> <span style={{color:"Red"}}>  {noValidatedText}</span></div>  : <div style={{width:"25%"}}></div>}
              </Stack>
              {props.Schema.note}
              
           
            

              
               
                
                {props.Schema.typeOfFile== "image" ? <>

                
                
                
                <div style={{display:"flex", width:"100%", justifyContent:"center"}}>

                <div className= "fieldImageShowDiv" style={{marginTop:"20px", boxShadow: "5px 2px 2px grey",  border: "solid 1px ",  display:"flex", justifyContent:"center" }}>
                <Stack>
                <div style={{justifyContent:"center", position:"relative"}}>
                {showFile  ? <img src={showFile}  className="fieldImageShow"  style={{  objectFit:"cover"}} ></img> : <div  className="fieldImageShow"  style={{ paddingTop:"20%", objectFit:"cover", backgroundColor:"lightgrey", color:"white", fontSize:"50px", textAlign:"center", verticalAlign:"middle"}} >No image selected</div>}
                
                </div>
                <div style={{ border: "solid 1px ", height:"80px", padding:"30px", justifyContent:"center", textAlign:"center", position:"relative"}}>
                file: {tempValue?.name} 
                </div>
                
                </Stack>
                </div>
                </div>
                 </> :
                 <div style={{margin:"20px"}}>
                {tempValue?.name ? <>
                
                <img src={fileicon} style= {{height:"50px", marginRight:"10px"}} ></img>  
                {tempValue?.name} </>
                : <div style= {{height:"50px"}}></div>}
                </div>
              }


              
                 
               

                          <div>
                
              
                
                </div>
                </Container>
             </Stack>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={()=>{setShow(false); setNoValidatedText(""); setTempValue({}); setShowFile()}}>
                 Cancel
               </Button>
               <Button variant="primary" onClick={ async ()=>{ setNoValidatedText(""); await handleUploadClick(); updateFieldImage(); setShow(false)} }> Save Changes</Button>
                
            </Modal.Footer>
          </Modal>
 


            </>
        )

        case "link":
            return ( 
              <> 
              {/**********************LINK***************************/}
                {/*************************************************/}
              <Container>  
                 
                  <Stack gap={3}>
                
                 <Stack direction="horizontal" gap={2} >
                   <span className="tituloField">  {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""}  </span> 
                   
                   </Stack>
                   {props.Schema.description}
                   <Stack direction="horizontal" gap={2}>
                    <InputGroup>
                      <InputGroup.Text> Caption: </InputGroup.Text>
                      <Form.Control required={props.Schema.required} type="text" value={value.caption} onChange={(e) =>{if(props.Schema.max >= e.target.value.length ) setValue({caption: e.target.value, link: value.link})}  }  onBlur={()=>{updateField()}}
                        disabled ={ props.editMode== "editing" && props.Schema.identifier}
                        ></Form.Control>
                      </InputGroup>
                      <InputGroup>
                      <InputGroup.Text> Link: </InputGroup.Text> 
                       <Form.Control required={props.Schema.required } type="url" value={value.link} onChange={(e) => setValue({caption:value.caption , link: e.target.value}) } onBlur={()=>{updateField()}}></Form.Control>
                      </InputGroup>
                    </Stack>
                    {props.Schema.note}
                    </Stack>
                </Container>
              
             

                  </>
              )

              case "selectAttribute":
        
              return ( 
                <> 
                {/******** SELECT ATTRIBUTE **********/}
                {/***********************************/}
                <Container>
                <Stack gap={3}>
                   
                <Stack direction="horizontal" gap={2} >
                
                    <span className="tituloField">    
                    {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
                    </span>
           
                    </Stack>
                 
                            {props.Schema.description}
                            <FloatingLabel label="Select a value">
                            <Form.Select value={value?.value}  onChange={ e => setValue({value: e.target.value})} onBlur={()=>{updateField()}} required={props.Schema.required} disabled ={ props.editMode== "editing" && props.Schema.identifier}>
                              <option></option>
                              {props.Schema.options.map(i =>
                              <option>{i}</option>
                              )}
                            </Form.Select>
                            </FloatingLabel>
                            
                            {props.Schema.note}
                            
                            </Stack>
                     </Container>
                  
    
    
    
                    </>
                )

                case "numberAttribute":
        
                return ( 
                  <> 
                  
                  <Container>
                      
                      <Stack gap={3}>
                      <Stack direction="horizontal" gap={2} >
                     
                      <span className="tituloField">
                      {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
                      </span>
                 
                      
                    
                      </Stack>
                      {props.Schema.description}
                  
                      <Form.Control type="number" required={props.Schema.required} value={value?.value} style={{margin:"0px"}} onBlur={ (e)=>{ (updateField(e))}} onChange={(e)=> setValue({value: e.target.value})} max={props.Schema.max} min={props.Schema.min} disabled ={ props.editMode== "editing" && props.Schema.identifier}>
                      </Form.Control>
              
                      {props.Schema.note}
                      </Stack>
                       </Container>
      
                 
      
      
                      </>
                  )


                  case "memberOf":
        
                  return ( 
                    <> 
                    
                    <Container>
                        
                        <Stack gap={3}>
                        <Stack direction="horizontal" gap={2} >
                        <span className="tituloField">
                        {props.name}
                        </span>
                     
                        <Button variant ="primary" onClick={()=>{setValue(props.value);setShow(true)}} className="ms-auto" size="sm" >Edit</Button>
                       
                        </Stack>
                     
                       
                      
                       
                      
                        
                      

                        <Table>
                          {[...props.value].sort((a,b)=> a.order - b.order).map((i)=><tr><td>{i.order + 1}</td> <td>{i.value}</td></tr> )}
                        </Table>
                        </Stack>
                        
                       
                        
                    
                         </Container>
        
                      {/*MemberOf Editor Modal*/}
        
                        <Modal show={show} onHide={()=>setShow(false)} size="lg">
                     
                             <Modal.Header closeButton>
                              <Modal.Title>{props.Schema.name}: </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Stack gap={3}>
                                
                                {props.Schema.description}
                                <Stack direction="horizontal" gap={3}>
                                <FloatingLabel label="Select a value">
                            <Form.Select style={{minWidth:"150px"}} value={tempValue?.value}  onChange={ e => setTempValue( e.target.value)}>
                              <option></option>
                              {pages.filter(v=> v.Template == props.Schema?.memberOf).map(i =>
                              <option>{i.Page}</option>
                              )}

                           
                            </Form.Select>
                            </FloatingLabel>
                            <Button 
                              variant="outline-primary" 
                              className="modern-add-btn"
                              onClick ={()=>{ if(!value.find( i => i.value==tempValue)) {setValue([...value, {value: tempValue, order: value.length==0 ? 0 : value[value.length -1].order + 1}])}else{setShowWarning(true); setTimeout(()=> setShowWarning(false), 2500)} }}
                            >
                              <i className="bi bi-plus-circle me-2"></i>
                              Add Item
                            </Button>
                           
                            {showWaring ? <div> that item alrady exist</div> : ""}
                            </Stack>
                                {props.Schema.note}
                                
                         
                                <Table>
                                 
                             
                              
                            {value?.length > 0 ? <> {[...value].sort((a,b)=> a.order - b.order).map((i, ind) => <tr> <td style={{minWidth:"20px"}}>{ind!=0 ? <Button size="sm" onClick={()=>{ let t = structuredClone([...value].sort((a,b)=> a.order- b.order)); t[ind].order = [...value].sort((a,b)=>a.order - b.order)[ind -1].order; t[ind -1].order = [...value].sort((a,b)=>a.order - b.order)[ind].order; setValue(t)   }}>^</Button> :""} </td><td> {i.value} </td><td><Button variant= "primary" size="sm" onClick={()=> setValue(value?.filter(j=> i!=j) )}>X</Button></td> </tr>)}</>:""}
                                  

                            </Table>
                               </Stack>
                              
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={()=> { updateField(); setShow(false)}} > Save Changes</Button>
                                 <Button  variant="secondary" onClick={()=>setShow(false)}>
                                    Cancel
                            </Button>
                            
                          </Modal.Footer>
                         
                        </Modal>
        
        
                        </>
                    )
                    case "memberOfS":
        
                    return ( 
                      <> 
                      {/******** SELECT ATTRIBUTE **********/}
                      {/***********************************/}
                      <Container>
                      <Stack gap={3}>
                         
                      <Stack direction="horizontal" gap={2} >
                      
                          <span className="tituloField">    
                          {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
                          </span>
                       
                          </Stack>
                       
                                  {props.Schema.description}
                                  <FloatingLabel label="Select a value">
                                  <Form.Select value={value?.value}  onChange={ e => setValue({value: e.target.value})} onBlur={()=>{updateField()}} required={props.Schema.required} disabled ={ props.editMode== "editing" && props.Schema.identifier}>
                                    <option></option>
                                    {pages.filter(v=> v.Template == props.Schema?.memberOf).sort((a,b)=> (a.Page).localeCompare( b.Page )).map(i =>
                                     <option>{i.Page}</option>
                                     )}
                                  </Form.Select>
                                  </FloatingLabel>
                                  
                                  {props.Schema.note}
                                  
                                  </Stack>
                           </Container>
                        
          
          
          
                          </>
                      )

        case "color":
          return ( 
            <> 
            
            <Container>
                <Stack gap={2}>
                <Stack direction="horizontal" gap={2} >
                  <span className="tituloField">
                    {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
                  </span>
              
                </Stack>
                
               

                {props.Schema.description}
                
                <Form.Control type="color" value={value.value} onBlur={ (e)=>{ updateField()}}
                 onChange={(e) =>  setValue({value:e.target.value})}
                 style={{margin:"0px"}} 
                 required= {props.Schema.required} 
                 
                 >
                </Form.Control>

             
                {props.Schema.note}
                </Stack>
                {/*String Editor Modal*/}
            </Container>
                
           

                </>
            )

            case "date":

            /************ DATE **********/
          /***********************************/
    return ( 
      <> 
      
      <Container>
          <Stack gap={2}>
          <Stack direction="horizontal" gap={2} >
            <span className="tituloField">
              {props.name} {props.Schema.required ? <span style={{color:"red"}}> * </span> : ""} 
            </span>
         
          </Stack>
          
         

          {props.Schema.description}
          
          <Form.Control type={props.Schema.typeOfDate} value={value.value} onBlur={()=>{updateField()}}
           onChange={(e) =>  { setValue({value:e.target.value})}} 
           max={props.Schema.max}   min={props.Schema.min} style={{margin:"0px"}} 
           required= {props.Schema.required} disabled ={ props.editMode== "editing" && props.Schema.identifier}
           
           >
          </Form.Control>

       
          {props.Schema.note}
          </Stack>
          {/*String Editor Modal*/}
      </Container>
          
     

          </>
      )
  

        case "listComponents":
                return ( 
                  <> 

              
                
                  <Container style={{border:'2px solid rgba(0, 0, 0, 0.2)', padding:"20px"}}>
                    <Stack direction="horizontal"> 
                  <span className="tituloField" >
                  {props.Schema.name}: </span> <div className="ms-auto">
                      <Button 
                        variant="outline-success" 
                        className="modern-add-btn"
                        onClick={()=>{   loadNewList(props.Schema); setAction("Add"); setShow(true)}} 
                        disabled={(props.Schema.max <= props.value.length) && props.Schema.max} 
                        size="sm"
                      > 
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Component
                      </Button>
                      </div>
                      </Stack>
                        <hr/>
                       
                
                       {[...(props.value)]?.sort((a,b)=> a.order - b.order).map((item, index)=>
                       <>
                        <Stack gap={3} direction="horizontal">
                        <div style={{minWidth:"32px"}}>
                        {index > 0 ? <Button variant = "primary" size="sm" onClick={()=> moveup(props.Schema,props.vaule, index)}>^</Button> : ""}
                        </div>
                        <div>
                          {item.order + 1}:  
                        </div>
                        <div>
                          
                          {stringForListComponent(item.value)}  <img src={import.meta.env.VITE_CONTENT_BUCKET_URL +"/"+stringForListComponent(item.value)} style={{height:"150px", marginRight:"10px"}}></img>
                          
                        </div>
                        <div className="ms-auto">
                          ( <button type="button" className="buttonSelectPage"   onClick ={()=>{loadList(props.Schema, index); setAction("Edit"); setShow(true)}}  > Edit</button> | <button type="button" className="buttonSelectPage"  onClick={()=>{setlistIndex(index);setShowConfirmDelete(true)}}>Delete</button> ) 
                          
                        </div>
                        </Stack>
                        <hr/> 
                        </> )  } 
                       </Container>

   {/*<Field Schema={components.find(((i) => i.component == item.component ))}  value={selectedPage.values.find((v)=> v.component == item.component)  ?   selectedPage.values.find((v)=> v.name == item.name).value : emptyField(item.CType)   }      ></Field> */}

                       {/*List Components Editor Modal*/}
                      
                       <Modal show={show} onHide={()=>setShow(false)} size="xl" fullscreen >
                        
                <Modal.Header closeButton>

                <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <Container className="form">  
                    <Stack gap={3}>
                 
                      
                  { [...(list.value)]?.sort((a,b)=> a.Schema.order - b.Schema.order).map((item) => 
                    <>
                    <Field Schema={item.Schema} name={item.Schema.name}  component={item.component} value={item.value} onUpdate={editList} onAddItem={addList} onUpdateList={updatelist} onDeleteItem={deleteItem} onMoveUp={movingUp} subComponent={true} > </Field>   <hr/>
                    </>
                   )}
                   </Stack>
                </Container>
            

        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
               Cancel
            </Button>
            <Button variant="primary" onClick={ ()=>{ addListComponent();setShow(false);}}>
                {action == "Add" ? <div>Add </div>: <div> Save</div>}
            </Button>
          </Modal.Footer>
                      </Modal>

<Modal show={showConfirmDelete} onHide={()=>setShowConfirmDelete(false)}>
                     <Modal.Header closeButton>
                      <Modal.Title>Delete field list </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this list component?
                        

                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={()=>{setShowConfirmDelete(false)}}>
                            No
                    </Button>
                    <Button variant="primary" onClick={()=>{clickDelete(props.Schema, listIndex);setShowConfirmDelete(false)}}>
                       Yes 
                     </Button>
                  </Modal.Footer>
                </Modal>

                      </>
                  )
        }

    }


export default Field