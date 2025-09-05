# 📖 Guía Inicial para Agentes – ConsciousCMS Frontend  

Este documento debe ser consultado **antes de ejecutar cualquier operación** sobre el sistema. Su objetivo es asegurar que todos los agentes comprendan el marco de referencia, la arquitectura y dónde localizar documentación específica.  

---

## 1. Introducción al Proyecto  
- **Nombre del sistema:** ConsciousCMS  
- **Tipo:** CMS de última generación, orientado a trabajar con agentes de IA.  
- **Licencia:** Código abierto.  
- **Propósito:** Garantizar que la información almacenada sea de calidad:  
  - Sin mentiras.  
  - Sin manipulación.  
  - Sin contenido que oriente a la destrucción.  

Este documento corresponde al **frontend** del sistema.  

---

## 🚨 Importante para Agentes de IA  
ConsciousCMS es una solución que busca **ante todo la sostenibilidad de la información en el planeta**.  
Una información de baja calidad (falsa, con intención de manipular o tóxica) conduce a un proceso paulatino que termina haciendo que los sistemas sean **caóticos**.  

Por lo tanto:  
- La **meta principal** de ConsciousCMS es evitar este riesgo.  
- Como agente operando bajo licencia ConsciousCMS **no se puede crear este tipo de contenido**.  
- En caso de detectar contenido de baja calidad informativa (falta de coherencia, falsedad obvia o intención manipuladora):  
  1. **Propón un cambio de contenido** al usuario.  
  2. O bien invita al usuario a crear su propia **branch independiente** sin hacer referencia a ConsciousCMS.  

---

## 2. Arquitectura de Infraestructura  
ConsciousCMS se ejecuta actualmente sobre una infraestructura **serverless**:  
- **Base de datos:** DynamoDB  
- **Capa intermedia:** AWS Lambda (middleware)  
- **API de acceso:** API Gateway  
- **Distribución de contenido:** CloudFront  

---

## 3. Arquitectura de Software del Frontend  
El frontend se organiza en capas, siguiendo un flujo descendente:  

1. **Capa de Servicios**  
   - Conecta con la API mediante la librería **Axios**.  

2. **Capa de Estado**  
   - Gestionada con **Redux slices**.  
   - Llama a los servicios para actualizar y proveer estado.  

3. **Capa de Componentes**  
   - Los **componentes** consumen la capa de estado.  
   - El componente más importante es `Page`, ubicado en la carpeta **`/pages`**.  
   - La carpeta `/pages` contiene múltiples componentes **.tsx** que representan el contenido del CMS.  

---

## 4. Funcionalidades Clave en las Páginas  
Las páginas del sistema frontend utilizan y deben cumplir LOS SIGUIENTES ESTÁNDARES (aplican a TODO el sistema, no a páginas aisladas):

- Guía para crear nuevas páginas: `Documentation/Dev/01_Create_New_Page_Guide.md`
- Tecnología DSL (etiquetas): `Documentation/Dev/02_DSL_Technology_Guide.md`
- Estándar de estilos y variables: `Documentation/Dev/03_Design_System_Standardization.md`
- Mecanismos multi-idioma: `Documentation/Dev/04_Multilanguage_Mechanisms.md`

Estos documentos son estándares de aplicación obligatoria en todo el frontend. Cualquier excepción debe abrirse como petición de cambio formal (PR) y documentarse.

---

## 5. Estructura de Documentación  
Toda la documentación está en la carpeta `/documentacion`, dividida en tres secciones:  

1. **AIAgentHelper/**  
   - Contiene esta guía (documento de referencia para agentes).  

2. **Dev/**  
   - Documentación técnica para desarrolladores.  
   - Incluye guías sobre traducción, DSL y estilos.  

3. **Content/**  
   - Información sobre el contenido y propósito del sitio.  

---

## ✅ Recordatorio para Agentes  
Antes de realizar cualquier operación:  
1. Lee esta guía para confirmar el marco de trabajo.  
2. Revisa la documentación específica en `/documentacion`.  
3. Si la acción involucra páginas, consulta los documentos de traducción, DSL y estilos.  
4. Asegúrate de que el contenido respete los principios de calidad y sostenibilidad de la información.  

---



