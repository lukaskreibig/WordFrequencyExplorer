import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { WebSocket, Server } from 'mock-socket';
import { WordCountGrid } from './WordCountGrid';


//  Test suite for the WordCountGrid component.

describe('WordCountGrid', () => {

  // Set up the tests by mocking timers and the WebSocket object.

  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Clean up after each test by restoring real timers.
  
  afterEach(() => {
    jest.useRealTimers();
  });

  // Test that the WordCountGrid component correctly renders word count data
  // received from the WebSocket.
  
  it('renders word count data received from WebSocket', async () => {
    const server = new Server('ws://localhost:8080');
    const mockWebSocket = new WebSocket('ws://localhost:8080');

    jest.spyOn(global, 'WebSocket').mockImplementation(() => mockWebSocket);

    // Render the WordCountGrid component
    render(<WordCountGrid />);

    // Sample word count data to be sent through the WebSocket
    const wordCountMap = { word1: 2, word2: 3 };

    // Simulate a WebSocket message event with the sample data
    server.on('connection', (socket) => {
      socket.send(JSON.stringify(wordCountMap));
    });

    // Wait for the component to update and check if the word count data is rendered correctly
    await waitFor(() => {
      expect(screen.getByText('word1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('word2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    // Clean up the WebSocket mocks
    jest.restoreAllMocks();
    server.close();
    mockWebSocket.close();
  });
});
