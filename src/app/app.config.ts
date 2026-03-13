import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// import {
//   OAuthService,
//   UrlHelperService,
//   OAuthStorage,
//   OAuthLogger
// } from 'angular-oauth2-oidc';
import { provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),

//     OAuthService,
//     UrlHelperService,
//
//     {
//       provide: OAuthStorage,
//       useValue: localStorage
//     },
//
//     {
//       provide: OAuthLogger,
//       useValue: console
//     }

    provideOAuthClient()
  ]
};
