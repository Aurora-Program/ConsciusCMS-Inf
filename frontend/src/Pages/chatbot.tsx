// === IMPORTS NECESARIOS ===
import './chatbot.css'  // Estilos específicos para chatbot
import '../App.css'     // Estilos globales de la aplicación

import { useEffect } from 'react'
// Hooks personalizados para Redux con TypeScript
import { useAppDispatch, useAppSelector } from '../hooks.js'
// Acción asíncrona que obtiene datos de la API por ID
import { selectPageAction } from './pageSlice.js'

/**
 * COMPONENTE CHATBOT - TEMPLATE PARA CHATBOT EXPERIMENTAL
 * 
 * PROPÓSITO: Este archivo demuestra cómo adaptar el template base para:
 * 1. Mostrar información de un chatbot experimental
 * 2. Conectar con Redux para obtener datos dinámicos de la API
 * 3. Renderizar información específica del chatbot (nombre, capabilities, demo)
 * 4. Servir como ejemplo de adaptación del template maestro
 * 
 * FLUJO DE TRABAJO SEGUIDO:
 * - Copiado de example.tsx
 * - Renombrado Example → Chatbot
 * - Adaptación Article → Bot para componentes
 * - Personalización del HTML para mostrar info de chatbot
 * 
 * FLUJO DE DATOS:
 * URL → selectPageAction() → API → Redux Store → useSelector → Template
 */

function Chatbot() {

    // === CONEXIÓN CON REDUX ===
    const dispatch = useAppDispatch()
    // Obtiene el array 'data' del estado Redux (viene de pageSlice)
    // Este 'data' contiene todos los componentes del chatbot desde la API
    const data = useAppSelector(state => (state as any).pages?.data || [])

    // === PARÁMETROS Y ESTADO LOCAL ===
    // Contador de visitas (se guarda en localStorage)
    const t = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    // === EFECTOS ===
    // Incrementa contador de visitas cada vez que se monta el componente
    useEffect(() => {
        localStorage.setItem('value', String(t + 1))
    }, [])
      
    // EFECTO PRINCIPAL: Obtiene datos de la API cuando se monta el componente
    useEffect(() => { 
        dispatch(selectPageAction())  // Dispatch de acción asíncrona
    }, [dispatch])  // Se ejecuta cuando el componente se monta

    /**
     * CÓMO FUNCIONA EL SISTEMA DE DATOS PARA CHATBOT:
     * 
     * 1. selectPageAction() hace una llamada a la API
     * 2. La API devuelve un array de objetos con esta estructura:
     *    [
     *      { component: "Bot/Name", value: { text: "Aurora Assistant" } },
     *      { component: "Bot/Version", value: { value: "v1.0-experimental" } },
     *      { component: "Bot/Capabilities", value: { text: "Lista de capacidades..." } },
     *      { name: "Content", value: { text: "<p>Descripción del chatbot...</p>" } }
     *    ]
     * 3. Este array se guarda en Redux (state.pages.data)
     * 4. El componente busca elementos específicos usando .find()
     */ 

    /**
     * GUÍA PARA AGENTES - ESTRUCTURA DE COMPONENTES CHATBOT:
     * 
     * ESTRUCTURA JERÁRQUICA ADAPTADA:
     * - Parent: "Bot" => Chatbot experimental (contenedor principal)
     *   - Child: "Bot/Name" => Nombre del chatbot (campo: value.text)
     *   - Child: "Bot/Version" => Versión del bot (campo: value.value)
     *   - Child: "Bot/Capabilities" => Capacidades del bot (campo: value.text)
     *   - Child: "Bot/Model" => Modelo de IA usado (campo: value.value)
     *   - Child: "Content" => Descripción detallada (campo: value.text)
     * 
     * PATRONES DE BÚSQUEDA ADAPTADOS:
     * - Para componentes del bot: data.find(item => item.component === "Bot/Campo")
     * - Para descripción general: data.find(item => item.name === "Content")
     * 
     * EJEMPLO DE TRANSFORMACIÓN APLICADA:
     * ANTES (Article): "Article/Title" → ?.value["text"]
     * DESPUÉS (Bot): "Bot/Name" → ?.value["text"]
     */

    // === TEMPLATE DINÁMICO PARA CHATBOT ===
    // Este template está adaptado específicamente para mostrar información de chatbots
return (
    <>
      <div className="container">
        {/* PATRÓN: Nombre del chatbot */}
        <h1 id="bot-name" className="chatbot-title">
          🤖 {data.find((item: any) => item.component === "Bot/Name")?.value["text"] || "Chatbot Experimental"}
        </h1>
        
        {/* PATRÓN: Información técnica del bot */}
        <div className="bot-info">
            <div className="bot-version">
                <strong>Versión:</strong> <span id="bot-version">
                  {data.find((item: any) => item.component === "Bot/Version")?.value["value"] || "v1.0-experimental"}
                </span>
            </div>
            <div className="bot-model">
                <strong>Modelo:</strong> <span id="bot-model">
                  {data.find((item: any) => item.component === "Bot/Model")?.value["value"] || "Aurora-GPT"}
                </span>
            </div>
        </div>
        
        {/* PATRÓN: Capacidades del chatbot */}
        <div className="bot-capabilities">
            <h3>Capacidades</h3>
            <div id="bot-capabilities-content">
              <div dangerouslySetInnerHTML={{ 
                __html: data.find((item: any) => item.component === "Bot/Capabilities")?.value["text"] || 
                "<ul><li>Conversación natural</li><li>Respuestas contextuales</li><li>Aprendizaje continuo</li></ul>"
              }}/>
            </div>
        </div>
        
        {/* PATRÓN: Descripción detallada del bot */}
        <div className="bot-description" id="bot-content">
            <h3>Descripción</h3>
            <div dangerouslySetInnerHTML={{ 
              __html: data.find((item: any) => item.name === "Content")?.value["text"] || 
              "<p>Este es un chatbot experimental desarrollado por Aurora Program para demostrar capacidades avanzadas de IA conversacional.</p>"
            }}/>
        </div>
        
        {/* SECCIÓN INTERACTIVA - Demo del chatbot */}
        <div className="bot-demo">
            <h3>Demo Interactivo</h3>
            <div className="chat-container">
                <div className="chat-messages" id="chat-messages">
                    <div className="bot-message">
                        <strong>{data.find((item: any) => item.component === "Bot/Name")?.value["text"] || "Aurora Bot"}:</strong> 
                        ¡Hola! Soy un chatbot experimental. ¿En qué puedo ayudarte?
                    </div>
                </div>
                <div className="chat-input">
                    <input 
                        type="text" 
                        placeholder="Escribe tu mensaje aquí..." 
                        className="form-control"
                        id="user-input"
                    />
                    <button className="btn btn-primary" id="send-btn">Enviar</button>
                </div>
            </div>
        </div>
        
        {/* REUTILIZACIÓN: Información del bot en footer */}
        <footer className="bot-footer">
            <div className="bot-credits">
                🔬 <strong>Proyecto Experimental:</strong> 
                <span id="footer-bot-name">
                  {data.find((item: any) => item.component === "Bot/Name")?.value["text"] || "Aurora Chatbot"}
                </span>
                <br/>
                📊 <strong>Versión:</strong> 
                {data.find((item: any) => item.component === "Bot/Version")?.value["value"] || "v1.0-experimental"}
                <br/>
                &copy; 2025 Aurora Program - Experimento de IA Ética
            </div>
        </footer>
    </div>
</>
    )

}

/**
 * EJEMPLO DE ADAPTACIÓN EXITOSA DEL TEMPLATE MAESTRO:
 * 
 * TRANSFORMACIONES APLICADAS:
 * 1. Example → Chatbot (nombre del componente)
 * 2. Article → Bot (dominio de datos)
 * 3. Article/Title → Bot/Name (nombre del chatbot)
 * 4. Article/Author → Bot/Version + Bot/Model (info técnica)
 * 5. Content → Descripción del chatbot
 * 6. Añadido: Bot/Capabilities (capacidades específicas)
 * 7. Añadido: Sección interactiva de demo
 * 
 * NUEVOS ELEMENTOS ESPECÍFICOS:
 * - 🤖 Emoji para identificar el chatbot
 * - Información técnica (versión, modelo)
 * - Lista de capacidades
 * - Demo interactivo con chat
 * - Footer con créditos del experimento
 * 
 * ESTRUCTURA DE DATOS ESPERADA DE LA API:
 * [
 *   { component: "Bot/Name", value: { text: "Aurora Assistant" } },
 *   { component: "Bot/Version", value: { value: "v1.0-experimental" } },
 *   { component: "Bot/Model", value: { value: "Aurora-GPT" } },
 *   { component: "Bot/Capabilities", value: { text: "<ul><li>...</li></ul>" } },
 *   { name: "Content", value: { text: "<p>Descripción...</p>" } }
 * ]
 * 
 * PATRONES MANTENIDOS DEL TEMPLATE MAESTRO:
 * - Misma estructura Redux (useAppDispatch, useAppSelector)
 * - Mismos useEffect para datos y contador
 * - Mismos patrones de búsqueda con .find()
 * - Misma gestión de errores con || ""
 * - Reutilización de datos en múltiples secciones
 */

export default Chatbot
