# Guía: Cómo crear una nueva página web

Propósito: dar un flujo mínimo, repetible y estandarizado para crear nuevas páginas usando el template, el DSL, el Design System y el sistema de traducciones.

Resumen rápido (contrato)
- Entrada: nombre/slug de página, plantilla (Template), campos Page/Content/Description/values.
- Salida: página React TSX que carga datos vía `selectPageAction`, renderiza campos con `Field`/DSL y usa clases del Design System.

Pasos (rápido)
1. Copia `src/Pages/articles-template.tsx` (o `example.tsx`) como base y renómbralo `src/Pages/<newpage>.tsx`.
2. Asegura la ruta en `src/App.tsx` (añade <Route path="/newpage/:name" element={<NewPage/>}> o similar).
3. Importa utilidades y patrones estándar:
   - `useAppDispatch`, `useAppSelector` para Redux
   - `selectPageAction(name)` para cargar la página
   - `Field` o `DSLField` para leer campos (si existe el DSL preferirlo)
4. Estructura mínima del componente:
   - Spinner / estado `isLoading` hasta que `selectPageAction` finalice.
   - Título: `selectedPage.Page || findValue('Name')`.
   - Descripción: renderizar `Description` con `dangerouslySetInnerHTML` si viene en HTML.
   - Contenido: renderizar `Content` con `dangerouslySetInnerHTML`.
   - Archivos: usar `DocumentsList` o `DownloadButton` para mostrar adjuntos.

Buenas prácticas
- Usar el DSL (`DSLLoader`, `DSLField`) para desacoplar lógica de redux de la UI.
- No introducir estilos inline: usar clases del Design System (`aurora-container`, `aurora-section`, `aurora-card`, etc.).
- Añadir traducciones con claves en `src/util/translations.ts` y usar `useT()` (o `useTranslation`).
- Añadir comentarios sobre qué componente del Design System se aplica antes de cada bloque.

Errores comunes y soluciones
- `selectPageAction` recibe `name` undefined: asegurar `useParams()` y `encodeURIComponent` en la ruta.
- HTML inseguro: sanitizar si el contenido viene de fuentes no confiables (aquí asumimos contenido confiable CMS).

Checklist antes de merge
- Página carga con `npm run dev` sin errores.
- Títulos y texto pasan por `t()` cuando sean visibles al usuario.
- No hay `console.error` en la carga inicial.

Links útiles (internos)
- `src/Pages/example.tsx`, `src/Pages/articles-template.tsx` como plantillas de referencia.

---

Ejemplo completo (plantilla mínima de página)

```tsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectPageAction } from '../pageSlice'
import Field from '../../util/field'
import DocumentsList from '../../components/DocumentsList'
import { useT } from '../../util/useTranslation'

const NewPage: React.FC = () => {
   const { name } = useParams<{ name?: string }>()
   const dispatch = useAppDispatch()
   const selectedPage = useAppSelector((s: any) => s.pages?.selectedPage || {})
   const [isLoading, setIsLoading] = useState(true)
   const t = useT()

   useEffect(() => {
      if (!name) return
      setIsLoading(true)
      ;(dispatch(selectPageAction(name)) as any)
         .finally(() => setIsLoading(false))
   }, [name, dispatch])

   if (isLoading) return <div>{t('common.loading')}</div>

   return (
      <div className="aurora-container">
         <h1><Field name="Page" /></h1>
         {selectedPage && <div className="article-description" dangerouslySetInnerHTML={{ __html: (selectedPage.Description || '') }} />}
         <div className="content" dangerouslySetInnerHTML={{ __html: (selectedPage.Content || '') }} />
         <DocumentsList page={selectedPage} />
      </div>
   )
}

export default NewPage
```

Notas rápidas:
- Si prefieres usar el DSL, reemplaza la carga con `<DSLLoader action="pages/selectPage" id={name}><DSLField name="Page" tag="h1"/></DSLLoader>`.
- Si el contenido HTML proviene de fuentes externas, añade un paso de sanitización antes de `dangerouslySetInnerHTML`.

Sección: Renderizar listas desde la API (Projects list)
----------------------------------------------------

Para mostrar una lista tomada directamente de la respuesta API (como la que se muestra en el ejemplo de este ticket), usamos el componente reutilizable `ProjectsApiList` que aplica las clases del Design System y añade atributos DSL/data útiles para que agentes o scripts puedan identificar la estructura.

Uso rápido:

1. Importa el componente en la página donde quieras listar proyectos:

```tsx
import ProjectsApiList from '../../components/ProjectsApiList'
// ... dentro del componente: <ProjectsApiList items={apiResponse.Items} />
```

2. El componente respeta las clases del Design System:
- contenedor: `aurora-grid`
- tarjeta: `aurora-card`, `aurora-card-title`, `aurora-card-subtitle`, `aurora-card-body`, `aurora-card-actions`

3. DSL / atributos data añadidos por tarjeta:
- `data-dsl="Projects/Item"` — identifica cada entrada como un Item del template Projects
- `data-template="<Template>"` — conserva el tipo de Template devuelto por la API (Articles, Documents, etc.)

Ejemplo mínimo de uso con la respuesta API:

```tsx
// Supongamos tienes la respuesta JSON en `response`
<ProjectsApiList items={response.Items} />
```

Esto produce por cada elemento una tarjeta con:
- Título (Page)
- Tipo (Template)
- Metadatos (updateUser, updateTime)
- Botón 'Ver proyecto' (usa la clave `projects.view` para traducción)

Si quieres usar DSL para rellenar plantillas más complejas, añade `data-dsl` en contenedores superiores para que `DSLLoader`/`DSLField` puedan operar sobre ellos.
