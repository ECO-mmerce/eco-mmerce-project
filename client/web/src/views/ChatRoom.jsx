import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatBox from '../components/Chatbox';
import { addMessage, fetchMessages } from '../stores/action';
import SocketContext from '../config/socket';
import Image from '@material-tailwind/react/Image';

export default function ChatRoom() {
  const {
    user_id,
    user_firstName,
    user_lastName,
    user_role,
    user_picture,
    messages,
    chatWithId,
    chatWithName,
    chatWithPicture,
  } = useSelector(
    ({
      user_id,
      user_firstName,
      user_lastName,
      user_role,
      user_picture,
      messages,
      chatWithId,
      chatWithName,
      chatWithPicture,
    }) => {
      return {
        user_id,
        user_firstName,
        user_lastName,
        user_role,
        user_picture,
        messages,
        chatWithId,
        chatWithName,
        chatWithPicture,
      };
    }
  );

  const [chat, setChat] = useState('');

  const messageEndRef = useRef(null);
  const socket = React.useContext(SocketContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSocketMessage = (message) => {
    dispatch(addMessage(message));
  };

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    // messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Fetch message history
    dispatch(fetchMessages());

    // listen to socket server
    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, []);

  useEffect(() => {
    if (!chatWithId || !chatWithName) {
      history.push('/');
    }
  }, [chatWithId, chatWithName, history]);

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('chat', {
      message: {
        BuyerId: user_role === 'buyer' ? user_id : chatWithId,
        SellerId: user_role === 'buyer' ? chatWithId : user_id,
        message: chat,
        fullName: user_firstName + ' ' + user_lastName,
      },
    });
    setChat('');
  };

  return (
    <div className="h-screen w-screen px-10 pt-10 pb-32 flex justify-center">
      <div className=" w-1/2 h-full flex flex-col items-start bg-gray-300 rounded-3xl border-8 border-gray-300">
        <div className="w-24 grid grid-cols-2">
          <Image src={chatWithPicture} className="mr-2" rounded />
          <div className="flex">
            <h1 className="text-lg ml-4 font-bold">{chatWithName}</h1>
          </div>
        </div>
        <div className="h-full w-full bg-white mb-3 overflow-y-scroll">
          <ChatBox
            messages={messages}
            user_firstName={user_firstName}
            user_lastName={user_lastName}
            user_picture={user_picture}
            chatWithPicture={chatWithPicture}
          />
          <div ref={messageEndRef} />
        </div>

        <div
          class="w-full mx-auto rounded-xl bg-gray-100 shadow-lg p-10 text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl"
          x-data="app()"
          x-init="generatePassword()"
        >
          <div class="relative mt-1">
            <form onSubmit={(e) => handleSend(e)}>
              <input
                type="text"
                id="password"
                value={chat}
                class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Enter Your Chat"
                onChange={(e) => setChat(e.target.value)}
              />
              <button
                type="submit"
                class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-90deg-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* <form
          onSubmit={(e) => handleSend(e)}
          className="w-full text-2xl bg-green-100 rounded-b-2xl"
        >
          <input
            className="w-11/12 rounded-bl-2xl py-5 px-5"
            type="text"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button type="submit" className="w-1/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-90deg-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
              />
            </svg>
          </button>
        </form> */}
      </div>
    </div>
  );
}
