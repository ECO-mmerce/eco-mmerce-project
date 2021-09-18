import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addMessage } from '../stores/action';

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
    if (!chatWithId || !chatWithName) {
      history.push('/');
    }
  }, [chatWithId, chatWithName, history]);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
  }, [socket]);

  const handleSend = () => {
    socket.emit('chat', {
      message: {
        buyerId: user_role === 'buyer' ? user_id : chatWithId,
        sellerId: user_role === 'buyer' ? chatWithId : user_id,
        message: chat,
        fullName: user_firstName + ' ' + user_lastName,
      },
    });
    setChat('');
  };

  return (
    <div>
      {chatWithName}
      <ul>
        {messages.map((message, i) => {
          return (
            <li key={'chatmessage-' + i}>
              {message.fullName}|{message.message}
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        value={chat}
        onChange={(e) => setChat(e.currentTarget.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
