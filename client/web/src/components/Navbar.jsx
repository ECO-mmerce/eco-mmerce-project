import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
export default function Navbar() {
  const { user_firstName, user_lastName, user_picture, user_role, isLogin } = useSelector(
    ({ user_firstName, user_lastName, user_picture, user_role, isLogin }) => {
      return {
        user_firstName,
        user_lastName,
        user_picture,
        user_role, 
        isLogin
      };
    }
  );
  const [isActive, setIsActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  function handleDropdown(e) {
    setIsActive(!isActive)
  }

  let dropdownOptions

  if(!isLogin){
    dropdownOptions = (
      <div className="flex flex-col gap-2">
        <Link to="/login" >login</Link>
        <Link to="/register" >register</Link>
      </div>
    )
  }else if(user_role === 'seller'){
    dropdownOptions = (
      <div className="flex flex-col gap-2">
        <Link to="/seller/orders" >orders</Link>
        <Link to="sellers/addProduct" >add products</Link>
        <button>logout</button>
      </div>
    )
  }else {
    dropdownOptions = (
      <div className="flex flex-col gap-2">
        <button >logout</button>
      </div>
    )
  }
  function hanldeOnChangeSearch(e) {
    setSearchQuery(e.target.value)
  }
  function handleSearch(e) {
    e.preventDefault()
    console.log(searchQuery);
  }

  return (
    <div className="h-20 w-screen px-7 mx-2 flex items-center justify-between text-gray-800">
      <div className="h-full flex items-center">
        <Link to='/' className="h-full">
          <img
            className="h-full"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Copy_of_eco-merce_7tPWcw1H_jL.png?updatedAt=1631835149434"
            alt=""
          />
        </Link>
        <form onSubmit={handleSearch} className="bg-white shadow-inner py-2 px-3 text-xl rounded-lg mx-4 flex items-center">
          <input
            onChange={hanldeOnChangeSearch}
            value={searchQuery}
            className="bg-white"
            type="text"
            name="search"
            id=""
            placeholder="Search.."
          />
          <button type="submit" className="h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
        <button className="flex items-center mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="currentColor"
            className="bi bi-grid-3x3-gap-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
          </svg>
          <h2 className="mx-1 text-xl">Categories</h2>
        </button>
      </div>
      <div className="flex">
        {/* DROPDOWN MENU */}
        <div className="relative w-40">
          <button onClick={handleDropdown} className="flex text-xl items-center mx-4">
            <span className="mr-3">{`${user_firstName} ${user_lastName}`}</span>
            {user_picture ? (
              <img src={user_picture} width="26" alt="user_picture" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                fill="currentColor"
                className="bi bi-person-square"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
              </svg>
            )}

          </button>
          {isActive ? (
            <div className="w-full absolute text-xl mt-3 py-2 px-3 flex flex-col gap-2 bg-gray-100 rounded-b-lg">
              {dropdownOptions}
            </div>
          ) : (null)}
        </div>
        <Link to="/cart" className="flex text-xl items-center mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
