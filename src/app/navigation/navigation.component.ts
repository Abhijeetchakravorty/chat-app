import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { BroadcastService } from '../services/broadcast.service';
import { SocketIoService } from '../services/socket-io.service';
@Component({
        selector: 'app-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
        public baseUrl: string = environment.baseUrl;
        public showFiller = false;
        public showUsers: any[] = [];
        public showUser: string = '';
        public curUser: any = {};
        constructor(private socketIOService: SocketIoService, public broadcast: BroadcastService, public router: Router, public dataS: DataService, public request: HttpService) { }

        ngOnInit(): void {
                // socket.emit("new user", "I am here");
                this.loginCheck();
        }

        loginCheck() {
                if (this.dataS.getLocal('user')["response"] !== undefined && this.dataS.getLocal('user')["response"] !== null) {
                        this.request.genericPost('auth/users/loginCheck', {
                                token: this.dataS.getLocal('user')['response']['token']
                        }).subscribe((result) => {
                                if (!result.success) {
                                        this.dataS.removeLocal();
                                        this.dataS.snackBar("Please login to continue");
                                        this.router.navigate(["/login"]);
                                } else {
                                        this.curUser = this.dataS.getLocal('user')["response"];
                                        this.fetchAllUsers('', 100, 0);
                                        // this.socketIOService.callSocket();
                                }
                        });
                } else {
                        this.dataS.removeLocal();
                        this.dataS.snackBar("Please login to continue");
                        this.router.navigate(["/login"]);
                }
        }

        fetchAllUsers(search:string, limit: number, offset:number) {
                this.request.genericGet('auth/users/allusers', {
                        search: search,
                        limit: limit,
                        offset: offset

                }).subscribe((result) => {
                        if (result.success) {
                                this.showUsers = result.response;
                        } else {
                                this.dataS.snackBar(result.response);
                        }
                });
        }

        logout() {
                this.dataS.removeLocal();
                this.router.navigate(["/login"]);
        }
        
        userSelected(user: any, drawer: any) {
                drawer.toggle();
                this.broadcast.viewUserChat(user);
                this.dataS.setLocal("openChat", user);
        }
}
