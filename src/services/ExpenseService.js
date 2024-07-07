import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/expenses`;

const getAllByGroup = (groupId) => {
  return axios.get(`${BASE_URL}/${groupId}`, {
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
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export { create, getAllByGroup };
