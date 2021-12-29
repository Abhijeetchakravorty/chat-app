import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
        selector: 'app-authentication',
        templateUrl: './authentication.component.html',
        styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
        
        public loginObj: any = {
                showLogin: true,
                showLoginEmailSuffix: false,
                showLoginPassSuffix: false,
                showLoginEmailErr: false,
                showLoginPassErr: false
        };
        public signUpObj: any = {
                showSignupEmailSuffix: false,
                showSignupPassSuffix: false,
                showSignupFNameSuffix: false,
                showSignupLNameSuffix: false,
                showSignupEmailErr: false,
                showSignupPassErr: false,
                showSignupFNameErr: false,
                showSignupLNameErr: false
        };
        constructor(public router: Router, public dataS: DataService, public request: HttpService) { }

        ngOnInit(): void {
        }

        switchView():void {
                this.loginObj.showLogin = !this.loginObj.showLogin
        }

        udpateSuffix(type: string, kind: string): void {
                if (kind == 'login') {
                        if (type === 'email') {
                                if (this.loginObj.email.length !== 0) {
                                        this.loginObj.showLoginEmailSuffix = true;
                                } else {
                                        this.loginObj.showLoginEmailSuffix = false;
                                }
                        }
        
                        if (type === 'password') {
                                if (this.loginObj.password.length !== 0) {
                                        this.loginObj.showLoginPassSuffix = true;
                                } else {
                                        this.loginObj.showLoginPassSuffix = false;
                                }
                        }
                } else {
                        console.log(type);
                        if (type === 'email') {
                                if (this.signUpObj.email.length !== 0) {
                                        this.signUpObj.showSignupEmailSuffix = true;
                                } else {
                                        this.signUpObj.showSignupEmailSuffix = false;
                                }
                        }
        
                        if (type === 'password') {
                                if (this.signUpObj.password.length !== 0) {
                                        this.signUpObj.showSignupPassSuffix = true;
                                } else {
                                        this.signUpObj.showSignupPassSuffix = false;
                                }
                        }

                        if (type === 'firstName') {
                                if (this.signUpObj.firstName.length !== 0) {
                                        this.signUpObj.showSignupFNameSuffix = true;
                                } else {
                                        this.signUpObj.showSignupFNameSuffix = false;
                                }
                        }

                        if (type === 'lastName') {
                                if (this.signUpObj.lastName.length !== 0) {
                                        this.signUpObj.showSignupLNameSuffix = true;
                                } else {
                                        this.signUpObj.showSignupLNameSuffix = false;
                                }
                        }
                }
        }

        removeText(type: string) {
                if (type == 'email') {
                        this.loginObj.email = '';
                }
                if (type == 'password') {
                        this.loginObj.password = '';
                }
        }

        login() {
                let userObj = {
                        email: this.loginObj.email,
                        password: this.loginObj.password
                }
                this.request.authPost('users/login', userObj).subscribe((result) => {
                        if (result.success) {
                                this.dataS.setLocal('user', result);
                                this.router.navigate(['/allchats']);
                        } else {
                                this.loginObj.err = result.response;
                                this.loginObj.showLoginPassErr = true;
                        }
                });
        }

        signup() {
                let userObj = {
                        firstName: this.signUpObj.firstName,
                        lastName: this.signUpObj.lastName,
                        email: this.signUpObj.email,
                        password: this.signUpObj.password
                };
                this.request.authPost('users/signup', userObj).subscribe((result) => {
                        if (result.success) {
                                this.dataS.setLocal('user', result);
                                this.router.navigate(['/allchats']);
                        } else {
                                this.loginObj.err = result.response;
                                this.loginObj.showLoginPassErr = true;
                        }
                });
        }

}
