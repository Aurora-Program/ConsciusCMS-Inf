import axios from "axios";
import { iSchemaField, iSchemaPage } from "./schemaSlice";
import { checkAccessTokenExpiration } from "../users/authService";

interface iSchemaPageTable {
    component: string
    page: string
    CType: string
}



export async function addItem(data: iSchemaField){

    const url = import.meta.env.VITE_URL_API_SCHEMA 
    checkAccessTokenExpiration();


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

    export async function editItem(data: iSchemaField){

        const url = import.meta.env.VITE_URL_API_SCHEMA 
        checkAccessTokenExpiration();

    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
            },  
           
            }
    
    // Debug: log payload being sent so we can verify order updates
    console.debug('[schemaService] editItem - sending payload:', data);
    const res = await axios.post( url, data, config );
    console.debug('[schemaService] editItem - response:', res?.data);
    return res['data']
    
        }


    
export async function deleteItem(data: iSchemaField){

    const url = import.meta.env.VITE_URL_API_SCHEMA
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




export async function fetchComponentsByPage(payload: string){

    const url = import.meta.env.VITE_URL_API_SCHEMA + "/" + payload
    checkAccessTokenExpiration();

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           
        }
    };
    const res = await axios.get( url );


    console.log ("r: " + res['data'].Items)
    const response : iSchemaField[] = res['data'].Items
     return response

    }


    export async function fetchPages(){

    const url = import.meta.env.VITE_URL_API_SCHEMA
    checkAccessTokenExpiration();
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        }
    };
    const res = await axios.get( url );
    const payload : iSchemaPage[] = []
    res['data'].Items.map((item : iSchemaPageTable) => payload.push({name: item.page, type: item.CType, description: item.description}))
    return res['data'].Items
    }
