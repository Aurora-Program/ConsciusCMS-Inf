// === IMPORTS NECESARIOS ===
import './article.css'  // Estilos específicos para artículos
import '../App.css'     // Estilos globales de la aplicación

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
// Hooks personalizados para Redux con TypeScript
import { useAppDispatch, useAppSelector } from '../hooks'
// Acción asíncrona que obtiene datos de la API por ID
import { selectPageAction } from './pageSlice'
import { useT } from '../util/useTranslation'

/**
 * COMPONENTE EXAMPLE - TEMPLATE BASE PARA AGENTES
 * 
 * PROPÓSITO: Este archivo sirve como PLANTILLA MAESTRA que los agentes pueden:
 * 1. COPIAR completamente
 * 2. RENOMBRAR el componente y archivo
 * 3. ADAPTAR según instrucciones del prompt del usuario
 * 4. MODIFICAR la estructura de datos según el nuevo dominio
 * 
 * FLUJO DE TRABAJO PARA AGENTES:
 * - Usuario: "Crea un template para mostrar biografías de científicos"
 * - Agente: Copia example.tsx → biography.tsx
 * - Agente: Cambia "Article" por "Biography" en todos los componentes
 * - Agente: Adapta los campos según el prompt (Name, Institution, Research, etc.)
 * 
 * FLUJO DE DATOS:
 * URL → useParams() → selectPageAction(id) → API → Redux Store → useSelector → Template
 */






function Example() {

    // === CONEXIÓN CON REDUX ===
    const dispatch = useAppDispatch()
    // Obtiene el array 'data' del estado Redux (viene de pageSlice)
    const data = useAppSelector(state => (state as any).pages?.data || [])
    const tHook = useT()

    // === PARÁMETROS Y ESTADO LOCAL ===
    const params = useParams<{ name?: string }>()
    const name = params.name
    const [isLoading, setIsLoading] = useState(true)

    // Contador de visitas (se guarda en localStorage) - safer read/write
    useEffect(() => {
      const prev = Number(localStorage.getItem('value') || '0')
      localStorage.setItem('value', String(prev + 1))
    }, [])

    // EFECTO PRINCIPAL: Obtiene datos de la API cuando cambia el ID
    useEffect(() => { 
        setIsLoading(true)
  const p = dispatch(selectPageAction(name ?? ''))
        ;(p as any)
          .catch((err: any) => console.error('selectPageAction failed in example:', err))
          .finally(() => setIsLoading(false))
    }, [dispatch, name])

    /**
     * CÓMO FUNCIONA EL SISTEMA DE DATOS:
     * 
     * 1. selectPageAction(id) hace una llamada a la API
     * 2. La API devuelve un array de objetos con esta estructura:
     *    [
     *      { component: "Article/Title", value: { text: "Mi Título" } },
     *      { component: "Article/Author", value: { value: "Juan Pérez" } },
     *      { name: "Content", value: { text: "<p>Contenido HTML...</p>" } }
     *    ]
     * 3. Este array se guarda en Redux (state.pages.data)
     * 4. El componente busca elementos específicos usando .find()
     */ 

    /**
     * GUÍA PARA AGENTES - ESTRUCTURA DE COMPONENTES:
     * 
     * ESTRUCTURA JERÁRQUICA:
     * - Parent: "Article" => Artículos publicados (contenedor principal)
     *   - Child: "Article/Title" => Título del artículo (campo: value.text)
     *   - Child: "Article/Author" => Autor del artículo (campo: value.value)
     *   - Child: "Content" => Contenido HTML del artículo (campo: value.text)
     * 
     * PATRONES DE BÚSQUEDA:
     * - Para componentes jerárquicos: data.find(item => item.component === "Parent/Child")
     * - Para contenido general: data.find(item => item.name === "Content")
     * 
     * CAMPOS DE ACCESO:
     * - Títulos y texto HTML: ?.value["text"]
     * - Valores simples: ?.value["value"]
     * 
     * EJEMPLO DE USO PARA OTROS TEMPLATES:
     * - Biography/Name, Biography/Role, Biography/Description
     * - Project/Title, Project/Tech, Project/Description
     * - Book/Title, Book/Author, Book/Chapter
     */

    // memoized lookups
    const title = useMemo(() => data.find((item: any) => item.component === 'Article/Title')?.value?.text || '', [data])
    const author = useMemo(() => data.find((item: any) => item.component === 'Article/Author')?.value?.value || '', [data])
    const contentHtml = useMemo(() => data.find((item: any) => item.name === 'Content')?.value?.text || '', [data])

    if (isLoading) {
      return (
        <div className="aurora-loading-container">
          <div className="aurora-loading-spinner" />
          <p>{tHook('common.loading') || 'Cargando...'}</p>
        </div>
      )
    }

    // === TEMPLATE DINÁMICO ===
    // Este template sirve como ejemplo/plantilla para otros componentes similares
    return (
      <div className="aurora-container" role="article" aria-labelledby="article-title">
        <h1 id="article-title">{title}</h1>

        <div className="author">
          {tHook('example.writtenBy') || 'Escrito por'} <span id="article-author">{author}</span>
        </div>

        <div className="content" id="article-content">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <footer>
          &copy; 2025 <span id="footer-author">{author}</span>. GNU License
        </footer>
      </div>
    )

}

/**
 * EJEMPLOS PARA OTROS TEMPLATES QUE UN AGENTE PUEDE CREAR:
 * 
 * 1. BIOGRAPHY TEMPLATE:
 *    - Biography/Name → ?.value["text"]
 *    - Biography/Role → ?.value["value"] 
 *    - Biography/Photo → ?.value["url"]
 * 
 * 2. PROJECT TEMPLATE:
 *    - Project/Title → ?.value["text"]
 *    - Project/Tech → ?.value["value"]
 *    - Project/Description → ?.value["text"]
 * 
 * 3. BOOK TEMPLATE:
 *    - Book/Title → ?.value["text"]
 *    - Book/Author → ?.value["value"]
 *    - Book/Chapter → ?.value["text"]
 * 
 * INSTRUCCIONES PASO A PASO PARA AGENTES:
 * 
 * PASO 1 - ANÁLISIS DEL PROMPT:
 * - Identificar el dominio (biografía, proyecto, producto, etc.)
 * - Extraer los campos necesarios del prompt del usuario
 * - Determinar el nombre del nuevo componente
 * 
 * PASO 2 - COPIA Y RENOMBRADO:
 * - Copiar este archivo completo a [nuevo-nombre].tsx
 * - Cambiar "Example" por el nuevo nombre en:
 *   * Nombre de función
 *   * Export default
 *   * Comentarios relevantes
 * 
 * PASO 3 - ADAPTACIÓN DE COMPONENTES:
 * - Reemplazar "Article" por el nuevo dominio en todos los component:
 *   * "Article/Title" → "[Dominio]/[Campo1]"
 *   * "Article/Author" → "[Dominio]/[Campo2]"
 * - Mantener "Content" si se necesita contenido HTML largo
 * 
 * PASO 4 - PERSONALIZACIÓN DEL TEMPLATE:
 * - Adaptar la estructura HTML según las necesidades
 * - Cambiar IDs y clases CSS si es necesario
 * - Añadir o quitar secciones según el prompt
 * - Mantener los patrones de búsqueda de datos
 * 
 * EJEMPLO DE TRANSFORMACIÓN:
 * Prompt: "Crea template para mostrar perfiles de investigadores"
 * 
 * ANTES: data.find(item => item.component === "Article/Title")?.value["text"]
 * DESPUÉS: data.find(item => item.component === "Researcher/Name")?.value["text"]
 * 
 * ANTES: data.find(item => item.component === "Article/Author")?.value["value"]
 * DESPUÉS: data.find(item => item.component === "Researcher/Institution")?.value["value"]
 * 
 * REGLAS PARA AGENTES:
 * - Siempre usar (item: any) para evitar errores de TypeScript
 * - Usar ?.value["text"] para contenido HTML/texto largo
 * - Usar ?.value["value"] para datos simples (nombres, fechas, etc.)
 * - Usar ?.value["url"] para enlaces/imágenes
 * - Siempre añadir || "" para evitar undefined
 * - Usar className en lugar de class
 * - Reutilizar datos cuando sea necesario (ej: autor en header y footer)
 * - Mantener la estructura Redux y los useEffect tal como están
 */

export default Example