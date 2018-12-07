import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  AuthGuardService as AuthGuard 
} from './guards/auth-guard.service';

import { ApiServiceService } from './api-service.service';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import {DataTableModule} from "angular-6-datatable";


import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login";
import { NgxSpinnerModule } from 'ngx-spinner';
// AoT requires an exported function for factories
// export const createTranslateLoader = (http: HttpClient) => {
//     /* for development
//     return new TranslateHttpLoader(
//         http,
//         '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
//         '.json'
//     ); */
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// };
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("267976150696719")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider : new GoogleLoginProvider("290099675276-nou80c26vurpnttrtj4mhpii2e40oqfk.apps.googleusercontent.com")
      }
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
      // }
    ]);
  return config;
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: createTranslateLoader,
        //         deps: [HttpClient]
        //     }
        // }),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SocialLoginModule,
        DataTableModule,
        NgxSpinnerModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, ApiServiceService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
    bootstrap: [AppComponent]
})
export class AppModule {}
