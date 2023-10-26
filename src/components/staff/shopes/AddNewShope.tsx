import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as Yup from "yup"
import { uploadImageToStorage } from '../../../services/firebase/storage';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../../../types/errorInterfaces';
import toast from 'react-hot-toast';
import { staffAxios } from '../../../constraints/axiosIntersepter/staffIntersepter';
import staffApis from '../../../constraints/apis/staffApis';
import { customLoadingStyle } from '../../../constraints/customizeLoaderStyle';
import mapboxgl from 'mapbox-gl';





// function AddNewShope() {
const AddNewShope: React.FC = () => {


    const [image1, setImage1] = useState<string | null>(null);
    const [image1Name, setImage1Name] = useState<string | null>(null);

    const [image2, setImage2] = useState<string | null>(null);
    const [image2Name, setImage2Name] = useState<string | null>(null);

    const [image3, setImage3] = useState<string | null>(null);
    const [image3Name, setImage3Name] = useState<string | null>(null);

    const [image4, setImage4] = useState<string | null>(null);
    const [image4Name, setImage4Name] = useState<string | null>(null);

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);


    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [shoplatitude, setShopLatitude] = useState<number | null>(null);
    const [shoplongitude, setShopLongitude] = useState<number | null>(null);


    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    console.log("lat", position.coords.latitude)
                    console.log("longitude", position.coords.longitude)
                },
                function (error) {
                    toast.error("Error getting location");
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            toast.error("Geolocation is not supported in this browser.");
            setLatitude(12.971599);
            setLongitude(77.594566);
        }
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        if (mapContainer.current && longitude && latitude) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longitude, latitude],
                zoom: 10,
            });
            setMap(map);

            map.on('load', () => {
                map.setStyle('mapbox://styles/mapbox/streets-v11');

                const marker = new mapboxgl.Marker({ draggable: true })
                    .setLngLat([longitude, latitude])
                    .addTo(map);

                marker.on('dragend', () => {
                    const finalCoordinates = marker.getLngLat();
                    console.log("Final Latitude:", finalCoordinates.lat);
                    console.log("Final Longitude:", finalCoordinates.lng);
                    setShopLatitude(finalCoordinates.lat)
                    setShopLongitude(finalCoordinates.lng)
                });
            });
        }



        return () => {
            if (map) {
                map.remove();
            }

        };
    }, [latitude, longitude]);

    const handleImageChange1 = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const selectedImage = files[0];
            setImage1Name(selectedImage.name)
            setImage1(URL.createObjectURL(selectedImage));
        }
    };

    const handleImageChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const selectedImage = files[0];
            setImage2Name(selectedImage.name)
            setImage2(URL.createObjectURL(selectedImage));
        }
    };

    const handleImageChange3 = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const selectedImage = files[0];
            setImage3Name(selectedImage.name)
            setImage3(URL.createObjectURL(selectedImage));
        }
    };

    const handleImageChange4 = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const selectedImage = files[0];
            setImage4Name(selectedImage.name)
            setImage4(URL.createObjectURL(selectedImage));
        }
    };


    const without_error_class = "pl-2 outline-none border-b-4 w-full rounded-lg p-2.5 sm:text-sm";
    const with_error_class = "pl-2 outline-none border-b border-red-400 w-full rounded-lg p-2.5 sm:text-sm";


    const formik = useFormik({
        initialValues: {
            shopeName: "",
            ownerName: "",
            ownerEmail: "",
            ownerMobile: "",
            shopeLocation: "",
            services: "",
        },
        validationSchema: Yup.object({
            shopeName: Yup.string()
                .min(3, "Type a valid Shope Name")
                .required("Please Enter value"),
            ownerName: Yup.string()
                .min(3, "Type a valid Owner Name")
                .required("Please Enter value"),
            ownerEmail: Yup.string()
                .email("Please Enter a valid Email")
                .required("Please Enter value"),
            ownerMobile: Yup.string()
                .length(10, "Please Enter a valid number")
                .required("Please Enter value"),
            shopeLocation: Yup.string()
                .min(10, "Type a valid Location")
                .required("Please Enter value"),
            services: Yup.string()
                .min(10, "Type a valid Description")
                .required("Please Enter value"),
        }),
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    const handleSubmit = async (values: { shopeName: string; ownerName: string; ownerEmail: string; ownerMobile: string; shopeLocation: string; services: string; }) => {
        toast.loading('Submitting the form please wait...', {
            style: customLoadingStyle,
        });

        console.log("Image Data:", image1);
        console.log("Image Name:", image1Name);


        const Image1 = await uploadImageToStorage(image1, image1Name)
        const Image2 = await uploadImageToStorage(image2, image2Name)
        const Image3 = await uploadImageToStorage(image3, image3Name)
        const Image4 = await uploadImageToStorage(image4, image4Name)

        const formData = {
            ...values,
            Image1,
            Image2,
            Image3,
            Image4,
            shoplatitude,
            shoplongitude,
        }

        try {
            console.log("form data", formData)
            await staffAxios.post(staffApis.addShope, formData)
            toast.dismiss()
            toast.success("Added the shope successfully")
        } catch (error) {
            console.log(error);
            toast.dismiss()
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

    return (
        <>
            <div className="flex w-full mt-10  justify-center bg-gray-100">
                <div className="w-8/12 mb-20 overflow-hidden rounded-3xl bg-gray-100 shadow-2xl sm:flex justify-center">
                    <div className="w-full  ">
                        <div className="p-8 ">
                            <h1 className="text-3xl font-black text-blue mb-3">Add New Shope</h1>
                            <form className="" onSubmit={formik.handleSubmit}>
                                {/* Horizontal inputs */}
                                <div className="flex flex-col mb-4 sm:flex-row">
                                    <div className="mr-2 w-full">
                                        <input
                                            type="text"
                                            name="shopeName"
                                            placeholder="Shop Name"
                                            required
                                            value={formik.values.shopeName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.shopeName && formik.errors.shopeName
                                                    ? with_error_class
                                                    : without_error_class
                                            } />
                                        {formik.touched.shopeName && formik.errors.shopeName && (
                                            <div className="text-red-500 text-xs">{formik.errors.shopeName}</div>
                                        )}
                                    </div>
                                    <div className="mr-2 w-full">
                                        <input
                                            type="text"
                                            name="ownerName"
                                            placeholder="Owner Name"
                                            required
                                            value={formik.values.ownerName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.ownerName && formik.errors.ownerName
                                                    ? with_error_class
                                                    : without_error_class
                                            } />
                                        {formik.touched.ownerName && formik.errors.ownerName && (
                                            <div className="text-red-500 text-xs">{formik.errors.ownerName}</div>
                                        )}
                                    </div>
                                </div>



                                <div className="flex flex-col mb-4 sm:flex-row">
                                    <div className="mr-2 w-full">
                                        <input
                                            type="email"
                                            name="ownerEmail"
                                            placeholder="Owner Email"
                                            required
                                            value={formik.values.ownerEmail}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.ownerEmail && formik.errors.ownerEmail
                                                    ? with_error_class
                                                    : without_error_class
                                            }
                                        />
                                        {formik.touched.ownerEmail && formik.errors.ownerEmail && (
                                            <div className="text-red-500 text-xs">{formik.errors.ownerEmail}</div>
                                        )}
                                    </div>
                                    <div className="ml-2 w-full">
                                        <input
                                            type="text"
                                            name="ownerMobile"
                                            placeholder="owner Mobile"
                                            required
                                            value={formik.values.ownerMobile}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.ownerMobile && formik.errors.ownerMobile
                                                    ? with_error_class
                                                    : without_error_class
                                            }
                                        />
                                        {formik.touched.ownerMobile && formik.errors.ownerMobile && (
                                            <div className="text-red-500 text-xs">{formik.errors.ownerMobile}</div>
                                        )}
                                    </div>
                                </div>


                                <div className="flex flex-col mb-4 sm:flex-row">
                                    <div className="mr-2 w-full">
                                        <input
                                            type="text"
                                            name="shopeLocation"
                                            placeholder="shope Location"
                                            required
                                            value={formik.values.shopeLocation}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.shopeLocation && formik.errors.shopeLocation
                                                    ? with_error_class
                                                    : without_error_class
                                            }
                                        />
                                        {formik.touched.shopeLocation && formik.errors.shopeLocation && (
                                            <div className="text-red-500 text-xs">{formik.errors.shopeLocation}</div>
                                        )}

                                        <input
                                            type="file"
                                            name="shopeLocation"
                                            required
                                            onChange={handleImageChange1}
                                        />
                                        <input
                                            type="file"
                                            name="shopeLocation"
                                            required
                                            onChange={handleImageChange2}
                                        />
                                        <input
                                            type="file"
                                            name="shopeLocation"
                                            required
                                            onChange={handleImageChange3}
                                        />

                                        <input
                                            type="file"
                                            name="shopeLocation"
                                            required
                                            onChange={handleImageChange4}
                                        />
                                    </div>

                                    <div className="ml-2 w-full">
                                        <textarea
                                            name="services"
                                            placeholder="Serveces"
                                            required
                                            value={formik.values.services}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`${formik.touched.services && formik.errors.services
                                                ? with_error_class
                                                : without_error_class
                                                } h-40`} // You can adjust the height of the textarea as needed
                                        />
                                        {formik.touched.services && formik.errors.services && (
                                            <div className="text-red-500 text-xs">{formik.errors.services}</div>
                                        )}
                                    </div>

                                </div>
                                <div ref={mapContainer} style={{ width: '100%', height: '50vh' }} />

                                <button
                                    className="mt-5 p-6 cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddNewShope