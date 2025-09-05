import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect, useState } from "react"
import { Stack, Modal, Form, Button, Tab, Tabs, SplitButton, Dropdown, Col, Row, Badge, Card } from "react-bootstrap"
import { loadSchemas, selectSchema } from "../Schema/schemaSlice"
import "./editor.css"
import { loadPages, selectPageAction, deletePageAction, newSelectedPage, updatePageAction, savePageAction } from "./editorSlice"
import Field from "./Fields"
import { iSchemaPage, iPage, iSchemaField } from "../types"
import Home from "../Pages/home"
import About from '../Pages/about'
import Product from "../Pages/product"
import Staff from "../Pages/staff"
import News from "../Pages/news"
import Web from "../Pages/web"
import Inicio from "../Pages/inicio"
import PMAPagination from "../util/pmaPagination"
import PMASearch from "../util/pmaSearch"

function Editor() {
  const templates = useAppSelector((state) => state.schema.pages)
  const pages = useAppSelector((state) => state.editor.pages)
  const selectedPage = useAppSelector((state) => state.editor.selectedPage)
  const selectedTemplate = useAppSelector((state) => state.schema.selectedPage)
  const fields = useAppSelector((state) => state.schema.components)
  const dispatch = useAppDispatch()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [pageToDelete, setPageToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    dispatch(loadSchemas())
    dispatch(loadPages())
  }, [])

  const handleDeletePage = (page) => {
    setPageToDelete(page)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (pageToDelete) {
      dispatch(deletePageAction(pageToDelete))
      setShowDeleteModal(false)
      setPageToDelete(null)
    }
  }

  const handleSavePage = () => {
    dispatch(savePageAction(selectedPage))
    setShowSaveModal(false)
  }

  const filteredPages = pages.filter(page =>
    page.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.template?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredPages.slice(indexOfFirstItem, indexOfLastItem)

  const renderPreview = () => {
    if (!selectedPage) return null

    switch (selectedPage.template) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'product':
        return <Product />
      case 'staff':
        return <Staff />
      case 'news':
        return <News />
      case 'web':
        return <Web />
      case 'inicio':
        return <Inicio />
      default:
        return <div className="aurora-centered">Selecciona una página para ver la vista previa</div>
    }
  }

  return (
    <div className="aurora-page aurora-fade-in">
      <div className="aurora-container aurora-container--wide">
        {/* Page Header */}
        <div className="aurora-page-header">
          <h1 className="aurora-page-title">✏️ Editor de Contenido</h1>
          <p className="aurora-page-subtitle">
            Crea y edita el contenido de tus páginas con facilidad
          </p>
        </div>

        {/* Toolbar */}
        <div className="aurora-toolbar">
          <div className="aurora-toolbar-left">
            <SplitButton
              variant="primary"
              title="Nueva Página"
              onClick={() => dispatch(newSelectedPage())}
            >
              {templates.map((template) => (
                <Dropdown.Item
                  key={template.page}
                  onClick={() => dispatch(newSelectedPage(template))}
                >
                  {template.page}
                </Dropdown.Item>
              ))}
            </SplitButton>
            
            {selectedPage && (
              <Button
                variant="success"
                onClick={() => setShowSaveModal(true)}
                disabled={!selectedPage.name}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                  <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
                </svg>
                Guardar
              </Button>
            )}
          </div>

          <div className="aurora-toolbar-center">
            <PMASearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Buscar páginas..."
            />
          </div>

          <div className="aurora-toolbar-right">
            <Badge bg="info">
              {filteredPages.length} página{filteredPages.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="aurora-grid aurora-grid--sidebar-left">
          {/* Pages List Sidebar */}
          <div className="aurora-section">
            <div className="aurora-section-header">
              <h2 className="aurora-section-title">Páginas</h2>
            </div>

            <div className="aurora-card">
              <div className="aurora-card-body p-0">
                {currentItems.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {currentItems.map((page) => (
                      <div
                        key={page.id}
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                          selectedPage?.id === page.id ? 'active' : ''
                        }`}
                        onClick={() => dispatch(selectPageAction(page))}
                        style={{ cursor: 'pointer' }}
                      >
                        <div>
                          <h6 className="mb-1">{page.name}</h6>
                          <small className="text-muted">{page.template}</small>
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePage(page)
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aurora-centered p-4">
                    <p>No se encontraron páginas</p>
                  </div>
                )}
              </div>

              {filteredPages.length > itemsPerPage && (
                <div className="aurora-card-footer">
                  <PMAPagination
                    currentPage={currentPage}
                    totalItems={filteredPages.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div className="aurora-section">
            {selectedPage ? (
              <Tabs defaultActiveKey="editor" className="mb-4">
                <Tab eventKey="editor" title="Editor">
                  <div className="aurora-card">
                    <div className="aurora-card-header">
                      <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                      <h3 className="aurora-card-title">
                        Editando: {selectedPage.name || 'Nueva Página'}
                      </h3>
                      <Badge bg="secondary">{selectedPage.template}</Badge>
                    </div>

                    <div className="aurora-card-body">
                      {/* Page Name Field */}
                      <div className="mb-4">
                        <Form.Group>
                          <Form.Label>Nombre de la página</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedPage.name || ''}
                            onChange={(e) => dispatch(updatePageAction({
                              ...selectedPage,
                              name: e.target.value
                            }))}
                            placeholder="Ingresa el nombre de la página"
                          />
                        </Form.Group>
                      </div>

                      {/* Dynamic Fields */}
                      <div className="aurora-grid aurora-grid--1">
                        {fields
                          .filter(field => field.page === selectedTemplate.page)
                          .sort((a, b) => a.order - b.order)
                          .map((field) => (
                            <div key={field.id} className="aurora-card aurora-card--compact">
                              <Field field={field} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="preview" title="Vista Previa">
                  <div className="aurora-card">
                    <div className="aurora-card-header">
                      <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                      </svg>
                      <h3 className="aurora-card-title">Vista Previa</h3>
                    </div>
                    <div className="aurora-card-body">
                      <div className="border rounded p-3" style={{ minHeight: '400px' }}>
                        {renderPreview()}
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            ) : (
              <div className="aurora-card aurora-full-height aurora-centered">
                <div className="text-center">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-muted mb-3">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <h4>Selecciona una página para editar</h4>
                  <p className="text-muted">
                    Elige una página de la lista o crea una nueva para comenzar a editar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🗑️ Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="aurora-card">
            <p>¿Estás seguro de que quieres eliminar la página <strong>{pageToDelete?.name}</strong>?</p>
            <p className="text-muted">Esta acción no se puede deshacer.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Save Confirmation Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>💾 Guardar Cambios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="aurora-card">
            <p>¿Quieres guardar los cambios en la página <strong>{selectedPage?.name}</strong>?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSavePage}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Editor
