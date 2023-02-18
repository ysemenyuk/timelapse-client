import io from 'socket.io-client';
import { cameraActions } from './redux/camera/cameraSlice.js';
import { fileActions } from './redux/file/fileSlice.js';
import { taskActions } from './redux/task/taskSlice.js';
import { HOST } from './utils/constants';

export default (store) => {
  const socket = io(HOST, { autoConnect: false });

  const connectSocket = (user) => {
    socket.auth = { userId: user.userId, token: user.token };
    socket.connect();
    console.log('connectSocket');
  };

  const disconnectSocket = () => {
    if (socket && socket.connected) {
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

  // socket.onAny((event, ...args) => {
  //   console.log('socket.onAny onAny', { event, args });
  // });

  socket.on('update-task', (data) => {
    console.log('socket.on update-task data -', data);

    const { cameraId, taskId } = data;
    const allTasks = store.getState().task.tasks;

    if (allTasks[cameraId]) {
      const task = allTasks[cameraId].find((item) => item._id === taskId);
      if (task) {
        store.dispatch(taskActions.fetchOne({ cameraId, taskId }));
      } else {
        store.dispatch(taskActions.fetchAll({ cameraId }));
      }
    }
  });

  socket.on('create-file', (data) => {
    console.log('socket.on create-file data -', data);

    const { cameraId, file } = data;
    store.dispatch(cameraActions.fetchOne(cameraId));
    store.dispatch(fileActions.addFile(file));
  });

  const isSocketConnected = () => socket && socket.connected;

  return { socket, isSocketConnected, connectSocket, disconnectSocket };
};
