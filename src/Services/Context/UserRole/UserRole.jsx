import { useEffect } from "react"
import { createContext, useState } from "react"
import { userRole } from "../../../api/Auth/GetToken"


const UserRoleContext = createContext()

const UserRole = (props) => {

    const [role, setRole] = useState("user")

    const ChangeRole = (user) => {
        setRole(user)
    }

    const checkUser = async () => {
        var token = await localStorage.getItem("token")

        if (token) {
            const response = await userRole()
            if (response.data.isManager === true)
                setRole("admin")
            else if (response.data.isManager === false)
                setRole("user")
        }
    }

    // useEffect(() => {
    //     checkUser()
    // }, [])

    return (
        <UserRoleContext.Provider value={{ role, ChangeRole , checkUser }}>
            {props.children}
        </UserRoleContext.Provider>
    )


}

export { UserRole, UserRoleContext }