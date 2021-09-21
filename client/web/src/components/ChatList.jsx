import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchChatList, setChatWith } from '../stores/action';
import SocketContext from '../config/socket';

export default function ChatList() {
  const { chatList, user_id } = useSelector(({ chatList, user_id }) => {
    return {
      chatList,
      user_id,
    };
  });

  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchChatList());
  }, [dispatch]);

  const goToChatRoom = (buyerId, buyerName) => () => {
    dispatch(setChatWith({ id: buyerId, name: buyerName })); // dapet dari hasil getAll chat
    socket.emit('joinRoom', {
      sellerId: user_id,
      buyerId: buyerId,
    });
    history.push('/chat');
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-3">
        {chatList.map((chatItem, i) => {
          const buyerName = `${chatItem.User.firstName} ${chatItem.User.lastName}`;
          return (
            <button
              className="bg-green-500 px-4 py-1 text-white rounded hover:bg-green-600"
              onClick={goToChatRoom(chatItem.BuyerId, buyerName)}
              key={'chatitem-' + i}
            >
              {buyerName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
