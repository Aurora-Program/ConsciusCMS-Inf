import { Container, Stack,  Form, Button, Modal, InputGroup,FloatingLabel, Badge, CloseButton } from "react-bootstrap"
import { useState, useEffect } from "react"
import './Schema.css'
import { editComponentAction, addPageAction,addComponentAction,selectComponent, selectSchema, iSchemaField, loadSchemas, deletePageAction, deleteComponentAction, setDeletingComponent } from "./classesSlice.tsx"
import { useAppSelector, useAppDispatch } from '../hooks.tsx'

interface iProps {
  Compoent: iClassField
}


function DeleteWarning(props){
  const dispatch = useAppDispatch()
  const page = useAppSelector((state)=> state.schema.selectedPage)

  return(
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter"
 centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete template: {page.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <div>Are you sure you want to delete this template: {page.name}
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='primary'  onClick={ props.onHide} variant="secundary">Cancel</Button>
      <Button variant='primary'  onClick={()=>{props.onHide(); dispatch(deletePageAction(page))}}>Delete</Button>
    </Modal.Footer>
    </Modal>
  

    )

}


function DeleteComponentWarning(props){
  const dispatch = useAppDispatch()
  const component = useAppSelector((state)=> state.schema.deletingComponent)

 
  return(
    <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete a component: {component.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <div>Are you sure you want to delete this Component: {component.name}
    </div>
    </Modal.Body>
    <Modal.Footer>
    <Button variant='primary'  onClick={props.onHide } variant="secundary">  Cancel</Button>
      <Button variant='primary'  onClick={()=>  {dispatch(deleteComponentAction(component)); props.onHide()}}>Delete</Button>
      
    </Modal.Footer>
    </Modal>


    )

}



function Class(props : iProps ) {

  const selectedComponent = useAppSelector((state)=> state.schema.selectedComponent)
  const components = useAppSelector((state)=> state.schema.components)
  const dispatch = useAppDispatch()
  const [deleteComponentWarninShow,setDeleteComponentWarninShow] = useState(false)
  const [editPageShow,setEditPageShow] = useState(false)
  const [editComponent, setEditComponent] =useState(props.Compoent)
  const [tempValue, setTempValue] = useState(props.Compoent)

  const openDeleteForm = () => {
    setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(props.Compoent))
  }

  const openEditForm =() =>{
    console.log(editPageShow)
    setEditPageShow(true)
  }

  if (props.Compoent.CType != 'listComponents')

  return(

    <>
      {props.Compoent.name} # {props.Compoent.CType + " " }


   
      <DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />

      <Modal
        
        show= {editPageShow}
        onHide={()=> setEditPageShow(false)}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="vertical" gap={1}>
        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={editComponent.name} onChange={(e)=> setEditComponent({...editComponent,  ...{name: e.target.value}, ...{component: selectedPage.name + "/" + e.target.value}})}></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Type:</Form.Label>
            <Form.Select disabled  value={editComponent.CType} onChangeCapture={(e)=>setEditComponent({...editComponent, ...{CType:(e.target as HTMLTextAreaElement).value}})} >
                 <option>Open this select menu</option>
                 <option value="string">String</option>
                 <option value="richtext">Rich Text</option>
                 <option value="link">Link</option>
                 <option value="image">Image</option>
                 <option value="listComponents">List Components</option>

            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control value={editComponent.description} onChange={(e)=> setEditComponent({...editComponent,  ...{description: e.target.value}})}></Form.Control>
        </Form.Group>
        
        {
        editComponent.CType == "string" ||  editComponent.CType == "link" ? <>
         <Form.Check type="switch" label="Identifier"  onChange={(e)=>{ if(e.target.checked) setEditComponent(  {...editComponent, ...{ identifier: e.target.checked, required: e.target.checked}}); else setEditComponent( {...editComponent, ...{ identifier: false}})}} checked={editComponent.identifier}  />
        </>: ""}

        {editComponent.CType == "string" ||  editComponent.CType == "link" ? <>
          <Form.Check type="switch" label="Required"  onChange={(e)=> setEditComponent({...editComponent, ...{required: e.target.checked}})} checked={editComponent.identifier ? true : editComponent.required} disabled= {editComponent.identifier}  />
       </> : ""}
      
        
       


      

        

    </Stack>   
        </Modal.Body>
        <Modal.Footer>
        <Stack gap={2} direction="horizontal">

        <Button variant='primary'  onClick={()=>setEditPageShow(false)} variant="secundary">Cancel</Button>
        {(editComponent.name == "" || editComponent.CType =="" )? 
          <Button variant='primary'  onClick={()=> {dispatch(editComponentAction(editComponent)); setEditPageShow(false) }} disabled>Save</Button> :
          <Button variant='primary'  onClick={()=> {dispatch(editComponentAction(editComponent));setEditPageShow(false) }}>Save</Button>
        }

          
        </Stack>
        </Modal.Footer>
      </Modal>
    </>
  )
  else {

    return (
      <>

      
      { props.Compoent != selectedComponent ? <> <Button variant='primary'  className="buttonSelectPage" onClick={()=>dispatch(selectComponent(props.Compoent))}> {props.Compoent.name } # {props.Compoent.CType }  </button>  {" "} </> : <span style={{fontWeight:"bold"}}> {props.Compoent.name} # {props.Compoent.CType + " "} </span>
      }
        <Button variant='primary'  className="buttonSelectPage" onClick={openDeleteForm}> </button>
      <ul>
        {([...components].sort((a,b)=>a.order - b.order).filter((item) => item.component == props.Compoent.component + "/" + item.name)).map((item)=><li> <Component Compoent={item}></Component></li> )}
      </ul>

      <DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />
      
    

      </>

    )
  }
}


interface iSchemaPage {
    name: string,
    type: string
}

interface iPropsModal{
    show: boolean
    onHide: ()=>void
}


function AddPageForm(props: iPropsModal) {


    const [newPage, setNewPage] = useState({name:"", type:""})
    const [validated, setValidated] = useState(false)
    const pages =useAppSelector((state)=>state.schema.pages )

    const dispatch = useAppDispatch()


    function clickOnCreatePage(event){

      console.log("onclock")
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
    
         event.stopPropagation();
         setValidated(true);
       }
 

    else {
      {dispatch(addPageAction(newPage)); setNewPage({name:"", type:""}); setValidated(false); props.onHide() }

   }
    

  
};


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style ={{margin:"10px 20px 10px 50px "}}
      >
        <Form onSubmit={clickOnCreatePage}  validated={validated}>
        <Modal.Header closeButton>
          
          <Modal.Title id="contained-modal-title-vcenter">
            Adding a Template
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <Stack direction="vertical" gap={1}>
        
        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={newPage.name} onChange={(e)=> setNewPage({name: (e.target as HTMLTextAreaElement).value, type:newPage.CType})} required></Form.Control>
        </Form.Group>
      
      
        <Form.Group>
        <Form.Label>Type:</Form.Label>
        <FloatingLabel controlId="floatingSelect" label="select a type">
        
            <Form.Select  value={newPage.CType} onChangeCapture={(e)=>setNewPage({name: newPage.name, type:(e.target as HTMLTextAreaElement).value})}  required>
                 <option></option>
                 <option value="Page">Page</option>
                 <option value="Partial">Partial</option>
            </Form.Select>
            </FloatingLabel>
        </Form.Group>
      

    </Stack>   
        </Modal.Body>
        <Modal.Footer>
        <Stack gap={2} direction="horizontal">

        <Button variant='primary'  onClick={()=> {setValidated(false); props.onHide()}}  variant="secondary">Cancel</Button>
        
            <Button variant='primary'  type="submit" >Add</Button>
          


          
        </Stack>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  function AddComponentForm(props: iPropsModal) {

    const selectedPage = useAppSelector((state)=>state.schema.selectedPage)
    const components = useAppSelector((state)=> state.schema.components)
    const emptyComponent : iSchemaField   = {name:"", CType:"", page: selectedPage.name, component:"" ,description:"", max:60, typeofFile:"", min:0, options:[], identifier:false, required:false, order:  0}
    const [newComponent, setNewComponent] = useState(emptyComponent)
    const dispatch = useAppDispatch();
    const pages =useAppSelector((state)=>state.schema.pages )

    
    useEffect(()=> setNewComponent({...emptyComponent, ...{ order: components.filter((i)=> i.page + "/" + i.name == i.component).length>0 ? [...components.filter((i)=> i.page + "/" + i.name == i.component)].sort((a,b)=> a.order - b.order)[components.filter((i)=> i.page + "/" + i.name == i.component).length-1]?.order+ 1 : 0 }}),[components]) 
    const [validated, setValidated] = useState(false)
    const [tempValue, setTempValue] = useState()

  function clickOnAddComponent(event){
    event.preventDefault();
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
           setValidated(true);
           event.stopPropagation();
         }
      else {
     dispatch(addComponentAction(newComponent)); setNewComponent(emptyComponent); setValidated(false); props.onHide() 
     }
    
    };
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={clickOnAddComponent} validated={validated} style={{margin:"10px 20px 10px 20px"}}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding a Field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Stack direction="vertical" gap={2}>


        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={newComponent.name} onChange={(e)=> setNewComponent({...newComponent,  ...{name: e.target.value}, ...{component: selectedPage.name + "/" + e.target.value}})} required></Form.Control>
        </Form.Group>
        <Form.Group>

       
        </Form.Group>
     
         
        <Form.Group>
             
        <Form.Label>Type:</Form.Label>
        <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={newComponent.CType} onChangeCapture={(e)=>setNewComponent({...newComponent, ...{CType:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 <option value="string">String</option>
                 <option value="richtext">Rich Text</option>
                 <option value="link">Link</option>
                 <option value="image">File</option>
                 <option value="listComponents">List Components</option>
                 <option value="selectAttribute">Select Attribute</option>
                 <option value="numberAttribute">Number Attribute</option>
                 <option value="memberOf">Member of</option>

            </Form.Select>
            </FloatingLabel>
        </Form.Group>
       

        {
        newComponent.CType == "string" ||  newComponent.CType == "link" ? <>
        <Form.Check type="switch" label="Identifier"  onChange={(e)=>{ if(e.target.checked) setNewComponent(  {...newComponent, ...{ identifier: e.target.checked, required: e.target.checked}}); else setNewComponent( {...newComponent, ...{ identifier: false}})}} checked={newComponent.identifier}  />
        
        </>: ""}
        {newComponent.CType == "string" ||  newComponent.CType == "link" ? <>
        <Form.Check type="switch" label="Required"  onChange={(e)=> setNewComponent({...newComponent, ...{required: e.target.checked}})} checked={newComponent.identifier ? true : newComponent.required} disabled= {newComponent.identifier}  />
       </> : ""}

        <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control value={newComponent.description} onChange={(e)=> setNewComponent({...newComponent,  ...{description: e.target.value}})} required></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Note:</Form.Label>
            <Form.Control value={newComponent?.note} onChange={(e)=> setNewComponent({...newComponent,  ...{note: e.target.value}})} ></Form.Control>
        </Form.Group>

        {newComponent.CType == "string" ||  newComponent.CType == "link" ? <>
        <Form.Group>
            <Form.Label>Max Characters:</Form.Label>
            <Form.Control value={newComponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewComponent({...newComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }
        {newComponent.CType == "listComponents"  ? <>
        <Form.Group>
            <Form.Label>Max of element:</Form.Label>
            <Form.Control value={newComponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewComponent({...newComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {newComponent.CType == "image"  ? <>
        <Form.Group>
            <Form.Label>Max Size:</Form.Label>
            <Form.Control value={newComponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewComponent({...newComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Type of file:</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={newComponent.typeOfFile} onChangeCapture={(e)=>setNewComponent({...newComponent, ...{typeOfFile:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 <option value="image">Image</option>
                 <option value="document">Document</option>
                 <option value="video">Video</option>
                 <option value="audio">Audio</option>
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        
    
        </> : ""
        }

{newComponent.CType == "numberAttribute"  ? <>
        <Form.Group>
            <Form.Label>Min number:</Form.Label>
            <Form.Control value={newComponent.min} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewComponent({...newComponent,  ...{min: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Max number:</Form.Label>
            <Form.Control value={newComponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewComponent({...newComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {newComponent.CType == "selectAttribute"  ? <>
        <Form.Group>
            <Form.Label>Options:</Form.Label>
            <Stack gap={3} direction="horizontal">
            <Form.Control value={tempValue} onChange={(e)=> setTempValue( e.target.value)}></Form.Control>
            
            <Button variant='primary'  size="sm" onClick={()=>{setNewComponent({...newComponent, ...{options: [...newComponent.options, tempValue]}}); setTempValue("")} }  disabled ={tempValue == ""}>Add</Button> 
            </Stack>  
        </Form.Group> 
        <div>
        
       <Stack gap={2} direction="horizontal">
        {newComponent.options.map(i=> <Badge  >{i} <CloseButton onClick={()=> setNewComponent({...newComponent, ...{options:newComponent.options.filter(j=> i!=j) }})}></CloseButton></Badge>)}
        </Stack>
        </div>
        </> : ""
        }
      
      {newComponent.CType == "memberOf"  ? <>
        <Form.Group>
            <Form.Label>Template member of</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={newComponent.memberOf} onChangeCapture={(e)=>setNewComponent({...newComponent, ...{memberOf:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 {pages.map((i)=> <option>{i.name}</option>)}
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        </> : ""
        }
              

    </Stack>   
        </Modal.Body>
        <Modal.Footer>
        <Stack gap={2} direction="horizontal">

        <Button variant='primary'  onClick={()=>{setValidated(false);props.onHide()}}  variant="secondary" >Cancel</Button>
    
          <Button variant='primary'  type="submit">Add</Button>
        

         
        </Stack>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  function AddSubcomponentForm(props: iPropsModal) {

    
    const selectedComponent = useAppSelector((state)=>state.schema.selectedComponent)
    const components = useAppSelector((state)=>state.schema.components)
    const selectedPage = useAppSelector((state)=>state.schema.selectedPage)
    const emptyComponent : iSchemaField   = {name:"", CType:"", page: selectedPage.name, component:"" ,description:"", max:60, typeofFile:"", min:0, options:[], identifier:false, required:false, order:components.filter((i)=> i.page + "/" + i.name == i.component).length}
    const [newSubcomponent, setNewSubcomponent] = useState(emptyComponent)
    const dispatch = useAppDispatch();
    useEffect(()=> setNewSubcomponent({...emptyComponent ,  ...{order: components.filter(i => i.component == selectedComponent.component + "/" +i.name ).length}}),[selectedComponent])
    const [validated, setValidated] = useState(false)
    const [tempValue, setTempValue] = useState()
    const pages = useAppSelector (state => state.schema.pages)

    function clickOnAddSubComponent(event){

      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
    
         event.stopPropagation();
       } 
    else {
    dispatch(addComponentAction(newSubcomponent)); setNewSubcomponent(emptyComponent); props.onHide() 
   }
  
   setValidated(true);
};
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{margin:"10px 20px 10px 20px"}}
      >
        <Form validated={validated} onSubmit={clickOnAddSubComponent} >
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            Add a component
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="vertical" gap={1}>
        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={newSubcomponent.name} onChange={(e)=> setNewSubcomponent({...newSubcomponent, ...{name: e.target.value}, ...{component: selectedComponent.component + '/' + e.target.value}})} required></Form.Control>
        </Form.Group>

       

        <Form.Group>
        <Form.Label>Type:</Form.Label>
        <FloatingLabel label="Select type">
            <Form.Select  value={newSubcomponent.CType} onChangeCapture={(e)=>setNewSubcomponent({...newSubcomponent, ...{CType:(e.target as HTMLTextAreaElement).value}})} required>
                 <option value="string"></option>
                 <option value="string">String</option>
                 <option value="richtext">Rich Text</option>
                 <option value="link">Link</option>
                 <option value="image">File</option>
                 <option value="listComponents">List Components</option>
                 <option value="selectAttribute">Select Attribute</option>
                 <option value="numberAttribute">Number Attribute</option>
                 <option value="memberOf">Member of</option>
            </Form.Select>
            </FloatingLabel>
        </Form.Group>
  
        {newSubcomponent.CType == "string" ||  newSubcomponent.CType == "link" ? <>
        < Form.Check type="switch" label="Identifier"  onChange={(e)=>{ if(e.target.checked) setNewSubcomponent(  {...newSubcomponent, ...{ identifier: e.target.checked, required: e.target.checked}}); else setNewSubcomponent( {...newSubcomponent, ...{ identifier: false}})}} checked={newSubcomponent.identifier}  />
         </>: ""}
         {newSubcomponent.CType == "string" ||  newSubcomponent.CType == "link" ? <>
        <Form.Check type="switch" label="Required"  onChange={(e)=> setNewSubcomponent({...newSubcomponent, ...{required: e.target.checked}})} checked={newSubcomponent.identifier ? true : newSubcomponent.required} disabled= {newSubcomponent.identifier}  />
        </>: ""}

        <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control value={newSubcomponent?.description} onChange={(e)=> setNewSubcomponent({...newSubcomponent,  ...{description: e.target.value}})} required></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Note:</Form.Label>
            <Form.Control value={newSubcomponent?.note} onChange={(e)=> setNewSubcomponent({...newSubcomponent,  ...{note: e.target.value}})} ></Form.Control>
        </Form.Group>       
        
        {newSubcomponent.CType == "string" ||  newSubcomponent.CType == "link" ? <>
        <Form.Group>
            <Form.Label>Max Characters:</Form.Label>
            <Form.Control value={newSubcomponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewSubcomponent({...newSubcomponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }
        {newSubcomponent.CType == "listComponents"  ? <>
        <Form.Group>
            <Form.Label>Max of element:</Form.Label>
            <Form.Control value={newSubcomponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewSubcomponent({...newSubcomponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {newSubcomponent.CType == "image"  ? <>
        <Form.Group>
            <Form.Label>Max Size:</Form.Label>
            <Form.Control value={newSubcomponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewSubcomponent({...newSubcomponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Type of file:</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={newSubcomponent.typeOfFile} onChangeCapture={(e)=>setNewSubcomponent({...newSubcomponent, ...{typeOfFile:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 <option value="image">Image</option>
                 <option value="document">Document</option>
                 <option value="video">Video</option>
                 <option value="audio">Audio</option>
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        
  
        </> : ""
        }

{newSubcomponent.CType == "numberAttribute"  ? <>
        <Form.Group>
            <Form.Label>Min number:</Form.Label>
            <Form.Control value={newSubcomponent.min} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewSubcomponent({...newSubcomponent,  ...{min: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Max number:</Form.Label>
            <Form.Control value={newSubcomponent.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setNewSubcomponent({...newSubcomponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {newSubcomponent.CType == "selectAttribute"  ? <>
        <Form.Group>
            <Form.Label>Options:</Form.Label>
            <Stack gap={3} direction="horizontal">
            <Form.Control value={tempValue} onChange={(e)=> setTempValue( e.target.value)}></Form.Control>
            
            <Button variant='primary'  size="sm" onClick={()=>{setNewSubcomponent({...newSubcomponent, ...{options: [...newSubcomponent.options, tempValue]}}); setTempValue("")} }  disabled ={tempValue == ""}>Add</Button> 
            </Stack>  
        </Form.Group> 
        <div>
        
       <Stack gap={2} direction="horizontal">
        {newSubcomponent.options.map(i=> <Badge  >{i} <CloseButton onClick={()=> setNewSubcomponent({...newSubcomponent, ...{options:newSubcomponent.options.filter(j=> i!=j) }})} variant="seundary"></CloseButton></Badge>)}
        </Stack>
        </div>
        </> : ""
        }



          
      {newSubcomponent.CType == "memberOf"  ? <>
        <Form.Group>
            <Form.Label>Template member of</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={newSubcomponent.memberOf} onChangeCapture={(e)=>setNewComponent({...newSubcomponent, ...{memberOf:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 {pages.map((i)=> <option>{i.name}</option>)}
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        </> : ""
        }
        
        {newSubcomponent.order}

      
    </Stack>   
        </Modal.Body>
        <Modal.Footer>
        <Stack gap={2} direction="horizontal">

        <Button variant='primary'  onClick={props.onHide} variant="secondary">Cancel</Button>
 
          <Button variant='primary'  type="submit">Add</Button>
        

          
        </Stack>
        </Modal.Footer>

        </Form>
      </Modal>

      
    );
  }


function Schema() {

    const pages =useAppSelector((state)=>state.schema.pages )
    const components =useAppSelector((state)=>state.schema.components )
    const selectedPage = useAppSelector((state)=>state.schema.selectedPage)
    const selectedComponent = useAppSelector((state) => state.schema.selectedComponent)
    const dispatch = useAppDispatch()
    const [addPageShow, setAddPageShow] = useState(false)
    const [addCompoenentShow, setAddComponentShow] = useState(false)
    const [addSubcomponentShow, setAddSubComponentShow] = useState(false)
    const [deleteWarninShow,setDeleteWarninShow] = useState(false)
    const [deleteComponentWarninShow,setDeleteComponentWarninShow] = useState(false)
    const [editComponent, setEditComponent] =useState()
    const [tempValue, setTempValue] = useState()
    const [editPageShow,setEditPageShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const loading = useAppSelector((state) => state.schema.loading)
    function clickOnEditComponent(event){

      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
    
         event.stopPropagation();
       }

     else {
        dispatch(editComponentAction(editComponent));setEditPageShow(false) 
     }

       setValidated(true);

};

  
    useEffect(() => {dispatch(loadSchemas())},[])
 
    function moveup(index: number, parent : string): void{
      console.log(index)
      console.log ("order: " + (index - 1) )

      let c1 = {...([...components.filter(i => i.component == parent + "/"  + i.name)].sort((a, b)=> a.order - b.order)[index])}
      let c2 = {...([...components.filter(i => i.component == parent + "/"  + i.name)].sort((a, b)=> a.order - b.order)[index-1])}
      const t = c1.order
      c1.order = c2.order;
      c2.order = t;
      console.log(c2.name)
      console.log(c2.order)
      dispatch(editComponentAction(c1));
      dispatch(editComponentAction(c2));


}



return (
<>

<Container >
<Stack direction="horizontal" gap={3}>
    <div className={ loading ? "sectionloading" :  "section"} style={{width:"21%"}}>
       
    <h4>Templetes</h4>
           <hr></hr>
           <Button variant='primary'  onClick={()=>setAddPageShow(true)} size="sm"  >Add</Button>
    <hr/>
            

              {[...pages].sort((a,b)=> a.order- b.order ).map((item: iSchemaPage)=> 
              <>
              <div>
                 {item != selectedPage ? <Button variant='primary'  className="buttonSelectPage" onClick={()=>dispatch(selectSchema(item))}> {item.name} # {item.type} </button> : <><span style={{fontWeight:"bold"}}> {item.name} # {item.type} </span>  
                   <Button variant='primary'  className="buttonSelectPage" onClick={()=>setDeleteWarninShow(true)}> (remove)</button> </>    }
                 <hr/></div></> )} 

            
    </div>
    <div className={ loading ? "sectionloading" :  "section"} style={{width:"45%", overflowY:"auto"}}>
        <h4>Fields</h4>
        <hr/>
        {selectedPage.name==""? <Button variant='primary'  onClick={()=>setAddComponentShow(true)}  disabled  size="sm" >Add</Button> : <Button variant='primary'  onClick={()=>setAddComponentShow(true)} size="sm"   >Add</Button> }
       
        <hr/>

        

              {[...components].sort((a,b)=> a.order - b.order).filter((item) => item.component == selectedPage.name + "/" + item.name ).map((item: iSchemaField, index)=>
                 <>
                 <Stack gap={0} direction="horizontal" gap={3}>
                  <div style={{minWidth:"30px"}}>
                 { index > 0 ? <Button variant='primary'  onClick={()=> moveup(index, selectedPage.name )} size="sm" style={{borderRadius:"50%"}}  >^</Button>: ""} 
                 </div>
                 <div>
                 {item.order}: 
                 </div>
                 <ul>
                
                <Component Compoent={item}></Component>
                
              </ul>
              <div className="ms-auto">
                (<Button variant='primary'  className="buttonSelectPage" onClick={()=>{setEditComponent(item);  setEditPageShow(true)}}> edit </button> | <Button variant='primary'  className="buttonSelectPage" onClick={()=>{setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(item))}}>remove</button> )</div>
              
              </Stack> <hr/> </>)
              
              } 
                
            
    </div>

    <div className={ loading ? "sectionloading" :  "section"} style={{width:"34%"}}>
     <h4>Details</h4> 
    
        <hr/>
        {selectedComponent.name==""? <Button variant='primary'  onClick={()=>setAddSubComponentShow(true)}  disabled size="sm"  >Add</Button> : <Button variant='primary'  onClick={()=>setAddSubComponentShow(true)}  size="sm" >Add</Button> }
        <hr/>
        
              { 
                [...components].filter((item) => item.component == selectedComponent.component +"/"+ item.name).sort((a,b)=>a.order - b.order).map((item: iSchemaPage, index)=> 
                <>
                <Stack gap={3} direction="horizontal">
                  <div style={{minWidth:"30px"}}>
                  { index > 0 ? <Button variant='primary'  size="sm" onClick={()=> moveup(index, selectedComponent.component )} style={{borderRadius:"50%"}}>^</Button>: ""}   
                  </div>
                  <div>
                    {item.order}:
                  </div>
                 <h6>{item.name} # {item.CType} </h6>

                  <div className="ms-auto">
                 (<Button variant='primary'  className="buttonSelectPage" onClick={()=>{setEditComponent(item);  setEditPageShow(true)}}> edit </button> | <Button variant='primary'  className="buttonSelectPage" onClick={()=>{setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(item))}}>remove</button> )</div>
                <DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />
                 
                </Stack>

                

              <hr/>
              </>)
              } 
            
    </div>
</Stack>
</Container>

<AddPageForm show={addPageShow} onHide={()=>{setAddPageShow(false); setValidated(false)}} />
<AddComponentForm show={addCompoenentShow} onHide={()=>{setAddComponentShow(false); setValidated(false)}} />
<AddSubcomponentForm show={addSubcomponentShow} onHide={()=>setAddSubComponentShow(false)} />
<DeleteWarning show={deleteWarninShow} onHide={()=>setDeleteWarninShow(false)} />
<DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />

<Modal
        
        show= {editPageShow}
        onHide={()=> {setEditPageShow(false); setValidated(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        validated = {validated}
      >
        <Form onSubmit={clickOnEditComponent} validated={validated} >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Field 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="vertical" gap={1}>
        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={editComponent?.name} onChange={(e)=> setEditComponent({...editComponent,  ...{name: e.target.value}, ...{component: selectedPage.name + "/" + e.target.value}})} disabled required></Form.Control>
        </Form.Group>

        
        
       
        <Form.Group>
        <Form.Label>Type:</Form.Label>
        <FloatingLabel label="select type">
            <Form.Select disabled  value={editComponent?.CType} onChangeCapture={(e)=>setEditComponent({...editComponent, ...{CType:(e.target as HTMLTextAreaElement).value}})} required>
                 <option></option>
                 <option value="string">String</option>
                 <option value="richtext">Rich Text</option>
                 <option value="link">Link</option>
                 <option value="image">File</option>
                 <option value="listComponents">List Components</option>
                 <option value="selectAttribute">Select Attribute</option>
                 <option value="numberAttribute">Number Attribute</option>
                 <option value="memberOf">Member of</option>

            </Form.Select>
            </FloatingLabel>
        </Form.Group>

       
        {
        editComponent?.CType == "string" ||  editComponent?.CType == "link" ? <>
        <Form.Check type="switch" label="Identifier" checked={editComponent?.identifier}  onChange={(e)=> { e.target.checked ? setEditComponent({...editComponent, ...{identifier: e.target.checked, required: true}})     :  setEditComponent({...editComponent, ...{identifier: e.target.checked}})}} disabled/>
        </>: ""}

        {editComponent?.CType == "string" ||  editComponent?.CType == "link" ||  editComponent?.CType == "numberAttribute" ||  editComponent?.CType == "selectAttribute" ? <>
          <Form.Check type="switch" label="Required" checked={editComponent?.required}  onChange={(e)=> setEditComponent({...editComponent, ...{required: e.target.checked}})} disabled ={editComponent.identifier ? true : false} />
       </> : ""}
       
       
       
        
        <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control value={editComponent?.description} onChange={(e)=> setEditComponent({...editComponent,  ...{description: e.target.value}})} required></Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>Note:</Form.Label>
            <Form.Control value={editComponent?.note} onChange={(e)=> setEditComponent({...editComponent,  ...{note: e.target.value}})} ></Form.Control>
        </Form.Group>
        

        {editComponent?.CType == "string" || editComponent?.CType == "link" ? <>
        <Form.Group>
            <Form.Label>Max Characters:</Form.Label>
            <Form.Control value={editComponent?.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setEditComponent({...editComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }
        {editComponent?.CType == "listComponents"  ? <>
        <Form.Group>
            <Form.Label>Max of element:</Form.Label>
            <Form.Control value={editComponent?.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setEditComponent({...editComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {editComponent?.CType == "image"  ? <>
        <Form.Group>
            <Form.Label>Max Size:</Form.Label>
            <InputGroup>
            
            <Form.Control value={editComponent?.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setEditComponent({...editComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
            <InputGroup.Text id="basic-addon1">Kb</InputGroup.Text>
            </InputGroup>
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Type of file:</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={editComponent?.typeOfFile} onChangeCapture={(e)=>setEditComponent({...editComponent, ...{typeOfFile:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 <option value="image">Image</option>
                 <option value="document">Document</option>
                 <option value="video">Video</option>
                 <option value="audio">Audio</option>
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        
    
        </> : ""
        }

{editComponent?.CType == "numberAttribute"  ? <>
        <Form.Group>
            <Form.Label>Min number:</Form.Label>
            <Form.Control value={editComponent?.min} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setEditComponent({...editComponent,  ...{min: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Max number:</Form.Label>
            <Form.Control value={editComponent?.max} onChange={(e)=> {if(!isNaN(Number(e.target.value))) setEditComponent({...editComponent,  ...{max: Number(e.target.value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {editComponent?.CType == "selectAttribute"  ? <>
        <Form.Group>
            <Form.Label>Options:</Form.Label>
            <Stack gap={3} direction="horizontal">
            <Form.Control value={tempValue} onChange={(e)=> setTempValue( e.target.value)}></Form.Control>
            
            <Button variant='primary'  size="sm" onClick={()=>{setEditComponent({...editComponent, ...{options: [...editComponent?.options, tempValue]}}); setTempValue("")} }  disabled ={tempValue == ""}>Add</Button> 
            </Stack>  
        </Form.Group> 
        <div>
        
       <Stack gap={2} direction="horizontal">
        {editComponent?.options.map(i=> <Badge  >{i} <CloseButton onClick={()=> setEditComponent({...editComponent, ...{options:editComponent?.options.filter(j=> i!=j) }})}></CloseButton></Badge>)}
        </Stack>
        </div>
        </> : ""
        }

    {editComponent?.CType == "memberOf"  ? <>
         
      {editComponent.CType == "memberOf"  ? <>
        <Form.Group>
            <Form.Label>Template member of</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={editComponent.memberOf} onChangeCapture={(e)=>setEditComponent({...editComponent, ...{memberOf:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 {pages.map((i)=> <option>{i.name}</option>)}
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        </> : ""
        }
        </> : ""
        }
        

        

    </Stack>   
        </Modal.Body>
        <Modal.Footer>
        <Stack gap={2} direction="horizontal">
        <Button variant='primary'  onClick={()=>setEditPageShow(false)} variant="secondary">Cancel</Button>
          <Button variant='primary'  type="submit" >Save</Button>
          
        </Stack>
        </Modal.Footer>
        </Form>
      </Modal>

</>
    )
}


export default Schema