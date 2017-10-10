const sum = (a, b) => a + b;
it("should return correct result", () => {
  const result = sum(2, 1);
  expect(result).toBe(3);
});