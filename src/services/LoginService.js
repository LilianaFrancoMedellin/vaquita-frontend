import axios from 'axios';

const loginAction = (body) => {
  return axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/login`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { loginAction };
