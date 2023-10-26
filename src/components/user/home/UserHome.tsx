import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ErrorResponse } from '../../../types/errorInterfaces'
import userApis from '../../../constraints/apis/userApis'
import { userAxios } from '../../../constraints/axiosIntersepter/userIntersepter'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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

function UserHome() {

    const backgroundImageUrl = "/public/images/banner2.jpg"
    const [nearestSalonTab, SetNearestSalon] = useState(true)
    const [shopData, SetShopData] = useState<Shop[] | null>(null)

    const [userlat, setUserLat] = useState<number | null>(null)
    const [userlong, setUserLong] = useState<number | null>(null)


    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    fetchNearestSalon(position.coords.latitude, position.coords.longitude)

                    setUserLat(position.coords.latitude);
                    setUserLong(position.coords.longitude);
                    console.log("lat", position.coords.latitude)
                    console.log("longitude", position.coords.longitude)
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
                console.log("data", data)
                const response = await userAxios.post(userApis.nearestSaloan, data)
                console.log("response", response)
                SetShopData(response.data)
                SetNearestSalon(true)
            } else {
                console.log(44)
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError<ErrorResponse> = error;
                if (axiosError.response) {
                    toast.error(axiosError.response.data.error);
                } else {
                    toast.error('Network Error occurred.');
                }
            }
        }
    }

    const fetchAllSaloans = async () => {
        try {
            const response = await userAxios.get(userApis.allSaloan)
            console.log(response)
            SetShopData(response.data)
            SetNearestSalon(false)
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError<ErrorResponse> = error;
                if (axiosError.response) {
                    toast.error(axiosError.response.data.error);
                } else {
                    toast.error('Network Error occurred.');
                }
            }
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

    const current_tab_class = "max-w-md overflow-hidden rounded-xl bg-gray-300 shadow-2xl sm:flex justify-center"
    const tab_class = "max-w-md overflow-hidden  border-b-2 border-gray-500 shadow-2xl sm:flex justify-center"

    return (
        <>
            <div>
                <div className="w-full bg-cover bg-center" style={containerStyle}>
                    <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                        <div className="text-center">
                            <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Find Your Nearest Salon Through
                                <p className="underline text-white">Marke-Barber</p>
                            </h1>
                        </div>
                    </div>
                </div>


                <div className="flex  mt-10 justify-center" >
                    <div className={nearestSalonTab ? current_tab_class : tab_class}>
                        <div className="w-full ">
                            <div className="p-3">
                                <h1 className="text-3xl cursor-pointer" onClick={() => {
                                    if (userlat !== null && userlong !== null) {
                                        fetchNearestSalon(userlat, userlong);
                                    }
                                }}>
                                    Nearest Salons
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className={nearestSalonTab ? tab_class : current_tab_class}>
                        <div className="w-full ">
                            <div className="p-3">
                                <h1 className="text-3xl cursor-pointer" onClick={fetchAllSaloans}>All Salons</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex my-10 mb-36 justify-center">
                <div className="w-10/12 max-h-96 overflow-y-auto scrollbar-hide">
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

                            <div className="lg:w-2/3 lg:pl-4">
                                <h2 className="text-2xl font-bold mb-2">{shop.shopeName}</h2>
                                <p className="text-gray-700">Location: {shop.shopeLocation}</p>
                                <p className="text-gray-700">Owner: {shop.ownerName}</p>
                                <p className="text-gray-700">Contact: {shop.ownerMobile}</p>
                                <p className="text-gray-700">Email: {shop.ownerEmail}</p>
                                <p className="text-gray-700">Services: {shop.services}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>




        </>
    )
}

export default UserHome