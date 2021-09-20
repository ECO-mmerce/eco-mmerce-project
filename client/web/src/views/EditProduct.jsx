import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { editSellerProduct, fetchSellerProduct } from '../stores/action';

export default function EditProduct() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sellerProduct = useSelector((state) => state.sellerProduct);
  const { id } = useParams();

  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchSellerProduct(id));
  }, []);

  useEffect(() => {
    setName(sellerProduct.name);
    setPrice(sellerProduct.price);
    setStock(sellerProduct.stock);
    setWeight(sellerProduct.weight);
    setDescription(sellerProduct.description);
  }, [sellerProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      price,
      stock,
      weight,
      description,
    };
    dispatch(editSellerProduct(id, payload));
    history.push('/seller');
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
        <h1 className="text-4xl font-medium ">Edit Your Product</h1>
        <div className="flex p-5 items-center justify-center">
          <form className="flex flex-col text-2xl my-5">
            <div className="flex flex-col items-start mb-5">
              <label>Name</label>
              <input
                className="w-full px-2 py-1 rounded bg-gray-200"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <label>Price</label>
              <input
                className="px-2 py-1 rounded w-full bg-gray-200"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex gap-5 w-full">
              <label>Stock</label>
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <label>Weight</label>
              <input
                className="w-1/2 px-2 py-1 rounded bg-gray-200"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start my-5">
              <label> Description</label>
              <textarea
                className="bg-gray-200 rounded-lg w-full"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="bg-green-400 text-white font-bold p-2 rounded-lg"
            >
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
