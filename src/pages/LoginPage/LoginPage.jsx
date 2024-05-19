import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import loginLogo from '../../assets/login-logo.svg';
import { loginAction } from '../../services/LoginService';
import schema from './Validations';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        email,
        password,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      setMessage(error.details[0].message);
      console.log('Email and password are required');
      return;
    }

    setMessage('');
    setIsLoading(true);

    loginAction(value)
      .then((response) => {
        const token = response.data.token;
        if (token) {
          sessionStorage.setItem('token', token);
          window.dispatchEvent(new Event('storage'));
          navigate('/', { replace: true });
        } else {
          setMessage('An error ocurred');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img className="mb-6 w-40 sm:w-52" src={loginLogo} alt="Login Logo" />
      <h1 className="text-2xl font-bold mb-4 text-center text-vaki-primary">Login</h1>
      <div className="mt-4 text-center w-8/12 sm:w-80">
        <form onSubmit={onLogin}>
          <div className="flex flex-col gap-8 justify-center mb-8">
            <input
              aria-label="Email"
              className="w-full border border-vaki-black rounded p-1"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              aria-label="Password"
              className="w-full border border-vaki-black rounded p-1"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="mt-4 w-full"
            disabled={isLoading}
            type="submit"
            text="Login"
            size="md"
          />
        </form>
        <Button
          disabled={isLoading}
          className="mt-4 w-full"
          type="button"
          text="Register"
          action={() => navigate('/create-account')}
          size="md"
        />
        {message && <p className="text-vaki-red mt-6">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
