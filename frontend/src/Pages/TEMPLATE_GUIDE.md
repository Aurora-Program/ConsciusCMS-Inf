# GUÍA PARA AGENTES - CREACIÓN DE TEMPLATES

## Propósito
El archivo `example.tsx` sirve como template maestro que los agentes pueden copiar y adaptar según instrucciones del usuario.

## Ejemplos de Prompts y Respuestas

### EJEMPLO 1: Template de Biografías
**Prompt del usuario:**
> "Crea un template para mostrar biografías de científicos con nombre, institución, área de investigación y una foto"

**Acción del agente:**
1. Copiar `example.tsx` → `biography.tsx`
2. Cambiar `Example` → `Biography`
3. Adaptar componentes:
   - `Article/Title` → `Scientist/Name`
   - `Article/Author` → `Scientist/Institution`
   - Añadir `Scientist/Research`
   - Añadir `Scientist/Photo`

### EJEMPLO 2: Template de Productos
**Prompt del usuario:**
> "Necesito una página para mostrar productos con título, precio, descripción e imagen"

**Acción del agente:**
1. Copiar `example.tsx` → `product.tsx`
2. Cambiar `Example` → `Product`
3. Adaptar componentes:
   - `Article/Title` → `Product/Name`
   - `Article/Author` → `Product/Price`
   - `Content` → `Product/Description`
   - Añadir `Product/Image`

### EJEMPLO 3: Template de Eventos
**Prompt del usuario:**
> "Quiero mostrar eventos con fecha, lugar, organizador y agenda"

**Acción del agente:**
1. Copiar `example.tsx` → `event.tsx`
2. Cambiar `Example` → `Event`
3. Adaptar componentes:
   - `Article/Title` → `Event/Name`
   - `Article/Author` → `Event/Organizer`
   - Añadir `Event/Date`
   - Añadir `Event/Location`
   - `Content` → `Event/Agenda`

## Estructura de Datos API

Todos los templates siguen la misma estructura de datos:

```json
[
  {
    "component": "Dominio/Campo",
    "value": {
      "text": "Para contenido HTML/largo",
      "value": "Para datos simples",
      "url": "Para enlaces/imágenes"
    }
  },
  {
    "name": "Content",
    "value": {
      "text": "<p>Contenido HTML completo...</p>"
    }
  }
]
```

## Patrones de Código Reutilizables

### Búsqueda de datos:
```tsx
// Para componentes jerárquicos
data.find((item: any) => item.component === "Dominio/Campo")?.value["tipo"]

// Para contenido general
data.find((item: any) => item.name === "Content")?.value["text"]
```

### Tipos de value:
- `.value["text"]` → Contenido HTML o texto largo
- `.value["value"]` → Datos simples (nombres, números, fechas)
- `.value["url"]` → URLs para imágenes o enlaces

### Manejo de errores:
- Siempre usar `|| ""` para evitar undefined
- Usar `(item: any)` para TypeScript
- Usar `className` en lugar de `class`

## Checklist para Agentes

Antes de entregar un template nuevo, verificar:

- [ ] El archivo se copió completamente de `example.tsx`
- [ ] Se cambió el nombre del componente
- [ ] Se adaptaron todos los `component` según el dominio
- [ ] Se mantuvieron los imports y estructura Redux
- [ ] Se actualizaron los comentarios relevantes
- [ ] Se verificó que compile sin errores TypeScript
- [ ] Los IDs y clases CSS son apropiados
- [ ] Se mantuvieron los patrones de búsqueda de datos

## Ventajas de este Sistema

1. **Consistencia**: Todos los templates siguen la misma estructura
2. **Rapidez**: Los agentes pueden crear templates en minutos
3. **Mantenibilidad**: Un solo patrón para mantener
4. **Escalabilidad**: Fácil añadir nuevos tipos de contenido
5. **Reutilización**: Redux y API funcionan igual para todos
