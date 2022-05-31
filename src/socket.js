import io from 'socket.io-client';
import { taskActions } from './redux/task/taskSlice.js';

const SERVER_URL = 'http://localhost:4000';

export default (store) => {
  const socket = io(SERVER_URL, { autoConnect: false });

  socket.on('connect', () => {
    console.log(7777, 'connect - socket.connected', socket.connected);
  });

  // socket.on('connect_error', (err) => {
  //   console.log(8888, 'connect_error = err', { err: err.message });
  //   console.log(8888, 'connect_error = socket.connected', socket.connected);
  // });

  socket.onAny((event, ...args) => {
    console.log('onAny', { event, args });
  });

  socket.on('update-task', (data) => {
    store.dispatch(taskActions.updateTask(data));
  });

  const connectSocket = (user) => {
    socket.auth = { userId: user.userId, token: user.token };
    socket.connect();
    console.log(1111, 'connectSocket');
  };

  const disconnectSocket = () => {
    if (socket && socket.connected) {
      socket.disconnect();
      console.log(2222, 'disconnectSocket');
    }
  };

  const isSocketConnected = () => socket && socket.connected;

  return { socket, isSocketConnected, connectSocket, disconnectSocket };
};
