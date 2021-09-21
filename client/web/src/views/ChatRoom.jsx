import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatBox from '../components/chatbox';
import { addMessage, fetchMessages } from '../stores/action';

export default function ChatRoom({ socket }) {
  const {
    user_id,
    user_firstName,
    user_lastName,
    user_role,
    messages,
    chatWithId,
    chatWithName,
  } = useSelector(
    ({
      user_id,
      user_firstName,
      user_lastName,
      user_role,
      messages,
      chatWithId,
      chatWithName,
    }) => {
      return {
        user_id,
        user_firstName,
        user_lastName,
        user_role,
        messages,
        chatWithId,
        chatWithName,
      };
    }
  );
  const [chat, setChat] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  useEffect(() => {
    if (!chatWithId || !chatWithName) {
      history.push('/');
    }
  }, [chatWithId, chatWithName, history]);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault()
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
        <h1 className="text-3xl font-bold px-10 py-5">
          {chatWithName}
        </h1>
        <div className="h-full w-full bg-white mb-3 overflow-y-scroll">
          <ChatBox messages={messages} user_firstName={user_firstName} user_lastName={user_lastName}/>
        </div>
        <form onSubmit={handleSend} className="w-full text-2xl bg-white rounded-b-2xl">
          <input
            className="w-11/12 rounded-bl-2xl py-5 px-5"
            type="text"
            value={chat}
            onChange={(e) => setChat(e.currentTarget.value)}
          />
          <button 
            type="submit"
            className="w-1/12"
          >Send</button>
        </form>
      </div>
    </div>
  );
}
