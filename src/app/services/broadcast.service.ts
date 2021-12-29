import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
        providedIn: 'root'
})
export class BroadcastService {
        public showSelectedUser: EventEmitter<any> = new EventEmitter();
        @Output() received: EventEmitter<any> = new EventEmitter();
        constructor() {}
        
        viewUserChat(obj: any) {
                this.showSelectedUser.emit(obj);
        }

        gotMessage(obj: any) {
                console.log("Got message");
                this.received.emit(obj);
        }
}
