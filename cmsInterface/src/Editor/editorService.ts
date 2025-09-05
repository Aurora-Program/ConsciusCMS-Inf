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

    try{
        const res = await axios.post( url,data,config );
        return {Page: res['data'].Page, Template: res['data'].Template, values:[]}
    }catch(err:any){
        console.error('addPage error', err && err.response ? err.response.data : err);
        const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
        throw new Error(`addPage failed: ${msg}`);
    }

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
    
        try{
            const res = await axios.post( url,data,config );
            return {res}
        }catch(err:any){
            console.error('savePage error', err && err.response ? err.response.data : err);
            const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
            throw new Error(`savePage failed: ${msg}`);
        }
    
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
        
            try{
                const res = await axios.put( url,data,config );
                return {res}
            }catch(err:any){
                console.error('updatePage error', err && err.response ? err.response.data : err);
                const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
                throw new Error(`updatePage failed: ${msg}`);
            }
        
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
    console.log("item: " + data.component)
    const response : iSchemaField[] = data
    return response

    }




export async function fetchPageByPage(payload: string){
    console.log("payload:"+payload)
    const url = import.meta.env.VITE_URL_API_PAGES + "/" + payload

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           
        }
    };
    try{
        const res = await axios.get( url );
        console.log ("r: " + res['data'].Items)
        const response : iSchemaField[] = res['data'].Items[0]
        return response
    }catch(err:any){
        console.error('fetchPageByPage error', err && err.response ? err.response.data : err);
        const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
        throw new Error(`fetchPageByPage failed: ${msg}`);
    }

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
    try{
        const res = await axios.get( url, config );
        console.log (res['data'])
        
        const payload : iSchemaPage[] = []
        res['data'].Items.map((item : iSchemaPageTable) => payload.push({Page: item.Page, Template: item.Template, updateTime:item.updateTime, updateUser: item.updateUser}))
        return payload
    }catch(err:any){
        console.error('fetchPages error', err && err.response ? err.response.data : err);
        const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
        throw new Error(`fetchPages failed: ${msg}`);
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

/**
 * Request a short-lived publish-intent token from the API.
 * The API expected URL is the same API root where /pages lives, with path /publish-intent.
 * It returns a token and a short message to show to the user.
 */
export async function requestPublishIntent(content:any){
    // Use the same pages endpoint but mark the request as an intent via header
    const pagesUrl = import.meta.env.VITE_URL_API_PAGES || '';

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // signal intent to backend so it stages the payload and returns a token
            'x-selfreview-intent': 'true',
            // include authorization so backend can bind the token to the principal
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken") || ''}`
        }
    };

    try{
        const payload = (content && content.Page) ? content.Page : content;
        const res = await axios.post(pagesUrl, { Page: payload }, config);
        // token should be returned in header X-SelfReview-Token or in the body as fallback
        const headers = res.headers || {};
        const token = headers['x-selfreview-token'] || headers['X-SelfReview-Token'] || (res.data && res.data.token);
        // hints may be in headers or body.hints/message
        const hintsFromHeaders = {
            message: {
                es: headers['x-selfreview-es'] || headers['X-SelfReview-Es'] || undefined,
                en: headers['x-selfreview-en'] || headers['X-SelfReview-En'] || undefined
            },
            action: headers['x-selfreview-action'] || headers['X-SelfReview-Action'] || undefined
        };
        const hintsFromBody = res.data && (res.data.hints || res.data.message) ? res.data.hints || { message: res.data.message } : undefined;
        const hints = hintsFromBody || hintsFromHeaders;
        const expiresAt = (res.data && res.data.expiresAt) || undefined;
        return { token, hints, expiresAt, raw: res };
    }catch(err:any){
        console.error('requestPublishIntent error', err && err.response ? err.response.data : err);
        const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
        throw new Error(`requestPublishIntent failed: ${msg}`);
    }
}

/**
 * Publish a page (POST/PUT) including the self-review token and decision.
 * The backend expects a payload { token, decision, content }.
 */
export async function publishPage(content:any, token:string, decision:string, useStaged:boolean = true){
    // If useStaged=true we do a POST confirm without content body (server uses staged item)
    // If useStaged=false we send a PUT with the final payload and token
    const url = import.meta.env.VITE_URL_API_PAGES;
    checkAccessTokenExpiration();
    const baseHeaders:any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`,
        'x-selfreview-token': token
    };
    try{
        if (useStaged){
            const config = { headers: baseHeaders };
            // POST confirm: body optional; backend will use staged item tied to token
            const res = await axios.post(url, {}, config);
            return res.data;
        } else {
            // PUT confirm: include final content
            const config = { headers: baseHeaders };
            const res = await axios.put(url, content, config);
            return res.data;
        }
    }catch(err:any){
        console.error('publishPage error', err && err.response ? err.response.data : err);
        if (err && err.response && err.response.status){
            const status = err.response.status;
            if (status === 410) throw new Error('token_expired');
            if (status === 400) throw new Error('invalid_token');
            if (status === 401) throw new Error('unauthorized');
            if (status === 409) throw new Error('content_mismatch');
        }
        const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
        throw new Error(`publishPage failed: ${msg}`);
    }
}

/**
 * Publish a delete action using token/decision. Sends DELETE with body containing token/decision/content
 */
export async function publishDelete(content:any, token:string, decision:string){
    const url = import.meta.env.VITE_URL_API_PAGES + (content && content.Page ? `/${encodeURIComponent(content.Page)}` : '');
    checkAccessTokenExpiration();
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`,
            'x-selfreview-token': token
        },
        // keep content and decision in the body as well in case backend expects it
        data: { decision, content }
    };
    try{
        const res = await axios.delete(url, config);
        return res.data;
    }catch(err:any){
        console.error('publishDelete error', err && err.response ? err.response.data : err);
        const msg = err && err.response && err.response.data ? JSON.stringify(err.response.data) : err.message || String(err);
        throw new Error(`publishDelete failed: ${msg}`);
    }
}