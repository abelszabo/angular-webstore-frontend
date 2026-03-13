import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {

    console.log("AUTH CONFIG: " + authConfig);

    this.oauthService.configure(authConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

}
