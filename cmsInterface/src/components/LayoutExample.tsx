import React from 'react'
import { Button, Form, Table, Modal, Badge } from 'react-bootstrap'

// Ejemplo de cómo usar el nuevo sistema de layout Aurora
function LayoutExample() {
  return (
    <div className="aurora-page aurora-fade-in">
      {/* Contenedor estándar - ancho máximo 1200px */}
      <div className="aurora-container">
        
        {/* Header de página estándar */}
        <div className="aurora-page-header">
          <h1 className="aurora-page-title">🎨 Sistema de Layout Aurora</h1>
          <p className="aurora-page-subtitle">
            Guía de uso y ejemplos del nuevo sistema de layout estandarizado
          </p>
        </div>

        {/* Sección con barra de herramientas */}
        <div className="aurora-section">
          <div className="aurora-toolbar">
            <div className="aurora-toolbar-left">
              <Button variant="primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                </svg>
                Nuevo Elemento
              </Button>
              <Button variant="outline-secondary">Importar</Button>
            </div>
            
            <div className="aurora-toolbar-center">
              <Form.Control 
                type="search" 
                placeholder="Buscar..." 
                style={{ maxWidth: '300px' }}
              />
            </div>
            
            <div className="aurora-toolbar-right">
              <Badge bg="info">42 elementos</Badge>
              <Button variant="outline-primary" size="sm">Filtros</Button>
            </div>
          </div>
        </div>

        {/* Grid de 2 columnas */}
        <div className="aurora-section">
          <div className="aurora-section-header">
            <h2 className="aurora-section-title">Grid de 2 Columnas</h2>
            <p className="aurora-section-description">
              Layout adaptable que se convierte en 1 columna en móviles
            </p>
          </div>
          
          <div className="aurora-grid aurora-grid--2">
            <div className="aurora-card">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                <h3 className="aurora-card-title">Tarjeta 1</h3>
              </div>
              <div className="aurora-card-body">
                <p>Contenido de la primera tarjeta con el nuevo sistema de diseño Aurora.</p>
              </div>
              <div className="aurora-card-footer">
                <Button variant="primary" size="sm">Acción</Button>
                <Button variant="outline-secondary" size="sm">Cancelar</Button>
              </div>
            </div>

            <div className="aurora-card aurora-card--gradient">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                </svg>
                <h3 className="aurora-card-title">Tarjeta Gradiente</h3>
              </div>
              <div className="aurora-card-body">
                <p>Esta tarjeta usa el gradiente Aurora para destacar contenido importante.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de 3 columnas */}
        <div className="aurora-section">
          <div className="aurora-section-header">
            <h2 className="aurora-section-title">Grid de 3 Columnas</h2>
          </div>
          
          <div className="aurora-grid aurora-grid--3">
            <div className="aurora-card aurora-card--compact">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                </svg>
                <h4 className="aurora-card-title">Métrica 1</h4>
              </div>
              <div className="aurora-card-body">
                <h2 className="text-primary mb-0">1,234</h2>
                <small className="text-muted">Usuarios activos</small>
              </div>
            </div>

            <div className="aurora-card aurora-card--compact">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
                <h4 className="aurora-card-title">Métrica 2</h4>
              </div>
              <div className="aurora-card-body">
                <h2 className="text-success mb-0">98.5%</h2>
                <small className="text-muted">Disponibilidad</small>
              </div>
            </div>

            <div className="aurora-card aurora-card--compact">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,3V21H21V19H5V3H3M16,11H18V18H16V11M10,7H12V18H10V7M4,14H6V18H4V14M19,16H21V18H19V16M19,10H21V14H19V10M19,4H21V8H19V4M13,1H15V4H13V1Z"/>
                </svg>
                <h4 className="aurora-card-title">Métrica 3</h4>
              </div>
              <div className="aurora-card-body">
                <h2 className="text-warning mb-0">5.2K</h2>
                <small className="text-muted">Transacciones</small>
              </div>
            </div>
          </div>
        </div>

        {/* Layout con sidebar */}
        <div className="aurora-section">
          <div className="aurora-section-header">
            <h2 className="aurora-section-title">Layout con Sidebar</h2>
          </div>
          
          <div className="aurora-grid aurora-grid--sidebar-right">
            <div className="aurora-card">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <h3 className="aurora-card-title">Contenido Principal</h3>
              </div>
              <div className="aurora-card-body">
                <p>Este es el área de contenido principal que ocupa la mayor parte del espacio.</p>
                <p>El sidebar aparece a la derecha en pantallas grandes y debajo en móviles.</p>
              </div>
            </div>

            <div className="aurora-card">
              <div className="aurora-card-header">
                <svg className="aurora-card-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M21,11H20A2,2 0 0,1 18,9A2,2 0 0,1 20,7H21A1,1 0 0,1 22,8V10A1,1 0 0,1 21,11Z"/>
                </svg>
                <h4 className="aurora-card-title">Sidebar</h4>
              </div>
              <div className="aurora-card-body">
                <ul className="list-unstyled">
                  <li>• Información adicional</li>
                  <li>• Enlaces relacionados</li>
                  <li>• Widgets</li>
                  <li>• Herramientas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla con el nuevo diseño */}
        <div className="aurora-section">
          <div className="aurora-section-header">
            <h2 className="aurora-section-title">Tabla Modernizada</h2>
          </div>
          
          <div className="aurora-table-container">
            <Table className="aurora-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>Proyecto Aurora</td>
                  <td><Badge bg="success">Activo</Badge></td>
                  <td>2025-08-14</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-1">Editar</Button>
                    <Button variant="outline-danger" size="sm">Eliminar</Button>
                  </td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Sistema de Layout</td>
                  <td><Badge bg="warning">En desarrollo</Badge></td>
                  <td>2025-08-14</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-1">Editar</Button>
                    <Button variant="outline-danger" size="sm">Eliminar</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        {/* Utilidades */}
        <div className="aurora-section">
          <div className="aurora-section-header">
            <h2 className="aurora-section-title">Clases de Utilidad</h2>
          </div>

          <div className="aurora-card">
            <div className="aurora-card-body">
              <h5>Variantes de Contenedor:</h5>
              <ul>
                <li><code>.aurora-container</code> - Ancho estándar (1200px)</li>
                <li><code>.aurora-container--narrow</code> - Ancho reducido (800px)</li>
                <li><code>.aurora-container--wide</code> - Ancho amplio (1600px)</li>
                <li><code>.aurora-container--full</code> - Ancho completo</li>
              </ul>

              <div className="aurora-spacer"></div>

              <h5>Grids Disponibles:</h5>
              <ul>
                <li><code>.aurora-grid--1</code> - 1 columna</li>
                <li><code>.aurora-grid--2</code> - 2 columnas adaptables</li>
                <li><code>.aurora-grid--3</code> - 3 columnas adaptables</li>
                <li><code>.aurora-grid--4</code> - 4 columnas adaptables</li>
                <li><code>.aurora-grid--sidebar-left</code> - Sidebar izquierdo</li>
                <li><code>.aurora-grid--sidebar-right</code> - Sidebar derecho</li>
              </ul>

              <div className="aurora-spacer"></div>

              <h5>Animaciones:</h5>
              <ul>
                <li><code>.aurora-fade-in</code> - Entrada con fade</li>
                <li><code>.aurora-slide-up</code> - Entrada deslizando hacia arriba</li>
                <li><code>.aurora-scale-in</code> - Entrada con escala</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="aurora-divider"></div>

        {/* Footer de ejemplo */}
        <div className="aurora-section">
          <div className="aurora-card aurora-centered">
            <h4>🎉 ¡Sistema de Layout Aurora Implementado!</h4>
            <p>Todas las páginas ahora pueden usar este sistema estandarizado para una experiencia consistente.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutExample
