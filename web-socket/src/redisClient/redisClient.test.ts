import Redis from "ioredis";
import { redisClient } from "./redisClient";

jest.mock("ioredis");

describe("redisClient", () => {
  it("should create a Redis instance with default configuration", () => {
    expect(Redis).toHaveBeenCalledWith({
      host: "localhost",
      port: 6379,
    });
  });

  it("should export the created Redis instance", () => {
    expect(redisClient).toBeInstanceOf(Redis);
  });
});
