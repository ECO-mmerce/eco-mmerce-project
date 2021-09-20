import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { addProduct } from '../stores/action';
import { useDispatch } from 'react-redux';

export default function AddNewProduct() {
  const formAddProduct = useRef(null);
  const dispatch = useDispatch();

  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [picture, setPicture] = useState('');
  const [ingridient, setIngridient] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formAddProduct.current);
    const formData = new FormData(formAddProduct.current);

    dispatch(addProduct(formData));

    // console.log(formAddProduct.current);
    // console.log(
    //   name,
    //   price,
    //   description,
    //   brand,
    //   picture,
    //   ingridient,
    //   stock,
    //   weight
    // );
  };

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
          <form
            ref={formAddProduct}
            encType="multipart/form-data"
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col text-2xl my-5"
          >
            <div className="flex flex-col items-start mb-5">
              <label>Name</label>
              <input
                className="w-full px-2 py-1 rounded bg-gray-200"
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <label>Price</label>
              <input
                className="px-2 py-1 rounded w-full bg-gray-200"
                type="number"
                placeholder="Price"
                id="price"
                name="price"
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <label>Brand</label>
              <input
                className="px-2 py-1 rounded w-full bg-gray-200"
                type="text"
                placeholder="Brand"
                id="brand"
                name="brand"
              />
            </div>
            <div className="flex gap-5 w-full">
              <label>Stock</label>
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                placeholder="Stock"
                id="stock"
                name="stock"
              />
              <label>Weight</label>
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                id="weight"
                name="weight"
                placeholder="Weight"
              />
              <label>Category</label>
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                id="category"
                name="category"
                placeholder="Category ID"
              />
            </div>
            <div className="flex flex-col items-start my-5">
              <label> Description</label>
              <textarea
                className="bg-gray-200 rounded-lg w-full"
                rows="5"
                id="description"
                name="description"
              ></textarea>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col items-start mb-5">
                <label>Image</label>
                <input
                  className="px-2 py-1 rounded bg-gray-200 w-full"
                  type="file"
                  placeholder="Picture"
                  id="image"
                  name="image"
                />
              </div>
              <div className="flex flex-col items-start mb-5">
                <label>Ingredients Image</label>
                <input
                  className="px-2 py-1 rounded bg-gray-200 w-full"
                  type="file"
                  placeholder="Picture"
                  id="ingredients"
                  name="ingredients"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-400 text-white font-bold p-2 rounded-lg"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
