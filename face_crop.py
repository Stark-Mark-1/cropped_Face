import cv2
import numpy as np
from flask import Flask, request, send_file

app = Flask(__name__)

# Load pre-trained face detection model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

@app.route("/crop-face", methods=["POST"])
def crop_face():
    if "image" not in request.files:
        return {"error": "No image uploaded"}, 400

    # Read image
    file = request.files["image"]
    nparr = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert to grayscale for face detection
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(100, 100))

    if len(faces) == 0:
        return {"error": "No face detected"}, 400

    # Crop the first detected face
    x, y, w, h = faces[0]
    face_img = img[y:y+h, x:x+w]

    # Save the cropped face
    output_path = "cropped_face.jpg"
    cv2.imwrite(output_path, face_img)

    # Send cropped face back
    return send_file(output_path, mimetype="image/jpeg")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
