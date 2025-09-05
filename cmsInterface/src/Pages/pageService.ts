import axios from "axios";
import { iSchemaField, iSchemaPage } from "./PAGESSlice";


const url_bucket = import.meta.env.VITE_URL_API_BUCKET + "/" + import.meta.env.VITE_CONTENT_BUCKET_NAME

interface iSchemaPageTable {
    component: string
    page: string
    CType: string
}

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
      
     

        [...response.values.find(v => v.name == "Proyectos")?.value].sort((a,b)=> a.order - b.order)?.map((i)=>
       { 
            let tempslides = [];
            
             console.log( i.value);
             [...i.value?.find(v=>v.Schema.name == "Diapositivas")?.value].sort((a,b)=> a.order - b.order)?.map(d =>{
               
                tempslides.push({name: d?.value?.find(v=> v.Schema.name == "Titulo").value?.text, layout: d.value?.find(v=> v.Schema.name == "Pantalla completa")?.value?.value,  image:url_bucket+ "/" + d.value?.find(v=> v.Schema.name == "Fotografia")?.value?.name, color:d.value?.find(v=> v.Schema.name == "Color de la fuente")?.value?.value, nameAlt: d?.value?.find(v=> v.Schema.name == "Titulo Alternativo")?.value?.text, layoutAlt: d.value?.find(v=> v.Schema.name == "Pantalla completa alternativa")?.value?.value, imageAlt: d.value?.find(v=> v.Schema.name == "Fotografía Alternativa")?.value?.name ? url_bucket+ "/" + d.value?.find(v=> v.Schema.name == "Fotografía Alternativa")?.value?.name : undefined, nameDes: d?.value?.find(v=> v.Schema.name == "TituloDes")?.value?.text,  nameDesAlt: d?.value?.find(v=> v.Schema.name == "TituloDesAlt")?.value?.text  })})
          
              tempprojects.push( {name: i?.value?.find(v => v.Schema.name == "Nombre")?.value?.text, description:i?.value?.find(v => v.Schema.name == "Descripcion")?.value?.text, descriptionEn:i?.value?.find(v => v.Schema.name == "DescripcionEn")?.value?.text, descriptionCat:i?.value?.find(v => v.Schema.name == "DescripcionCat")?.value?.text, fichero:i?.value?.find(v => v.Schema.name == "Fichero ")?.value?.name,   slides:tempslides    
             


                })}
    
    
        )
      
      
    
      return (tempprojects)
    
        
      }

      const r = {selectedPage: response, data: loadData()}

     return r

    }



    

    export async function fetchPages(){

    const url = import.meta.env.VITE_URL_API_PAGES
    console.log("url: "+ url)
    
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          
        }
    };
    const res = await axios.get( url, config );
    console.log (res['data'])
    const payload : iSchemaPage[] = []
    res['data'].Items.map((item : iSchemaPageTable) => payload.push({Page: item.Page, Template: item.Template}))
    return payload
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