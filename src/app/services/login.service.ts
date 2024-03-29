import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // for letting navbar know about the login status
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // current user which is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`)
  }

  // generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData)
  }

  // login user 
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return;
  }

  // islOgin
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr) {
      return true;
    } else {
      return false;
    }
  }

  // logout remove token

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get Token
  public getToken() {
    return localStorage.getItem('token');
  }

  // set user details
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  // get user
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr)
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser()
    return user.authorities[0].authority
  }

}
