import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { googleLogin, login, setIsRegister } from '../stores/action';
import { GoogleLogin } from 'react-google-login';
import Input from '@material-tailwind/react/Input';
import Button from '@material-tailwind/react/Button';

const roles = ['buyers', 'sellers'];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogin, user_role } = useSelector(({ isLogin, user_role }) => {
    return { isLogin, user_role };
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsRegister(false));
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && user_role === 'buyer') {
      history.push('/');
    } else if (isLogin && user_role === 'seller') {
      history.push('/seller');
    }
  }, [isLogin, history, user_role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    if (location.pathname === '/login') {
      dispatch(login(payload, roles[0]));
    } else {
      dispatch(login(payload, roles[1]));
    }
  };

  const handleEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const responseGoogle = (response) => {
    console.log(response, `INI RESPONSE`);
    dispatch(googleLogin(response, 'buyer'));
  };

  const handlePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <section className="flex justify-center w-full h-full my-10">
      <div className="bg-white rounded-xl py-10">
        <div className="flex justify-center">
          <img
            className="w-1/3 mb-6"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <div className="text-center mb-4">
          <h1 className="text-4xl mb-4 font-medium">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex-col text-md gap-8">
          <div className="py-2 mx-12 pt-2 px-1 items-center">
            <Input
              type="text"
              color="green"
              size="lg"
              outline={true}
              placeholder="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="py-2 mx-12 pt-2 px-1 mb-4 items-center">
            <Input
              type="password"
              color="green"
              size="regular"
              outline={true}
              placeholder="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="mb-4">
            <center>
              <Button
                type="submit"
                color="green"
                buttonType="filled"
                size="lg"
                block={false}
                iconOnly={false}
                ripple="light"
              >
                Login
              </Button>
            </center>
          </div>
        </form>

        {location.pathname.includes('/seller') ? null : (
            <center>
              <GoogleLogin
                render={renderProps => (
                  <Button
                    onClick={renderProps.onClick}
                    color="green"
                    buttonType="filled"
                    size="lg"
                    block={false}
                    iconOnly={false}
                    ripple="light"
                  >
                    <div 
                    className="flex items-center gap-2"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>
                    <h1>
                      Login with Google
                    </h1>
                    </div>
                  </Button>
                )}
                clientId="164658214505-2t0d8gtpcjn6jl331mj2ccdi9lb9f4g1.apps.googleusercontent.com"
                isSignedIn={true}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                theme="dark"
              />
            </center>
        )}

        <div className="mt-8">
          <center>
            <h3>
              Not logged in ?{' '}
              <Link className="text-black underlined" to="/register">
                <b>click here</b>
              </Link>{' '}
              to register
            </h3>
          </center>
        </div>
      </div>
    </section>
  );
}
