import axios from "axios";
import { isEqual } from "../utils/utils";
import redisClient from "../redisClient/redisClient";
import { BlogPost, createWordFrequencyMap } from "../wordCounter/wordCounter";

/**
 * Fetch blog posts from the specified API endpoint.
 *
 * @returns {Promise<BlogPost[]>} A promise that resolves to an array of blog posts.
 */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await axios.get(
      "https://www.thekey.academy/wp-json/wp/v2/posts"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Fetch blog posts periodically and send the word count map to Redis
 * only if the data has changed since the last fetch.
 */
 export const fetchBlogPostsPeriodically = () => {
  let previousWordCountMap: Record<string, number> = {};

  const processBlogPosts = async () => {
    const blogPosts = await fetchBlogPosts();
    const wordCountMap = createWordFrequencyMap(blogPosts);

    if (!isEqual(previousWordCountMap, wordCountMap)) {
      console.log("New data received - updating Redis");
      await redisClient.set("wordCountMap", JSON.stringify(wordCountMap));
      previousWordCountMap = wordCountMap;
    }
  };

  processBlogPosts();
  return setInterval(processBlogPosts, 10000);
};




