import { redisClient } from "../redisClient/redisClient";
import WebSocket from "ws";
import { fetchWordCountMap, isEqual, sendDataOnChange } from "./wordCountMapHandler";

// Mock the necessary modules and functions
jest.mock("../redisClient/redisClient", () => ({
    redisClient: {
      get: jest.fn(),
    },
  }));

class MockWebSocket extends WebSocket {
  constructor() {
    super(null as any);
  }
}

const mockWs = (new MockWebSocket() as jest.Mocked<MockWebSocket>);
mockWs.send = jest.fn();

// Add type definition for the send function
(mockWs.send as jest.Mock).mockClear();

describe("isEqual", () => {
  it("should return true for equal objects", () => {
    const obj1 = { hello: 1, world: 2 };
    const obj2 = { hello: 1, world: 2 };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it("should return false for non-equal objects", () => {
    const obj1 = { hello: 1, world: 2 };
    const obj2 = { hello: 1, world: 3 };
    expect(isEqual(obj1, obj2)).toBe(false);
  });
});

describe("fetchWordCountMap", () => {
  afterEach(() => {
    // Clear mocks after each test
    (redisClient.get as jest.Mock).mockClear();
  });

  it("should fetch word count map from Redis", async () => {
    const wordCountMap = { hello: 1, world: 1 };
    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(wordCountMap));

    const result = await fetchWordCountMap();
    expect(result).toEqual(wordCountMap);
  });

  it("should return null if word count map is not found in Redis", async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(null);

    const result = await fetchWordCountMap();
    expect(result).toBeNull();
  });
});

describe("sendDataOnChange", () => {
    beforeEach(() => {
        jest.useFakeTimers();
      });
    
      afterEach(() => {
        // Clear mocks after each test
        (redisClient.get as jest.Mock).mockClear();
        (mockWs.send as jest.Mock).mockClear();
        jest.useRealTimers();
      });

  it("should send initial word count map if available", async () => {
    const wordCountMap = { hello: 1, world: 1 };
    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(wordCountMap));

    await sendDataOnChange(mockWs);
    expect(mockWs.send).toHaveBeenCalledWith(JSON.stringify(wordCountMap));
  });

  it("should not send initial word count map if not available", async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(null);

    await sendDataOnChange(mockWs);
    expect(mockWs.send).not.toHaveBeenCalled();
  });
});

