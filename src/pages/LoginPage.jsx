import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import loginLogo from '../assets/login-logo.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 h-screen">
      <img className="mb-6 w-40 sm:w-52" src={loginLogo} alt="Login Logo" />
      <h1 className="text-2xl font-bold mb-4 text-center text-vaki-primary">Login in</h1>
      <div className="mt-4 text-center w-8/12 sm:w-80">
        <form>
          <div className="flex flex-col gap-8 justify-center mb-8">
            <input
              className="w-full border border-vaki-black rounded p-1"
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              className="w-full border border-vaki-black rounded p-1"
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <Button
              type="button"
              text="Login"
              action={() => console.log('click on login')}
              size="md"
            />
            <Button
              type="button"
              text="Register"
              action={() => navigate('/create-account')}
              size="md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
