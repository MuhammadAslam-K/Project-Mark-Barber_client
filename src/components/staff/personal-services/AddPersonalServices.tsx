import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as Yup from "yup"
import { uploadImageToStorage } from '../../../services/firebase/storage';
import toast from 'react-hot-toast';
import { staffAxios } from '../../../constraints/axiosIntersepter/staffIntersepter';
import staffApis from '../../../constraints/apis/staffApis';
import { customLoadingStyle } from '../../../constraints/customizeLoaderStyle';
import mapboxgl from 'mapbox-gl';
import { personalServices } from '../../../types/staffSideInterface';
import { handleErrors } from '../../../constraints/errorHandler';





const AddPersonalServices: React.FC = () => {


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

    const [personLatitude, setpersonLatitude] = useState<number | null>(null);
    const [personLongitude, setpersonLongitude] = useState<number | null>(null);


    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude)
                },
                function (error) {
                    toast.error("Error getting location");
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            toast.error("Geolocation is not supported in this browser.");
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
                    setpersonLatitude(finalCoordinates.lat)
                    setpersonLongitude(finalCoordinates.lng)
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
            name: "",
            gender: "",
            email: "",
            mobile: "",
            location: "",
            services: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Type a valid Shope Name")
                .required("Please Enter value"),
            email: Yup.string()
                .email("Please Enter a valid Email")
                .required("Please Enter value"),
            mobile: Yup.string()
                .length(10, "Please Enter a valid number")
                .required("Please Enter value"),
            location: Yup.string()
                .min(5, "Type a valid Location")
                .required("Please Enter value"),
            services: Yup.string()
                .min(10, "Type a valid Description")
                .required("Please Enter value"),
        }),
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    const handleSubmit = async (values: personalServices) => {
        toast.loading('Submitting the form please wait...', {
            style: customLoadingStyle,
        })

        const Image1 = await uploadImageToStorage(image1, image1Name, "personal-services")
        const Image2 = await uploadImageToStorage(image2, image2Name, "personal-services")
        const Image3 = await uploadImageToStorage(image3, image3Name, "personal-services")
        const Image4 = await uploadImageToStorage(image4, image4Name, "personal-services")

        const formData = {
            ...values,
            Image1,
            Image2,
            Image3,
            Image4,
            personLatitude,
            personLongitude,
        }

        try {
            console.log("form data", formData)
            const response = await staffAxios.post(staffApis.addPersonalService, formData)
            console.log("response", response)
            toast.dismiss()
            toast.success("Added the shope successfully")
        } catch (error) {
            console.log("error", error);
            toast.dismiss()
            handleErrors(error)
        }
    }

    return (
        <>
            <div className="flex w-full mt-10  justify-center bg-gray-100">
                <div className="lg:w-8/12 w-full mb-20 overflow-hidden rounded-3xl bg-gray-100 shadow-2xl sm:flex justify-center">
                    <div className="w-full  ">
                        <div className="p-8 ">
                            <h1 className="text-3xl font-black text-blue mb-3">Add New Barber</h1>
                            <form className="" onSubmit={formik.handleSubmit}>
                                {/* Horizontal inputs */}
                                <div className="flex flex-col mb-4 sm:flex-row">
                                    <div className="mr-2 w-full">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            required
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.name && formik.errors.name
                                                    ? with_error_class
                                                    : without_error_class
                                            } />
                                        {formik.touched.name && formik.errors.name && (
                                            <div className="text-red-500 text-xs">{formik.errors.name}</div>
                                        )}
                                    </div>
                                    <div className={`mr-2 w-full${without_error_class}`}>
                                        <div className="flex items-center">
                                            <label className="mr-2">Gender:</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="male"
                                                    name="gender"
                                                    value="male"
                                                    checked={formik.values.gender === 'male'}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="mr-1"
                                                />
                                                <label htmlFor="male">Male</label>

                                                <input
                                                    type="radio"
                                                    id="female"
                                                    name="gender"
                                                    value="female"
                                                    checked={formik.values.gender === 'female'}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="mr-1 ml-2"
                                                />
                                                <label htmlFor="female">Female</label>

                                            </div>
                                        </div>
                                        {formik.touched.gender && formik.errors.gender && (
                                            <div className="text-red-500 text-xs">{formik.errors.gender}</div>
                                        )}
                                    </div>

                                </div>



                                <div className="flex flex-col mb-4 sm:flex-row">
                                    <div className="mr-2 w-full">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="email"
                                            required
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.email && formik.errors.email
                                                    ? with_error_class
                                                    : without_error_class
                                            }
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="text-red-500 text-xs">{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="ml-2 w-full">
                                        <input
                                            type="text"
                                            name="mobile"
                                            placeholder="mobile No"
                                            required
                                            value={formik.values.mobile}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.mobile && formik.errors.mobile
                                                    ? with_error_class
                                                    : without_error_class
                                            }
                                        />
                                        {formik.touched.mobile && formik.errors.mobile && (
                                            <div className="text-red-500 text-xs">{formik.errors.mobile}</div>
                                        )}
                                    </div>
                                </div>


                                <div className="flex flex-col mb-4 sm:flex-row">
                                    <div className="mr-2 w-full">
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            required
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.touched.location && formik.errors.location
                                                    ? with_error_class
                                                    : without_error_class
                                            }
                                        />
                                        {formik.touched.location && formik.errors.location && (
                                            <div className="text-red-500 text-xs">{formik.errors.location}</div>
                                        )}

                                        <input
                                            type="file"
                                            required
                                            onChange={handleImageChange1}
                                        />
                                        <input
                                            type="file"
                                            required
                                            onChange={handleImageChange2}
                                        />
                                        <input
                                            type="file"
                                            required
                                            onChange={handleImageChange3}
                                        />

                                        <input
                                            type="file"
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
                                                } h-40`}
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



export default AddPersonalServices