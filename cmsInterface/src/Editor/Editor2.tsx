import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect, useState } from "react"
import { Container, Stack, Modal, Form, Button, Col,Row } from "react-bootstrap"
import { loadSchemas, selectSchema } from "../Schema/schemaSlice"
import "./editor.css"
import { loadPages, addPageAction, selectPageAction,  deletePageAction} from "./editorSlice"
import Field from "./Fields"
import {  iSchemaPage } from "../types"

import Home from "../Pages/home"
import About from '../Pages/about'
import Product from "../Pages/product"
import Staff from "../Pages/staff"
import News from "../Pages/news"
import Web from "../Pages/web"
import Inicio from "../Pages/inicio"
import {FloatingLabel, Table} from "react-bootstrap"
import { Toast } from "react-bootstrap"

function Editor(){     
    


const templates =useAppSelector((state)=>state.schema.pages )
const pages =useAppSelector((state)=>state.editor.pages )
const selectedPage = useAppSelector((state)=>state.editor.selectedPage)


const [show, setShow] = useState(false)
const [showPreview, setShowPreview] = useState(false)
const [newPageName, setNewPageName] = useState("")
const [newPageTemplate, setNewPageTempalate] = useState("")


const [Page, setPage]  = useState({fields:[]})
const [validated, setValidated] = useState(false);
const [showConfirmDelete, setShowConfirmDelete] = useState(false)
const dispatch = useAppDispatch()
const loading = useAppSelector((state) => state.editor.loading)
const [filterName, setFilterName] = useState("")
const [filterTemplate, setFilterTemmplate] = useState("")
const [showFilter, setShowFilter] = useState(false)


function filterPages(){
    let temp = pages
    if (filterTemplate != ""){
        temp = pages.filter(i => i.Template == filterTemplate)
    }
    if (filterName!=""){
        temp = temp.filter(i=> i.Page.includes(filterName))
    }
    return temp
}


function clickOnCreatePage(event){

        console.log("onclock")
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          
          event.stopPropagation();
        }
       

        else {
            dispatch(addPageAction({Page:newPageName, Template: newPageTemplate})) ;
            setShow(false)

        }
        setValidated(true);

        
      };


function emptyField(type : string){

    switch (type) {
        case "string":
          return {text: ""}
         
        case "richtext":
            return {text: ""}
         
        case "link":
            return {caption: "", link:""}
            
        case "image":
            return {file: ""}
               
        case "listComponents":
            return {value:[]}
        case "memberOf":
            return []
              
          
}
}




function loadNewPage() {
    let tempPage : iPage[]   =[]
    components.map((item) =>
    { 
        let d
        console.log("valuesa: " + selectedPage?.values)
        if (selectedPage?.values.find(v=> v.name==item.name ) ){
            d = selectedPage?.values.find(l=> l.name==item.name )
        }
        else d = {value: {text:""}}

        switch (item.CType) {
            case "string":
              tempPage = [...tempPage, {name:item.name, value:d.value, Schema:item }]
              break;
            case "richtext":
              tempPage = [...tempPage, {name:item.name, value:d.value, Schema:item }]
              break;
            case "link":
                tempPage = [...tempPage, {name:item.name, value:d.value, Schema:item }]
                break;
            case "image":
                    tempPage = [...tempPage, {name:item.name, value:d.value, Schema:item }]
                    break;
            case "listComponents":
                tempPage = [...tempPage, {name:item.name, value:d.value, Schema:item }]
                break;
            case "memberOf":
                tempPage = [...tempPage, {name:item.name, value:{value:[]}, Schema:item }]
                    break;
            
        }
    }
    )
    setPage({fields:tempPage})
}



const components = useAppSelector((state)=> state.schema.components)

useEffect(() => {dispatch(loadPages())},[])
useEffect(() => {dispatch(loadSchemas())},[])
useEffect(()=> {loadNewPage()},[selectedPage])

    return (
    <>
    <h3> Editor</h3>
    <Container style={{ verticalAlign:"top"}}>
        <Stack direction="horizontal" gap={3} >
    
        <div className={ loading ? "sectionloading" :  "section"} style={{width:"35%"}} key="Page">
         <Stack direction="horizontal" >
            <div>
             <h4>Content Blocks</h4>
           </div>
            <div className="ms-auto">
             <Button variant='primary'  size="sm"  onClick={()=>setShow(true)}> Add</Button>
             </div>
             
   </Stack>

        
       <Table style={}>

         <thead >
           <tr>
           <td>
           Type of Content
            </td>
            <td>
            Name
            </td>
            <td>Filter <Button variant='primary'  size="sm" onClick={()=>setShowFilter(true)}>v</Button> <Button variant='primary'  size="sm" onClick={()=>{setFilterName(""); setFilterTemmplate("")}}>clear</Button>   </td>
            
          
        </tr>
       
         </thead>
         <Toast show={showFilter} onClose={()=>setShowFilter(false)} style={{zIndex:"3", position:"absolute"}}>

<Toast.Header>
  
  <strong className="me-auto">Filter</strong>
  <small>11 mins ago</small>
</Toast.Header>
<Toast.Body>
  
<tr><td>Type</td><td>Name</td></tr>

<tr >

<td>
<Form.Select onChangeCapture={e => setFilterTemmplate(e.target.value)} size="sm" value={filterTemplate}>
 <option value="" ></option>
{templates.map(i => <option value={i.name}>{i.name}</option>)}
</Form.Select>
</td>
<td>
<Form.Control onChange={(e=> setFilterName(e.target.value))} size="sm" value={filterName}></Form.Control>
</td>
<td></td>

</tr>


</Toast.Body>
</Toast>
         <tbody>

         
                 {
                 
                 [...filterPages()].sort((a,b)=> (a.Template + "#" + a.Page).localeCompare(b.Template+"#"+ b.page )).map((item) =>
                   
                     <>
                          {item.Page != selectedPage?.Page ? <tr> <td> {item.Template}</td>  <td>{item.Page}</td> <td><Button variant='primary'  className="buttonSelectPage" onClick={()=>{dispatch(selectPageAction(item.Page)); dispatch(selectSchema({name:item.Template, type:item.Template}))}}> Edit </button></td>  </tr>:
                           <tr><td><span style={{fontWeight:"bold"}}> {item.Template} </span> </td> <td>{item.Page}</td> <td> <Button variant='primary'  className="buttonSelectPage" onClick={()=>setShowConfirmDelete(true)}>(Remove)</button> </td> </tr> }
                     
                    </>) }
        </tbody>
        </Table>
  </div>
    <div className={ loading ? "sectionloading" :  "section"} style={{width:"65%"}}>

        <Stack direction="horizontal">
            <h4>Fields: {selectedPage?.Page} </h4>
            <Button variant='primary'  className="ms-auto" onClick={() => setShowPreview(true)} disabled={selectedPage?.Page==""} size="sm"  >Preview</Button></Stack>
        <hr/>   

        <div style={{overflow:"auto", height:"60vh", paddingRight:"10px"}}>
        {
         [...components].filter((item)=> item.component == selectedPage?.Template + "/"+ item.name ).sort((a,b)=> a.order - b.order).map((item) =>
            <>
               <div>  <Field Schema={item} component={item.component} name={item.name} value={selectedPage?.values.find((v)=> v.component == item.component)  ?   selectedPage?.values.find((v)=> v.component == item.component).value : emptyField(item.CType)   }      ></Field> 
               </div>
               <hr/>
            </>
            )
        }
        </div>
    </div>

        </Stack>
    </Container>

    <Modal show={show} onHide={()=>setShow(false)}>
                    <Form noValidate validated={validated} onSubmit={clickOnCreatePage}>
                     <Modal.Header closeButton>
                      <Modal.Title>Create new page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Name: 
                        <Form.Control type="text" value={newPageName} onChange={(e) => setNewPageName(e.target.value)  }   required>
                        </Form.Control>
                        <Form.Group>
                            <Form.Label>Template:</Form.Label>
                            <FloatingLabel controlId="floatingSelect" label="select a template">
                            <Form.Select  value={newPageTemplate}  onChange={(e)=> setNewPageTempalate(e.target.value)}   required>
                            <option></option>
                            {[...templates].sort((a,b)=> a.name.localeCompare(b.name)).map((item: iSchemaPage)=> 
                             <option value={item.name}>  
                                  {item.name} 
                             </option>)} 
                             </Form.Select>
                             </FloatingLabel>
                             </Form.Group>
                        

                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant='primary'  variant="secondary" onClick={()=>setShow(false)}>
                            Cancel
                    </Button>
                    <Button variant='primary'  type="submit" variant="primary" >
                       Create 
                     </Button>
                     
                  </Modal.Footer>
                  </Form>
                </Modal>




                <Modal show={showConfirmDelete} onHide={()=>setShowConfirmDelete(false)}>
                     <Modal.Header closeButton>
                      <Modal.Title>Delete page: {selectedPage?.Page} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete page: {selectedPage?.Template + " # " +selectedPage?.Page } 
                        

                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant='primary'  variant="secondary" onClick={()=>{setShowConfirmDelete(false)}}>
                            No
                    </Button>
                    <Button variant='primary'  variant="primary" onClick={()=>{dispatch(deletePageAction({Page:selectedPage?.Page}));setShowConfirmDelete(false)}}>
                       Yes 
                     </Button>
                  </Modal.Footer>
                </Modal>


                <Modal show={showPreview} onHide={()=>setShowPreview(false)}  fullscreen={true} >
                     <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        

                        { selectedPage?.Template=="Home" ? <Home></Home>:""}
                        { selectedPage?.Template=="About" ? <About></About>:""}
                        { selectedPage?.Template=="web" ? <Web></Web>:""}
                        { selectedPage?.Template=="Staff" ? <Staff></Staff>:""}
                        { selectedPage?.Template=="Products" ? <Product></Product>:""}
                        { selectedPage?.Template=="News" ? <News></News>:""}
                        { selectedPage?.Template=="Inicio" ? <Inicio></Inicio>:""}
                        


                    </Modal.Body>
                  
           
                </Modal>





    </>
    )
}

export default Editor