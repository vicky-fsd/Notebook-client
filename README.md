# CloudBook - Simple Note-Taking Application

CloudBook is a simple note-taking application built using MongoDB and Express. With CloudBook, users can easily create, update, and delete notes. It provides a user-friendly interface to manage and organize your notes efficiently.

## Features

- User Registration and Authentication: Users can create an account and log in to access their notes.
- Create Notes: Users can create new notes by providing a title and content.
- Update Notes: Users can edit and update existing notes.
- Delete Notes: Users can delete unwanted notes.
- List Notes: Users can view a list of their notes, organized by the most recent ones.
- Search Notes: Users can search for specific notes using keywords or tags.
- Responsive Design: The application is designed to work seamlessly on different devices and screen sizes.

## Technologies Used

- MongoDB: A NoSQL database used to store and manage notes data.
- Express: A web application framework used to build the backend server.
- Node.js: A JavaScript runtime environment used for server-side development.
- HTML/CSS: Used for building the user interface and styling the application.
- JavaScript: The primary programming language used for both frontend and backend development.

## Prerequisites

Before running the application, ensure that you have the following dependencies installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MongoDB: [Download and install MongoDB](https://www.mongodb.com/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Prajapati-Shivam/Cloud-Book.git
   ```

2. Install the dependencies:

   ```bash
   cd cloud-book
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the project root directory.
   - Define the following variables in the `.env` file:
     ```bash
     MONGO_URI=your-mongodb-connection-string
     PORT=5000
     ```
   - Replace `your-mongodb-connection-string` with your MongoDB connection string.

4. Run the application:

   ```bash
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:5000` to access the application.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please create a pull request or open an issue on the GitHub repository.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
