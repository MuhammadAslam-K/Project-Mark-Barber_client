import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import userApis from '../../../constraints/apis/userApis'
import { userAxios } from '../../../constraints/axiosIntersepter/userIntersepter'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { handleErrors } from '../../../constraints/errorHandler'


interface Shop {
    _id: string;
    shopeName: string;
    services: string;
    shopeLocation: string;

    ownerName: string;
    ownerEmail: string;
    ownerMobile: string;

    images: string[];
}

interface Personal {
    email: string
    gender: string
    images: string[]
    mobile: string
    name: string
    personalLocation: string
    services: string
    _id: string
}

function UserHome() {

    const backgroundImageUrl = "/public/images/banner2.jpg"
    const [tab, SetTab] = useState('')
    const [shope, SetShope] = useState(true)
    const [shopData, SetShopData] = useState<Shop[] | null>(null)
    const [personalData, SetPersonalData] = useState<Personal[] | null>(null)

    const [userlat, setUserLat] = useState<number | null>(null)
    const [userlong, setUserLong] = useState<number | null>(null)


    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    fetchNearestSalon(position.coords.latitude, position.coords.longitude)

                    setUserLat(position.coords.latitude);
                    setUserLong(position.coords.longitude);
                },
                function (error) {
                    toast.error("Error getting location");
                    console.error('Error getting location:', error.message);
                }
            )
        } else {
            toast.error("Geolocation is not supported in this browser.");
        }

    }, [])

    const fetchNearestSalon = async (latitude: number, longitude: number) => {
        try {
            if (latitude && longitude) {
                const data = { latitude, longitude }
                const response = await userAxios.post(userApis.nearestSaloan, data)
                SetShopData(response.data)
                SetShope(true)
                SetTab("nearestSalon")
            }
        } catch (error) {
            console.log(error);
            handleErrors(error)
        }
    }

    const fetchAllSaloans = async () => {
        try {
            const response = await userAxios.get(userApis.allSaloan)
            SetShopData(response.data)
            SetTab("allSalon")
            SetShope(true)
        } catch (error) {
            console.log(error);
            handleErrors(error)
        }
    }

    const fetchNearestpersonalServices = async (latitude: number, longitude: number) => {
        try {
            if (latitude && longitude) {
                const data = { latitude, longitude }
                const response = await userAxios.post(userApis.nearestPersonalServices, data)
                console.log("personale", response)
                SetPersonalData(response.data)
                SetTab("NearestPersonalServices")
                SetShope(false)
            }
        } catch (error) {
            console.log(error);
            handleErrors(error)
        }
    }

    const fetchAllPersonalServices = async () => {
        try {
            const response = await userAxios.get(userApis.allPersonalServices)
            SetPersonalData(response.data)
            SetTab("AllPersonalServices")
            SetShope(false)
        } catch (error) {
            console.log(error);
            handleErrors(error)
        }
    }

    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '32rem',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${backgroundImageUrl})`
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const current_tab_class = "max-w-md overflow-hidden rounded-md border-2 border-b-0 border-gray-500 shadow-2xl sm:flex justify-center"
    const tab_class = "max-w-md overflow-hidden border-b-2 border-gray-500 shadow-2xl sm:flex justify-center"

    return (
        <>
            <div>
                <div className="w-full bg-cover  bg-center" style={containerStyle}>
                    <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                        <div className="text-center">
                            <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Find Your Nearest Salon Through
                                <p className="underline text-white">Mark-Barber</p>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* NAVBAR */}
                <div className="flex  mt-10 justify-center" >
                    <div className={tab === "nearestSalon" ? current_tab_class : tab_class}>
                        <div className="w-full ">
                            <div className="p-3">
                                <h5 className="cursor-pointer" onClick={() => {
                                    if (userlat !== null && userlong !== null) {
                                        fetchNearestSalon(userlat, userlong);
                                    }
                                }}>
                                    Nearest Salons
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className={tab === "allSalon" ? current_tab_class : tab_class}>
                        <div className="w-full ">
                            <div className="p-3">
                                <h1 className="cursor-pointer" onClick={fetchAllSaloans}>All Salons</h1>
                            </div>
                        </div>
                    </div>

                    {/* PERSONAL SERVICES */}
                    <div className={tab === "NearestPersonalServices" ? current_tab_class : tab_class}>
                        <div className="w-full ">
                            <div className="p-3">
                                <h1 className="cursor-pointer" onClick={() => {
                                    if (userlat !== null && userlong !== null) {
                                        fetchNearestpersonalServices(userlat, userlong);
                                    }
                                }}>
                                    Nearest Personal Services
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className={tab === "AllPersonalServices" ? current_tab_class : tab_class}>
                        <div className="w-full ">
                            <div className="p-3">
                                <h1 className="cursor-pointer" onClick={fetchAllPersonalServices}>All Personal Services</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex my-10 mb-36 justify-center">
                {shope ?
                    <div className="w-10/12 max-h-96">
                        {shopData && shopData.map((shop) => (
                            <div className="flex rounded-2xl h-96 bg-gray-200 p-4 mb-6" key={shop._id}>
                                <div className="lg:w-1/3 h-72 lg:h-64 mb-4 lg:mb-0">
                                    <Slider {...sliderSettings}>
                                        {shop.images.map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Shop ${index + 1}`}
                                                    className="w-full h-80 object-cover"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                <div className="lg:w-2/3 lg:pl-4 flex flex-col">
                                    <h2 className="text-2xl font-bold mb-2">{shop.shopeName}</h2>
                                    <p className="text-gray-700">Owner: {shop.ownerName}</p>
                                    <p className="text-gray-700">Contact: {shop.ownerMobile}</p>
                                    <p className="text-gray-700">Email: {shop.ownerEmail}</p>
                                    <p className="text-gray-700">Location: {shop.shopeLocation}</p>
                                    <p className="text-gray-700">Services: {shop.services}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="w-10/12 max-h-96">
                        {personalData && personalData.map((shop) => (
                            <div className="flex rounded-2xl h-96 bg-gray-200 p-4 mb-6" key={shop._id}>
                                <div className="lg:w-1/3 h-72 lg:h-64 mb-4 lg:mb-0">
                                    <Slider {...sliderSettings}>
                                        {shop.images.map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Shop ${index + 1}`}
                                                    className="w-full h-80 object-cover"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                <div className="lg:w-2/3 lg:pl-4">
                                    <p className="text-gray-700">Owner: {shop.name}</p>
                                    <p className="text-gray-700">Contact: {shop.mobile}</p>
                                    <p className="text-gray-700">Email: {shop.email}</p>
                                    <p className="text-gray-700">Gender: {shop.gender}</p>
                                    <p className="text-gray-700">Location: {shop.personalLocation}</p>
                                    <p className="text-gray-700">Services: {shop.services}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

        </>
    )
}

export default UserHome