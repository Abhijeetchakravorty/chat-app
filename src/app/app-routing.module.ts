import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
        {
                path: '',
                redirectTo: 'allchats',
                pathMatch: 'full'
        },
        {
                path: '',
                component: AppComponent,
                children: [
                        {
                                path: 'login',
                                component: AuthenticationComponent
                        },
                        {
                        path: '',
                        component: NavigationComponent,
                        children: [
                                {
                                        path: 'allchats',
                                        component: ChatDetailComponent
                                },
                        ]
                }]
        },
        {
                path: '',
                redirectTo: '/allchats',
                pathMatch: 'full'
        },
        { 
                path: '**', 
                component: NotFoundComponent
        }
];

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule { }
