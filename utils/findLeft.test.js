import { findLeft } from "./findLeft";

describe("find the largest value that is less than or equal", () => {
  test("handles normal case", () => {
    const list = [1, 2, 5];
    const max = 4;
    expect(findLeft(list, max)).toBe(1);
  });
  test("handles empty list", () => {
    const list = [];
    const max = 42;
    expect(findLeft(list, max)).toBe(-1);
  });
  test("when no value is larger", () => {
    const list = [1, 2, 3];
    const max = 42;
    expect(findLeft(list, max)).toBe(2);
  });
  test("when first value is larger", () => {
    const list = [3, 5, 7];
    const max = 2;
    expect(findLeft(list, max)).toBe(-1);
  });
  test("when only value is equal", () => {
    const list = [2];
    const max = 2;
    expect(findLeft(list, max)).toBe(0);
  });
});
