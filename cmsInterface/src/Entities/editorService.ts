import axios from "axios";
import { iSchemaField, iSchemaPage } from "./PAGESSlice";
import { checkAccessTokenExpiration } from "../users/authService";


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

export const uploadImage = async (file, uniquename)=> {

    checkAccessTokenExpiration();

    console.log("file name:" + file.name)
        // 👇 Uploading the file using the fetch API to the server
    try{
    const res = await fetch(url_bucket + "/" + uniquename, {
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
    checkAccessTokenExpiration();


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
        checkAccessTokenExpiration();


    
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`
            },  
            }
    
        const res = await axios.post( url,data,config );

       
        return {res}
    
        }

        export async function updatePage(data){

            const url = import.meta.env.VITE_URL_API_PAGES
            checkAccessTokenExpiration();
    
    
        
        
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`
                },  
                }
        
            const res = await axios.put( url,data,config );
    
            
        
            return {res}
        
            }
        


    
export async function deletePage(data: iSchemaField){

    const url = import.meta.env.VITE_URL_API_PAGES
    checkAccessTokenExpiration();

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        },                   
        data
    };

    const res = await axios.delete( url, config );
   
    const response : iSchemaField[] = data
    return response

    }




export async function fetchPageByPage(payload: string){
    checkAccessTokenExpiration();
  
    const url = import.meta.env.VITE_URL_API_PAGES + "/" + payload

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           
        }
    };
    const res = await axios.get( url );


    console.log ("r: " + res['data'].Items)
    const response : iSchemaField[] = res['data'].Items[0]
     return response

    }



    

    export async function fetchPages(){

    const url = import.meta.env.VITE_URL_API_PAGES
    checkAccessTokenExpiration();

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
    res['data'].Items.map((item : iSchemaPageTable) => payload.push({Page: item.Page, Template: item.Template, updateTime:item.updateTime, updateUser: item.updateUser}))
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