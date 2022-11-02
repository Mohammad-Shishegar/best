import axios from "axios"
import {URL , Version} from "../URL"

const siteSetting = async (title ,mailServe, email ,passwordEmail , metKey, metDec) => {
    const token = await localStorage.getItem("token")

    const data = {
        title: title,
        mailServe : mailServe,
        email: email,
        passwordEmail: passwordEmail,
        metKey: metKey,
        metDec: metDec
    }

    try{
        const response = await axios.post(`${URL}${Version}/setting` , data ,
        {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        console.log(er)
        return er
    }

}
const getSetting = async () => {
    const token = await localStorage.getItem("token")
    try{
        const response = await axios.get(`${URL}${Version}/setting` ,
        {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

export {siteSetting , getSetting} 