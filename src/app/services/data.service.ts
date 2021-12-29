import {
        Injectable
} from '@angular/core';
import {
        MatSnackBar
} from '@angular/material/snack-bar';
@Injectable({
        providedIn: 'root'
})
export class DataService {
        constructor(public snackbar: MatSnackBar) {
                
        }
        
        setLocal(name: string, obj: any) {
                let data = JSON.stringify(obj);
                localStorage.setItem(name, data);
        }

        getLocal(txt: string) {
                let data = JSON.parse(localStorage.getItem(txt) || '{}');
                return data;
        }

        removeLocal() {
                localStorage.clear();
        }

        snackBar(message: string) {
                return this.snackbar.open(message, 'close', {
                        duration: 3000
                });
        }
}