import axios from "axios";



const url_bucket = import.meta.env.VITE_URL_API_BUCKET + "/" + import.meta.env.VITE_CONTENT_BUCKET_NAME

interface iSchemaPageTable {
    component: string
    page: string
    CType: string
}


export  const downloadFile = async (name: string) =>
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







    





export async function getSettingByArea(payload: string){
    console.log("payload:"+payload)
    const url = import.meta.env.VITE_URL_API_SETTINGS + "/" + payload

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
           
        }
    };
    const res = await axios.get( url, config );


    console.log ("r: " + res['data'].Items)
    const response : iSchemaField[] = res['data'].Items
     return response

    }



    

    export async function fetchPages(){

    const url = import.meta.env.VITE_URL_API_SETTINGS
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

    export async function editSetting(data){

        const url = import.meta.env.VITE_URL_API_SETTINGS
    
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