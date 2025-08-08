# Blood Donation Application (Client)

A responsive React frontend for a Blood Donation platform. This app enables users to find and request blood donors, manage donation requests, and access donor information through an intuitive UI with role-based dashboards.

**Live Demo:** [https://bloodr-adf45.web.app/](https://bloodr-adf45.web.app/)

---

## Screenshot

![Blood Donation App Screenshot](./screenshots/home.png)  
*Add your screenshot image in the `./screenshots/` folder with the name `home.png`*

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

## Getting Started (Local Setup)

1. **Clone the repo**

```bash
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

npm start

Project Structure Overview
/src/components – Reusable UI components (Navbar, Footer, Dashboard, etc.)

/src/pages – Main pages for routing (Home, Login, Dashboard, etc.)

/src/context – React context providers (authentication, theme, etc.)

/src/api – API service calls using Axios

/src/hooks – Custom React hooks (e.g., for auth or data fetching)

/src/assets – Images, icons, screenshots, etc.

/src/styles – Tailwind/DaisyUI customization files

Core Features
Authentication & Authorization
Login/signup using Firebase (email/password & Google)

Role-based route protection and UI rendering (Admin, Donor, Volunteer)

Dashboard
Admin dashboard: Manage donors, view requests, approve/decline

Donor dashboard: Update profile, view donation history

Volunteer dashboard: Track requests and assist with donor coordination

Requests Management
Create new blood donation requests

View and respond to requests based on role and permissions

Future Improvements
Implement real-time chat between donors and requesters

Add push notifications for urgent blood requests

Enhance mobile UI/UX with progressive web app features

Contributing
Contributions are welcome! Feel free to fork this repository, create a branch, and submit pull requests.

License
This project is licensed under the MIT License.

Contact
Feel free to reach out via LinkedIn or email for any questions or collaboration opportunities.
