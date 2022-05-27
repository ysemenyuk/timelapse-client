import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000';

export default (store) => {
  const socket = io(SERVER_URL, { autoConnect: false });

  socket.onAny((event, ...args) => {
    console.log(99999999, { event, args });
  });

  socket.on('connect_error', (err) => {
    console.log(88888, { err: err.message });
    console.log(88888, 'socket.connected', socket.connected);
  });

  socket.on('connect', () => {
    console.log(77777, 'connect');
    console.log(88888, 'socket.connected', socket.connected);
  });

  // socket.emit('connect');

  const connectSocket = (user) => {
    socket.auth = { userId: user.userId, token: user.token };
    socket.connect();
    console.log(77777777, 'connectSocket');
  };

  const disconnectSocket = () => {
    if (socket && socket.connected) {
      socket.disconnect();
      console.log(77777777, 'disconnectSocket');
    }
  };

  const isSocketConnected = () => socket && socket.connected;

  return { socket, isSocketConnected, connectSocket, disconnectSocket };
};
