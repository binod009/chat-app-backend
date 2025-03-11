import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "localhost",
  port: 6379,
  username: "default",
  password: "binbin",
});
const sub = new Redis({
  host: "localhost",
  port: 6379,
  username: "default",
  password: "binbin",
});

class SocketService {
  private static instance: Server;
  private static socketServiceInstace: SocketService;
  private constructor() {}

  public static getSocketInstace() {
    if (!this.instance) {
      console.log("socket initialized");
      return (this.instance = new Server({
        cors: {
          origin: "*",
        },
      }));
    }
    return this.instance;
  }

  public static getClassInstance() {
    if (!this.socketServiceInstace) {
      return (this.socketServiceInstace = new SocketService());
    }
    return this.socketServiceInstace;
  }

  initListener() {
    const io = SocketService.instance;
    console.log("initialize socket listeners...");
    io.on("connect", (socket) => {
        console.log("new socket connected", socket.id);
        socket.on('message', async ({ message }: { message: string }) => {
            console.log("New Message", message);  
            //This will publish message to redis
            await pub.publish("MESSAGES", JSON.stringify({message}));
        })
    });
  }
}

export default SocketService;
