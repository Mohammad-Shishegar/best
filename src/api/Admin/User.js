import axios from "axios"
import {URL , Version} from "../URL"

const Users = async () => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.get(`${URL}${Version}/Users` , {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

export {Users}