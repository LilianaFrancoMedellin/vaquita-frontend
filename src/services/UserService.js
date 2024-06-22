import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/users`;

const getAll = () => {
  return axios.get(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

const create = (body) => {
  return axios.post(BASE_URL, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { create, getAll };
