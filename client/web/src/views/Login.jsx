import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginBuyer, setIsRegister } from '../stores/action';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogin } = useSelector(({ isLogin }) => {
    return { isLogin };
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setIsRegister(false));
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      history.push('/');
    }
  }, [isLogin, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    dispatch(loginBuyer(payload));
  };

  const handleEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <section className="flex justify-center my-10">
      <div className="w-1/4 bg-white rounded-xl py-10 text-center">
        <div className="flex justify-center">
          <img
            className="w-1/3"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <h1 className="text-4xl font-medium">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-2xl gap-5 my-5 items-center"
        >
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
          <button
            type="submit"
            className="bg-green-400 text-white font-bold p-2 w-32 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
