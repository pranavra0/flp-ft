
# FLP File Upload & Download Web App

## Overview

This project is a web application designed to allow users to upload and download **FLP (FL Studio Project)** files, manage associated plugins and samples, and retrieve password-protected download links. The app also displays required plugins and samples for each project file to help users quickly set up their environment.

The app is built with **React** for the frontend and a **Node.js Express** backend for handling file uploads, downloads, and associated metadata.

---

## Features

- **Upload FLP Files**: Users can upload FL Studio Project files (.flp).
- **Password Generation**: After uploading, a unique password is generated for the file, allowing secure and easy access to it later.
- **Download FLP Files**: Users can input a password to download previously uploaded FLP files.
- **Required Plugins**: The app can fetch and display a list of required plugins for the uploaded FLP file.
- **Required Samples**: Users can view and hide a list of required samples for each project, presented in a collapsible dropdown format.
- **Contact Info**: A simple contact section with a mailto link for easy communication.

---

## Technologies Used

- **Frontend**:
  - React
  - CSS (Styled for dark mode and sleek UI)
  - Axios (for API calls)
- **Backend**:
  - Node.js
  - Express.js
  - Multer (for handling file uploads)
- **Hosting**:
  - Frontend: Vercel / Netlify (for React app deployment)
  - Backend: Heroku / Render (for Node.js app hosting)

---

## How to Use

### 1. Uploading an FLP File

1. Go to the **Upload FLP** section.
2. Select a **.flp** file using the file input.
3. Click **Upload**.
4. After the upload is complete, a message will display with the **password** you can use for future downloads.

### 2. Downloading an FLP File

1. Enter the **password** you received after uploading the file in the **Download FLP** section.
2. Click **Download** to retrieve your FLP file.
3. The file will be downloaded directly to your system.

### 3. Viewing Required Plugins and Samples

1. Enter the **password** of the uploaded file in the **Download FLP** section.
2. Click **Show Required Plugins** to view a list of plugins required for the project.
3. Click **Show Required Samples** to see a list of samples required by the project. The list is collapsible, so you can choose to hide it as well.

---

## How to Run Locally

If you want to run this project on your local machine, follow the steps below.

### Prerequisites

- **Node.js** installed (v14 or higher recommended)
- **npm** or **yarn** package manager
- **MongoDB** (optional, if you're using a database for persistent storage)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/flp-ft.git
cd flp-ft
```

### 2. Install Dependencies

#### Frontend (React app)
Navigate to the `client` directory and install dependencies:

```bash
cd frontend
npm install

```

#### Backend (Node.js Express app)

Navigate to the `server` directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Running the program

From root
```bash
cd client
npm run dev
```

```bash
cd server
node index.js
```
