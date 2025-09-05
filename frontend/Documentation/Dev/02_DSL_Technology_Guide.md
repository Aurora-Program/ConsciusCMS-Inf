# Guía: Tecnología DSL (qué es y cómo usarla)

Resumen
- El DSL (Domain Specific Language) del frontend son componentes/etiquetas que abstraen llamadas a Redux (thunks) y lecturas del slice `pages`. Ejemplos: `DSLLoader`, `DSLField`.
- Objetivo: simplificar la creación de UI declarativa sin acoplar la vista a la lógica de `dispatch`/`select`.

Contrato
- Inputs: nombre de acción (string), identificador (page name o id), props de rendering.
- Output: dispatch automático del thunk, estados de carga (loading/error/success), y renderizado del `selectedPage` o `page` prop.

Componentes principales
- `reduxRegistry` — mapea nombres como `pages/loadPages` o `pages/selectPage` a thunks reales y provee selectores adaptados.
- `DSLLoader` — recibe `action="pages/loadPages"` (o similar) y se encarga de despachar y mostrar children según el estado.
- `DSLField` — renderiza un campo del slice (por ejemplo `Page`, `Content`, `Description`) usando `reduxRegistry.selectFieldFromSlice`.

Patrón de uso
1. Declarativo en JSX:
   <DSLLoader action="pages/loadPages" fetchDetails={true} id={"some-id">}
     <DSLField name="Page" tag="h1"/>
   </DSLLoader>
2. `DSLLoader` consulta `statusById` y decide mostrar fallback, spinner, o children.

Ventajas
- Menos boilerplate en componentes de página.
- Reutilización y consistencia.
- Fácilmente testeable: el registry se puede stubear.

Limitaciones y consideraciones
- El DSL depende de convenciones en `pageSlice` (nombres de acciones, estructura de `selectedPage`). Si cambian, actualizar `reduxRegistry`.
- Para llamadas complejas con múltiples argumentos, preferir thunks explícitos.

Ejemplos
- `src/components/reduxRegistry.ts`
- `src/components/DSLLoader.tsx`
- `src/components/DSLField.tsx`

Próximos pasos sugeridos
- Expandir la API DSL con `<DSLList>` y `<DSLActionButton>` para acciones post-click.
- Documentar el contrato del registry con TypeScript para autocompletado.

---

Ejemplo de uso rápido

```tsx
<DSLLoader action="pages/selectPage" id={name}>
  <DSLField name="Page" tag="h1"/>
  <DSLField name="Description" tag="div"/>
  <DSLField name="Content" tag="div"/>
</DSLLoader>
```

Sketch del registry (simplificado)

```ts
// reduxRegistry.ts (esquema)
export const reduxRegistry = {
  actions: {
    'pages/loadPages': loadPagesThunk,
    'pages/selectPage': selectPageAction
  },
  selectFieldFromSlice: (state: any, id: string, name: string) => {
    const page = state.pages.selectedPage
    return page?.[name] || null
  }
}
```
