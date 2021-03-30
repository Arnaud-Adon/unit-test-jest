import multiplication from "../src/multiplication";

describe("multiplication test suite", () => {
  it("should return 90 when 10 multiply by 9", () => {
    //Arrange
    const value = 10;
    const multiply = 9;
    //Act
    const result = multiplication(value, multiply);

    // Assert
    expect(result).toBe(90);
  });
});
