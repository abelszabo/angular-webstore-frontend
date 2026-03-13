import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  issuer: 'http://localhost:8080',

  redirectUri: window.location.origin + '/login-callback',

  clientId: 'webstore-client',

  responseType: 'code',

  scope: 'openid profile',

  requireHttps: false,

  strictDiscoveryDocumentValidation: false,

  showDebugInformation: true

};
