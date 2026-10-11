# AI-Resume-Builder 🚀

An AI-powered resume builder designed to help users create, customize, manage, and preview professional resumes with ease.

Build polished resumes using customizable templates, AI-assisted content enhancement, and a user-friendly interface.

✨ Features

- AI-Powered Content Enhancement — Improve professional summaries and job descriptions using AI.
- Resume Builder — Create and edit resumes with structured forms for personal information, education, experience, projects, and skills.
- Multiple Resume Templates — Choose from different resume designs and layouts.
- Resume Dashboard — Access and manage saved resumes from one place.
- Resume Preview — Preview your resume before sharing it.
- Public Resume Preview — Support for sharing resumes through a public preview page.
- Resume Visibility Controls — Manage resume visibility.
- Resume Saving — Save resume data through the backend.
- Image Handling — Support for resume-related image uploads.
- Authentication — User authentication interface and persistent authentication functionality.
- Responsive UI — A modern interface designed for a smooth user experience.

🛠️ Tech Stack

Frontend

- React.js
- JavaScript
- Vite
- Tailwind CSS

Backend

- Node.js
- Express.js
- REST APIs

Database and Services

- MongoDB
- AI API integration
- ImageKit integration

Development Tools

- Git
- GitHub
- npm

📁 Project Structure

AI-Resume-Builder/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── configs/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md

⚙️ Getting Started

Follow these steps to run the project locally.

Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB connection or MongoDB Atlas account
- Required API credentials for the services used by the project

1. Clone the Repository

git clone https://github.com/simran-8806/AI-Resume-Builder.git
cd AI-Resume-Builder

2. Install Frontend Dependencies

cd client
npm install

3. Install Backend Dependencies

Open another terminal from the project root:

cd server
npm install

4. Configure Environment Variables

Create the environment files required by your application.

Typical locations may include:

- "client/.env"
- "server/.env"

Check the project's configuration files to confirm the exact environment variable names required by the frontend, database, AI service, image service, and authentication system.

For Vite, frontend environment variables exposed to browser code generally use the "VITE_" prefix.

Important: Never commit real API keys, database credentials, authentication secrets, or ".env" files to GitHub.

5. Start the Backend

From the "server" directory, run the script defined in "server/package.json".

For example, if the project has a "dev" script:

npm run dev

If it uses a "start" script instead, run:

npm start

6. Start the Frontend

From the "client" directory:

npm run dev

Open the local URL printed by Vite in your terminal, usually "http://localhost:5173".

Keep the frontend and backend running in their respective terminals.

🔐 Security Notes

- Keep API keys and database credentials private.
- Use environment variables for sensitive configuration.
- Never upload ".env" files containing secrets.
- Configure authentication and backend authorization before deploying publicly.
- Validate user input and protect API endpoints appropriately.

🗺️ Future Improvements

- Download resumes as PDF.
- Add more professional resume templates.
- Improve AI-generated suggestions using job descriptions.
- Add resume scoring and ATS-oriented feedback.
- Enhance mobile responsiveness.
- Deploy the application with production-ready configuration.

👩‍💻 Author

Simran

GitHub: "@simran-8806" (https://github.com/simran-8806)

📄 License

Choose and add an appropriate open-source license before distributing this project. Until then, no license is specified.
