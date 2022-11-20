import axios from "axios"
import {URL , Version} from "../URL"

const getProject = async () => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.get(`${URL}${Version}/Project` , {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const createProject = async (title , day , description , categoryId , budget) => {
    const token = await localStorage.getItem("token")
    const data = {  
        title : title , 
        day : day , 
        description:description ,
        budget: budget,
        categoryId : categoryId,
        id:0
    }

    try{
        const response = await axios.post(`${URL}${Version}/Project` , data ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const updateProject = async (title , day , id ,  description , categoryId ,budget) => {
    const token = await localStorage.getItem("token")
    const data = {
        title : title , 
        description:description ,
        day : day , 
        categoryId : categoryId ,
        budget: budget,
        id : 0 ,
    }

    try{
        const response = await axios.put(`${URL}${Version}/Project?id=${id}` , data ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }
}

const deleteProject = async (id) => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.delete(`${URL}${Version}/Project/${id}` ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const projectWithDetailes = async (id) => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.get(`${URL}${Version}/Project/${id}` ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }
}

export {getProject , createProject , updateProject , deleteProject , projectWithDetailes}