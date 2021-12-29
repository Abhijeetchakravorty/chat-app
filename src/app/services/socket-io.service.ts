import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { BroadcastService } from './broadcast.service';
const backendUrl = 'http://localhost:4300';
@Injectable({
        providedIn: 'root'
})
export class SocketIoService {
        public socketData: any = io(environment.baseUrl);
        constructor(private broadcast: BroadcastService) { 
        }        

        sendMessage(obj:any) {
                this.socketData.emit("newevent", obj)
        }        
}
