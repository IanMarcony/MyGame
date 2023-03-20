import { io } from 'socket.io-client';

const URL = 'http://154.53.35.101:3333';

const socket = io(URL);

export default socket;
