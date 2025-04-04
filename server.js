const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const IMAGE_PATH = path.join(__dirname, "images", "selfie.jpg"); // Change this to your local image

async function sendLocalImage() {
    if (!fs.existsSync(IMAGE_PATH)) {
        console.error("Image file not found:", IMAGE_PATH);
        return;
    }

    const form = new FormData();
    form.append("image", fs.createReadStream(IMAGE_PATH));

    try {
        const response = await axios.post("http://127.0.0.1:5001/crop-face", form, {
            headers: form.getHeaders(),
            responseType: "stream",
            timeout: 50000, // 
        });

        const outputPath = path.join(__dirname, "output", "cropped_selfie.jpg");
        const writer = fs.createWriteStream(outputPath);

        response.data.pipe(writer);

        writer.on("finish", () => {
            console.log("Cropped face saved to:", outputPath);
        });

    } catch (error) {
        console.error("Error processing image:", error.response?.data || error.message);
    }
}

// Run the function
sendLocalImage();
