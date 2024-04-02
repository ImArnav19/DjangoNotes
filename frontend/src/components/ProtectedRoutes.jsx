import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useEffect, useState } from 'react'
import {REFRESH_TOKEN ,ACCESS_TOKEN} from "../constants" 
import api from "../api"


//making pretected routes to run auth function everytime and getting refresh n access tokens
function ProtectedRoutes({children}){


    const [isAuthorized,setIsAuthorized] = useState(null);

    useEffect(()=> {
        auth().catch(() => setIsAuthorized(false))
    },[])




    const refresh = async ()=> {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN)
        try{
            
            const res = await api.post("api/token/refresh/",
                {refresh:refresh_token}
            )

            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false)
            }


        }
        catch(e){
            console.log(e);
            setIsAuthorized(false)
        }

    }

    const auth = async ()=>{
        
        const token = localStorage.getItem(ACCESS_TOKEN);

        if(!token){
            setIsAuthorized(false);
            return
        }

        const decoded = jwtDecode(token);

        const token_exp = decoded.exp;
        const now_date = Date.now()/1000;

        
        
        if(token_exp < now_date){
            console.log("Token Expired")
            await refresh();
        }
        else{
            setIsAuthorized(true);
        }



    }

    if(isAuthorized == null){
        return (
            <div>Loading Page...</div>
        );
    }

    return isAuthorized? children:<Navigate to="/login"/>;
}

export default ProtectedRoutes;