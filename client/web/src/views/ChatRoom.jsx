import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addMessage, fetchMessages } from '../stores/action';
import SocketContext from '../config/socket';

export default function ChatRoom() {
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

  const socket = React.useContext(SocketContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSocketMessage = (message) => {
    dispatch(addMessage(message));
  };

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

  const handleSend = () => {
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
