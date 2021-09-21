import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import { register } from '../stores/action';

const roles = ['buyers', 'sellers'];

export default function Register() {
  const formRegister = useRef(null);
  const [picturePath, setPicturePath] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isRegister, isLogin, user_role } = useSelector(
    ({ isRegister, isLogin, user_role }) => {
      return { isRegister, isLogin, user_role };
    }
  );

  useEffect(() => {
    if (isRegister && location.pathname === '/register') {
      history.push('/login');
    } else if (isRegister && location.pathname === '/seller/register') {
      history.push('/seller/login');
    }
  }, [history, isRegister, location.pathname]);

  useEffect(() => {
    if (isLogin && user_role === 'buyer') {
      history.push('/');
    } else if (isLogin && user_role === 'seller') {
      history.push('/seller');
    }
  }, [isLogin, history, user_role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister.current);

    console.log(formData.get('picture'), `INI PICTURE`);

    if (location.pathname === '/register') {
      dispatch(register(formData, roles[0]));
    } else {
      dispatch(register(formData, roles[1]));
    }
  };

  const getPicturePath = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e[0]);

    reader.onloadend = () => {
      setPicturePath(reader.result);
    };
  };

  return (
    <section className="flex w-full h-full my-10 justify-center">
      <div className="bg-white rounded-xl py-5 text-center">
        <div className="flex justify-center">
          <img
            className="w-1/3"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <h1 className="text-4xl mb-12 font-medium">Register</h1>
        <form
          className="flex flex-col text-md mx-12 gap-5 my-5 items-center"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          ref={formRegister}
        >
          <Input
            type="text"
            color="green"
            size="lg"
            outline={true}
            placeholder="First Name"
            id="firstName"
            name="firstName"
          />
          <Input
            type="text"
            color="green"
            size="lg"
            outline={true}
            placeholder="Last Name"
            id="lastName"
            name="lastName"
          />
          <Input
            type="text"
            color="green"
            size="lg"
            outline={true}
            placeholder="Email"
            id="email"
            name="email"
          />
          <Input
            type="text"
            color="green"
            size="lg"
            outline={true}
            placeholder="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
          />
          <Input
            type="password"
            color="green"
            size="lg"
            outline={true}
            placeholder="Password"
            id="password"
            name="password"
          />

          <div className="flex items-center w-full justify-evenly">
            <label className="flex flex-col items-center px-4 py-6 bg-green-100 text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-green-800">
              <svg
                className="w-8 h-8"
                fill="green"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 font-black text-lg leading-normal uppercase mb-2">
                Select a file
              </span>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(e) => getPicturePath(e.target.files)}
                className="hidden"
              />
            </label>
            {picturePath ? (
              <label className="flex flex-col items-center">
                <img
                  className="rounded-lg"
                  width="125"
                  length="125"
                  src={picturePath}
                />
              </label>
            ) : null}
          </div>

          <Button
            type="submit"
            color="green"
            buttonType="filled"
            size="lg"
            block={false}
            iconOnly={false}
            ripple="light"
          >
            Register
          </Button>
        </form>
      </div>
    </section>
  );
}
