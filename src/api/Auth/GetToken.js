import axios from "axios"
import React from "react"

import {URL , Version} from "../URL"


const getToken = async (username , password) => {
    
    try{
        const response = await axios.post( `${URL}${Version}/Users/token`, {
            grant_type : "password" ,
            username : username ,
            password : password           
        } ,
        { headers: { 'Content-Type': 'multipart/form-data' } })
        return response
    } catch(er){
        return "404"
    }
}

export default getToken