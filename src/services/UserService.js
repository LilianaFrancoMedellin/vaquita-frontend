import axios from 'axios';

const create = (body) => {
  return axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { create };
