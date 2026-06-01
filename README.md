🌾 CeresScan AI
AI-Based Grain Identification System
CeresScan AI is a React-based Machine Learning web application designed to help farmers identify grain types using image analysis and image processing techniques.
The application allows users to:
Capture grain images using a mobile camera
Upload grain images from a device
Analyze image quality
Identify grain categories
Store scan history
Use the application as a Progressive Web App (PWA)

🚀 Features
📷 Camera Capture
Mobile camera support
Rear camera access
Live preview
Grain image capture
📁 Image Upload
JPG support
PNG support
WEBP support
Drag-and-drop upload
🔍 Image Quality Analysis
The system evaluates:
Brightness
Contrast
Sharpness
Quality Levels:
High
Medium
Low
🌾 Grain Classification
Currently Supported Grains:
Basmati Rice
Wheat
Corn
Barley
Quinoa
❌ Non-Grain Detection
The application rejects images that do not appear to be grains.
Examples:
Mobile Phones
Human Faces
Cars
Trees
Random Objects
📜 Scan History
Stores:
Grain Name
Confidence Score
Timestamp
Grade Information
using browser localStorage.
📱 Progressive Web App (PWA)
Supports:
Install on phone
Offline access
Home-screen shortcut
Fast loading

🧠 Machine Learning Algorithm
Feature-Based Decision Tree Style Classification
The project uses a rule-based machine learning approach inspired by Decision Tree algorithms.
Extracted Features
The system extracts:
Brightness
RGB Color Values
Contrast
Saturation
Texture
Classification Process
Image ↓ Feature Extraction ↓ Brightness Contrast Texture Saturation RGB ↓ Grain Validation ↓ Decision Rule Matching ↓ Grain Prediction ↓ Confidence Score

🛠️ Technologies Used
Frontend
React.js
Vite
React Router DOM
Image Processing
HTML5 Canvas API
Storage
localStorage
Deployment
GitHub
Vercel
Mobile Support
Progressive Web App (PWA)

📂 Project Structure
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── CameraCapture.jsx
│   ├── UploadImage.jsx
│   ├── ImageQuality.jsx
│   ├── ScanResult.jsx
│   └── LanguageSelector.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Scanner.jsx
│   ├── History.jsx
│   └── Settings.jsx
│
├── services/
│   ├── classifier.js
│   ├── trainedModel.js
│   ├── modelService.js
│   ├── imageProcessor.js
│   └── storageService.js
│
├── hooks/
│   └── useCamera.js
│
├── data/
│   └── grains.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css

⚙️ Installation
Clone the repository:
git clone https://github.com/saik836/ceresscan-ai.git
Move into project folder:
cd ceresscan-ai
Install dependencies:
npm install
Run development server:
npm run dev
Open:
http://localhost:5173

🌐 Deployment
GitHub Repository
Repository:
https://github.com/saik836/ceresscan-ai
Vercel Deployment
Deploy using:
vercel
or import the GitHub repository into Vercel Dashboard.

📈 Future Enhancements
TensorFlow.js Integration
MobileNetV2 CNN Model
Real Grain Dataset Training
Multi-Language Support
Market Price Prediction
Disease Detection
Cloud Database Integration

⚠️ Current Limitations
Rule-based classification
Limited grain categories
Accuracy depends on image quality
Less accurate than deep learning models

🔮 Future ML Upgrade
Current Algorithm:
Feature-Based Decision Tree Classification
Future Upgrade:
TensorFlow.js + MobileNetV2 CNN
Expected Accuracy:
85% – 95%
with a properly trained grain dataset.

👨‍💻 Developer
Project: CeresScan AI
Domain:
Artificial Intelligence
Machine Learning
Computer Vision
Agricultural Technology
Developed for educational and research purposes.