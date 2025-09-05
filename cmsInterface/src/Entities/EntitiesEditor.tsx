import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect, useState } from "react"
import { Container, Stack, Modal, Form, Button, Col,Row, FormControl } from "react-bootstrap"
import { loadSchemas, selectSchema } from "../Schema/schemaSlice"
import "./editor.css"
import { loadPages, addPageAction, selectPageAction,  deletePageAction, updateSelectedPage, newSelectedPage,  renameSelectedPage} from "./editorSlice"
import Field from "./Fields"
import {  iSchemaPage } from "../types"
import { Tab, Tabs } from "react-bootstrap"
import { savePageAction } from "./editorSlice"
import Home from "../Pages/home"
import About from '../Pages/about'
import Product from "../Pages/product"
import Staff from "../Pages/staff"
import News from "../Pages/news"
import Web from "../Pages/web"
import Inicio from "../Pages/inicio"
import {FloatingLabel, Table} from "react-bootstrap"
import { Toast } from "react-bootstrap"
import magnifier from "../assets/magnifier2.png"
import PMAPagination from "../util/pmaPagination"


function Editor(){     
    


const templates =useAppSelector((state)=>state.schema.pages )
const pages =useAppSelector((state)=>state.editor.pages )
const selectedPage = useAppSelector((state)=>state.editor.selectedPage)

const [showPreview, setShowPreview] = useState(false)

const [Page, setPage]  = useState({fields:[]})
const [validated, setValidated] = useState(false);
const [showConfirmDelete, setShowConfirmDelete] = useState(false)
const dispatch = useAppDispatch()
const loading = useAppSelector((state) => state.editor.loading)
const [filterName, setFilterName] = useState("")
const [filterTemplate, setFilterTemmplate] = useState("xxx")
const [filterList, setFilterList] = useState("")
const [showContent, setShowContent] = useState("")

const [editMode, setEditMode] = useState("")
const [valid, setValid] = useState(true)


const [num, setNum] = useState(1)
const block = 12


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

function selectBlock(v: number){
    setNum(v)
}


function clickOnCreatePage(){

            dispatch(selectSchema({name: filterTemplate}));
            dispatch(newSelectedPage({Template: filterTemplate, Page:"", values:[]}))
            setEditMode("adding");
            setShowContent(true)

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
            return {name: ""}
               
        case "listComponents":
            return []
        case "memberOf":
            return []
              
          
}
}

const checkValidation = (status : boolean) => {
    setValid(valid ? false : status)
    console.log("validating")
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

    <Container style={{ verticalAlign:"top"}}>
        
    
        <div className={ loading ? "sectionloading" :  "section"}  key="Page">
         <Stack direction="horizontal" gap={4} >
           


             </Stack>

             <Tabs onSelect={()=> {setFilterTemmplate("xxx")}} >
                <Tab eventKey="Pages" title="Pages" style={{ minHeight:"100%", verticalAlign:"top"  }} >  
                   
                    <div style={{display:"flex", width:"100%", marginTop:"10px", height:"100%"}}>
                    <div style={{ backwidth:"20%", minHeight:"100%", verticalAlign:"top", marginRight:"15px" }}  >
                    <div style={{position:"relative"}}>
                    <img src={magnifier} style={{position:"absolute", margin:"5px 0px 0px 7px"}}></img>
                    <Form.Control placeholder="Search..." value={filterList} onChange={(e)=>setFilterList(e.target.value)} type="search" style={{paddingLeft: "37px", marginLeft: "4px"}}></Form.Control>
                    </div>
                        <Table hover variant="ligth" className="menuLeft" style={{ marginTop:"20px"}}>
                            <tbody>
                            {[...templates.filter(i=> i.type=="Page" && i.name.includes(filterList))].sort((a,b)=> a.name.localeCompare(b.name)).map((item: iSchemaPage)=> 
                             <tr>
                                <td className="menuLeftTd">
                                { item.name != filterTemplate
                                 ?   
                                <button className="buttonSelectPage" onClick={()=>{setFilterTemmplate(item.name); setNum(1) }}> {item.name} </button> :
                                <span style={{fontWeight:"bold"}}>{item.name}</span>
                                }   
                                </td>
                             </tr>
                            )} 
                            </tbody>
                        </Table>  
                    </div>
                    <div style={{width:"80%", minHeight:"100%", verticalAlign:"top", height:"100%"}}>
                        
                        <Stack direction="horizontal" gap={5}>
                        <div style={{position:"relative"}}>
                    <img src={magnifier} style={{position:"absolute", margin:"5px 0px 0px 7px"}}></img>
                        
                        <Form.Control placeholder="Search..." onChange={(e) => setFilterName(e.target.value)} value={filterName} style={{paddingLeft: "37px", marginLeft: "4px"}} ></Form.Control>
                        </div>
                        <div className="ms-auto">
                        <Button size="sm"  onClick={clickOnCreatePage} disabled={filterTemplate=="xxx"} > Add</Button>
                        </div>
                        
                        </Stack>
                        <div style={{height:"53vh"}}>
                        <Table style={{margin:"5px", width:"100%", marginTop:"20px"}} hover>
                          <thead>
                                <tr  style={{height:"10%"}}><td >Type</td><td>Name</td><td>Last update</td><td>Updated by</td><td>Actions</td></tr>
                            </thead>
                            <tbody>

         
                    {

                        [...filterPages()].sort((a,b)=> (a.Template + "#" + a.Page).localeCompare(b.Template+"#"+ b.page )).filter((_, index)=> index >= (num -1) * block && index < num * block  ).map((item) =>
  
    <>
         <tr style={{height:"10%"}}> <td> {item.Template}</td>  <td>{item.Page}</td> <td style={{minWidth:"180px"}}> { item.updateTime?.substring(0,21)}</td><td>{item.updateUser}</td><td style={{minWidth:"220px"}}>
            ( <button className="buttonSelectPage" onClick={() => setShowPreview(true)} disabled={selectedPage?.Page==""} size="sm" buttonSelectPage >Preview</button> |  <button className="buttonSelectPage" onClick={async ()=>{setEditMode("editing"); await dispatch(selectPageAction(item.Page)); setShowContent(true); dispatch(selectSchema({name:item.Template, type:item.Template})) }}> Edit </button>  | <button className="buttonSelectPage" onClick={()=>setShowConfirmDelete(true)}>Remove</button> )
           
            
               </td>  </tr>
          
    
   </>) }
</tbody>
                        </Table >
                        </div>
                        <div style={{display:"flex", width:"100%" , justifyContent:"center"}}>
                        <div  style={{position:"relative", alignContent:"center", margin:"20px"}}> <PMAPagination handleClick={selectBlock} number={num} block={block} numberOfItems={filterPages().length} ></PMAPagination>  </div>
               </div>
                       

                    </div>
                    </div>
               
                </Tab>
                <Tab eventKey="Partial" title="Partial Content"   style={{ minHeight:"100%", verticalAlign:"top", width:"100%"}}>
                    
                    
                    
                    <div style={{width:"100%", display:"flex"}} >
                    <Stack direction="horizontal" >
                    <div style={{width:"25%", minHeight:"100%", verticalAlign:"top", paddingRight:"5px" }} >
                    <Form.Control placeholder="Search..." value={filterList} onChange={(e)=>setFilterList(e.target.value)} type="search"></Form.Control>
                    <div  style={{height:"100%"}}>
                    <Table hover>
                    
                    
                            <tbody>
                            {[...templates.filter(i=> i.type=="Partial" && i.name.includes(filterList))].sort((a,b)=> a.name.localeCompare(b.name)).map((item: iSchemaPage)=> 
                             <tr>
                                <td>
                                { item.name != filterTemplate
                                 ?   
                                <button className="buttonSelectPage" onClick={()=>setFilterTemmplate(item.name) }> {item.name} </button> :
                                <span style={{fontWeight:"bold"}}>{item.name}</span>
                                }   
                                </td>
                             </tr>
                            )} 
                            </tbody>
                        </Table>
                        
                        </div>
                       
                        <div style={{width:"80%", minHeight:"100%", verticalAlign:"top"}}>
                        <Form.Control placeholder="Search..." onChange={(e) => setFilterName(e.target.value)} value={filterName}></Form.Control>
                        <Table style={{margin:"5px", width:"100%"}} striped>
                          <thead>
                                <tr><td>Type</td><td>Name</td><td>Last update</td><td>Updated by</td><td>Actions</td></tr>
                            </thead>
                            <tbody>

         
                    {

                        [...filterPages()].sort((a,b)=> (a.Template + "#" + a.Page).localeCompare(b.Template+"#"+ b.page )).map((item) =>
  
    <>
         <tr> <td> {item.Template}</td>  <td>{item.Page}</td> <td style={{minWidth:"180px"}}> {   item.updateTime}</td><td>{item.updateUser}</td><td style={{minWidth:"220px"}}>
            ( <button className="buttonSelectPage" onClick={() => setShowPreview(true)} disabled={selectedPage?.Page==""} size="sm" buttonSelectPage >Preview</button> |  <button className="buttonSelectPage" onClick={async ()=>{ console.log("cc"); setEditMode("editing"); await dispatch(selectPageAction(item.Page)); setShowContent(true); dispatch(selectSchema({name:item.Template, type:item.Template}))  }}> Edit </button> 
             | <button className="buttonSelectPage" onClick={()=>setShowConfirmDelete(true)}>Remove</button> )
           
            
               </td>  </tr>
          
    
   </>) }
</tbody>
                        </Table >
                        </div>
                        <div>
                            
                        
                             <PMAPagination handleClick={selectBlock} number={num} numberOfItems={filterPages().length} block={5}></PMAPagination>  </div>
                    </div>
                    
                        </Stack>
                        </div>
                </Tab>
           </Tabs>


 

        
  </div>



    </Container>

  {
    ///**********************SHOW CONTENT *******************************/
  }
        
    <Modal show={showContent} onHide={()=>setShowContent(false)} fullscreen   >
  
        <Modal.Header closeButton>
            <Modal.Title>
                <Container>
                    <h3>
                Edit Content : {selectedPage.Page}
                
                </h3>

                </Container>
            </Modal.Title>
        </Modal.Header>
      
    <Modal.Body>
    <Form id="pageForm" onSubmit={async (e) => {
              e.preventDefault();  
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.stopPropagation();}
            else { 
              
                await dispatch(savePageAction(selectedPage)); 
                setShowContent(false); 
                await dispatch(loadPages());
                } }} >
        {
         [...components].filter((item)=> item.component == selectedPage?.Template + "/"+ item.name ).sort((a,b)=> a.order - b.order).map((item) =>
            <>
               <div>  <Field Schema={item} component={item.component} name={item.name} value={selectedPage?.values.find((v)=> v.component == item.component)  ?   selectedPage?.values.find((v)=> v.component == item.component).value : emptyField(item.CType)   }   validated= {validated}  editMode={editMode} handleValidation = {checkValidation}  ></Field> 
               </div>
               <hr/>
            </>
            )
        }
      </Form>
        </Modal.Body>
        <Modal.Footer>

        <Button onClick={()=>setShowContent(false)} variant="secondary"> Cancel</Button>
        <Button form="pageForm" type="submit" > Save Changes</Button>
      

        </Modal.Footer>
       
    </Modal>
   

    {
    //************** *********/

    //************** */
}


                <Modal show={showConfirmDelete} onHide={()=>setShowConfirmDelete(false)}>
                     <Modal.Header closeButton>
                      <Modal.Title>Delete page: {selectedPage?.Page} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete page: {selectedPage?.Template + " # " +selectedPage?.Page } 
                        

                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={()=>{setShowConfirmDelete(false)}}>
                            No
                    </Button>
                    <Button variant='primary' onClick={()=>{dispatch(deletePageAction({Page:selectedPage?.Page}));setShowConfirmDelete(false)}}>
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