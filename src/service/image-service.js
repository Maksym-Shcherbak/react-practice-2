import axios from 'axios';

const API_KEY = 'eEmeRWHVDmPPjrVmFz078EeAVv3lQFLiteu4T63Lm5MSHh5Dy7nJkLMN';
axios.defaults.baseURL = 'https://api.pexels.com/v1';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const response = await axios.get(`/search?query=${query}&page=${page}`);
  return response;
};
