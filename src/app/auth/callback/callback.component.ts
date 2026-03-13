import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `<p>Signing in...</p>`
})
export class CallbackComponent {

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
//         console.log("AUTH CONFIG: " + authConfig);
//
//         this.oauthService.configure(authConfig);
//
//         //this.oauthService.loadDiscoveryDocumentAndTryLogin();
//
//         this.oauthService.loadDiscoveryDocumentAndTryLogin()
//           .then(() => {
//             this.router.navigateByUrl('/');
//           });
    }

  async ngOnInit() {

    //await this.oauthService.loadDiscoveryDocument();

    //await this.oauthService.tryLoginCodeFlow();

    //await this.oauthService.configure(authConfig);
    //await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    //this.router.navigateByUrl('/');


    console.log("AUTH CONFIG: " + authConfig);
    this.oauthService.configure(authConfig);

    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.router.navigateByUrl('/');

  }

}
