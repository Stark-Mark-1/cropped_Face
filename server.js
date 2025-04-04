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

// Uncomment the code below for node js server to handle image upload from a client
// and send it to the face cropping service
// sendLocalImage();

// const express = require("express");
// const multer = require("multer");
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");
// const FormData = require("form-data");

// const app = express();
// const upload = multer({ dest: "uploads/" });

// app.post("/upload", upload.single("image"), async (req, res) => {
//     const form = new FormData();
//     form.append("image", fs.createReadStream(req.file.path));

//     try {
//         const response = await axios.post("http://127.0.0.1:5001/crop-face", form, {
//             headers: form.getHeaders(),
//             responseType: "stream"
//         });

//         const outputPath = path.join(__dirname, "output", "cropped_from_upload.jpg");
//         const writer = fs.createWriteStream(outputPath);
//         response.data.pipe(writer);

//         writer.on("finish", () => {
//             res.sendFile(outputPath); // Return the cropped image to the user
//         });

//     } catch (err) {
//         res.status(500).send("Error processing image: " + err.message);
//     }
// });

// app.listen(3000, () => {
//     console.log("Node.js server running on http://localhost:3000");
// });
