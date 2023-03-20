import sanitizeHtml from 'sanitize-html';

const removePunctuation = (word: string): string => {
  return word.replace(/^[^a-zA-ZäöüÄÖÜß\w]+|[^a-zA-ZäöüÄÖÜß\w]+$/g, '')
};

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
