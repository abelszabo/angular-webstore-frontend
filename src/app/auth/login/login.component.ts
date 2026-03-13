import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
