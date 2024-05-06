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

  const onLogin = () => {
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
        if (response.data.token) {
          sessionStorage.setItem('token', token);
          navigate('/');
        } else {
          setMessage('An error ocurred');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 h-screen">
      <img className="mb-6 w-40 sm:w-52" src={loginLogo} alt="Login Logo" />
      <h1 className="text-2xl font-bold mb-4 text-center text-vaki-primary">Login in</h1>
      <div className="mt-4 text-center w-8/12 sm:w-80">
        <form>
          <div className="flex flex-col gap-8 justify-center mb-8">
            <input
              className="w-full border border-vaki-black rounded p-1"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border border-vaki-black rounded p-1"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <Button disabled={isLoading} type="button" text="Login" action={onLogin} size="md" />
            <Button
              disabled={isLoading}
              type="button"
              text="Register"
              action={() => navigate('/create-account')}
              size="md"
            />
          </div>
        </form>
        {message && <p className="text-vaki-red mt-6">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
