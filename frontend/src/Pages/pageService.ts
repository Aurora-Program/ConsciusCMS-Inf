import axios from "axios";
import { iSchemaField, iSchemaPage } from "./PAGESSlice";


const url_bucket = import.meta.env.VITE_URL_API_BUCKET + "/" + import.meta.env.VITE_CONTENT_BUCKET_NAME

// (old iSchemaPageTable removed - not used)

export  const downloadFile = async (name) =>
    {
        const res = await fetch(url_bucket + "/"  + name, {
            method: 'GET',
            // 👇 Set headers manually for single file upload
            headers: {
              'content-type': 'image/png'
            },
          })
            const imageBlob = await res.blob()
            const imageObjectURL =  URL.createObjectURL(imageBlob);
            console.log("download file:" + imageObjectURL)
            return (imageObjectURL)
    }

export const uploadImage = async (file)=> {

    console.log("file name:" + file.name)
        // 👇 Uploading the file using the fetch API to the server
    try{
    const res = await fetch(url_bucket + "/" + file.name, {
          method: 'PUT',
          body: file,
          // 👇 Set headers manually for single file upload
          headers: {
            'content-type': file.type,
            'content-length': `${file.size}`, // 👈 Headers need to be a string
             Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
          },
        })
    
    const  data = ""

    


    }
    catch{
        console.log("error")
        }

    }





export async function addPage(data){

    const url = import.meta.env.VITE_URL_API_PAGES


    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        },  
        }

    const res = await axios.post( url,data,config );

    return {Page: res['data'].Page, Template: res['data'].Template, values:[]}

    }

    export async function savePage(data){

        const url = import.meta.env.VITE_URL_API_PAGES
    
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`
            },  
            }
    
        const res = await axios.post( url,data,config );

        console.log("data:" + data.values[0])
    
        return {res}
    
        }


    
export async function deletePage(data: iSchemaField){

    const url = import.meta.env.VITE_URL_API_PAGES

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        },                   
        data
    };

    const res = await axios.delete( url, config );
    console.log("item: " + data.component)
    const response : iSchemaField[] = data
    return response

    }




export async function fetchPageByPage(payload: string){
    console.log("payload:"+payload)
    const url = import.meta.env.VITE_URL_API_PAGES + "/" + payload
    const url_bucket = import.meta.env.VITE_CONTENT_BUCKET_URL

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           
        }
    };
    const res = await axios.get( url );


    console.log ("r: " + res['data'].Items)
    const response : iSchemaField[] = res['data'].Items[0]

    const loadData = () => {

        let tempprojects = [];
      
     

        [...response.values.find(v => v.name == "Title")?.value].sort((a,b)=> a.order - b.order)?.map((i)=>
       { 
            let tempslides = [];
            
             console.log( i.value);
             [...i.value?.find(v=>v.Schema.name == "Diapositivas")?.value].sort((a,b)=> a.order - b.order)?.map(d =>{
               
                tempslides.push({name: d?.value?.find(v=> v.Schema.name == "Titulo").value?.text, layout: d.value?.find(v=> v.Schema.name == "Pantalla completa")?.value?.value,  image:url_bucket+ "/" + d.value?.find(v=> v.Schema.name == "Fotografia")?.value?.name, color:d.value?.find(v=> v.Schema.name == "Color de la fuente")?.value?.value, nameAlt: d?.value?.find(v=> v.Schema.name == "Titulo Alternativo")?.value?.text, layoutAlt: d.value?.find(v=> v.Schema.name == "Pantalla completa alternativa")?.value?.value, imageAlt: d.value?.find(v=> v.Schema.name == "Fotografía Alternativa")?.value?.name ? url_bucket+ "/" + d.value?.find(v=> v.Schema.name == "Fotografía Alternativa")?.value?.name : undefined,  nameAlt: d?.value?.find(v=> v.Schema.name == "Titulo Alternativo")?.value?.text, nameDes: d?.value?.find(v=> v.Schema.name == "TituloDes")?.value?.text,  nameDesAlt: d?.value?.find(v=> v.Schema.name == "TituloDesAlt")?.value?.text  })})
          
              tempprojects.push( {name: i?.value?.find(v => v.Schema.name == "Nombre")?.value?.text, description:i?.value?.find(v => v.Schema.name == "Descripcion")?.value?.text, descriptionEn:i?.value?.find(v => v.Schema.name == "DescripcionEn")?.value?.text, descriptionCat:i?.value?.find(v => v.Schema.name == "DescripcionCat")?.value?.text, fichero:i?.value?.find(v => v.Schema.name == "Fichero ")?.value?.name,   slides:tempslides    
             


                })}
    
    
        )
      
      
    
      return (res.values)
    
        
      }

      const r = {selectedPage: response, data: response.values}

     return r

    }



    

    export async function fetchPages(filter?: string | RegExp){

    const url = import.meta.env.VITE_URL_API_PAGES
    console.log("=== FETCH PAGES DEBUG ===");
    console.log("API URL:", url);
    
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          
        }
    };
    
    try {
        let res = await axios.get( url, config );
        console.log("API Response Status:", res.status);
        console.log("API Response Data:", res['data']);

        // helper to normalize a list of items into our payload shape
        const normalizeItems = (items: any[]): any[] => {
            return items.map((item: any) => {
                // Accept multiple possible field names
                const pageName = item.Page || item.page || item.pageId || item.id || item.Name
                const template = item.CType || item.Template || item.Type || item.template || 'Unknown'
                return { Page: pageName, Template: template }
            }).filter(p => p.Page)
        }

        let payload: any[] = []

        // Common shape: res.data.Items is an array
        if (res['data']?.Items && Array.isArray(res['data'].Items)) {
            console.log('Found res.data.Items array, normalizing...')
            payload = normalizeItems(res['data'].Items as any[])
        } else if (Array.isArray(res['data'])) {
            console.log('Found res.data as array, normalizing...')
            payload = normalizeItems(res['data'] as any[])
        } else if (res['data'] && typeof res['data'] === 'object') {
            // Try common nested shapes
            const maybeItems = res['data'].items || res['data'].data || res['data'].results
            if (Array.isArray(maybeItems)) {
                console.log('Found nested items in res.data, normalizing...')
                payload = normalizeItems(maybeItems)
            } else {
                console.log('Unknown response shape, attempting to coerce object -> array by keys')
                try {
                    const vals = Object.values(res['data'])
                    const arrays = vals.filter(v => Array.isArray(v) && v.length > 0)
                    if (arrays.length > 0) {
                        payload = normalizeItems(arrays[0] as any[])
                    }
                } catch (e) {
                    // ignore
                }
            }
        }

        // If we got nothing and server returned 401 or 403, try again with Authorization if token exists
        if ((payload.length === 0) && (res.status === 401 || res.status === 403)) {
            const token = sessionStorage.getItem('accessToken')
            if (token) {
                console.log('Retrying fetchPages with Authorization header')
                const authConfig = { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } }
                try {
                    res = await axios.get(url, authConfig)
                    if (res['data']?.Items && Array.isArray(res['data'].Items)) payload = normalizeItems(res['data'].Items)
                } catch (e) {
                    console.warn('Auth retry failed', e)
                }
            }
        }

        console.log('Final payload length:', payload.length)

        // If caller provided a filter, apply a best-effort client-side filter
        if (filter) {
            console.log('Applying client-side filter to pages:', filter)
            const test = typeof filter === 'string'
                ? (v: string) => String(v || '').toLowerCase().includes(filter.toLowerCase())
                : (v: string) => {
                    let rx = filter as RegExp
                    try { if (!rx.flags.includes('i')) rx = new RegExp(rx.source, rx.flags + 'i') } catch {}
                    return rx.test(String(v || ''))
                  }
            payload = payload.filter((p: any) => {
                const candidate = String(p.Template || p.template || p.Type || p.Page || p.page || p.Title || p.Name || '')
                return test(candidate)
            })
            console.log('Filtered payload length:', payload.length)
        }

        console.log('=== END FETCH PAGES DEBUG ===')
        return payload

    } catch (error) {
        console.error("Error fetching pages:", error);
        console.log("=== FETCH PAGES ERROR ===");
        return [];
    }
}

    
    export async function editPage(data: iSchemaField){

        const url = import.meta.env.VITE_URL_API_PAGES
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
            },  
            }
    
        const res = await axios.post( url,data,config );
        return res['data']
    
        }