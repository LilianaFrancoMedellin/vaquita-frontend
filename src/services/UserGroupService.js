import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/user-group`;

const create = (body) => {
  return axios.post(BASE_URL, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

const getAllByGroupId = (groupId) => {
  return axios.get(`${BASE_URL}/${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

const getAvailableUsersByGroupId = (groupId) => {
  return axios.get(`${BASE_URL}/users/${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

const leaveGroup = (id) => {
  return axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export { create, getAllByGroupId, getAvailableUsersByGroupId, leaveGroup };
