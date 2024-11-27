import { io } from 'socket.io-client';

//Development
//export const socket = io('http://localhost:3001');

//Production
export const socket = io(process.env.NEXT_PUBLIC_WSS_URL, { transports: ['websocket'] });
