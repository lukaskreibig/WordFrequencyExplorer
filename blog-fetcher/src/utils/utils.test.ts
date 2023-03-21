import { isEqual } from "./utils";

describe("isEqual", () => {
  it("should return true for equal word count maps", () => {
    const map1 = { hello: 1, world: 1 };
    const map2 = { hello: 1, world: 1 };

    expect(isEqual(map1, map2)).toBe(true);
  });

  it("should return false for unequal word count maps", () => {
    const map1 = { hello: 1, world: 1 };
    const map2 = { hello: 2, world: 1 };

    expect(isEqual(map1, map2)).toBe(false);
  });
});
