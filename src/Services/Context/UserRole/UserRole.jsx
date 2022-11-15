import {createContext, useState } from "react"


const UserRoleContext = createContext()

const UserRole = (props) => {

    const [role , setRole] = useState("user")

    const ChangeRole = (user) => {
        setRole(user)
    }

    return (
        <UserRoleContext.Provider value={{role , ChangeRole}}>
            {props.children}
        </UserRoleContext.Provider>
    )


}

export {UserRole , UserRoleContext}