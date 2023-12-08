import { io } from "socket.io-client";

// same origin version
export const socket = io("http://localhost:5001");
// cross origin version
// const socket = io("https://server-domain.com/admin");