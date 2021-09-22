import React from 'react';

export default function ChatBox({
  messages,
  user_firstName,
  user_lastName,
  user_picture,
  chatWithPicture,
}) {
  console.log(
    messages,
    user_firstName,
    user_lastName,
    user_picture,
    chatWithPicture
  );

  const displayMessages = messages.map((message, i) => {
    return (
      <div
        key={'chatmessage-' + i}
        className={`p-2 flex flex-col w-full  ${
          message.fullName === user_firstName + ' ' + user_lastName
            ? `items-end`
            : `items-start`
        }`}
      >
        <p className="text-lg m-1 w-max-1/2">{message.fullName}</p>
        <p className="text-xl text-white bg-green-500 px-5 py-1 rounded-lg">
          {message.message}
        </p>
      </div>
    );
  });

  return (
    <div className="flex flex-col">
      {displayMessages}
      <div />
    </div>
  );
}
