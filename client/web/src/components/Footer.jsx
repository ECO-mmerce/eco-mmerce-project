import React from 'react';

export default function Footer() {
  return (
    <div className=" flex-grow w-screen px-6">
      <div className="mt-16 border-t-4 border-gray-300 flex flex-col items-center">
        <div className="sm:w-2/3  text-center py-6">
          <p className="text-sm text-green-700 font-bold mb-2">
            © 2021 by Eco Hippies
          </p>
        </div>
      </div>
    </div>
  );
}
