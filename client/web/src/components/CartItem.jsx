import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeQty, deleteCart } from '../stores/action';
import { addCart } from '../stores/action';

import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from '@material-tailwind/react/Button';

export default function CartItem({ data }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const getPriceForQty = (price, qty) => {
    let result = price * qty;

    return `IDR ${result.toLocaleString()}, 00`;
  };

  const deleteHandler = (id) => {
    setModal(false);
    dispatch(deleteCart(id));
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    setModal(false);
  };

  return (
    <div className="my-3 flex justify-between items-center text-xl">
      <div className="flex items-center">
        <img className="h-20" src={data.Product.picture} alt="Item Image" />
        <tdata>{data.Product.name}</tdata>
      </div>
      <tdata>Rp {data.Product.price.toLocaleString()}, 00</tdata>
      <tdata>
        <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              onClick={() => dispatch(removeQty(data.Product.id))}
              className=" bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l"
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              disabled={true}
              type="number"
              className="text-center w-full bg-gray-100 text-md md:text-basecursor-default flex items-center text-green-600  outline-none"
              name="custom-input-number"
              value={data.Product.qty}
            />
            <button
              onClick={() => dispatch(addCart(data.Product.id))}
              className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </tdata>
      <tdata>{getPriceForQty(data.Product.price, data.Product.qty)}</tdata>
      <Button color="red" onClick={(e) => setModal(true)} ripple="light">
        Delete
      </Button>

      <Modal size="sm" active={modal} toggler={(e) => cancelBtn(e)}>
        <ModalHeader toggler={(e) => cancelBtn(e)}>Delete Product</ModalHeader>
        <ModalBody>
          <p className="text-base leading-relaxed text-gray-600 font-normal">
            Are you sure ? This action cannot be undone !
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="button"
            onClick={(e) => cancelBtn(e)}
            ripple="dark"
          >
            Cancel
          </Button>

          <Button
            color="green"
            onClick={(e) => deleteHandler(data.Product.id)}
            ripple="light"
          >
            Proceed
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
