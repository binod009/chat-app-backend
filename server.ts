import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import SocketService from "./services/socket";

const PORT = process.env.PORT ? process.env.PORT : 8000;

async function init() {
  
  const HttpServer = http.createServer();

  // initialized socketServer;
  const socket = SocketService.getSocketInstace();

  // initialized sockerServcer class
  const socketService = SocketService.getClassInstance();
  

  socket.attach(HttpServer);
  HttpServer.listen(PORT, () => {
    console.log(`http server started at port:${PORT}`);
  });

  socketService.initListener();
}

// server initialized
init();
