Admin Dashboard - Role-Based Access Control (RBAC)
This project implements a frontend for an Admin Dashboard where an admin can manage users, assign roles (creator or user), and allow creators to create and manage posts. Users can view posts and follow creators. The application demonstrates Role-Based Access Control (RBAC) using modern React techniques.


Table of Contents

Project Overview


Features

Technologies Used

Project Structure


State Management

Routing & Permissions


How to Run the Project

Project Overview


The Admin Dashboard allows the admin to:

View and manage users and creators.
Assign or toggle roles between users and creators.
Add new members to the system.


Creators can:

Create new posts.
View their past posts.
Users can:

View posts.
Follow creators.
Features
Role Management: Admins can toggle user roles between "user" and "creator."
Add Users: Admin can add new users to the system.
Post Management: Creators can create posts, view past posts, and manage their content.
Protected Routes: Access control to ensure users only have access to pages based on their roles.
Shimmer Effect & Debounce: Optimized user interface with shimmer loading effect and debounce for input handling.
Mobile-Responsive Sidebar: Sidebar that can be toggled on smaller screens for better usability.
Technologies Used
React: For building the UI components.
React Context API: Used to manage global state such as posts and user roles.
React Router: For handling navigation and protected routes.
Reducer: Used for managing user roles and actions in a centralized way.
Tailwind CSS: For styling the components and providing a responsive layout.
Shimmer Effect: To show a loading skeleton while data is being fetched.
Debounce: For handling delayed user input in forms (e.g., searching, adding members).
Text Editor:Integrated TinyMCE for interactive bloging
Project Structure:
components/forms:Contains the login form and the add user form
CreatorNav:The Navbar for the Creator
Shimmer:The Shimer Effect Component 
UserNav:Navbar for the user 
Context:
AuthContext:Setting up the context for the authentication 
BlogContext:Setting the context for the posting a blog 
pages:
DashBoard:The AdminDashBoard 
Following:The user can choose to follow and unfollow the creators
PastBlogs:The History of the blogs posted by the Creator
UnAuthorized:It shows the unauthorized page when the user is not permited at a particular page
UserDashBoard:YThe UserDashboard contains the posts from the creators used dummydara api 
Write:Alllows the creators to write their content and insert media/links.Integrated TinyMCE 
utils:
reducer:Contains all the state managment functions such as adding a user/creator, making creator as a user and vice versa and deleting a user and adding a post
App.jsx:
The App had the routers provided
protectedRote.jsx:
It contains the protected routes handling logic as per the roles they are directed
State Management
Context API: The application uses Context to manage global states such as posts, user roles, and login status. This allows components to access shared data without prop drilling.
Reducer: The state of the users and their roles is managed using a reducer. This ensures that all state changes (like adding members, deleting, and toggling roles) are handled centrally.
Routing & Permissions
Protected Routes: Using React Router, the application includes protected routes to ensure that users who are not logged in or have insufficient permissions are redirected to an unauthorized page.
Role-Based Access Control (RBAC): The admin can manage user roles (user/creator) using a toggle mechanism. Creators have the ability to create and view their posts, while users can only view posts and follow creators.
How to Run the Project
Prerequisites
Make sure you have the following installed:

Node.js
npm or yarn

Installation

Clone the repository:https://github.com/MahindraGamini/VRV-security-assignment


git clone https://github.com/MahindraGamini/VRV-security-assignment
cd VRV-security-assignment
Install the dependencies:


npm install
# or
yarn install
Start the development server:


npm start
# or
yarn start
Open your browser and visit:


http://localhost:3000
Conclusion
This application showcases how to implement Role-Based Access Control (RBAC) in React with features like user management, post creation, and efficient state management using React Context and Reducer. The application has been designed to be scalable, maintainable, and user-friendly while utilizing modern frontend practices.

