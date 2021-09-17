import React from 'react';

export default function Login() {
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
        <form className="flex flex-col text-2xl gap-5 my-5 items-center">
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="text"
            placeholder="email"
          />
          <input
            className="px-2 py-1 rounded bg-gray-200"
            type="password"
            placeholder="password"
          />
          <button className="bg-green-400 text-white font-bold p-2 w-32 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
