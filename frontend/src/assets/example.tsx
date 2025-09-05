import React from 'react'
// Field from util is no longer used here; DSLField is used instead
// DocumentsList encapsulates Loader+DownloadButton
import { DSLLoader, DSLField, DocumentsList } from '../lib/dsl'
// Removed loadPages and selectPageAction as they are unused

/**
 * Example page used as a living demo.
 * - shows the language selector (flag-only)
 * - demonstrates typography and a few utility classes
 * - demonstrates the `Field` component usage with fallback and render prop
 */
const ExamplePage: React.FC = () => {


  return (
    <div className="aurora-page" style={{ padding: 24 }}>

  <section style={{ maxWidth: 980 }}>
       <article style={{ marginBottom: 32 }}>
        <div>
       
          </div>
        </article>

        <article>
          <h2>Documentos disponibles</h2>
          <p>Se descargarán y listarán todos los documentos almacenados en la base de datos.</p>

          {/* Small DSL demo: declarative loader + field */}
          <DSLLoader action="pages/loadPages" fallback={<p>Cargando (DSL)...</p>}>
            {/* show first page title/description using DSLField */}
            <div style={{ marginBottom: 20 }}>
              <DSLField slice="pages" field="Page" as="h2" fallback={<em>(sin páginas)</em>} />
              <DSLField slice="pages" field="Descirption" as="p" fallback={null} />
            </div>
          </DSLLoader>
          <DocumentsList />
        </article>
      </section>

    </div>
  )
}

export default ExamplePage
