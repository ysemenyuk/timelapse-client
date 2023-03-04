import io from 'socket.io-client';
import { WS_HOST } from './utils/constants';

export default () => {
  const socket = io(WS_HOST, { autoConnect: false });

  const connectSocket = (user) => {
    socket.auth = { userId: user.userId, token: user.token };
    socket.connect();
    console.log('connectSocket');
  };

  const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect();
      console.log('disconnectSocket');
    }
  };

  socket.on('connect', () => {
    console.log('socket.on connect', socket.connected);
  });

  socket.on('connect_error', (err) => {
    console.log('socket.on connect_error', { err: err.message });
  });

  return { socket, connectSocket, disconnectSocket };
};
