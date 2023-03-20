# Word Frequency Explorer

Word Frequency Explorer is a simple web application that allows users to see the usage of a word and view the word count for each word in the text. The application is split into a microservice backend and a frontend, and uses Docker Compose to run both in a local development environment.

## Technologies Used

- React for the frontend
- Microservice backend using Node.js with Express and Redis for memory management
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

```bash
git clone https://github.com/lukaskreibig/WordFrequencyExplorer.git
```

2. Navigate to the project directory:

```bash
cd WordFrequencyExplorer
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

### Backend
The microservices used are two separate components that work together to fetch, process, and display the word frequency data from blog posts. Here's an overview of their individual roles and how they interact with each other:

#### Blog Fetcher Microservice: 
The purpose of this microservice is to periodically fetch blog posts from a specified API endpoint, count the word frequency in the blog posts, and then store the word frequency data in a Redis cache.

#### WebSocket Microservice: 
The purpose of this microservice is to serve as a WebSocket server that listens for incoming connections from clients (such as a frontend application). When a client connects, the server sends the latest word frequency data from the Redis cache to the client. The server also periodically checks for updates in the Redis cache and sends the updated data to the connected clients if the word frequency data has changed.
