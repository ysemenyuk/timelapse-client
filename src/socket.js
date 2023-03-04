import io from 'socket.io-client';
// import { toast } from 'react-toastify';
// import { cameraActions } from './redux/camera/cameraSlice.js';
// import { fileActions } from './redux/file/fileSlice.js';
// import { taskActions } from './redux/task/taskSlice.js';
import { HOST } from './utils/constants';

export default () => {
  const socket = io(HOST, { autoConnect: false });

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
