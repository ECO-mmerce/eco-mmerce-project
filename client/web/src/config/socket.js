import React from 'react';
import io from 'socket.io-client';
const SOCKET_URL = 'http://localhost:4000';

export const socket = io(SOCKET_URL);
const SocketContext = React.createContext(socket);
export default SocketContext;
