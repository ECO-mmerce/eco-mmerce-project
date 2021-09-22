import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../stores/action';
import Moment from 'moment';

export default function History() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  const getDate = (date) => {
    Moment.locale('id');
    return Moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-green-200 bg-green-100 text-left text-xs font-semibold text-green-600 uppercase tracking-wider">
                    Products
                  </th>
                  <th class="px-5 py-3 border-b-2 border-green-200 bg-green-100 text-left text-xs font-semibold text-green-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th class="px-5 py-3 border-b-2 border-green-200 bg-green-100 text-left text-xs font-semibold text-green-600 uppercase tracking-wider">
                    Checkout Date
                  </th>
                  <th class="px-5 py-3 border-b-2 border-green-200 bg-green-100 text-left text-xs font-semibold text-green-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((el) => {
                  return (
                    <tr>
                      <td class="px-5 py-5 border-b border-green-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-10 h-10">
                            <img
                              class="w-full h-full rounded-full"
                              src={el.Product.picture}
                              alt="picture"
                            />
                          </div>
                          <div class="ml-3">
                            <p class="text-green-900 whitespace-no-wrap">
                              {el.Product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-green-200 bg-white text-sm">
                        <p class="text-green-900 whitespace-no-wrap">
                          {el.Product.Category.name}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-green-200 bg-white text-sm">
                        <p class="text-green-900 whitespace-no-wrap">
                          {getDate(el.createdAt)}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-green-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Paid</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
