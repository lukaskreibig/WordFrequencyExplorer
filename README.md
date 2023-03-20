# Word Frequency Explorer

Word Frequency Explorer is a simple web application that allows users to see the usage of a word and view the word count for each word in the text. The application is split into a microservice backend and a frontend, and uses Docker Compose to run both in a local development environment.

## Technologies Used

- React for the frontend
- Microservice Backend using Node.js with Express 
- WebSocket for real-time communication and Redis for memory management between the frontend and backend
- Docker Compose for running the application in a local development environment

## Getting Started

To get started with Word Count Explorer, follow the steps below.

### Prerequisites

Before you can run the application, you must have the following installed:

- Docker
- Node.js

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lukaskreibig/WordFrequencyExplorer.git
```

2. Navigate to the project directory:

```bash
cd WordFrequencyExplorer
```

3. Install the dependencies for both the frontend and backend:


```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### Usage

To start the application, run the following command:

```bash
docker-compose up
```


This will start the frontend and backend containers, as well as a container running the WebSocket server.

Once the containers are running, you can access the application by navigating to http://localhost in your web browser.

### Stopping the Application

To stop the application, press `CTRL + C` in the terminal where the `docker-compose` command is running. Then, run the following command to stop and remove the containers:

```bash
docker-compose down
```
### Testing

To run the frontend test suite, navigate into the frontend directory and run the testing command:

```bash
cd frontend
npm test
```

## Directory Structure

The project directory is structured as follows:

The `backend` directory contains the Node.js backend code, while the `frontend` directory contains the React frontend code. The `docker-compose.yml` file defines the Docker Compose services, and the `README.md` file contains the documentation for the project.

