import io from 'socket.io-client';
import { fileManagerActions } from './redux/fileManager/fileManagerSlice.js';
import { taskActions } from './redux/task/taskSlice.js';

const SERVER_URL = 'http://localhost:4000';

export default (store) => {
  const socket = io(SERVER_URL, { autoConnect: false });

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
    console.log('connect - socket.connected', socket.connected);
  });

  socket.on('connect_error', (err) => {
    console.log('connect_error', { err: err.message });
  });

  socket.onAny((event, ...args) => {
    console.log('onAny', { event, args });
  });

  socket.on('update-task', (data) => {
    console.log('update-task data -', data);

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

  socket.on('add-file', (data) => {
    console.log('update-task data -', data);

    const { cameraId, fileId, parentId } = data;
    const filesByParent = store.getState().fileManager.files;

    if (filesByParent[parentId]) {
      store.dispatch(fileManagerActions.fetchOne({ cameraId, parentId, fileId }));
    }
  });

  const isSocketConnected = () => socket && socket.connected;

  return { socket, isSocketConnected, connectSocket, disconnectSocket };
};
