import { useState, useRef, Component } from "react";
import { useAppSelector } from "../hooks";
import { Modal, Stack, Form, Button, Container, FloatingLabel, InputGroup} from "react-bootstrap";
import {updateSelectedPage, savePageAction} from "./editorSlice"
import { useAppDispatch } from "../hooks";
import {Col, Row} from "react-bootstrap";
import './editor.css'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";
import { uploadImage } from "./editorService";
import fileicon from '../assets/FILE.png'

import {Badge, CloseButton, Table} from "react-bootstrap";




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
  const [uniquename, setUniquename] = useState("")
  

 

function emptyField(type){

    switch (type) {
        case "string":
          return {text: ""}
         
        case "richtext":
            return {text: ""}
         
        case "link":
            return {caption: "", link:""}
            
        case "image":
            return {file: {}, name:""}
               
        case "listComponents":
            return []

        case "numberAttribute":
              return {value:0}
        
        case "memberOf":
              return{value:[]}
          
    }   
}

function updateField (){ // actualiz un field de una lista

  if (props.onUpdate){ // pertence a una lista
    props.onUpdate(props.Schema, value)
  }
  else{ // pertenece a a la pagina
 
  const temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component,  value:value}];


  dispatch(updateSelectedPage(temp))
  dispatch(savePageAction({...selectedPage, values:temp}))
  setValue({})
  }
}

function stringForListComponent(item){ // esta funcion se utiliza para presentar un item  de lista de compomente

  let value ="";

  if (!item){item =[]}

  [...item].filter(a=> a.Schema.identifier==true).map( (i)=> 
   
    
    {
     
      switch (i.Schema?.CType) {
      case "string":
        value =  i.value.text
        break;
      case "richtext":
        value += i.name + ": Richt text; "
        break
      case "image":
        value += i.name + ": " +i.value.name + "; ";
        break
      case "image":
          value += i.name + ": "+ i.value.name + "; ";
          break
      case "link":
          value += i.name + ": "+ i.value.caption + "; ";
          break
      case "listComponents":
          value += i.name + ": Fields;  ";
            break
      case "attributeSelect":
          value += i.value.value ;
          break
      case "numberAttribute":
          value += i.value.value
          break
      

      
    }

  }

  )


  return ("["+ value +"]")
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


  console.log("to deletev " + Object.keys(  [...(selectedPage.values.find(i=> i.component == props.component)?.value)].sort((a,b)=> a.order - b.order)))
  let temp1 = [...(selectedPage.values.find(i=> i.component == props.component)?.value)].sort((a,b)=> a.order - b.order).filter((_,ind)=> ind != index)


  console.log("temp " + [...temp1].order)
  let res =[]
  let copy = [...temp1]

  let  v= copy.map((i, index)=>{
    let v = {...i}
    v.order = index;
    res.push(v)
  })


    const temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema:props.Schema,  value: res }]
    dispatch(updateSelectedPage(temp)) // edita la pagina actual
    dispatch(savePageAction({...selectedPage, values:temp})) // guarda los datos.
  
  }
   

  console.log ([...selectedPage.values.find(i => i.component == props.component)?.value].sort((a,b)=>a.order -b.order)[index].order -1)
}

function moveup(schema, value, index){
 // setList ({order:list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value:[...list.value?.find((i)=> i.component == schema.component).value.filter((_,ind)=> ind != index),  {order: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index].order) -1 , value: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index].value)}]}]}) 
  //setList ({order:list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value:[...list.value?.find((i)=> i.component == schema.component).value.filter((_,ind)=> ind != index),  {order: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index].order) , value: (list.value.find(i => i.component == schema.component).value.sort((a,b)=> a.order - b.order)[index -1].value)}]}]}) 
  if (selectedPage.values.find(i=> i.component == props.component)){

    console.log ("lista pertenece a la pagina")
    console.log ([...selectedPage.values.find(i => i.component == props.component).value].sort((a,b)=>a.order -b.order)[index].order -1)
    console.log ([...selectedPage.values.find(i => i.component == props.component).value].sort((a,b)=>a.order -b.order)[index -1].value)
    dispatch(savePageAction({...selectedPage, values:[...selectedPage.values.filter(i => i.component != props.component),{ name:props.name, component:props.component, value:[...selectedPage.values.find(i => i.component == props.component).value.filter(i => i.order != index && i.order != index -1 ), {value:[...selectedPage.values.find(i => i.component == props.component).value].sort((a,b)=>a.order -b.order)[index -1].value ,order: index}, {value: [...selectedPage.values.find(i => i.component == props.component).value].sort((a,b)=>a.order -b.order)[index].value, order:index -1} ]}]}))
    
           
  //  console.log("add list compomenet - Liadd from naive " + selectedPage.values.find(i=> i.component == props.component)?.value.length)
     //    temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema: props.schema, value: [...selectedPage.values.find(i=> i.component == props.component)?.value, {order:selectedPage.values.find(i=> i.component == props.component)?.value.length, value:list.value}] }];

  }
  else{
   
  
    props.onMoveUp(props.Schema, index, props.value)
    }

   
 // dispatch(savePageAction({...selectedPage, values:temp})) // se guara los camnios en selected page. - Esto solo pasa cuando la lista de componentes depende directamente de la pagina.
}

function movingUp(schema, index, value){
  console.log (props)

  console.log(list)
  console.log(list.value.find(i => i.Schema.component == schema.component).value[index].order)
  console.log("aaa:" + value[index].order)
  setList({name: list.name, component:list.component, order:list.order, value:[...list.value.filter( i => i.Schema.component != schema.component), {Schema:schema, name: schema.name, component:schema.component, value: [...value.filter(i => i.order!=index &&  i.order!=index-1), {order: index, value: value.find(i => i.order == index-1).value}, {order: index-1, value: value.find(i=> i.order == index).value}] } ]})
 // setList([...list.filter( i => i.Schema != component),  {schema : schema, name: schema.name, component: schema.component, value: [...(value.filter(i => i.order == index && i.order =- index-1)), {order: index, value: value.find(i.order = index-1).value}, {order:index -1, value: value.find( i => i.order == index).value }] } ])

}


function updatelist(schema, value, index) // esta funcion edita un elemento de una lista de compoenentes
{

  console.log("update: " + index)
    console.log("updaeList: " + list.order)
   console.log("updateList: " + [...list.value.find(i => i.component == schema.component).value].sort((a,b)=> a.name - b.name)[index].order)
   console.log(schema.component)

    setList ({order:list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value:[...[...(list.value?.find((i)=> i.component == schema.component).value)].sort((a,b)=> a.order - b.order).filter((_,ind)=> ind != index),  {order: [...list.value.find(i => i.component == schema.component).value].sort((a,b)=> a.order - b.order)[index].order, value: value.value}]}]})  

}

function deleteItem (schema, index) // Esta funcion elimina un item de la lista 
{ 

  console.log("deleteList: " + list.order)

  let temp =  list.value?.find( (i)=> i.component == schema.component)?.value.sort((a,b)=> a.order - b.order).filter((_,ind)=> ind != index)
  console.log("temp " + [...temp][0].order)
  let res =[]
  let copy = [...temp]

  let  v= copy.map((i, index)=>{
    let v = {...i}
    v.order = index;
    res.push(v)
  })
  console.log (v)
  setList ({order: list.order, value:[...list.value?.filter((i)=> i.component != schema.component), {name: schema.name, component: schema.component, Schema: schema, value: res }]})


}


function addListComponent(){

  // Este funcion se ejecuta cuando alguin hace click en ADD button in la formulario de edicion de lista de components.

  let temp  = []
  
  
  if (action=="Add") {
// si el formularion de edicion esta en modo "anadir" se inicia el proces para anadir un nuevo item a la lista de components.

  
       if (props.component != selectedPage.Template + "/" + props.name){
            // Si se trata de una lista de componentes hija de una lista de components

                  props.onAddItem(props.Schema, list) // se llama a la funcion para anadir un nuveo item en la lista
           }

      else{
         // si la lista de components es miembra directo de la pagina se edita directamente el selectedPage State.
          if (selectedPage.values.find(i=> i.component == props.component)){
           
            console.log("add list compomenet - add from naive " + selectedPage.values.find(i=> i.component == props.component)?.value.length)
                 temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema: props.schema, value: [...selectedPage.values.find(i=> i.component == props.component)?.value, {order:selectedPage.values.find(i=> i.component == props.component)?.value.length, value:list.value}] }];
 
          }
          else{

                temp =  [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, value:  [{order: 3 , value:list.value  }] }]
          }
      
           
        dispatch(savePageAction({...selectedPage, values:temp})) // se guara los camnios en selected page. - Esto solo pasa cuando la lista de componentes depende directamente de la pagina.
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

      console.log("edut in the fir " + Object.keys(selectedPage.values.find(i=> i.component == props.component)?.value[0]))

      temp  = [...selectedPage.values.filter(item => item.component != props.component), {name: props.name, component: props.component, Schema:props.Schema,  value: [...[...(selectedPage.values.find(i=> i.component == props.component)?.value)].sort((a,b)=>a.order - b.order).filter((_,ind)=> ind != listIndex), list] }];
     
      dispatch(savePageAction({...selectedPage, values:temp})) // se guarda la nueva selected page directamente en la base de datos

    }


  }

}

function editList(schema, value) // esta funcion edita un componente de una lista de componentes. (RENAME)
 { 
  console.log("index " + listIndex )
  console.log("lo: "+ list.order)
  console.log ("edit list: " + [...(props.value)]?.sort((a,b)=>a.order-b.order)[listIndex]?.order )
  console.log("long: " +  props.value)
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
    console.log(e.target.files[0].size)
    setValue({name:(e.target.files[0].name.split(".")[0]) + (10000 +  Math.round(  100000 * Math.random())).toString() + "." + (e.target.files[0].name.split(".")[1]) });
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
     value = ".jpg,.jpeg,.png,.svg,.webp"
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

const handleUploadClick = () => {


  if (file) { 
     
     
      uploadImage(file, value.name)
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
              tempList = [...tempList, {name:item.name, component:item.component, value:{text:""}, Schema:item }]
              break;
            case "richtext":
              tempList = [...tempList, {name:item.name, component:item.component, value:{text:""}, Schema:item }]
              break;
            case "link":
                tempList = [...tempList, {name:item.name, component:item.component, value:{caption:"", link:""}, Schema:item }]
                break;
            case "image":
                    tempList= [...tempList, {name:item.name,component:item.component,  value:{file:""}, Schema:item }]
                    break;
            case "listComponents":
                tempList = [...tempList, {name:item.name,component:item.component,  value:[], Schema:item }]
                break;
            case "selectAttribute":
                  tempList = [...tempList, {name:item.name, component:item.component, value:{value:""}, Schema:item }]
                  break;
            case "numberAttribute":
                  tempList = [...tempList, {name:item.name, component:item.component, value:{value:0}, Schema:item }]
                   break;
            case "memberOf":
                    tempList = [...tempList, {name:item.name, component:item.component, value:{value:[]}, Schema:item }]
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
     
      const value = [...(props.value)].sort((a,b)=> a.order - b.order)[index].value?.find(v => v.component == item.component) ? [...(props.value)].sort((a,b)=> a.order - b.order) [index].value?.find((v) => v.component == item.component ).value  : emptyField(item.CType) // si hay valor se anade el valor si not se pone un valor empty
      tempList = [...tempList, {name:value?.name, component:item.component, value: value, Schema:item }]
   
    }   
  
  )

  setlistIndex(index)
  console.log("loadlist: " + [...(props.value)].sort((a,b)=> a.order-b.order)[index].order)
  setList({order: [...(props.value)].sort((a,b)=> a.order-b.order)[index].order, value:tempList})
}

} 
     
    switch(props.Schema.CType)   {

        case "string":
        
          return ( 
            <> 
            
            <Container>
                
                  <Row stye={{width:"100%"}}>
                <Col>
                (String)
                </Col>
                <Col>
                <span className="tituloField">
                {props.name}:
                </span>
                </Col>
                 <Col  xl={8} style={{padding:"0px"}} >

                
                
                <Form.Control type="text" value={props.value.text} readOnly  disabled maxLength={props.Schema.max} style={{margin:"0px"}} >
                </Form.Control>
          
                </Col>
                <Col>
                <Button onClick={()=>{setValue(props.value);setShow(true)}} className="ms-auto" size="sm" >Edit</Button>
                </Col>
                </Row>
                 </Container>

              {/*String Editor Modal*/}

                <Modal show={show} onHide={()=>setShow(false)}>
                     <Modal.Header closeButton>
                     
                      <Modal.Title>{props.Schema.name}: </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Stack gap={3}>
                        {props.Schema.description}
                        <Form.Control type="text" value={value.text} onChange={(e) => {if (props.Schema.max >= e.target.value.length) { setValue({text:e.target.value})}}} maxLength={props.Schema.max}>
                        </Form.Control>
                        {props.Schema.note}
                        </Stack>

                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={()=>setShow(false)}>
                            Cancel
                    </Button>
                    <Button variant='primary' onClick={ ()=>{updateField(); setShow(false)}}> Save Changes</Button>
                  </Modal.Footer>
                </Modal>


                </>
            )
        
        case "richtext":

          return (<>
                <Container>
                    <Row>
                    <Col>(Rich Text)</Col>

                      <Col>
                      <span className="tituloField">{props.name}:</span>
                      </Col>
                      <Col  xl={8} style={{padding:"0px"}} >
             <Form.Control type="text"  value={props.value.text} readOnly  disabled>
             </Form.Control>
             </Col>
             <Col>
             <Button onClick={()=>{setValue(props.value);setShow(true)}} className="ms-auto" size="sm" >Edit</Button>
             </Col>
             </Row>
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
                      {/*<ReactQuill theme="snow" value={props.value.text} onChange={setValue} />*/}
                      <ReactQuill theme="snow" value={value.text} onChange={(v)=>setValue({text:v})} style={{height:"400px", marginBottom:"50px"}} />
                        </Stack>
                    </Container>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShow(false)}> Cancel</Button>
                   <Button variant='primary' onClick={ ()=>{updateField(); setShow(false)}}> Save Changes</Button>
                 </Modal.Footer>
            </Modal>
          </>

        )
      
        case "image":
        return(
            <> 
             <Container>
                <Row>
             
            <Col> (File)</Col>
             <Col>
              <span className="tituloField">
                {props.name}:
              </span>
             </Col>   
             <Col  xl={8} style={{padding:"0px"}} >
                <Form.Control type="text" value={props.value.name} readOnly  disabled>
                </Form.Control>
                   {props.value.text}</Col>
                   <Col>
                   <Button onClick={()=>{setValue(props.value);setShow(true)}} className="ms-auto" size="sm"  >Edit</Button>
                </Col>
                </Row>
                </Container>

                 {/*Image editor Modal*/}

                <Modal show={show} onHide={()=>setShow(false)} size="xl">
                <Modal.Header closeButton>
                <Modal.Title>{props.Schema.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Stack gap={3}>
                {props.Schema.description}
              <Container>
               Select a file:
              <Form.Control type="file" onChange={handleFileChange} accept={fileAccept(props.Schema.typeOfFile)}>
              </Form.Control>
              {props.Schema.note}
              <br/>
              <br></br>

                { noValidatedText !="" ? <span style={{color:"Red"}}>  {noValidatedText}</span> :
                <>
                
                {props.Schema.typeOfFile== "image" ? <>
                
                file: {value.name} 
                <br></br>
                <img src={showFile} style={{height: "200px"}}></img>  </> :
                value.name ? <>
                <img src={fileicon} style= {{height:"50px"}}></img>  
                {value.name} </>
                : ""
                
              }
                
                 </>
                 
                }
                

                          <div>
                
              
                
                </div>
                </Container>
             </Stack>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={()=>{setShow(false); setNoValidatedText("")}}>
                 Cancel
               </Button>
               <Button variant='primary' onClick={ ()=>{ setNoValidatedText(""); handleUploadClick(); updateField(); setShow(false)} }> Save Changes</Button>
                
            </Modal.Footer>
          </Modal>
 


            </>
        )

        case "link":
            return ( 
              <> 
              
              <Container>  
                 
                  <Row >
        
                   <Col> (Link) </Col>
                   <Col><span className="tituloField">  {props.name}: </span> </Col>
                   
                   <Col  xl={8} style={{padding:"0px"}} >
                   <Stack direction="horizontal" gap={2}>
                    <InputGroup>
                      <InputGroup.Text> Caption: </InputGroup.Text><Form.Control type="text" value={props.value.caption}  readOnly  disabled></Form.Control>
                      </InputGroup>
                      <InputGroup>
                      <InputGroup.Text> Link: </InputGroup.Text>  <Form.Control type="text" value={props.value.link} readOnly  disabled></Form.Control>
                      </InputGroup>
                    </Stack>
                    </Col>
                    <Col>
                    <Button variant='primary' onClick={()=>{setShow(true); setValue(props.value)}} size="sm" >Edit</Button>
                    </Col>
                  </Row>
                </Container>

                 {/*link editor Modal*/}

                <Modal show={show} onHide={()=>setShow(false)} >
                <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <Container>  
                      <Stack gap={3}>
                  {props.Schema.description}:  
                  <Stack gap={3} direction="horizontal">
                  <div style={{width:"150px"}}> Caption: </div> 
                    <Form.Control type="text" value={value.caption} onChange={(e) =>{if(props.Schema.max >= e.target.value.length ) setValue({caption: e.target.value, link: value.link})}  }>
                    </Form.Control>
                    </Stack>
                    <Stack gap={3} direction="horizontal">
                    <div style={{width:"150px"}}> Link: </div>
                    <Form.Control type="text" value={value.link} onChange={(e) => setValue({caption:value.caption , link: e.target.value}) }>
                    </Form.Control>
                    
                  </Stack>
                  {props.Schema.note}
                  </Stack>
                </Container>
            

</Modal.Body>
<Modal.Footer>
    <Button variant="secondary" onClick={()=>setShow(false)}>
       Cancel
</Button>
<Button variant='primary' onClick={()=>{updateField(); setShow(false)}}>
 Save Changes
</Button>
</Modal.Footer>
</Modal>

                  </>
              )

              case "selectAttribute":
        
              return ( 
                <> 
                
                <Container>
                    
                      <Row stye={{width:"100%"}}>
                    <Col>
                    (String)
                    </Col>
                    <Col>
                    <span className="tituloField">
                    {props.name}:
                    </span>
                    </Col>
                    <Col  xl={8} style={{padding:"0px"}} >
                    
                    <Form.Control type="text" value={props.value?.value} readOnly  disabled style={{margin:"0px"}}>
                    </Form.Control>
                   
                    </Col>
                    <Col>
                    <Button onClick={()=>{setValue({value: props.value?.value});setShow(true)}} className="ms-auto" size="sm" >Edit</Button>
                    </Col>
                    </Row>
                     </Container>
    
                  {/*SelectAttribute Editor Modal*/}
    
                    <Modal show={show} onHide={()=>setShow(false)} size="lg">
                         <Modal.Header closeButton>
                          <Modal.Title>{props.Schema.name}: </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Stack gap={3}>
                            {props.Schema.description}
                            <FloatingLabel label="Select a value">
                            <Form.Select value={value?.value}  onChange={ e => setValue({value: e.target.value})}>
                              <option></option>
                              {props.Schema.options.map(i =>
                              <option>{i}</option>
                              )}
                            </Form.Select>
                            </FloatingLabel>
                            
                            {props.Schema.note}
                            
                            </Stack>
                            
                        </Modal.Body>
                        <Modal.Footer>
                             <Button variant="secondary" onClick={()=>setShow(false)}>
                                Cancel
                        </Button>
                        <Button variant='primary' onClick={ ()=>{updateField(); setShow(false)}}> Save Changes</Button>
                      </Modal.Footer>
                    </Modal>
    
    
                    </>
                )

                case "numberAttribute":
        
                return ( 
                  <> 
                  
                  <Container>
                      
                        <Row stye={{width:"100%"}}>
                      <Col>
                      (Numeric attribute)
                      </Col>
                      <Col>
                      <span className="tituloField">
                      {props.name}:
                      </span>
                      </Col>
                      <Col  xl={8} style={{padding:"0px"}} >
                      
                      <Form.Control type="number" value={props?.value?.value} readOnly  disabled style={{margin:"0px"}}>
                      </Form.Control>
                
                      </Col>
                      <Col>
                      <Button onClick={()=>{setValue(props.value);setShow(true)}} size="sm" className="ms-auto">Edit</Button>
                      </Col>
                      </Row>
                       </Container>
      
                    {/*Numeric Editor Modal*/}
      
                      <Modal show={show} onHide={()=>setShow(false)}>
                      <Form onSubmit={(e)=>{ e.preventDefault(); updateField(); setShow(false)}}>
                           <Modal.Header closeButton>
                            <Modal.Title>{props.Schema.name}: </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Stack gap={3}>
                              
                              {props.Schema.description}
                              <Form.Control type="number" value={value?.value} onChange={(e) => {setValue({value:e.target.value}) } } max={props.Schema.max} min={props.Schema.min}>
                              </Form.Control>
                              
                              {props.Schema.note}
                              </Stack>
                           
                          </Modal.Body>
                          <Modal.Footer>
                          <Button variant='primary' type="submit" > Save Changes</Button>
                               <Button  variant="secondary" onClick={()=>setShow(false)}>
                                  Cancel
                          </Button>
                          
                        </Modal.Footer>
                        </Form>
                      </Modal>
      
      
                      </>
                  )


                  case "memberOf":
        
                  return ( 
                    <> 
                    
                    <Container>
                        
                          <Row stye={{width:"100%"}}>
                        <Col>
                        (Member of)
                        </Col>
                        <Col>
                        <span className="tituloField">
                        {props.name}:
                        </span>
                        </Col>
                        <Col>
                        <Button onClick={()=>{setValue(props.value);setShow(true)}} className="ms-auto" size="sm">Edit</Button>
                      
                        </Col>
                        </Row>
                        
                        
                      

                        <Table>
                          {[...props.value].sort((a,b)=> a.order - b.order).map((i)=><tr><td>{i.order + 1}</td> <td>{i.value}</td></tr> )}
                        </Table>
                  
                       
                        
                    
                         </Container>
        
                      {/*MemberOf Editor Modal*/}
        
                        <Modal show={show} onHide={()=>setShow(false)} size="lg">
                        <Form onSubmit={(e)=>{ e.preventDefault(); updateField(); setShow(false)}}>
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
                            <Button onClick ={()=>{ if(!value.find( i => i.value==tempValue)) {setValue([...value, {value: tempValue, order: value.length==0 ? 0 : value[value.length -1].order + 1}])}else{setShowWarning(true); setTimeout(()=> setShowWarning(false), 2500)} }}>Add</Button>
                           
                            {showWaring ? <div> that item alrady exist</div> : ""}
                            </Stack>
                                {props.Schema.note}
                                
                         
                                <Table>
                                 
                             
                              
                            {value?.length > 0 ? <> {[...value].sort((a,b)=> a.order - b.order).map((i, ind) => <tr> <td style={{minWidth:"20px"}}>{ind!=0 ? <Button size="sm" onClick={()=>{ let t = structuredClone([...value].sort((a,b)=> a.order- b.order)); t[ind].order = [...value].sort((a,b)=>a.order - b.order)[ind -1].order; t[ind -1].order = [...value].sort((a,b)=>a.order - b.order)[ind].order; setValue(t)   }}>^</Button> :""} </td><td> {i.value} </td><td><Button size="sm" onClick={()=> setValue(value?.filter(j=> i!=j) )} size="sm">X</Button></td> </tr>)}</>:""}
                                  

                            </Table>
                               </Stack>
                              
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant='primary' type="submit" > Save Changes</Button>
                                 <Button  variant="secondary" onClick={()=>setShow(false)}>
                                    Cancel
                            </Button>
                            
                          </Modal.Footer>
                          </Form>
                        </Modal>
        
        
                        </>
                    )
  

        case "listComponents":
                return ( 
                  <> 
                <span className="tituloField">
                {props.Schema.name}: </span> <br/>
                  <Container style={{border:'2px solid rgba(0, 0, 0, 0.2)', padding:"20px"}}>
                      <Button onClick={()=>{   loadNewList(props.Schema); setAction("Add"); setShow(true)}} disabled={(props.Schema.max <= props.value.length) && props.Schema.max} size="sm" > Add </Button>
                        <hr/>
                       
                       
                       {props.value ? [...(props.value)]?.sort((a,b)=> a.order - b.order).map((item, index)=>
                       <>
                        <Stack gap={3} direction="horizontal">
                        <div style={{minWidth:"32px"}}>
                        {index > 0 ? <Button size="sm" onClick={()=> moveup(props.Schema,props.vaule, index)}>^</Button> : ""}
                        </div>
                        <div>
                          {item.order + 1}:  
                        </div>
                        <div>
                          {stringForListComponent(item.value)} 
                        </div>
                        <div className="ms-auto">
                          ( <button className="buttonSelectPage"   onClick ={()=>{loadList(props.Schema, index); setAction("Edit"); setShow(true)}}  > Edit</button> | <button className="buttonSelectPage"  onClick={()=>{setlistIndex(index);setShowConfirmDelete(true)}}>Delete</button> ) 
                          
                        </div>
                        </Stack>
                        <hr/> 
                        </> ): } 
                       </Container>

   {/*<Field Schema={components.find(((i) => i.component == item.component ))}  value={selectedPage.values.find((v)=> v.component == item.component)  ?   selectedPage.values.find((v)=> v.name == item.name).value : emptyField(item.CType)   }      ></Field> */}

                       {/*List Components Editor Modal*/}
                      
                       <Modal show={show} onHide={()=>setShow(false)} size="xl">
                <Modal.Header closeButton>

                <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <Container>  
                    <Stack gap={3}>
                      {list.order}
                      
                  { [...(list.value)]?.sort((a,b)=> a.Schema.order - b.Schema.order).map((item) => 
                    
                    <Field Schema={item.Schema} name={item.Schema.name}  component={item.component} value={item.value} onUpdate={editList} onAddItem={addList} onUpdateList={updatelist} onDeleteItem={deleteItem} onMoveUp={movingUp} > </Field>
                    
                   )}
                   </Stack>
                </Container>
            

        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
               Cancel
            </Button>
            <Button variant='primary' onClick={ ()=>{ addListComponent();setShow(false);}}>
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
                    <Button variant='primary' onClick={()=>{clickDelete(props.Schema, listIndex);setShowConfirmDelete(false)}}>
                       Yes 
                     </Button>
                  </Modal.Footer>
                </Modal>

                      </>
                  )
        }

    }


export default Field