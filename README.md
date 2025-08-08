# Blood Donation Application (Client)

A responsive React frontend for a Blood Donation platform. This app enables users to find and request blood donors, manage donation requests, and access donor information through an intuitive UI with role-based dashboards.

**Live Demo:** [https://bloodr-adf45.web.app/](https://bloodr-adf45.web.app/)

---

## 📸 Screenshots

<p float="left">
  <img src="https://i.ibb.co.com/9H8SRCrW/Screenshot-2025-08-08-204630.png" width="300" />
  <img src="https://i.ibb.co.com/SXYwv5h1/Screenshot-2025-08-08-204717.png" width="300" />
  <img src="https://i.ibb.co.com/hJXKxdZ8/Screenshot-2025-08-08-204308.png" width="300" />
</p>



---

## Features

- User authentication and role-based access (Admin, Donor, Volunteer)
- Browse and search blood donors by blood group and location
- Manage blood donation requests and approvals
- Responsive design optimized for desktop and mobile
- Interactive dashboard tailored per user role
- Integration with Firebase Authentication for secure login/signup
- CRUD operations on donors and requests with real-time updates
- Intuitive navigation and user-friendly interface

---

## Technologies Used

- React (v18+)
- React Router DOM
- Firebase Authentication
- Tailwind CSS for styling
- DaisyUI component library
- React Query (TanStack Query) for data fetching and caching
- Axios for HTTP requests
- React Hook Form for form management
- SweetAlert2 for beautiful alerts and confirmations
- Framer Motion for smooth animations

---

## Dependencies (Main)

See `package.json` for full list and versions. Some key dependencies:

- react, react-dom, react-router-dom
- firebase
- axios
- @tanstack/react-query
- react-hook-form
- sweetalert2
- tailwindcss, daisyui
- framer-motion

---



## Project Structure Overview

/src/components – Reusable UI components (Navbar, Footer, Dashboard, etc.)

/src/pages – Main pages for routing (Home, Login, Dashboard, etc.)

/src/context – React context providers (authentication, theme, etc.)

/src/hooks – Custom React hooks (e.g., for auth or data fetching)

/src/assets – Images, icons, screenshots, etc.

/src/styles – Tailwind/DaisyUI customization files

## Getting Started (Local Setup)

1. **Clone the repo**


git clone https://github.com/naafiisaa/blood-client.git
cd blood-client
Install dependencies

npm install
Firebase setup

Create a Firebase project at Firebase Console

Enable Email/Google authentication

Obtain Firebase config and set environment variables

Create .env.local file at the root of the project with the following:

env

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_BASE_URL=https://your-backend-api.com
Replace values with your Firebase project config and backend API URL.

Run the app locally

npm run dev

