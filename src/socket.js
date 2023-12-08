import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? 'https://draw-io-server.onrender.com/' : "http://localhost:5001";
// same origin version
export const socket = io(URL);
// cross origin version
// const socket = io("https://server-domain.com/admin");