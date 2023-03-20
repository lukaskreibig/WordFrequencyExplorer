# Word Count Explorer

Word Count Explorer is a simple web application that allows users to see the usage of a word and view the word count for each word in the text. The application is split into a microservice backend and a frontend, and uses Docker Compose to run both in a local development environment.

## Technologies Used

- React for the frontend
- Node.js with Express for the microservice backend
- WebSocket for real-time communication between the frontend and backend
- Docker Compose for running the application in a local development environment

## Getting Started

To get started with Word Count Explorer, follow the steps below.

### Prerequisites

Before you can run the application, you must have the following installed:

- Docker
- Node.js

### Installation

1. Clone the repository:

git clone https://github.com/lukaskreibig/word-count-explorer.git -- update!! wrong


2. Navigate to the project directory:

cd word-count-explorer

3. Install the dependencies for both the frontend and backend:

cd frontend
npm install

cd ../backend
npm install


### Usage

To start the application, run the following command:

docker-compose up


This will start the frontend and backend containers, as well as a container running the WebSocket server.

Once the containers are running, you can access the application by navigating to http://localhost in your web browser.

### Stopping the Application

To stop the application, press `CTRL + C` in the terminal where the `docker-compose` command is running. Then, run the following command to stop and remove the containers:

docker-compose down


## Directory Structure

The project directory is structured as follows:

.
├── backend
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── src
│ └── tsconfig.json
├── docker-compose.yml
├── frontend
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── public
│ └── src
└── README.md


The `backend` directory contains the Node.js backend code, while the `frontend` directory contains the React frontend code. The `docker-compose.yml` file defines the Docker Compose services, and the `README.md` file contains the documentation for the project.
