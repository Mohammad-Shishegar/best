import axios from "axios"
import {URL , Version} from "../URL"

const getCategory = async () => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.get(`${URL}${Version}/ProjectCategory` , {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const createCategory = async (title , active , description , parentId , parentName) => {
    const token = await localStorage.getItem("token")

    const data = {  
        title : title , 
        activeOrder : active , 
        description:description ,
        parentCategoryId : parentId+"" , 
        parentCategoryName : parentName
    }

    try{
        const response = await axios.post(`${URL}${Version}/ProjectCategory` , data ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const updateCategory = async (title , active , id ,  description , parentId , parentName) => {
    const token = await localStorage.getItem("token")
    const data = {
        title : title , 
        description:description ,
        activeOrder : active , 
        parentCategoryId : parentId , 
        id : 0 ,
        // parentCategoryName : parentName
    }
    try{
        const response = await axios.put(`${URL}${Version}/ProjectCategory?id=${id}` , data ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }
}

const deleteCategory = async (id) => {
    const token = await localStorage.getItem("token")

    const data = {
        id : id+""
    }

    try{
        const response = await axios.delete(`${URL}${Version}/ProjectCategory/${id}` ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const categoryWithDetailes = async (id) => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.get(`${URL}${Version}/ProjectCategory/GetByDetail?id=${id}` ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }
}

export {getCategory , createCategory , updateCategory , deleteCategory , categoryWithDetailes}