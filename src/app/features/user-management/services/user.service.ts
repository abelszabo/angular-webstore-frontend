import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterUserRequest {
  email: string;
  username: string;
}

export interface RegisterUserResponse {
  userUuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user/register';

  constructor(private http: HttpClient) {}

  register(request: RegisterUserRequest): Observable<RegisterUserResponse> {
    console.log("Calling user registration...");
    return this.http.post<RegisterUserResponse>(this.apiUrl, request);
  }
}
