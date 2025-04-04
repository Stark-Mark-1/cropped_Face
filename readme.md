
---

# 🧠 Face Cropping Microservice (Python + Node.js)

This project is a hybrid image-processing tool that uses:

- 🐍 **Python + OpenCV + Flask** for **face detection and cropping**
- 🟢 **Node.js** for:
  - Sending local images to the Python server (client mode)
  - Hosting an image upload server (Express mode - optional)

---

## 📁 Project Structure

```
face_crop_project/
│
├── images/                # Store your local input images (e.g., selfie.jpg)
├── output/                # Cropped faces are saved here
├── uploads/               # Used by Express server (optional)
│
├── face_crop.py           # Python Flask server (handles face detection)
├── server.js              # Node.js file (client mode OR Express server)
├── package.json
└── README.md              # You're here!
```

---

## 🧰 Prerequisites

### ✅ Python 3.x (Portable or Installed)
Install required Python packages:
```bash
python -m pip install flask opencv-python numpy
```

### ✅ Node.js (14 or later)
Install dependencies:
```bash
npm install
```

---

## 🚀 Getting Started

### 1️⃣ Start the Python Face Cropping Server

Run this to start the Flask server that detects and crops faces:

```bash
python face_crop.py
```

It will start at:
```
http://127.0.0.1:5001
```

---

### 2️⃣ Process Image with Node.js

#### 🟢 Mode A: Send a Local Image (Client Mode)
- Add your image to `images/selfie.jpg`
- Run:

```bash
node server.js
```

✅ Output will be saved to `output/cropped_selfie.jpg`

---

#### 🟢 Mode B: Run Node.js as an Upload Server (Optional)

Uncomment the Express code in `server.js` to enable this mode.

Then start the server:

```bash
node server.js
```

Now:
- `POST` an image to `http://localhost:3000/upload`
- It will be sent to the Python server
- Cropped image will be returned and saved in `output/`

---

## 🧪 Testing API with curl

```bash
curl -X POST http://127.0.0.1:5001/crop-face \
  -F "image=@images/selfie.jpg" \
  --output output/cropped_test.jpg
```

---

## 📸 Example

**Input image**:
```
images/selfie.jpg
```

**Cropped face saved as**:
```
output/cropped_selfie.jpg
```

---

## ❓ Troubleshooting

| Problem | Solution |
|--------|----------|
| `connect ECONNREFUSED ::1:5001` | Change `localhost` to `127.0.0.1` in Node.js |
| `ModuleNotFoundError` in Python | Run `python -m pip install flask opencv-python numpy` |
| Python not recognized | Use full path: `D:\Wavelaps\face_crop_project\python.exe` |
| No face detected | Use a clear front-facing image |

---

## 🔒 Production Considerations

- Don't use Flask’s dev server in production
- Add validation and limits to uploaded files
- Secure endpoints if deployed externally

---

## 📦 Credits

- Face detection: OpenCV Haar Cascades
- Image processing: Python & Node.js Streams
- Flask: Python web framework
- Node.js: Axios + FormData + fs modules

---

Made with ❤️ by combining the best of Python and Node.js!
