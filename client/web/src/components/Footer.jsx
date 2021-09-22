import React from 'react';

export default function Footer() {
  return (
    <div class="container flex-grow mx-auto px-6">
      <div class="mt-16 border-t-4 border-gray-300 flex flex-col items-center">
        <div class="sm:w-2/3  text-center py-6">
          <p class="text-sm text-green-700 font-bold mb-2">
            © 2021 by Eco Hippies
          </p>
        </div>
      </div>
    </div>

    // Old Footer

    // <footer class="text-gray-600 w-full bg-gray-400 body-font">
    //   <div class="container px-5 pt-12 mx-auto flex sm:flex-row flex-col">
    //     <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    //       {/* <img
    //         width="200"
    //         height="100"
    //         src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Copy_of_eco-merce_7tPWcw1H_jL.png?updatedAt=1631835149434"
    //         alt=""
    //       /> */}
    //     </a>
    //     <p class="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 text-center sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
    //       © 2021 Eco Hippies
    //     </p>
    //   </div>
    // </footer>

    // <footer className="text-gray-600 body-font">
    //   <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    //     <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
    //       <a
    //         className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
    //         href="/"
    //       >
    //         <img
    //           src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Copy_of_eco-merce_7tPWcw1H_jL.png?updatedAt=1631835149434"
    //           alt=""
    //         />
    //       </a>
    //     </div>
    //     <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
    //       <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    //         <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
    //           CATEGORIES 1
    //         </h2>
    //         <nav className="list-none mb-10">
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               First Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Second Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Third Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Fourth Link
    //             </a>
    //           </li>
    //         </nav>
    //       </div>
    //       <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    //         <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
    //           CATEGORIES2
    //         </h2>
    //         <nav className="list-none mb-10">
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               First Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Second Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Third Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Fourth Link
    //             </a>
    //           </li>
    //         </nav>
    //       </div>
    //       <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    //         <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
    //           CATEGORIES3
    //         </h2>
    //         <nav className="list-none mb-10">
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               First Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Second Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Third Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Fourth Link
    //             </a>
    //           </li>
    //         </nav>
    //       </div>
    //       <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    //         <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
    //           CATEGORIES4
    //         </h2>
    //         <nav className="list-none mb-10">
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               First Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Second Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Third Link
    //             </a>
    //           </li>
    //           <li>
    //             <a className="text-gray-600 hover:text-gray-800" href="/">
    //               Fourth Link
    //             </a>
    //           </li>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="bg-gray-100">
    //     <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
    //       <p className="text-gray-500 text-sm text-center sm:text-left">
    //         © 2021 Eco Hippies
    //       </p>
    //       <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
    //         <a className="text-gray-500" href="/">
    //           <svg
    //             fill="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
    //           </svg>
    //         </a>
    //         <a className="ml-3 text-gray-500" href="/">
    //           <svg
    //             fill="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
    //           </svg>
    //         </a>
    //         <a className="ml-3 text-gray-500" href="/">
    //           <svg
    //             fill="none"
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    //             <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
    //           </svg>
    //         </a>
    //         <a className="ml-3 text-gray-500" href="/">
    //           <svg
    //             fill="currentColor"
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="0"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="none"
    //               d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
    //             ></path>
    //             <circle cx="4" cy="4" r="2" stroke="none"></circle>
    //           </svg>
    //         </a>
    //       </span>
    //     </div>
    //   </div>
    // </footer>
  );
}
