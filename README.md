# Smart Resume Builder

Smart Resume Builder is a modern, AI-powered web application that allows users to easily create, manage, and download professional resumes. It provides an intuitive interface for building resumes, leverages AI for personalized content suggestions, and helps you showcase your skills and experience effectively to potential employers.

## Features

- **Create & Edit Resumes:** Add personal details, education, work experience, skills, and a professional summary. Edit resumes anytime.
- **Resume Management:** View, manage, and organize multiple resumes from a central dashboard. See stats like the number of resumes created, education and experience entries.
- **AI-Powered Suggestions:** Get smart content suggestions for your resume sections using integrated AI features.
- **Professional Preview:** Instantly preview your resume in a clean, modern layout before downloading.
- **Download Resume:** Export your completed resume for job applications.
- **Responsive UI:** Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (if using local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubham010-dev/Smart_Resume_Builder.git
   cd Smart_Resume_Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Configure environment variables**

   - Create a `.env` file in the root and `client` directories as needed.
   - Example variables:
     ```
     MONGODB_URI=your_mongodb_uri
     PORT=5000
     REACT_APP_API_URL=http://localhost:5000
     ```

4. **Run the application**

   - Start the backend:
     ```bash
     node index.js
     ```
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```

   The app will be available at `http://localhost:5173`.

## Usage

1. **Create an Account / Log In** (if authentication is enabled).
2. **Create a New Resume:** Click "Create Resume" and fill in your details.
3. **Edit & Preview:** Add education, experience, and skills. Preview in real-time.
4. **AI Suggestions:** Click "Get Suggestions" to receive AI-powered improvements for your resume content.
5. **Download:** Export your resume as a PDF or supported format.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **AI Integration:**  OpenAI GPT
- **Other:** RESTful API

## Project Structure

```
Smart_Resume_Builder/
├── client/              # React frontend
│   └── src/components/resume/   # Resume-related UI components
├── server/              # Node.js backend
    └── models/              # MongoDB models
    └── routes/              # API routes
    └── middleware/          # error handling
└── README.md
```


## Author

- [Shubham Singh Bora](https://github.com/shubham010-dev)

