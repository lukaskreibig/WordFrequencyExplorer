import axios from 'axios';
import WS from 'jest-websocket-mock';
import {  startServer } from './server';

describe('Server', () => {
  const port = 8081;
  let server: any;

  beforeEach(() => {
    server = startServer(port);
  });

  afterEach((done) => {
    WS.clean();
    server.close(done);
  });

  it('should start and respond to a HTTP request', async () => {
    const response = await axios.get(`http://localhost:${port}`);
    expect(response.status).toBe(200);
  });

  it('should open and close a WebSocket connection', async () => {
    const wsServer = new WS(`ws://localhost:${port}`);
    await wsServer.connected;

    wsServer.close();
    await expect(wsServer.closed).resolves.toBeUndefined();
  });
});
