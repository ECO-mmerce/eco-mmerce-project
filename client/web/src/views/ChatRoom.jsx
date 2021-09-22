import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatBox from '../components/Chatbox';
import { addMessage, fetchMessages } from '../stores/action';
import SocketContext from '../config/socket';
import Image from '@material-tailwind/react/Image';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';

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
    if (chat !== '') {
      socket.emit('chat', {
        message: {
          BuyerId: user_role === 'buyer' ? user_id : chatWithId,
          SellerId: user_role === 'buyer' ? chatWithId : user_id,
          message: chat,
          fullName: user_firstName + ' ' + user_lastName,
        },
      });
    }
    setChat('');
  };

  return (
    <div className="h-screen w-screen px-10 pt-10 pb-32 flex justify-center">
      <div className=" w-1/2 h-full flex flex-col items-start bg-gray-200 rounded-3xl border-8 border-gray-300">
        <div className="flex p-5 items-center">
          <Image src={chatWithPicture} className="m-2 w-1/12" rounded />
          <h1 className="text-lg font-bold w-10/12 text-left">
            {chatWithName}
          </h1>
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

        {/* <div
          class="w-full rounded-b-2xl bg-gray-200 px-10 pb-10 pt-2 text-gray-800 overflow-hidden"
          x-data="app()"
          x-init="generatePassword()"
        >
          <div class="mt-1 w-full">
            <form className="flex items-center" onSubmit={(e) => handleSend(e)}>
              <input
                type="text"
                id="password"
                value={chat}
                class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-green-500 text-2xl"
                placeholder="Enter Your Chat"
                onChange={(e) => setChat(e.target.value)}
              />
              <button
                type="submit"
                class="block w-7 h-7 text-center text-xl top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-arrow-90deg-right h-full ml-3 text-gray-800"
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
        </div> */}

        <div class="w-full mx-auto rounded-xl p-5 bg-gray-100 shadow-lg text-gray-800 overflow-hidden max-w-3xl">
          <div class="mt-1">
            <form onSubmit={(e) => handleSend(e)}>
              <div className="flex flex-col">
                <div className="flex pb-6">
                  <Input
                    type="text"
                    color="green"
                    size="regular"
                    outline={false}
                    placeholder="Input"
                    value={chat}
                    placeholder="Enter Your Message"
                    onChange={(e) => setChat(e.target.value)}
                  />

                  <Button
                    className="ml-2"
                    color="green"
                    buttonType="link"
                    size="regular"
                    rounded={true}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-90deg-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
