
import {Server } from "socket.io";
import Redis from "ioredis";


const pub = new Redis({
    host: 'localhost',
    port: 6379,
    username:'default',
    password:'binbin'
});
const sub = new Redis(
    {
        host: 'localhost',
        port: 6379,
        username:'default',
        password:'binbin'
    }
);



class SocketService{
    private static instance: Server;
    private static socketServiceInstace: SocketService;
    private constructor() {   
}

 public static getSocketInstace() {
     if (!this.instance) {
         console.log("socket initialized");
         return this.instance = new Server({
             cors: {
                 origin:"*"
             }
         });
     }
     return this.instance;
    }

    public static getClassInstance() {
        if (!this.socketServiceInstace) {
            return this.socketServiceInstace = new SocketService();
        }
        return this.socketServiceInstace;
}


initListener() {
    const io = SocketService.instance;
    console.log("initialize socket listeners...")
    io.on('connect', socket => {
        console.log('New socket connected', socket.id);
        socket.on('event:message', async ({ message }: { message: string }) => {
            console.log('New message received', message);
            
            // publishing the msg to redis server
            await pub.publish("MESSAGES",JSON.stringify({message}))
        });
    })

}
}

export default SocketService;