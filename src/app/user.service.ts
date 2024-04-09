import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  constructor(
    private router: Router
  ) { }

  createUser(user: any) {
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  restoreUser(): Boolean {
    this.user = sessionStorage.getItem('user');
    if (!this.user) {
      sessionStorage.removeItem('user');
      this.deleteData();
      return false;
    }
    this.user = JSON.parse(this.user);
    return true;
  }

  deleteData() {
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.user.token;
  }

  getEmail() {
    return this.user.email;
  }

  getId() {
    return this.user.id;
  }

  getUsername() {
    return this.user.username;
  }

  getDisplayName() {
    return this.user.display_name;
  }

  getRole() {
    return this.user.role;
  }

  isPremium() {
    return this.user.role === 'premium';
  }

  isRegular() {
    return this.user.role === 'none';
  }

  isPremiumPlus() {
    return this.user.role === 'premium_plus';
  }

  getProfileImg() {
    return this.user.profile_image;
  }

  isLoggedIn() {
    return this.user !== null;
  }

}
