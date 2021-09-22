import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchChatList, setChatWith } from '../stores/action';
import SocketContext from '../config/socket';
import Image from '@material-tailwind/react/Image';
import Button from '@material-tailwind/react/Button';

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

  const goToChatRoom = (buyerId, buyerName, buyerPicture) => () => {
    dispatch(
      setChatWith({ id: buyerId, name: buyerName, picture: buyerPicture })
    ); // dapet dari hasil getAll chat
    socket.emit('joinRoom', {
      sellerId: user_id,
      buyerId: buyerId,
    });
    history.push('/chat');
  };

  console.log(chatList);

  return (
    <>
      {chatList.map((chatItem, i) => {
        const buyerName = `${chatItem.User.firstName} ${chatItem.User.lastName}`;
        return (
          <Button
            color="green"
            buttonType="filled"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={goToChatRoom(
              chatItem.BuyerId,
              buyerName,
              chatItem.User.picture
            )}
            key={'chatitem-' + i}
          >
            <div className="w-full">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="w-10 ">
                    <Image
                      src={chatItem.User.picture}
                      className="mr-2"
                      rounded
                    />
                  </div>
                  <div className="flex text-center ml-3 mt-3">
                    <h1 style={{ fontSize: 12 }}>{buyerName}</h1>
                  </div>
                </div>
              </div>
            </div>
          </Button>
        );
      })}
    </>
  );
}
