import axios from "axios";
import React from "react";

import {URL , Version} from "../URL"


const reagisterUser = async (UserData) => {
    try{
        const response = await axios.post( `${URL}${Version}/Users`, UserData )
        if(response.data.isSuccess === false)
            return "false"
        return response
    } catch(er){
        return er
    }
}

export default reagisterUser
