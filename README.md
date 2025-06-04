# Dashwater Frontend

**Dashwater Frontend** is the client-side application for the Dashwater IoT Dashboard project, developed in 2023. This React-based interface visualizes real-time water quality data collected from IoT sensors, providing users with intuitive insights and analytics.

> 🧠 Related backend repository: [Dashwater Backend](https://github.com/TaylorJi/Dashwater_backend)

## 👥 Team Members

- Nash Baek  
- Taylor Ji  
- Siwoon Lim  
- Ellen Jung  

## 🌐 Live Demo

Access the live dashboard here: [https://yvrdashboard.netlify.app](https://yvrdashboard.netlify.app)

> **Note:** The live demo may not display data currently, as the backend service is inactive due to the termination of the AWS Timestream subscription after project completion.

## 🛠️ Tech Stack

- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Axios** for API requests
- **Netlify** for deployment

## 📁 Project Structure
dashwater_frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── services/           # API service functions
│   ├── styles/             # Tailwind CSS configurations
│   └── App.tsx             # Root component
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
├── netlify.toml            # Netlify deployment settings
└── README.md               # Project documentation

## ⚠️ Service Status

> **Important:** This application is currently **non-operational** because the AWS subscription used during development was a paid service and was terminated after the project's completion. The backend will not respond to data queries or ingestion requests until a new AWS Timestream instance is configured.
