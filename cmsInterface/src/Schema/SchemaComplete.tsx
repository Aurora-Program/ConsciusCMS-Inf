import { Table, Stack, Form, Button, Modal, FloatingLabel, Badge, CloseButton } from "react-bootstrap"
import { useState, useEffect } from "react"
import './Schema.css'
import { editComponentAction, addPageAction, addComponentAction, selectComponent, selectSchema, clearPage, iSchemaField, loadSchemas, deletePageAction, deleteComponentAction, setDeletingComponent } from "./schemaSlice.tsx"
import { useAppSelector, useAppDispatch } from '../hooks.tsx'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.core.css"
import { InputGroup } from "react-bootstrap"

interface iProps {
  Compoent: iSchemaField
}

interface iSchemaPage {
  name: string,
  type: string
}

interface iPropsModal {
  show: boolean
  onHide: () => void
  mode?: string
  type?: string
  component?: any
  value?: any
}

function DeleteWarning(props: iPropsModal) {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.schema.selectedPage)

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          🗑️ Eliminar Template: {page.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="aurora-card">
          <p>¿Estás seguro de que quieres eliminar este template: <strong>{page.name}</strong>?</p>
          <p className="text-muted">Esta acción no se puede deshacer.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>Cancelar</Button>
        <Button variant='danger' onClick={() => { dispatch(deletePageAction(page)); props.onHide() }}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  )
}

function DeleteComponentWarning(props: iPropsModal) {
  const dispatch = useAppDispatch()
  const component = useAppSelector((state) => state.schema.deletingComponent)

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          🗑️ Eliminar Componente: {component?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="aurora-card">
          <p>¿Estás seguro de que quieres eliminar este componente: <strong>{component?.name}</strong>?</p>
          <p className="text-muted">Esta acción no se puede deshacer.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>Cancelar</Button>
        <Button variant='danger' onClick={() => { dispatch(deleteComponentAction(component)); props.onHide() }}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  )
}

function AddPageForm(props: iPropsModal) {
  const [newPage, setNewPage] = useState({ page: "", CType: "", max: 20 })
  const [description, setDescription] = useState("")
  const [validated, setValidated] = useState(false)
  const selectedPage = useAppSelector((state) => state.schema.selectedPage)
  const emptyComponent: iSchemaField = { page: "", component: "", CType: "", name: "", description: "", max: 10 }
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (props.mode === "Edit" && selectedPage) {
      setNewPage(selectedPage)
      setDescription(selectedPage?.description || "")
    }
  }, [selectedPage, props.mode])

  async function clickOnCreatePage(event: any) {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    } else {
      const result = { ...newPage, description: description }
      if (props.mode === "Edit") {
        // Lógica para editar
      } else {
        await dispatch(addPageAction(result))
      }
      await dispatch(loadSchemas())
      dispatch(selectComponent(emptyComponent))
      setNewPage({ page: "", CType: "", max: 20 })
      setDescription("")
      setValidated(false)
      props.onHide()
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={clickOnCreatePage} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.mode === "Edit" ? `✏️ Editar template: ${newPage.page}` : "➕ Agregar template"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="aurora-card">
            <Stack direction="vertical" gap={3}>
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  value={newPage.page}
                  onChange={(e) => setNewPage({
                    ...newPage,
                    page: e.target.value,
                    component: e.target.value
                  })}
                  required
                  disabled={props.mode === "Edit"}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tipo:</Form.Label>
                <FloatingLabel controlId="floatingSelect" label="Selecciona un tipo">
                  <Form.Select
                    value={newPage.CType}
                    onChange={(e) => setNewPage({ ...newPage, CType: e.target.value })}
                    required
                    disabled={props.mode === "Edit"}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="page">Page</option>
                    <option value="partial">Partial</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <Form.Label>Máximo:</Form.Label>
                <Form.Control
                  type="number"
                  value={newPage.max}
                  onChange={(e) => setNewPage({ ...newPage, max: parseInt(e.target.value) })}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Información:</Form.Label>
                <div style={{ height: "200px", marginBottom: "50px" }}>
                  <ReactQuill
                    style={{ height: "150px" }}
                    onChange={(value) => setDescription(value)}
                    value={description}
                  />
                </div>
              </Form.Group>
            </Stack>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={() => { 
              setNewPage({ page: "", CType: "", max: 20 })
              setDescription("")
              setValidated(false)
              props.onHide() 
            }} 
            variant="secondary"
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {props.mode === "Edit" ? "Guardar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

function AddComponentForm(props: iPropsModal) {
  const selectedComponent = useAppSelector((state) => state.schema.selectedComponent)
  const selectedPage = useAppSelector((state) => state.schema.selectedPage)
  const components = useAppSelector((state) => state.schema.components)
  const emptyComponent: iSchemaField = {
    name: "", CType: "", page: selectedPage?.page || "", note: "", component: "",
    description: "", max: 60, typeofFile: "", min: 0, options: [], identifier: false,
    required: false, order: 0, pattern: "*"
  }
  const [newComponent, setNewComponent] = useState(emptyComponent)
  const [validated, setValidated] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (props.mode === "Adding") {
      if (props.type === "Component") {
        const order = components.filter((i) => i.page + "/" + i.name === i.component).length > 0 ?
          [...components.filter((i) => i.page + "/" + i.name === i.component)]
            .sort((a, b) => a.order - b.order)[components.filter((i) => i.page + "/" + i.name === i.component).length - 1]?.order + 1 : 0
        setNewComponent({ ...emptyComponent, order: order })
      } else {
        const order = components.filter(i => i.component === selectedComponent.component + "/" + i.name).length > 0 ?
          [...components.filter(i => i.component === selectedComponent.component + "/" + i.name)]
            .sort((a, b) => a.order - b.order)[components.filter(i => i.component === selectedComponent.component + "/" + i.name).length - 1]?.order + 1 : 0
        setNewComponent({ ...emptyComponent, order: order })
      }
    } else {
      setNewComponent(props.component || emptyComponent)
    }
  }, [selectedComponent, components, props.component, props.mode, props.type])

  function clickOnAddComponent(event: any) {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    } else {
      if (props.mode === "Adding") {
        dispatch(addComponentAction(newComponent))
      } else {
        dispatch(editComponentAction(newComponent))
      }
      setNewComponent(emptyComponent)
      props.onHide()
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={clickOnAddComponent} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.mode === "Adding" ?
              `➕ Agregar ${props.type === "Component" ? "componente" : "subcomponente"}` :
              `✏️ Editar ${props.type === "Component" ? "componente" : "subcomponente"}: ${newComponent.name}`
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="aurora-card">
            <Stack direction="vertical" gap={3}>
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  value={newComponent.name}
                  onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tipo:</Form.Label>
                <Form.Select
                  value={newComponent.CType}
                  onChange={(e) => setNewComponent({ ...newComponent, CType: e.target.value })}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="file">File</option>
                  <option value="listComponents">List Components</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComponent.description}
                  onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
                />
              </Form.Group>
            </Stack>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Cancelar</Button>
          <Button variant="primary" type="submit">
            {props.mode === "Adding" ? "Agregar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

function Component(props: iProps) {
  const components = useAppSelector((state) => state.schema.components)
  const selectedComponent = useAppSelector((state) => state.schema.selectedComponent)
  const [deleteComponentWarninShow, setDeleteComponentWarninShow] = useState(false)
  const dispatch = useAppDispatch()

  const openDeleteForm = () => {
    dispatch(setDeletingComponent(props.Compoent))
    setDeleteComponentWarninShow(true)
  }

  if (props.Compoent.CType !== 'listComponents') {
    return (
      <>
        <div className="aurora-card aurora-card--compact">
          <div className="aurora-card-header">
            <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            <h6 className="aurora-card-title">{props.Compoent.name} # {props.Compoent.CType}</h6>
          </div>
        </div>
        <DeleteComponentWarning show={deleteComponentWarninShow} onHide={() => setDeleteComponentWarninShow(false)} />
      </>
    )
  } else {
    return (
      <>
        <div className="aurora-card aurora-card--compact">
          <div className="aurora-card-header">
            <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            {props.Compoent !== selectedComponent ?
              <button className="aurora-card-title btn btn-link p-0" onClick={() => dispatch(selectComponent(props.Compoent))}>
                {props.Compoent.name} # {props.Compoent.CType}
              </button> :
              <h6 className="aurora-card-title" style={{ fontWeight: "bold" }}>
                {props.Compoent.name} # {props.Compoent.CType}
              </h6>
            }
            <button className="btn btn-sm btn-outline-danger" onClick={openDeleteForm}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
          <div className="aurora-card-body">
            <ul className="list-unstyled">
              {([...components].sort((a, b) => a.order - b.order).filter((item) => item.component === props.Compoent.component + "/" + item.name)).map((item) =>
                <li key={item.id}><Component Compoent={item}></Component></li>
              )}
            </ul>
          </div>
        </div>
        <DeleteComponentWarning show={deleteComponentWarninShow} onHide={() => setDeleteComponentWarninShow(false)} />
      </>
    )
  }
}

function Schema() {
  const pages = useAppSelector((state) => state.schema.pages)
  const components = useAppSelector((state) => state.schema.components)
  const selectedPage = useAppSelector((state) => state.schema.selectedPage)
  const selectedComponent = useAppSelector((state) => state.schema.selectedComponent)
  const loading = useAppSelector((state) => state.schema.loading)
  const dispatch = useAppDispatch()

  const [addPageShow, setAddPageShow] = useState(false)
  const [addComponentShow, setAddComponentShow] = useState(false)
  const [deleteWarninShow, setDeleteWarninShow] = useState(false)
  const [deleteComponentWarninShow, setDeleteComponentWarninShow] = useState(false)
  const [pageMode, setPageMode] = useState("Adding")
  const [editMode, setEditMode] = useState("Adding")
  const [type, setType] = useState("Component")
  const [editComponent, setEditComponent] = useState({})

  const emptyPage = { page: "", CType: "", order: 0 }

  useEffect(() => {
    dispatch(loadSchemas())
  }, [])

  const moveup = async (index: number, page: string) => {
    // Implementation for moving components up
  }

  return (
    <div className="aurora-page aurora-fade-in">
      <div className="aurora-container aurora-container--wide">
        {/* Page Header */}
        <div className="aurora-page-header">
          <h1 className="aurora-page-title">🏗️ Schema Builder</h1>
          <p className="aurora-page-subtitle">
            Diseña y gestiona la estructura de contenido de tu sitio web
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="aurora-grid aurora-grid--sidebar-left">
          {/* Templates Sidebar */}
          <div className="aurora-section">
            <div className="aurora-section-header">
              <h2 className="aurora-section-title">Templates</h2>
              <Button
                variant="primary"
                onClick={() => { setAddPageShow(true); setPageMode("Adding") }}
                className="btn-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                Nuevo Template
              </Button>
            </div>

            <div className="aurora-table-container">
              <Table hover className="aurora-table mb-0">
                <tbody>
                  {[...pages].sort((a, b) => a.order - b.order).map((item: iSchemaPage) => (
                    <tr key={item.page}>
                      <td>
                        {item.page !== selectedPage?.page ? (
                          <button
                            className="btn btn-link p-0 text-start"
                            onClick={() => dispatch(selectSchema(item))}
                          >
                            <strong>{item.page}</strong> # {item.CType}
                          </button>
                        ) : (
                          <div className="d-flex align-items-center justify-content-between">
                            <span style={{ fontWeight: "bold" }}>
                              {item.page} # {item.CType}
                            </span>
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => { setPageMode("Edit"); setAddPageShow(true) }}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => setDeleteWarninShow(true)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="aurora-section">
            {/* Fields Section */}
            <div className="aurora-card">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                <h3 className="aurora-card-title">Campos</h3>
                <Button
                  variant="primary"
                  onClick={() => { setAddComponentShow(true); setEditMode("Adding"); setType("Component") }}
                  size="sm"
                  disabled={!selectedPage?.page}
                  className="ms-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                  Agregar Campo
                </Button>
              </div>

              <div className="aurora-card-body">
                {selectedPage?.page ? (
                  [...components].sort((a, b) => a.order - b.order)
                    .filter((item) => item.component === selectedPage.page + "/" + item.name)
                    .map((item: iSchemaField, index) => (
                      <div key={item.id} className="aurora-card aurora-card--compact mb-3">
                        <div className="aurora-card-header">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{ minWidth: "30px" }}>
                              {index > 0 && (
                                <Button
                                  variant="primary"
                                  onClick={() => moveup(index, selectedPage.page)}
                                  size="sm"
                                  style={{ borderRadius: "50%", padding: "6px" }}
                                  disabled={loading}
                                >
                                  ↑
                                </Button>
                              )}
                            </div>
                            <Badge bg="primary">{index + 1}</Badge>
                          </div>
                          <div className="flex-grow-1">
                            <Component Compoent={item} />
                          </div>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => { setEditComponent(item); setAddComponentShow(true); setEditMode("Editing"); setType("Component") }}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => { setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(item)) }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="aurora-centered p-4">
                    <p>Selecciona un template para ver sus campos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="aurora-card mt-4">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
                </svg>
                <h3 className="aurora-card-title">Detalles</h3>
                <Button
                  variant="primary"
                  onClick={() => { setAddComponentShow(true); setType("SubComponent"); setEditMode("Adding"); }}
                  disabled={!selectedComponent?.name}
                  size="sm"
                  className="ms-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                  Agregar Detalle
                </Button>
              </div>

              <div className="aurora-card-body">
                {selectedComponent?.name ? (
                  [...components].filter((item) => item.component === selectedComponent.component + "/" + item.name)
                    .sort((a, b) => a.order - b.order)
                    .map((item: iSchemaField, index) => (
                      <div key={item.id} className="aurora-card aurora-card--compact mb-3">
                        <div className="aurora-card-header">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{ minWidth: "30px" }}>
                              {index > 0 && (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => moveup(index, selectedComponent.component)}
                                  style={{ borderRadius: "50%" }}
                                  disabled={loading}
                                >
                                  ↑
                                </Button>
                              )}
                            </div>
                            <Badge bg="secondary">{index + 1}</Badge>
                            <h6 className="mb-0">{item.name} # {item.CType}</h6>
                          </div>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => { setEditComponent(item); setAddComponentShow(true); setEditMode("Editing"); setType("SubComponent"); }}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => { setDeleteComponentWarninShow(true); dispatch(setDeletingComponent(item)) }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="aurora-centered p-4">
                    <p>Selecciona un componente para ver sus detalles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddPageForm 
        show={addPageShow} 
        onHide={() => setAddPageShow(false)} 
        mode={pageMode} 
        value={pageMode === "Edit" ? selectedPage : emptyPage} 
      />
      <AddComponentForm 
        show={addComponentShow} 
        onHide={() => setAddComponentShow(false)} 
        component={editComponent} 
        mode={editMode} 
        type={type} 
      />
      <DeleteWarning 
        show={deleteWarninShow} 
        onHide={() => setDeleteWarninShow(false)} 
      />
      <DeleteComponentWarning 
        show={deleteComponentWarninShow} 
        onHide={() => setDeleteComponentWarninShow(false)} 
      />
    </div>
  )
}

export default Schema
