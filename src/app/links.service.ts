import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  prod: boolean = false;
  twitchAuthURL: string;

  constructor() {
    this.twitchAuthURL = `https://id.twitch.tv/oauth2/authorize?response_type=token&force_verify=false&client_id=jl9k3mi67pmrbl1bh67y07ezjdc4cf&redirect_uri=${this.getLink()}/login&response_type=token`;
  }

  getTwitchAuthURL() {
    return this.twitchAuthURL;
  }

  getApiURL() {
    return 'https://api.domdimabot.com';
  }

  getFakeApiURL() {
    return 'http://localhost:3000';
  }

  getLink() {
    return this.prod ? 'https://domdimabot.com' : 'http://localhost:4200';
  }
}
