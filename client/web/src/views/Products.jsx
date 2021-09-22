import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../stores/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="text-gray-600 py-24 px-5 body-font flex">
      <div className="container px-5 mx-24">
        <div className="flex sm:gap-5 lg:px-14 sm:py-18 md:px-48 sm:px-22 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {products.map((el) => {
            return <ProductCard key={el.id} products={el} />;
          })}
        </div>
      </div>
    </section>
  );
}
