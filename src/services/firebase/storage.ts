import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadImageToStorage = async (image: string | null, imageName: string | null) => {
    try {
        if (image) {
            // Fetch the image data from the Blob URL
            const response = await fetch(image);
            const blob = await response.blob();

            // Create a File object from the Blob with a specified name and MIME type
            const imageFile = new File([blob], imageName || "default-image-name.jpg", { type: blob.type });

            const storageRef = ref(storage, `/images/shope/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } else {
            throw new Error("Invalid image data");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Invalid image data");
    }
};
