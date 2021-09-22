import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { setIsLogin, setUser } from '../stores/action';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGoogleLogout } from 'react-google-login';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import Image from '@material-tailwind/react/Image';

export default function Navbar() {
  const clientId =
    '164658214505-2t0d8gtpcjn6jl331mj2ccdi9lb9f4g1.apps.googleusercontent.com';
  const { user_firstName, user_lastName, user_picture, isLogin, user_role } =
    useSelector(
      ({ user_firstName, user_lastName, user_picture, isLogin, user_role }) => {
        return {
          user_firstName,
          user_lastName,
          user_picture,
          isLogin,
          user_role,
        };
      }
    );

  const logOut = () => {
    dispatch(
      setUser({
        id: 0,
        firstname: 'Guest',
        lastName: '',
        role: '',
        picture: '',
      })
    );
    dispatch(setIsLogin(false));
    localStorage.clear();

    toast.success('Logged out', toastOptions);
    history.push('/');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onFailure: logOut,
    onLogoutSuccess: logOut,
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const toastOptions = {
    position: 'bottom-right',
    theme: 'light',
  };

  const goToLoginPage = () => {
    history.push('/login');
  };

  const goToRegisterPage = () => {
    history.push('/register');
  };

  const goToSellerPage = () => {
    history.push('/seller');
  };

  const goToCart = () => {
    history.push('/cart');
  };

  const [dropdownActive, setDropdownActive] = useState(false);
  function handleDropdown(e) {
    setDropdownActive(!dropdownActive);
  }

  let dropdownOptions;

  if (!isLogin) {
    dropdownOptions = (
      <div className="flex flex-col gap-2">
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
      </div>
    );
  } else if (user_role === 'seller') {
    dropdownOptions = (
      <div className="flex flex-col gap-2">
        <Link to="/seller/orders">orders</Link>
        <Link to="/seller/addproduct">add products</Link>
        <button onClick={logOut}>logout</button>
      </div>
    );
  } else {
    dropdownOptions = (
      <div className="flex flex-col gap-2">
        <button onClick={logOut}>logout</button>
      </div>
    );
  }

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex p-5 flex-col md:flex-row items-center">
        <Link to="/" className="h-full">
          <img
            className="logo hover:grow"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Copy_of_eco-merce_7tPWcw1H_jL.png?updatedAt=1631835149434"
            alt="eco-mmerce-logo"
          />
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex grid grid-cols-4 gap-5 items-center text-base justify-center">
          <Link to="/products" className="hover:text-green-900 hover:grow">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                fill="currentColor"
                className="bi bi-bag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
              <div className="flex ml-2">
                <h2>Products</h2>
              </div>
            </div>
          </Link>

          {localStorage.access_token && user_role === 'buyer' ? (
            <Link to="/history" className="hover:text-green-900 hover:grow">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  fill="currentColor"
                  className="bi bi-clock-history"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                <div className="flex ml-2">
                  <h2>History</h2>
                </div>
              </div>
            </Link>
          ) : null}

          {location.pathname.includes('/seller') || user_role === 'seller' ? (
            <>
              <Link to="/seller" className="hover:grow hover:text-green-900">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    fill="currentColor"
                    className="bi bi-shop"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                  </svg>
                  <div className="flex ml-2">
                    <h2>My Products</h2>
                  </div>
                </div>
              </Link>
            </>
          ) : null}

          {localStorage.access_token && user_role !== 'seller' ? (
            <Link to="/cart" className="hover:text-green-900 hover:grow">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div className="flex ml-2">
                  <h2>My Cart</h2>
                </div>
              </div>
            </Link>
          ) : null}
        </nav>

        {localStorage.access_token ? (
          <div className="flex">
            <Link to="/scan">
              <div className="pt-3 pl-24 hover:grow hover:text-green-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  fill="currentColor"
                  class="bi bi-upc-scan"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                </svg>
              </div>
            </Link>
            <div className="pl-4">
              <Dropdown
                color="transparent"
                buttonText={
                  <div className="w-24 grid grid-cols-2">
                    <Image src={user_picture} className="mr-2" rounded />
                    <h1 className="text-black mt-2 ml-2 text-lg">
                      {user_firstName}
                    </h1>
                  </div>
                }
                rounded
                style={{
                  padding: 0,
                  color: 'transparent',
                }}
              >
                {user_role === 'seller' ? (
                  <>
                    <DropdownItem
                      color="green"
                      onClick={() => goToSellerPage()}
                    >
                      My Products
                    </DropdownItem>
                    <DropdownItem color="green" onClick={() => signOut()}>
                      Logout
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem color="green" onClick={() => goToCart()}>
                      My Cart
                    </DropdownItem>
                    <DropdownItem color="green" onClick={() => signOut()}>
                      Logout
                    </DropdownItem>
                  </>
                )}
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="flex">
            <Dropdown
              color="transparent"
              buttonText={
                <div className="w-24 grid grid-cols-2">
                  <Image
                    src={`https://avatars.dicebear.com/api/personas/${Math.round(
                      Math.random() * 5
                    )}.svg`}
                    className="mr-2"
                    rounded
                  />
                  <h1 className="text-black mt-2 ml-2 text-lg">
                    {user_firstName || 'Guest'}
                  </h1>
                </div>
              }
              rounded
              style={{
                padding: 0,
                color: 'transparent',
              }}
            >
              <>
                <DropdownItem color="green" onClick={() => goToLoginPage()}>
                  Login
                </DropdownItem>
                <DropdownItem color="green" onClick={() => goToRegisterPage()}>
                  Register
                </DropdownItem>
              </>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  );
}
