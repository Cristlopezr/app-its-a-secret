import { io } from 'socket.io-client';

//Production
export const socket = io(process.env.NEXT_PUBLIC_WSS_URL, { transports: ['websocket'] });
