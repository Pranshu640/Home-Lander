const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Add better error handling for Cloudinary config
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    throw new Error("Missing required Cloudinary environment variables");
}

try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });
} catch (error) {
    console.error("Cloudinary configuration error:", error);
    throw error;
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Homelander_DEV',
        allowedFormats: ['png', 'jpg', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

module.exports = {
    cloudinary,
    storage,
}