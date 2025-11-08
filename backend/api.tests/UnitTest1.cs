using Shouldly;
using Xunit;

namespace api.tests;

public class UnitTest1
{
  [Fact]
  public void Test1()
  {
    // Arrange
    var expected = "hello";
    var actual = "hello";

    // Act & Assert
    actual.ShouldBe(expected);
  }

  [Fact]
  public void TestStringContains()
  {
    // Arrange
    var message = "Hello, World!";

    // Act & Assert
    message.ShouldContain("World");
    message.ShouldNotContain("Goodbye");
  }

  [Fact]
  public void TestCollectionAssertions()
  {
    // Arrange
    var numbers = new[] { 1, 2, 3, 4, 5 };

    // Act & Assert
    numbers.ShouldContain(3);
    numbers.Length.ShouldBe(5);
    numbers.ShouldBeInOrder();
  }
}
