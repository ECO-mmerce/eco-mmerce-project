import React from 'react';

export default function AddNewProduct() {
  return (
    <section className="flex justify-center my-10">
      <div className="w-1/2 bg-white rounded-xl py-10 text-center flex-col items-center">
        <div className="flex justify-center">
          <img
            className="w-1/6"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <h1 className="text-4xl font-medium ">Add new product</h1>
        <div className="flex p-5 items-center justify-center">
          <form className="flex flex-col text-2xl my-5">
            <div className="flex flex-col items-start mb-5">
              <label>Name</label>
              <input
                className="w-full px-2 py-1 rounded bg-gray-200"
                type="text"
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <label>Price</label>
              <input
                className="px-2 py-1 rounded w-full bg-gray-200"
                type="number"
                placeholder="Price"
              />
            </div>
            <div className="flex gap-5 w-full">
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                placeholder="Stock"
              />
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                placeholder="Weight"
              />
            </div>
            <div className="flex flex-col items-start my-5">
              <label> Description</label>
              <textarea
                className="bg-gray-200 rounded-lg w-full"
                rows="5"
              ></textarea>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col items-start mb-5">
                <label>Image</label>
                <input
                  className="px-2 py-1 rounded bg-gray-200 w-full"
                  type="file"
                  placeholder="Picture"
                />
              </div>
              <div className="flex flex-col items-start mb-5">
                <label>Ingredients Image</label>
                <input
                  className="px-2 py-1 rounded bg-gray-200 w-full"
                  type="file"
                  placeholder="Picture"
                />
              </div>
            </div>
            <button className="bg-green-400 text-white font-bold p-2 rounded-lg">
              add new product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
