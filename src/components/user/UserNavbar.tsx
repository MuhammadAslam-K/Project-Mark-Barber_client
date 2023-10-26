import { Link } from "react-router-dom"
import userEndPoints from "../../constraints/endPoints/userEndPoints"

function UserNavbar() {
    return (
        <div>
            <nav className="bg-white shadow">
                <div className="container mx-auto px-6 py-3 ">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold text-gray-700">
                                <Link to={userEndPoints.home} className="text-gray-800 text-xl font-bold hover:text-gray-700 md:text-2xl">Marke Barber</Link>
                            </div>

                            {/*  Mobile menu button  */}
                            <div className="flex md:hidden">
                                <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                        <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                        {/* <div className="hidden -mx-4 md:flex md:items-center">
                            <a href="#" className="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-blue-600">Web developers</a>
                            <a href="#" className="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-blue-600">Web Designers</a>
                            <a href="#" className="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-blue-600">UI/UX Designers</a>
                            <a href="#" className="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-blue-600">Contact</a>
                        </div> */}
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default UserNavbar