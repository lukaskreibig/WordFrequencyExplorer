import sanitizeHtml from 'sanitize-html';

export interface BlogPost {
  content: {
    rendered: string;
  };
}

/**
 * Removes punctuation and special characters from the given word.
 *
 * @param {string} word - The word to be cleaned.
 * @returns {string} The cleaned word.
 */

const removePunctuation = (word: string): string => {
  return word.replace(/^[^a-zA-ZäöüÄÖÜß\w]+|[^a-zA-ZäöüÄÖÜß\w]+$/g, '');
};

/**
 * Cleans HTML from a Wordpress blog post using sanitizeHTML, and counts occurrences of each word.
 *
 * @param {string} sanitizedInput - The raw Wordpress blog post content.
 * @returns {Record<string, number>} A map of words and their counts.
 */

const countWords = (sanitizedInput: string): Record<string, number> => {
  const sanitizedText = sanitizeHtml(sanitizedInput, { allowedTags: [], allowedAttributes: {} });
  const words = sanitizedText.split(/[^a-zA-ZäöüÄÖÜß\w]+/);
  const wordCount: Record<string, number> = {};

  words.forEach((word) => {
    const normalizedWord = removePunctuation(word.toLowerCase());
    if (normalizedWord) {
      wordCount[normalizedWord] = (wordCount[normalizedWord] || 0) + 1;
    }
  });

  return wordCount;
};

/**
 * Processes an array of blog posts, counting word occurrences in each post.
 *
 * @param {BlogPost[]} blogPosts - An array of blog posts.
 * @returns {Record<string, number>} A map of words and their total counts across all blog posts.
 */

export const createWordFrequencyMap = (blogPosts: BlogPost[]): Record<string, number> => {
  const wordFrequencyMap: Record<string, number> = {};

  blogPosts.forEach((post) => {
    const wordCounts = countWords(post.content.rendered);
    for (const [word, count] of Object.entries(wordCounts)) {
      wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + count;
    }
  });

  return wordFrequencyMap;
};
