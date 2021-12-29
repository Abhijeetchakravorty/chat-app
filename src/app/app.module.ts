import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SocketIoService } from './services/socket-io.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BroadcastService } from './services/broadcast.service';
@NgModule({
        declarations: [
                AppComponent,
                AuthenticationComponent,
                NavigationComponent,
                ChatDetailComponent,
                NotFoundComponent,
        ],
        imports: [
                BrowserModule,
                AppRoutingModule,
                BrowserAnimationsModule,
                MatCardModule,
                MatSnackBarModule,
                HttpClientModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatButtonModule,
                MatToolbarModule,
                MatSidenavModule,
                FlexLayoutModule
        ],
        providers: [
                SocketIoService,
                BroadcastService
        ],
        bootstrap: [AppComponent]
})
export class AppModule { }
