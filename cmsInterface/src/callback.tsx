import axios from "axios"

import {  Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

type iCode ={
    code: string
}

export const  Callback =  (code : iCode ) => {


 
const [auth, setAuth] = useState(false)



const resquestToken = () => {
   
    try {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
      axios.post( import.meta.env.VITE_COGNITO + "/oauth2/token?client_id=" + import.meta.env.VITE_CLIENT_ID + "&code="+code.code+"&redirect_uri="+ location.protocol + '//' + location.host + "/login/callback&grant_type=authorization_code&scope=openid", {}, config).then(
(res)=>{console.log(res['data'])
const payload = res['data']
console.log(payload.id_token)

if (payload){
console.log (payload)
sessionStorage.setItem("idToken", payload.id_token || '');
sessionStorage.setItem("accessToken",  payload.access_token|| '');
sessionStorage.setItem("refreshToken", payload.refresh_token || '');
setAuth(true)

console.log("ready to go")}

}
        )
            
                


}
catch {

    console.log("error")
}}

useEffect(() =>resquestToken(),[])

return (<div>
    {
       auth ? <Navigate to="../site/home" replace={true}></Navigate> : <div>loading...</div>
    }
     </div>)
 
}

    










