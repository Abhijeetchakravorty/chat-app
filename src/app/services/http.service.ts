import {
        Injectable
} from '@angular/core';
import {
        environment
} from '../../environments/environment';
import {
        Router
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
        HttpClient,
        HttpHeaders,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
        providedIn: 'root'
})
export class HttpService {
        private dataUrl: string = environment.baseUrl + 'api/';
        // private mapsUrl: string = environment.mapsUrl;
        public arr: any = [];
        constructor(private _snackBar: MatSnackBar, private router_: Router, private http: HttpClient) { }
        genericGet(endPoint: string, Obj: any) {
                return this.http.get<any>(this.dataUrl + endPoint, {
                        params: Obj,
                        headers: new HttpHeaders({
                                'Content-Type': 'application/json',
                                'Authorization': 'Authorization ' + JSON.parse(localStorage.getItem('user') || "{}")['response']['token']
                        })
                }).pipe(catchError(this.handleError<any>()));
        }

        genericPost(endPoint: string, Obj: any) {
                let httpOptions = {
                        headers: new HttpHeaders({
                                'Content-Type': 'application/json',
                                'Authorization': 'Authorization ' + JSON.parse(localStorage.getItem('user') || "{}")['response']['token']
                        })
                }
                return this.http.post<any>(this.dataUrl + endPoint, Obj, httpOptions).pipe(catchError(this.handleError<any>()));
        }

        authPost(endPoint: string, Obj: any) {
                let httpOptions = {
                        headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                        })
                }
                console.log(this.dataUrl + endPoint);
                console.log(Obj);
                return this.http.post<any>(this.dataUrl + endPoint, Obj, httpOptions).pipe(catchError(this.handleError<any>()));
        }

        genericPut(endPoint: string, Obj: any) {
                let httpOptions = {
                        headers: new HttpHeaders({
                                'Content-Type': 'application/json',
                                'Authorization': 'Authorization ' + JSON.parse(localStorage.getItem('user') || "{}")['response']['token']
                        })
                }
                console.log(this.dataUrl + endPoint);
                return this.http.put<any>(this.dataUrl + endPoint, Obj, httpOptions).pipe(catchError(this.handleError<any>()));
        }


        genericDelete(endPoint: string, Obj: any) {
                let httpOptions = {
                        params: Obj,
                        headers: new HttpHeaders({
                                'Content-Type': 'application/json',
                                'Authorization': 'Authorization ' + JSON.parse(localStorage.getItem('user') || "{}")['response']['token']
                        })
                }
                return this.http.delete<any>(this.dataUrl + endPoint, httpOptions).pipe(catchError(this.handleError<any>()));
        }

        snackBarService(message: string, action: string) {
                this._snackBar.open(message, action);
        }

        private handleError<T>() {
                let self = this;
                return (error: any): Observable<{}> => {
                        console.log(error);
                        if (error.status === 401) {
                                console.log('I am in');
                                // this.bdS.viewUser();
                                self.router_.navigate(['/login']);
                                localStorage.clear();
                        }
                        self.arr = [];
                        self.arr.push(error.error);
                        return self.arr;
                };
        }
}