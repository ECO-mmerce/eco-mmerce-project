import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { registerBuyer } from '../stores/action';

export default function Register() {
  const formRegister = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isRegister } = useSelector(({ isRegister }) => {
    return { isRegister };
  });

  useEffect(() => {
    if (isRegister) {
      history.push('/login');
    }
  }, [history, isRegister]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister.current);
    dispatch(registerBuyer(formData));
  };

  return (
    <section className="flex justify-center">
      <div className="w-1/4 bg-white rounded-xl py-10 text-center">
        <div className="flex justify-center">
          <img
            className="w-1/3"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <h1 className="text-4xl font-medium">Register</h1>
        <form
          className="flex flex-col text-2xl gap-5 my-5 items-center"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          ref={formRegister}
        >
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
          />
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
          />
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="text"
            placeholder="Email"
            id="email"
            name="email"
          />
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="number"
            placeholder="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
          />
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />

          <label htmlFor="picture">Profile Picture</label>
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="file"
            accept="image/*"
            placeholder="Password"
            id="picture"
            name="picture"
          />

          <button
            type="submit"
            className="bg-green-400 text-white font-bold p-2 w-32 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
