import { Stack, Form, Button, Modal, FloatingLabel, Badge, CloseButton, OverlayTrigger, Tooltip, InputGroup } from "react-bootstrap"
import { useState, useEffect } from "react"
import './Schema.css'
import { useT } from '../util/useTranslation'
import { editComponentAction, addPageAction,addComponentAction,selectComponent, selectSchema, clearPage, loadSchemas, deletePageAction, deleteComponentAction, setDeletingComponent } from "./schemaSlice.tsx"
import { useAppSelector, useAppDispatch } from '../hooks.tsx'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";
import AuroraPage from "../components/AuroraPage"
import { iSchemaField, iSchemaPage } from '../types'


interface iProps {
  Compoent: iSchemaField
}

interface iPropsModal{
  show: boolean
  onHide: ()=>void
  mode?: string
  type?: string
  component?: any
  value?: any
}

function DeleteWarning(props: iPropsModal){
  const dispatch = useAppDispatch()
  const page = useAppSelector((state)=> state.schema.selectedPage)
  const t = useT()

  return(
  <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className="modern-modal-header bg-danger text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {t('schema.deleteTemplate')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modern-modal-body">
          <div className="text-center mb-3">
            <i className="bi bi-folder-x text-danger" style={{fontSize: '3rem'}}></i>
          </div>
          <p className="text-center mb-3">
            {t('schema.deleteTemplateConfirm')}
          </p>
          <div className="alert alert-warning" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            <strong>{t('schema.template')}:</strong> {page.name}
          </div>
          <p className="text-muted small text-center">
            {t('schema.actionCannotBeUndone')}
          </p>
        </Modal.Body>
        <Modal.Footer className="modern-modal-footer">
          <Button variant="outline-secondary" onClick={props.onHide}>
            <i className="bi bi-x-lg me-2"></i>
            {t('schema.cancel')}
          </Button>
          <Button variant="danger" onClick={async ()=>{props.onHide(); await dispatch(deletePageAction(page)); dispatch(loadSchemas())}} className="modern-btn">
            <i className="bi bi-trash-fill me-2"></i>
            {t('schema.deleteTemplate')}
          </Button>
        </Modal.Footer>
    </Modal>

    )

}

function DeleteComponentWarning(props: iPropsModal){
  const dispatch = useAppDispatch()
  const component = useAppSelector((state)=> state.schema.deletingComponent)
  const t = useT()

  return(
    <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modern-modal-header bg-danger text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {t('schema.deleteComponent')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modern-modal-body">
          <div className="text-center mb-3">
            <i className="bi bi-puzzle text-danger" style={{fontSize: '3rem'}}></i>
          </div>
          <p className="text-center mb-3">
            {t('schema.deleteComponentConfirm')}
          </p>
          <div className="alert alert-warning" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            <strong>{t('schema.template')}:</strong> {component.name}
          </div>
          <p className="text-muted small text-center">
            {t('schema.actionCannotBeUndone')}
          </p>
        </Modal.Body>
        <Modal.Footer className="modern-modal-footer">
          <Button onClick={props.onHide} variant="outline-secondary">
            <i className="bi bi-x-lg me-2"></i>
            {t('schema.cancel')}
          </Button>
          <Button variant="danger" onClick={()=>  {dispatch(deleteComponentAction(component)); props.onHide()}} className="modern-btn">
            <i className="bi bi-trash-fill me-2"></i>
            {t('schema.deleteComponent')}
          </Button>
        </Modal.Footer>
    </Modal>


    )

}

// Friendly date formatter used by Schema UI (relative for recent, localized otherwise)
const formatFriendlyDate = (d?: string) => {
  try{
    if(!d) return ''
    const dt = new Date(d)
    if (isNaN(dt.getTime())) return d
    const diff = Date.now() - dt.getTime()
    const seconds = Math.floor(diff/1000)
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds/60)
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes/60)
    if (hours < 24) return `${hours}h`;
    return new Intl.DateTimeFormat(navigator.language, { year: 'numeric', month: 'short', day: 'numeric' }).format(dt)
  }catch(e){ return '' }
}

function Component(props : iProps ) {

  const selectedComponent = useAppSelector((state)=> state.schema.selectedComponent)
  const components = useAppSelector((state)=> state.schema.components)
  const dispatch = useAppDispatch()
  const [deleteComponentWarninShow,setDeleteComponentWarninShow] = useState(false)

  const  openDeleteForm = async () => {
    setDeleteComponentWarninShow(true); 
    await dispatch(setDeletingComponent(props.Compoent));
    await dispatch(loadSchemas());


  }



  if (props.Compoent.CType != 'listComponents')

  return(

    <>
      {props.Compoent.name} # {props.Compoent.CType + " " }

      <DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />
     
    </>
  )
  else {

    return (
      <>

      { props.Compoent != selectedComponent ? <> <button className="buttonSelectPage" onClick={()=>dispatch(selectComponent(props.Compoent))}> {props.Compoent.name } # {props.Compoent.CType }  </button>  {" "} </> : <span style={{fontWeight:"bold"}}> {props.Compoent.name} # {props.Compoent.CType + " "} </span>
      }
        <button className="buttonSelectPage" onClick={openDeleteForm}> </button>
      <ul>
        {([...components].sort((a,b)=>a.order - b.order).filter((item) => item.component == props.Compoent.component + "/" + item.name)).map((item)=><li> <Component Compoent={item}></Component></li> )}
      </ul>

      <DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />
 
      </>

    )
  }
}

 function AddPageForm(props: iPropsModal) {


  const [newPage, setNewPage] = useState<{page:string, CType:string, description:string, max:number}>({page:"", CType:"", description:"", max:20})
    const [description, setDescription] = useState("")
    const [validated, setValidated] = useState(false)
    const selectedPage = useAppSelector((state)=>state.schema.selectedPage)
  const emptyComponent: iSchemaField = {page:"", component:"", CType:"", name:"", description:"", max:10, order:0}
    const dispatch = useAppDispatch()
    
  useEffect(()=>{   setNewPage( selectedPage), setDescription( selectedPage?.description)},[selectedPage])
  const t = useT()

    

  async function clickOnCreatePage(event: React.FormEvent<HTMLFormElement>){

      var result = {...newPage, ...{description:description}}
      event.preventDefault();
      
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
    
         event.stopPropagation();
      
       }
 

    else {

      {
        await dispatch(addPageAction(result)); 
        
  await dispatch(loadSchemas());

   dispatch(selectComponent(emptyComponent));
  setNewPage({page:"", CType:"", description:"", max:20});
  setValidated(false);
  props.onHide();
      }

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
        <Modal.Header closeButton className="modern-modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            {props.mode=="Edit" ? 
              <><i className="bi bi-pencil-square me-2"></i>{t('schema.editTemplate').replace('{page}', newPage.page)}</> : 
              <><i className="bi bi-plus-circle-fill me-2"></i>{t('schema.addNewTemplate')}</>
            } 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modern-modal-body">
        <Stack direction="vertical" gap={3}>
        
        <Form.Group>
            <Form.Label>
              <i className="bi bi-tag me-2"></i>
                {t('schema.templateName')}
            </Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-file-text"></i>
              </span>
              <Form.Control 
                value={newPage.page} 
                onChange={(e)=> setNewPage({...newPage,  ...{page: (e.target as HTMLTextAreaElement).value}, ...{component: (e.target as HTMLTextAreaElement).value}})} 
                required 
                disabled={props.mode=="Edit"}
                placeholder={t('schema.templateName')}
                className="modern-input"
              />
            </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <i className="bi bi-gear me-2"></i>
            {t('schema.templateType')}
          </Form.Label>
          <FloatingLabel controlId="floatingSelect" label={t('schema.selectTypeLabel')}>
            <Form.Select  
              value={newPage.CType} 
              onChangeCapture={(e)=>setNewPage({...newPage, ...{CType:(e.target as HTMLTextAreaElement).value }})}  
              required 
              disabled={props.mode=="Edit"}
              className="modern-input"
            > 
                 <option value="">{t('schema.chooseType')}</option>
                 <option value="page">📄 Page</option>
                 <option value="partial">🧩 Partial</option>
            </Form.Select>
            </FloatingLabel>
        </Form.Group>


        <Form.Group>
            <Form.Label>
              <i className="bi bi-hash me-2"></i>
              Maximum Items:
            </Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-123"></i>
              </span>
        <Form.Control 
                value={newPage.max} 
                onChange={(e)=> setNewPage({...newPage,  ...{max: Number((e.target as HTMLTextAreaElement).value)}})} 
                required 
                type="number"
                min="1"
          placeholder={t('schema.enterMaximumItems')}
                className="modern-input"
              />
            </div>
        </Form.Group>

        <Form.Group>
            <Form.Label>
              <i className="bi bi-info-circle me-2"></i>
              {t('schema.descriptionInfo')}
            </Form.Label>
            <div className="modern-editor-wrapper">
              <ReactQuill 
                style={{height:"300px", marginBottom:"50px"}} 
                onChange={(e)=> setDescription(e)} 
                value={description}
                placeholder={t('schema.enterTemplateDescription')}
              />
            </div>
        </Form.Group>

    </Stack>   
        </Modal.Body>
        <Modal.Footer className="modern-modal-footer">
        <Stack gap={2} direction="horizontal">

        <Button onClick={()=> {setNewPage(emptyComponent); setDescription(""); setValidated(false); props.onHide()}}  variant="outline-secondary">
          <i className="bi bi-x-lg me-2"></i>
          {t('schema.cancel')}
        </Button>
        
            <Button  
              variant={props.mode=="Edit" ? "success" : "primary"} 
              className="modern-btn"
              type="submit" 
            >
              { props.mode=="Edit" ? 
                <><i className="bi bi-check-lg me-2"></i>{t('schema.updateTemplate')}</> :
                <><i className="bi bi-plus-lg me-2"></i>{t('schema.createTemplate')}</>
              }
            </Button>
          
        </Stack>
        </Modal.Footer>
        </Form>
      </Modal>
    );
}

function AddComponentForm(props: iPropsModal) {
    const selectedComponent = useAppSelector((state)=>state.schema.selectedComponent)
    const selectedPage = useAppSelector((state)=>state.schema.selectedPage)
  const components = useAppSelector((state)=> state.schema.components)
  const emptyComponent : iSchemaField   = {name:"", CType:"", page: selectedPage?.page || "", note:"", component:"" ,description:"", max:60, typeOfFile:"", min:0, options:[], identifier:false, required:false, order:  0, pattern:"*"}
  const [newComponent, setNewComponent] = useState<iSchemaField>(emptyComponent)
    const dispatch = useAppDispatch();
    const pages =useAppSelector((state)=>state.schema.pages )
  const t = useT()


    useEffect(()=>{
      if (props.mode === "Adding"){
        const comps = components as iSchemaField[]
        if (props.type === "Component"){
          const list = comps.filter((c)=> c.page + "/" + c.name === c.component)
          const lastOrder = list.length > 0 ? list.slice().sort((a,b)=> a.order - b.order)[list.length-1].order : -1
          setNewComponent({...emptyComponent, order: Number(lastOrder) + 1})
        } else {
          const list = comps.filter((c)=> c.component === selectedComponent.component + "/" + c.name)
          const lastOrder = list.length > 0 ? list.slice().sort((a,b)=> a.order - b.order)[list.length-1].order : -1
          setNewComponent({...emptyComponent, order: Number(lastOrder) + 1})
        }
      } else {
        setNewComponent(props.component)
      }
    },[props.mode, props.type, selectedComponent, components, props.component])
    
  
    const [validated, setValidated] = useState(false)
  const [tempValue, setTempValue] = useState<string>("")

  function clickOnAddComponent(event: React.FormEvent<HTMLFormElement>){
  event.preventDefault();
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
          
           event.stopPropagation();
         }
      else {

     if (props.mode =="Adding") dispatch(addComponentAction(newComponent)); else dispatch(editComponentAction(newComponent))  ; setNewComponent(emptyComponent); props.onHide() 
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
        <Modal.Header closeButton className="modern-modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
          {props.mode=="Adding" ? 
            <><i className="bi bi-plus-circle-fill me-2"></i>{t('schema.addNewComponent')} { props.type == "Component" ? <>Component</> : <>Subcomponent</> }</> :
            <><i className="bi bi-pencil-square me-2"></i>{t('schema.editComponentTitle').replace('{name}', newComponent.name)}</>
          }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modern-modal-body">
        <Stack direction="vertical" gap={3}>

        <Form.Group>
            <Form.Label>
              <i className="bi bi-tag me-2"></i>
                {t('schema.componentName')}
            </Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-puzzle"></i>
              </span>
              <Form.Control 
                disabled={props.mode=="Editing"} 
                value={newComponent?.name} 
                onChange={(e)=> setNewComponent({...newComponent,  ...{name: e.target.value}, ...{component: props.type=="Component" ? selectedPage.page + "/" + e.target.value : selectedComponent.component + "/"  + e.target.value  }})} 
                required
                placeholder="Enter component name"
                className="modern-input"
              />
            </div>
        </Form.Group>
     
         
        <Form.Group>
             
        <Form.Label>Type:</Form.Label>
  <FloatingLabel controlId="floatingSelect" label={t('schema.selectAType')}>
            <Form.Select disabled ={props.mode=="Editing"} value={newComponent?.CType} onChangeCapture={(e)=>setNewComponent({...newComponent, ...{CType:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 <option value="string">String</option>
                 <option value="numberAttribute">Number</option>
                 <option value="richtext">Rich Text</option>
                 <option value="date">Date/Time</option>
                 <option value="link">Link</option>
                 <option value="image">File</option>
                 <option value="color">Color</option>
                 <option value="listComponents">List Components</option>
                 <option value="selectAttribute">Select Attribute</option>
                 <option value="memberOf">Member of</option>
                 <option value="memberOfS">Member of (Single)</option>
                 
                 

            </Form.Select>
            </FloatingLabel>
        </Form.Group>
       

        {
        newComponent.CType == "string" ||  newComponent.CType == "link" || newComponent.CType == "selectAttribute" || newComponent.CType == "numberAttribute" || newComponent.CType == "memberOfS"  || newComponent.CType == "date" || newComponent.CType == "image"  ? <>
        <Form.Check disabled ={props.mode=="Editing"} type="switch" label="Identifier"  onChange={(e)=>{ if(e.target.checked) setNewComponent(  {...newComponent, ...{ identifier: e.target.checked, required: e.target.checked}}); else setNewComponent( {...newComponent, ...{ identifier: false}})}} checked={newComponent.identifier}  />
        
        </>: ""}
        {newComponent.CType == "string" ||  newComponent.CType == "link" ||  newComponent.CType == "selectAttribute" || newComponent.CType == "numberAttribute" || newComponent.CType == "memberOfS" || newComponent.CType == "color" || newComponent.CType == "date" || newComponent.CType == "image" ? <>
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
      <Form.Control type="number" value={newComponent.max} onChange={(e)=> {setNewComponent({...newComponent,  ...{max:Number((e.target as HTMLInputElement).value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }
        {newComponent.CType == "listComponents"  ? <>
    <Form.Group>
      <Form.Label>Max of element:</Form.Label>
      <Form.Control type="number" value={newComponent.max} onChange={(e)=> { setNewComponent({...newComponent,  ...{max: Number((e.target as HTMLInputElement).value)}})}}></Form.Control>
    </Form.Group>
        </> : ""
        }

      {newComponent.CType == "string"  ? <>
        <Form.Group>
            <Form.Label>RegEX Pattern:</Form.Label>
            <Form.Control type="text" value={newComponent.pattern} onChange={(e)=> { setNewComponent({...newComponent,  ...{pattern:(e.target as HTMLInputElement).value}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {newComponent.CType == "image"  ? <>
        <Form.Group>
            <Form.Label>Max Size:</Form.Label>
            <InputGroup className="mb-3">
            <Form.Control value={newComponent.max} onChange={(e)=> { setNewComponent({...newComponent,  ...{max: Number((e.target as HTMLInputElement).value)}})}}></Form.Control>
            <InputGroup.Text id="basic-addon2">KB</InputGroup.Text>
            </InputGroup>
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

{newComponent.CType == "date"  ? <>
     
        
        <Form.Group>
            <Form.Label>Type of date/time:</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="select a type">
            <Form.Select  value={newComponent.typeOfDate} onChangeCapture={(e)=>setNewComponent({...newComponent, ...{typeOfDate:(e.target as HTMLTextAreaElement).value}})} required >
                 <option></option>
                 <option value="date">Date</option>
                 <option value="time">Time</option>
                 <option value="datetime-local">Date/Time</option>
                 <option value="month">Mont</option>
                 <option value="week">Week</option>
            </Form.Select>
            </FloatingLabel>
            
        </Form.Group>
        
    
        </> : ""
        }

{newComponent.CType == "date"  &&  newComponent.typeOfDate ? <>
        <Form.Group>
            <Form.Label>Min number:</Form.Label>
            <Form.Control  type = {newComponent.typeOfDate}  value={newComponent.min} onChange={(e)=> setNewComponent({...newComponent,  ...{min: (e.target as HTMLInputElement).value}})}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Max number:</Form.Label>
            <Form.Control type = {newComponent.typeOfDate} value={newComponent.max} onChange={(e)=> setNewComponent({...newComponent,  ...{max: Number((e.target as HTMLInputElement).value)}})}></Form.Control>
        </Form.Group>
        </> : ""
        }       

{newComponent.CType == "numberAttribute"  ? <>
        <Form.Group>
            <Form.Label>Min number:</Form.Label>
            <Form.Control type="number" value={newComponent.min} onChange={(e)=> { setNewComponent({...newComponent,  ...{min: Number((e.target as HTMLInputElement).value)}})}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Max number:</Form.Label>
            <Form.Control type="number" value={newComponent.max} onChange={(e)=> { setNewComponent({...newComponent,  ...{max: Number((e.target as HTMLInputElement).value)}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }


        {newComponent.CType == "selectAttribute"  ? <>
        <Form.Group>
            <Form.Label>Options:</Form.Label>
            <Stack gap={3} direction="horizontal">
            <Form.Control value={tempValue} onChange={(e)=> setTempValue( e.target.value)}></Form.Control>
            
            <Button variant="primary" size="sm" onClick={()=>{ setNewComponent({...newComponent, ...{options: [...(newComponent.options || []), tempValue]}});   setTempValue("");} }  disabled ={tempValue == ""} className="modern-add-btn" style={{fontSize: '0.8rem', padding: '0.35rem 0.8rem'}}>
              <i className="bi bi-plus-circle"></i>Add
            </Button> 
            </Stack>  
        </Form.Group> 
        <div>
        
  <Stack gap={2} direction="horizontal">
   {(newComponent.options || []).map((i: any, idx: number)=> <Badge key={idx}  >{i} <CloseButton onClick={()=> setNewComponent({...newComponent, ...{options:(newComponent.options || []).filter((j: any)=> i!=j) }})}></CloseButton></Badge>)}
   </Stack>
        </div>
        </> : ""
        }
      
      {newComponent.CType == "memberOf" || newComponent.CType == "memberOfS"  ? <>
        <Form.Group>
            <Form.Label>Template member of</Form.Label>
      <FloatingLabel controlId="floatingSelect" label="select a type">
      <Form.Select  value={newComponent.memberOf} onChangeCapture={(e)=>setNewComponent({...newComponent, ...{memberOf:(e.target as HTMLTextAreaElement).value}})} required >
        <option key="empty"></option>
        {(pages || []).map((p: any, idx: number)=> <option key={p.page || idx}>{p.page}</option>)}
      </Form.Select>
      </FloatingLabel>
            
        </Form.Group>
        </> : ""
        }
    {newComponent.CType == "string" ||  newComponent.CType == "link" ? <>
        <Form.Group>
            <Form.Label>Default value:</Form.Label>
            <Form.Control type="text" pattern={newComponent.pattern} maxLength={newComponent.max} value={newComponent.default} onChange={(e)=> {setNewComponent({...newComponent,  ...{default:e.target.value}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }

  {newComponent.CType == "numberAttribute"  ? <>
        <Form.Group>
            <Form.Label>Default value:</Form.Label>
            <Form.Control type="number" pattern={newComponent.pattern} max={newComponent.max} min={newComponent.min}  value={newComponent.default} onChange={(e)=> {setNewComponent({...newComponent,  ...{default:e.target.value}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }

{newComponent.CType == "selectAttribute"  ? <>
        <Form.Group>
            <Form.Label>Default value:</Form.Label>
            <Form.Select value={newComponent.default} onChange={(e)=> {setNewComponent({...newComponent,  ...{default:(e.target as HTMLSelectElement).value}})}}>
              <option key="empty"></option>
              {(newComponent.options || []).map ((i: any, idx: number) => <option key={`${i}-${idx}`}>{i}</option>)}

            </Form.Select>
        </Form.Group>
        </> : ""
        }

{newComponent.CType == "date"  &&  newComponent.typeOfDate ? <>
        <Form.Group>
            <Form.Label>Default value:</Form.Label>
            <Form.Control type={newComponent.typeOfDate} max={newComponent.max} min={newComponent.min} onChange={(e)=> {setNewComponent({...newComponent,  ...{default:e.target.value}})}}></Form.Control>
        </Form.Group>
        </> : ""
        }
{newComponent.CType == "color"  ? <>
        <Form.Group>
            <Form.Label>Default value:</Form.Label>
            <Form.Control type="color"onChange={(e)=> {setNewComponent({...newComponent,  ...{default:e.target.value}})}} value={newComponent.default}></Form.Control>
        </Form.Group>
        </> : ""
        }
              

    </Stack>   
        </Modal.Body>
        <Modal.Footer>
        <Stack gap={2} direction="horizontal">

        <Button onClick={()=>{setNewComponent(emptyComponent);  setValidated(false);props.onHide()}}  variant="secondary" >Cancel</Button>
    
        <Button 
          variant={props.mode=="Adding" ? "primary" : "outline-success"} 
          className="modern-action-btn"
          type="submit"
        >  
          {props.mode=="Adding" ? 
            <><i className="bi bi-plus-circle me-2"></i>Add Component</> :
            <><i className="bi bi-check-circle me-2"></i>Save Changes</>
          }
        </Button>

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
    const [deleteWarninShow,setDeleteWarninShow] = useState(false)
  const [deleteComponentWarninShow,setDeleteComponentWarninShow] = useState(false)
  const loading = useAppSelector((state) => state.schema.loading)
    const [type, setType] = useState("Component");
    const [editMode, setEditMode] = useState("Adding")
    const [pageMode, setPageMode] = useState("Adding")
    const emptyPage: iSchemaField = {page:"", component:"", CType:"", name:"", description:"", max:0, order:0}
  const [editComponent, setEditComponent] = useState<iSchemaField | undefined>(undefined)
  const t = useT()
    
  
    useEffect(() => {dispatch(loadSchemas())},[])
    
    useEffect(() => {dispatch(clearPage())},[])

  const [movingKey, setMovingKey] = useState<string | null>(null)

  async function moveup(index: number, parent : string): Promise<void>{
      // Swap order of two adjacent components and persist changes to server.
      // Then reload components for the page to keep state in sync with backend.
      try {
        const list = [...components].filter(i => i.component == parent + "/" + i.name).sort((a,b)=> a.order - b.order);
        if (index <= 0 || index >= list.length) return;
  const c1 = { ...list[index] };
  const c2 = { ...list[index - 1] };
  // Ensure order is numeric
  c1.order = Number(c1.order);
  c2.order = Number(c2.order);
        const t = c1.order;
        c1.order = c2.order;
        c2.order = t;

  const key = `${parent}-${index}`
  setMovingKey(key)
  // Persist both changes and wait for completion
  console.debug('[schema] moveup - before edit1', c1)
  const res1: any = await dispatch(editComponentAction(c1));
  console.debug('[schema] moveup - edit1 result', res1)
  console.debug('[schema] moveup - before edit2', c2)
  const res2: any = await dispatch(editComponentAction(c2));
  console.debug('[schema] moveup - edit2 result', res2)

  // Refresh components for the page so UI reflects persisted order
  const reload: any = await dispatch(selectSchema({ page: parent }));
  console.debug('[schema] moveup - reload result', reload)
  setMovingKey(null)
      } catch (err) {
        console.error('Error moving component up', err);
      }
    }

    async function movedown(index: number, parent: string): Promise<void> {
      try {
        const list = [...components].filter(i => i.component == parent + "/" + i.name).sort((a,b)=> a.order - b.order);
        if (index < 0 || index >= list.length - 1) return;
  const c1 = { ...list[index] };
  const c2 = { ...list[index + 1] };
  // Ensure numeric
  c1.order = Number(c1.order);
  c2.order = Number(c2.order);
  const t = c1.order;
  c1.order = c2.order;
  c2.order = t;

  const key = `${parent}-${index}`
  setMovingKey(key)
  console.debug('[schema] movedown - before edit1', c1)
  const res1: any = await dispatch(editComponentAction(c1));
  console.debug('[schema] movedown - edit1 result', res1)
  console.debug('[schema] movedown - before edit2', c2)
  const res2: any = await dispatch(editComponentAction(c2));
  console.debug('[schema] movedown - edit2 result', res2)
  const reload: any = await dispatch(selectSchema({ page: parent }));
  console.debug('[schema] movedown - reload result', reload)
  setMovingKey(null)
      } catch (err) {
        console.error('Error moving component down', err);
      }
    }



return (
<AuroraPage variant="default">
    {/* Schema Header */}
  <div className="schema-header">
    <h1>🏗️ {t('schema.templates')}</h1>
    <p>{t('schema.descriptionInfo')}</p>
  </div>

<div className={ loading ? "fullSection sectionloading" :  "fullSection"}>
    <div className= "schemaAreaTemplatesDiv">
       <Stack direction="horizontal">
    <h4><i className="bi bi-grid-3x3-gap me-1"></i>{t('schema.templates')}</h4>
          <div className="ms-auto">
           <Button variant="primary" onClick={async ()=>{ dispatch(clearPage()) ; setPageMode("Add");setAddPageShow(true)}} size="sm" className="modern-add-btn" style={{fontSize: '0.8rem', padding: '0.35rem 0.8rem'}}>
             <i className="bi bi-plus-circle"></i>{t('schema.add')}
           </Button>
           </div>
           </Stack>
    <hr/>
            <div className="templates-list">
              {[...pages].sort((a,b)=> a.order- b.order ).map((item: iSchemaPage)=> 
              <div key={item.page} className={`template-item ${item.page === selectedPage.page ? 'active' : ''}`}> 
                {item.page != selectedPage.page ? (
                  <div onClick={()=>dispatch(selectSchema(item))} className="template-content">
                    <span className="template-name">{item.page}</span>
                    <span className="template-type">{item.CType}</span>
                  </div>
                ) : (
                  <>
                    <div className="template-content">
                      <span className="template-name">{item.page}</span>
                      <span className="template-type">{item.CType}</span>
                    </div>
                    <div className="template-actions">
                      <button className="action-btn edit" onClick={()=>{setPageMode("Edit"); setAddPageShow(true)}}>{t('schema.edit')}</button>
                      <button className="action-btn remove" onClick={()=>setDeleteWarninShow(true)}>{t('schema.remove')}</button>
                    </div>
                  </>
                )}
              </div>
              )} 
            </div>
    </div>
    <div className="schemaAreaFieldsDiv">
      <Stack direction="horizontal">
       <h4><i className="bi bi-list-ul me-1"></i>{t('schema.fields')}</h4>
        <div className="ms-auto">
        <Button variant="primary" onClick={()=>{setAddComponentShow(true); setEditMode("Adding"); setType("Component")}} size="sm" disabled={selectedPage.page==""} className="modern-add-btn" style={{fontSize: '0.8rem', padding: '0.35rem 0.8rem'}}>
          <i className="bi bi-plus-circle"></i>{t('schema.add')}
        </Button> 
        </div>
        </Stack>
        <hr/>
              <div className="schemaSubAreaFieldsDiv">
              {(() => {
                const pageComponents = [...components].sort((a,b)=> a.order - b.order).filter((item) => item.component == selectedPage.page + "/" + item.name );
                return pageComponents.map((item: iSchemaField, index)=> (
                 <div key={`${item.component}-${index}`} className="field-item">
                  <div className="field-move">
                    { index > 0 ? (
                      <OverlayTrigger overlay={<Tooltip id={`tip-up-${item.component}-${index}`}>{t('schema.moveUp')}</Tooltip>}>
                        <button 
                          className="move-up-btn btn btn-sm btn-outline-secondary"
                          onClick={()=> moveup(index, selectedPage.page )} 
                          disabled={loading || movingKey !== null}
                          aria-label={t('schema.moveUp')}
                        >
                          { movingKey === `${selectedPage.page}-${index}` ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-arrow-up" aria-hidden="true"></i> }
                        </button>
                      </OverlayTrigger>
                    ) : (
                      <div style={{width: "40px"}}></div>
                    )} 

                    { index < pageComponents.length - 1 ? (
                      <OverlayTrigger overlay={<Tooltip id={`tip-down-${item.component}-${index}`}>{t('schema.moveDown')}</Tooltip>}>
                        <button
                          className="move-down-btn btn btn-sm btn-outline-secondary ms-2"
                          onClick={()=> movedown(index, selectedPage.page)}
                          disabled={loading || movingKey !== null}
                          aria-label={t('schema.moveDown')}
                        >
                          { movingKey === `${selectedPage.page}-${index}` ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-arrow-down" aria-hidden="true"></i> }
                        </button>
                      </OverlayTrigger>
                    ) : null }
                  </div>
                  <div className="field-order">
                    <div>{index + 1}</div>
                    <div className="text-muted small">{formatFriendlyDate((item as any)?.updatedAt)}</div>
                  </div>
                  <div className="field-content">
                    <Component Compoent={item}></Component>
                  </div>
                  <div className="field-actions">
                    <button 
                      className="action-btn edit" 
                      onClick={()=>{setEditComponent(item);  setAddComponentShow(true); setEditMode("Editing"); setType("Component") }}
                      >
                      {t('schema.edit')}
                      </button>
                    <button 
                      className="action-btn remove" 
                      onClick={()=>{setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(item))}}
                      >
                      {t('schema.remove')}
                      </button>
                  </div>
                 </div>
                ))
              })()} 
              </div>
                
    </div>

    <div className="schemaAreaDetails">
     <Stack direction="horizontal">
     
     <h4><i className="bi bi-gear me-1"></i>Details</h4> 
    
        <div className="ms-auto">
       <Button variant="primary" onClick={()=>{setAddComponentShow(true); setType("SubComponent"); setEditMode("Adding"); }} disabled={selectedComponent.name==""}  size="sm" className="modern-add-btn" style={{fontSize: '0.8rem', padding: '0.35rem 0.8rem'}}>
         <i className="bi bi-plus-circle"></i>Add
       </Button> 
       
        </div>
        </Stack>
        <hr/>
        
              { 
                [...components].filter((item) => item.component == selectedComponent.component +"/"+ item.name).sort((a,b)=>a.order - b.order).map((item: iSchemaField, index)=> (
                <div key={`${item.component}-${index}`}>
                <Stack gap={3} direction="horizontal">
                  <div style={{minWidth:"30px"}}>
                  { index > 0 ? <Button variant = "primary" size="sm" onClick={()=> moveup(index, selectedComponent.component )} style={{borderRadius:"50%"}} disabled={loading}>^</Button>: ""}   
                  </div>
                  <div>
                    {index + 1}
                  </div>
                 <h6>{item.name} # {item.CType} </h6>

                  <div className="ms-auto">
                 (<button className="buttonSelectPage" onClick={()=>{setEditComponent(item);  setAddComponentShow(true); setEditMode("Editing"); setType("SubComponent");}}> {t('schema.edit')} </button> | <button className="buttonSelectPage" onClick={()=>{setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(item))}}>{t('schema.remove')}</button> )</div>
                <DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />
                 
                </Stack>

              <hr/>
              </div>))
              } 
            
    </div>
</div>

<AddPageForm show={addPageShow} onHide={()=>{setAddPageShow(false)}} mode={pageMode} value={ pageMode == "Edit" ? selectedPage : emptyPage} />
<AddComponentForm show={addCompoenentShow} onHide={()=>{setAddComponentShow(false)}} component={editComponent} mode={editMode} type={type}  />

<DeleteWarning show={deleteWarninShow} onHide={()=>setDeleteWarninShow(false)} />
<DeleteComponentWarning show={deleteComponentWarninShow} onHide={()=>setDeleteComponentWarninShow(false)} />

</AuroraPage>
    )
}

export default Schema