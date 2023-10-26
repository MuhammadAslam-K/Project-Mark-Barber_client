import SignUp from "../../../components/auth/Signup"
import staffApis from "../../../constraints/apis/staffApis"
import staffEndPoints from "../../../constraints/endPoints/staffEndPoints"

function StaffSignupPage() {

    const data = {
        signApi: staffApis.signup,

        loginEndPoint: staffEndPoints.login,
        signUpSuccess: staffEndPoints.login,
    }
    return (
        <>
            <SignUp {...data} />
        </>
    )
}

export default StaffSignupPage