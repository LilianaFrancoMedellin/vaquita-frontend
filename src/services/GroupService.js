import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/groups`;

const getAll = () => {
  return axios.get(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

const getById = (id) => {
  return axios.get(`${BASE_URL}/${id}`, {
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

const edit = (body) => {
  return axios.put(`${BASE_URL}/${body.id}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export { getAll, getById, create, edit };
