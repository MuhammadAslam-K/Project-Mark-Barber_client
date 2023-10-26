import Login from "../../../components/auth/Login"
import staffApis from "../../../constraints/apis/staffApis"
import staffEndPoints from "../../../constraints/endPoints/staffEndPoints"

function StaffLoginPage() {

    const data = {
        loginApi: staffApis.login,

        signUpEndPoing: staffEndPoints.signup,
        loginSuccessEndPoint: staffEndPoints.dashboard,
        role: "staff"
    }
    return (
        <>
            <Login {...data} />
        </>
    )
}

export default StaffLoginPage