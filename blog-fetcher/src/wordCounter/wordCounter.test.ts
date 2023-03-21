import { BlogPost, createWordFrequencyMap } from "./wordCounter";


describe("createWordFrequencyMap", () => {
  it("should count word occurrences in blog posts", () => {
    const blogPosts: BlogPost[] = [
      {
        content: {
          rendered: "<p>Hello, this is a test.</p>",
        },
      },
      {
        content: {
          rendered: "<p>Another test. Test again.</p>",
        },
      },
    ];

    const expectedWordFrequencyMap = {
      hello: 1,
      this: 1,
      is: 1,
      a: 1,
      test: 3,
      another: 1,
      again: 1,
    };

    expect(createWordFrequencyMap(blogPosts)).toEqual(expectedWordFrequencyMap);
  });
});
