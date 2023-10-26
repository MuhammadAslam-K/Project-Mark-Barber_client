import Login from "../../../components/auth/Login"
import adminApis from "../../../constraints/apis/adminApis"
import adminEndPoint from "../../../constraints/endPoints/adminEndPoint"

function AdminLoginPage() {

    const data = {
        loginApi: adminApis.login,

        signUpEndPoing: "",
        loginSuccessEndPoint: adminEndPoint.dashboard,
        role: "admin"
    }
    return (
        <>
            <Login {...data} />
        </>
    )
}

export default AdminLoginPage