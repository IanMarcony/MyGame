import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_API_URL || 'http://backend:333';

const socket = io(URL);

export default socket;
