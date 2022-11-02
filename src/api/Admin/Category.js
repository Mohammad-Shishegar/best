import axios from "axios"
import {URL , Version} from "../URL"

const getCategory = async () => {
    const token = await localStorage.getItem("token")

    try{
        const response = await axios.get(`${URL}${Version}/Categories` , {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const createCategory = async (name , active , description , parentId , parentName) => {
    const token = await localStorage.getItem("token")

    const data = {  
        name : name , 
        activeOrder : active , 
        description:description ,
        parentCategoryId : parentId+"" , 
        parentCategoryName : parentName
    }

    try{
        const response = await axios.post(`${URL}${Version}/Categories` , data ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}

const updateCategory = async (name , active , id ,  description , parentId , parentName) => {
    const token = await localStorage.getItem("token")

    const data = {
        name : name , 
        // activeOrder : active , 
        // description:description ,
        id : id+"" ,
        parentCategoryId : parentId+"" , 
        parentCategoryName : parentName
    }
    try{
        const response = await axios.put(`${URL}${Version}/Categories` , data ,  {
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
        const response = await axios.delete(`${URL}${Version}/Categories/${id}` ,  {
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        return response
    }
    catch(er){
        return er
    }

}


export {getCategory , createCategory , updateCategory , deleteCategory}