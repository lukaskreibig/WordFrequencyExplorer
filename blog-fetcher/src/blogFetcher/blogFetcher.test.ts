import axios from 'axios';
import { fetchBlogPosts } from './blogFetcher';

// Mocking modules
jest.mock('axios');
jest.mock('../redisClient/redisClient');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('blogFetcher', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch blog posts successfully', async () => {
    const mockData = [{ content: { rendered: 'example content' } }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchBlogPosts();

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toBeCalledWith('https://www.thekey.academy/wp-json/wp/v2/posts');
  });

  it('should handle errors when fetching blog posts', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedAxios.get.mockRejectedValue(new Error('Network error'));
  
    const result = await fetchBlogPosts();
  
    expect(result).toEqual([]);
    expect(consoleErrorSpy).toBeCalledWith(new Error('Network error'));
    consoleErrorSpy.mockRestore();
  });

});