﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//import {FormsModule} from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';;
import { SocialLoginModule,AuthServiceConfig,FacebookLoginProvider,GoogleLoginProvider } from 'angularx-social-login';

const config=new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('977157414816-vk4g6l7cjhcgnjqf24d8lqn63jjf2g98.apps.googleusercontent.com')

},
{
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('265582661268875')
}]);
export function provideConfig(){
    return config;
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        SocialLoginModule
    ],
    declarations: [
        AppComponent,
        NavBarComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: AuthServiceConfig, useFactory: provideConfig },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };