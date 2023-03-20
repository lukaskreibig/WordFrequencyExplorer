import sanitizeHtml from 'sanitize-html';

/**
 * Cleans up the Punctuation and Special Characters in each word.
 *
 * @param {string} word - The Word from a BlogPost.
 * @returns {string} returns the words cleaned up.
 */

const removePunctuation = (word: string): string => {
  return word.replace(/^[^a-zA-ZäöüÄÖÜß\w]+|[^a-zA-ZäöüÄÖÜß\w]+$/g, '')
};

/**
 * Cleans up the HTML from Wordpress with sanitizeHTML and iterates through all words.
 *
 * @param {string} input - The wordpress object containing the blogpost.
 * @returns {Record<string, number>} Returns the words counted.
 */

const countWords = (input: string): Record<string, number> => {
  const sanitizedText = sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
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
 * Uses the BlogPosts to start the Clean Up and Iteration Process.
 *
 * @param {any[]} blogPosts - The array of BlogPosts.
 * @returns {Record<string, number>} Returns the wordCountMap.
 */

export const createWordCountMap = (blogPosts: any[]): Record<string, number> => {
  const wordCountMap: Record<string, number> = {};

  blogPosts.forEach((post) => {
    const wordCounts = countWords(post.content.rendered);
    for (const [word, count] of Object.entries(wordCounts)) {
      wordCountMap[word] = (wordCountMap[word] || 0) + count;
    }
  });

  return wordCountMap;
};
