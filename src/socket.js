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
    console.log('update-task data -', data);

    const { cameraId, taskId } = data;
    const allTasks = store.getState().task.tasks;

    if (allTasks[cameraId]) {
      const task = allTasks[cameraId] && allTasks[cameraId].find((item) => item._id === taskId);
      if (task) {
        store.dispatch(taskActions.fetchOne({ cameraId, taskId }));
      } else {
        store.dispatch(taskActions.fetchAll({ cameraId }));
      }
    }
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
