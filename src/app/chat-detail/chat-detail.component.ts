import { Component, OnInit, AfterViewChecked, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { BroadcastService } from '../services/broadcast.service';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SocketIoService } from '../services/socket-io.service';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";
@Component({
        selector: 'app-chat-detail',
        templateUrl: './chat-detail.component.html',
        styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit, AfterViewChecked {
        @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
        public socketData: any = io(environment.baseUrl);
        public showLoadMessage: boolean = true;
        public chatUser: any = {};
        public chatText: string = '';
        public counter: number = 0;
        userChatStr: SafeHtml | undefined;
        public userChat: any[] = [];
        constructor(private renderer: Renderer2, public request: HttpService, private socketIoService:SocketIoService, private sanitizer: DomSanitizer, public dataS: DataService, public broadcast: BroadcastService) {
                this.broadcast.showSelectedUser.subscribe((data) => {
                        if (data) {
                                this.openChat(data);
                        }
                });
        }

        ngOnInit(): void {
                this.socketData.on("receive", (data: any) => {
                        this.receiveMessages(data);
                });
                if (this.dataS.getLocal("openChat")["id"] !== undefined && this.dataS.getLocal("openChat") !== null) {
                        this.showLoadMessage = false;
                        this.openChat(this.dataS.getLocal("openChat"));
                }
                this.scrollToBottom();
        }
        ngAfterViewChecked() {        
                this.scrollToBottom();        
        }

        scrollToBottom(): void {
                try {
                    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
                } catch(err) { }                 
        }
        
        postMessage() {
                let fName = this.dataS.getLocal('user')["response"]["firstName"].charAt(0).toUpperCase();
                let lName = this.dataS.getLocal('user')["response"]["lastName"].charAt(0).toUpperCase();
                console.log("post message");
                var data = {
                        message: this.chatText,
                        sender: this.dataS.getLocal("user")["response"],
                        receiver: this.dataS.getLocal("openChat")
                }
                this.socketIoService.sendMessage(data);
                this.userChat.push(`
                                                <li class="chat-user-cur text-align-right chat-list-item-cur">
                                                        <div class="chat-text">
                                                                <div class="chat-text-final cur-user-text-final">
                                                                        `+ data.message + `
                                                                </div>
                                                                <div class="user-icon user-cur">`+fName+lName+`</div>                                
                                                        </div>
                                                </li>
                                        `);
                let finalStr = this.userChat.join("");
                this.userChatStr = this.sanitizer.bypassSecurityTrustHtml(finalStr);
                this.chatText = '';
                this.scrollToBottom();
        }

        receiveMessages(data: any) {
                if (data.sender.id !== this.dataS.getLocal("user")["response"]["id"]) {
                        this.userChatStr = undefined;
                        this.userChat.push(`<li class="chat-user-one text-align-left chat-list-item-one">
                                        <div class="chat-text">
                                                <div class="user-icon user-one">`+ data.sender.firstName.charAt(0).toUpperCase() + data.sender.lastName.charAt(0).toUpperCase() + `</div>
                                                <div class="chat-text-final chat-user-one-text-final">
                                                        `+ data["message"] + `
                                                </div>
                                        </div>
                                </li>`
                        );
                        let finalRecChatStr = this.userChat.join("");
                        this.userChatStr = this.sanitizer.bypassSecurityTrustHtml(finalRecChatStr);
                        this.scrollToBottom();
                }
        }

        openChat(data: any) {
                this.request.genericPost("auth/users/allmessages", {
                        receiverId: data.id,
                        senderId: this.dataS.getLocal("user")["response"]["id"],
                        limit: 100,
                        offset: 0
                }).subscribe((result) => {
                        console.log(result);
                        if (result.response.length !== 0) {
                                for (let i = 0; i < result.response.length; i++) {
                                        if (result.response[i]["UserId"] == parseInt(this.dataS.getLocal("user")["response"]["id"])) {
                                                this.userChat.push(`
                                                        <li class="chat-user-cur text-align-right chat-list-item-cur">
                                                                <div class="chat-text">
                                                                        <div class="chat-text-final cur-user-text-final">
                                                                                `+ result.response[i]["message"] + `
                                                                        </div>
                                                                        <div class="user-icon user-cur">`+result.response[i]["User"]["firstName"].charAt(0).toUpperCase()+result.response[i]["User"]["lastName"].charAt(0).toUpperCase()+`</div>                                
                                                                </div>
                                                        </li>
                                                `);
                                        } else {;
                                                this.userChat.push(`
                                                        <li class="chat-user-one text-align-left chat-list-item-one">
                                                                <div class="chat-text">
                                                                        <div class="user-icon user-one">`+result.response[i]["User"]["firstName"].charAt(0).toUpperCase()+result.response[i]["User"]["lastName"].charAt(0).toUpperCase()+`</div>
                                                                        <div class="chat-text-final chat-user-one-text-final">
                                                                                `+result.response[i]["message"]+`
                                                                        </div>
                                                                </div>
                                                        </li>
                                                `);
                                        }
                                }
                                this.userChatStr = this.sanitizer.bypassSecurityTrustHtml(this.userChat.join(""));
                                this.showLoadMessage = false;
                        } else {
                                this.userChat = [];
                                let dat = this.userChat.join("");
                                this.userChatStr = this.sanitizer.bypassSecurityTrustHtml(dat);
                                this.showLoadMessage = false;
                        }
                        this.chatUser = data;
                });
        }
}
