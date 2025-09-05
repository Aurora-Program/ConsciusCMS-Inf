import axios from 'axios';


const url = import.meta.env.VITE_URL_API + "/images"
const url_bucket = import.meta.env.VITE_URL_API_BUCKET + "/" + import.meta.env.VITE_CONTENT_BUCKET_NAME


 
const downloadFile = async (name) =>
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

const  fetchFile = async (data) => {

    let files=[]
    console.log(data)
    await Promise.all(data.data.map(async (item) =>  {
    

    const res = await fetch(url_bucket+ "/"  + item.name, {
        method: 'GET',
        // 👇 Set headers manually for single file upload
        headers: {
          'content-type': 'image/png'
        },
      })
        const imageBlob = await res.blob()
        
        
        const imageObjectURL =  URL.createObjectURL(imageBlob);
        
        console.log(imageObjectURL);

        files = [...files, imageObjectURL];
        console.log("files:" + files)

    }))
    console.log("files:" + files)
    console.log("finish")
    return (files)
   
  }

const uploadImage = async (file)=> {

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
          },
        })
    
    const  data = async  (res) => {return ( !res ? await res.json():"no response")}

    

    console.log(data)
    
    }
    catch{
        console.log("error")
        }

    }
export async function addImage(payload){

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
   
    };
    const file=await uploadImage(payload.file)

    const image = await downloadFile(payload.image.name)
    console.log(image)
    console.log(payload.file)
    console.log("payload name:" + payload.image.name)
    const res = await axios.put( url, payload.image);
    const data = {file:image, image: res['data'] }
    return data
}

export async function fetchImage(payload){

    try {
    console.log("fetching payload:" + payload)
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    
    const res = await axios.get( url +"/" + payload,{}, config );
    console.log("res:"+res)
    const files = await fetchFile(res)
    console.log("res")
    const data = {files: files, data:res['data']}
    console.log(res['data'])
    return data
    }
    catch(error){
        console.log("error: "+ error)
    }
}

export async function deleteImage(payload){

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    console.log(payload)
    const res = await axios.delete( url + "/" + payload );
    return res['data']
}
