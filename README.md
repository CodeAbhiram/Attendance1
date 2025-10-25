# University Attendance Management Portal


Here is the complete folder structure:-

<img width="292" height="729" alt="image" src="https://github.com/user-attachments/assets/b283bbcd-b2e9-451f-9832-a44656020559" />





A full-stack MERN application designed to streamline student attendance tracking. This system provides distinct portals for students and faculty, ensuring a secure and efficient workflow. Faculty members can mark daily attendance, and students can log in to view their status in real-time.


# Backend:-
```
✨ Key Features
🔐 Role-Based Access Control: Separate registration and dashboard experiences for Students and Faculty.

🔑 Secure Authentication: Uses JSON Web Tokens (JWT) for secure login and session management. Passwords are encrypted using bcrypt.

👨‍🏫 Faculty Dashboard: Allows faculty to view a list of all registered students and mark their attendance as 'Present' or 'Absent' for the day.

👨‍🎓 Student Portal: Allows students to view their own attendance status after it has been marked by a faculty member.

🔄 Real-time Status Updates: Students can refresh their portal to see the latest attendance status.

📱 Responsive Design: A clean, modern, and fully responsive user interface built with React.

✅ Robust Form Validation: Both client-side (in React) and server-side (with Mongoose) validation to ensure data integrity.

🛠️ Technology Stack
Component	Technology	Description
Backend	Node.js & Express.js	For building the robust and scalable RESTful API.
MongoDB	A NoSQL database to store user and attendance data.
Mongoose	An ODM library for MongoDB to model application data.
Frontend	React	A JavaScript library for building the user interface.
React Router	For handling client-side routing between pages.
Axios	A promise-based HTTP client for making API requests.
Security	JSON Web Tokens (JWT)	For securing API endpoints and managing user sessions.
Bcrypt.js	For hashing user passwords before storing them in the database.

Export to Sheets
🤖 Backend Architecture & Functionalities
The backend is built as a RESTful API using Node.js and Express, serving as the backbone for all application logic, database interactions, and security.

1. Authentication and Authorization
User Registration (/api/auth/register):

Accepts registration details for both students and faculty.

Validates incoming data (e.g., checks for unique email, required fields).

Hashes the user's password using bcrypt to ensure it's never stored in plain text.

Saves the new user to the MongoDB database with their assigned role ('student' or 'faculty').

User Login (/api/auth/login):

Authenticates users by comparing the provided password with the hashed password in the database.

Upon successful authentication, it generates and signs a JSON Web Token (JWT) containing the user's ID and role.

This token is sent back to the client to be used for authenticating subsequent requests.

Protected Routes (Middleware):

A custom middleware is implemented to protect specific API endpoints.

This middleware verifies the JWT sent in the request headers.

It decodes the token to ensure the user is authenticated and has the correct role (e.g., only a user with a 'faculty' role can access the attendance marking endpoints).

2. Database Models (Mongoose Schemas)
User Schema:

fullName: String, required.

email: String, required, unique.

password: String, required.

role: String, enum: ['student', 'faculty'], required.

studentId: String, unique (only for students).

department: String (only for students).

Attendance Schema:

student: ObjectId, ref: 'User', required. (Links to the student).

markedBy: ObjectId, ref: 'User', required. (Links to the faculty who marked it).

status: String, enum: ['Present', 'Absent'], required.

date: Date, default: Date.now.

3. Core API Endpoints
Faculty Endpoints:

GET /api/faculty/students: (Protected) Fetches a list of all users with the 'student' role to display on the faculty dashboard.

POST /api/faculty/mark-attendance: (Protected) Allows a logged-in faculty member to mark a student's attendance. It creates or updates an attendance record for the given student for the current date.

Student Endpoints:

GET /api/student/attendance-status: (Protected) Allows a logged-in student to fetch their own attendance record for the current date.

General Endpoints:

Includes endpoints for user registration and login which are publicly accessible.

4. Error Handling
A centralized error-handling middleware is used to catch and process errors from anywhere in the application.

It ensures that consistent, structured JSON error messages are sent to the client, making debugging and frontend error handling easier.

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

npm

MongoDB (running locally or a cloud instance)

1. Clone the Repository
Bash

git clone https://github.com/your-username/university-attendance-portal.git
cd university-attendance-portal
2. Setup Backend
Bash

cd backend
npm install
Create a .env file in the backend directory and add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
Now, start the backend server:

Bash

node server.js
The backend will be running at http://localhost:5000.

3. Setup Frontend
Bash

cd ../frontend
npm install
npm start
The frontend React development server will start at http://localhost:3000.

📸 Project Showcase
User Registration (Faculty & Student)
Users can register by selecting their role from the dropdown.

Faculty Dashboard
After logging in, faculty can view all students and mark their daily attendance.

Student Portal
Students can log in to view their personal details and check their attendance status for the day.


```



# Frontend

```

cd frontend
npm install
```
# 2. Configure Environment
Create backend/.env:

```


MONGO_URI=mongodb+srv://angajalavijat_db_user:IZdQHCIoHd9Km7X1@cluster0.fru06ep.mongodb.net/student_attendence
JWT_SECRET=replace_with_ypur_key
PORT=5000
```

# 3. Start Servers
Backend (Terminal 1):
```
cd backend
npm start
```
# 🤖 Frontend Architecture & Functionalities
```
This is the frontend for the University Attendance Management Portal, built with React. It provides a clean, responsive, and interactive user interface for both students and faculty. The application communicates with a backend REST API to handle data and authentication.

✨ Key Frontend Features
🏢 Component-Based Architecture: The UI is built with reusable and maintainable React components for forms, dashboards, and UI elements.

🧭 Dynamic Client-Side Routing: Utilizes React Router to create a seamless single-page application (SPA) experience with distinct URLs for registration, login, and user dashboards.

💼 State Management: Leverages React Hooks (useState, useEffect) for efficient management of component-level state, such as form inputs and fetched API data.

📡 Seamless API Integration: Uses Axios to make asynchronous requests to the backend API, handling data fetching, user authentication, and attendance marking.

🔒 Token-Based Authentication Handling: Securely manages JWT (JSON Web Tokens) received from the backend, storing them in browser storage and attaching them to protected API requests.

🎨 Conditional Rendering: The UI dynamically adapts based on user role and authentication status, ensuring users only see the components and data relevant to them.

✅ Real-time Form Validation: Provides instant feedback to users on the registration and login forms, improving user experience and data quality.

📱 Fully Responsive Design: Employs modern CSS techniques like Flexbox and Grid to ensure a flawless experience across desktops, tablets, and mobile devices.

🤖 Frontend Architecture & Functionalities
The frontend is structured to be modular and scalable, separating concerns like UI components, API communication, and page routing.

1. Project Structure
A typical Create React App folder structure is used to organize the codebase logically:


App.js: The root component that sets up the application's routing using react-router-dom. It defines which page component to render for each URL path.

Pages (/pages):

Register.js: Contains the registration form, manages form state using useState, performs client-side validation, and calls the register function from the API service upon submission.

Login.js: Contains the login form. On successful login, it receives a JWT from the API service, saves it to localStorage, and redirects the user to their appropriate dashboard.

FacultyDashboard.js:

Protected route accessible only to 'faculty' users.

Uses a useEffect hook to fetch the list of all students from the backend when the component mounts.

Maps over the fetched student data to render a list of StudentCard components.

Handles click events on "Present" / "Absent" buttons, triggering API calls to mark attendance.

StudentDashboard.js:

Protected route accessible only to 'student' users.

Fetches the logged-in student's personal information and today's attendance status.

Displays a welcome message and the attendance status ('Present', 'Absent', or 'Not Marked').

Reusable Components (/components):

StudentCard.js: A component that takes student data as props and displays their name, ID, and the attendance action buttons.

Navbar.js: Displays the application title and conditionally shows a "Logout" button if a user is authenticated.

Notification.js: A component to display success or error messages to the user (e.g., "Attendance marked successfully").

3. Authentication Flow
The frontend handles authentication seamlessly to protect user dashboards.

Login: A user enters their credentials and clicks "Login".

API Call: The login function in authService.js sends a POST request to /api/auth/login with the user's credentials.

Token Storage: Upon receiving a successful response, the JWT is extracted and stored in the browser's localStorage.

Redirection: The user is programmatically redirected to their dashboard (/faculty-dashboard or /student-dashboard) using React Router's navigation hooks.

Authenticated Requests: For all subsequent requests to protected backend endpoints, an Axios interceptor or a helper function retrieves the token from localStorage and adds it to the request Authorization header.

JavaScript

// Example of an authenticated API call using Axios
axios.get('/api/faculty/students', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
Logout: The "Logout" button clears the JWT from localStorage and redirects the user back to the login page.

4. State and Data Flow
Local State: useState is the primary tool for managing component-level state like form inputs, loading indicators, and error messages.

Server State: Data fetched from the server (like the student list or attendance status) is stored in the state of the relevant page component. The useEffect hook is used to trigger these data-fetching operations when a component loads.

When an action is performed (e.g., marking attendance), the frontend makes an API call. Upon success, it can either re-fetch the data to get the latest state or optimistically update the UI to provide immediate user feedback.

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

npm

A running instance of the backend server.

Installation & Startup
Navigate to the frontend directory:

Bash

cd frontend
Install all the required npm packages:

Bash

npm install
Start the React development server:

Bash

npm start
The application will open automatically in your browser at http://localhost:3000.


```


here this is the output:-

student portal:-

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5c58a3c0-4f3c-4406-834b-861139cae41a" />

faculty portal:-

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/2d85c45b-9755-4078-ae0d-8047d8af80ef" />

student registration:-

<img width="1890" height="930" alt="image" src="https://github.com/user-attachments/assets/c3e92586-4e36-441e-a73c-72ca2b94f79c" />

faculty registration:-

<img width="1919" height="930" alt="image" src="https://github.com/user-attachments/assets/1e1c26c2-b482-4151-b36e-9deaa9ad4a69" />

