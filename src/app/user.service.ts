import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  constructor() { }

  createUser(user: any) {
    this.user = user;
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
