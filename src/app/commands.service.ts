import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinksService } from './links.service';
import { UserService } from './user.service';
import { catchError } from 'rxjs/operators';
import { AlertsService } from './alerts.service';
import { Command } from './command';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(
    private http: HttpClient,
    private linkService: LinksService,
    private userService: UserService,
    private alertsService: AlertsService
  ) { }

  getChannelCommands(channelID: string) {
    let headers = new HttpHeaders().set('Authorization', `${this.userService.getAuth()}`);
    return this.http.get(`${this.linkService.getApiURL()}/commands/${channelID}`, { headers: headers });
  }

  createCommand(channelID: string, command: Command) {
    let headers = new HttpHeaders().set('Authorization', `${this.userService.getAuth()}`);
    return this.http.post(`${this.linkService.getApiURL()}/commands/${channelID}`, command, { headers: headers });
  }
  
  deleteCommand(commandID: string) {
    let headers = new HttpHeaders().set('Authorization', `${this.userService.getAuth()}`);
    return this.http.delete(`${this.linkService.getApiURL()}/commands/${this.userService.getId()}/${commandID}`, { headers: headers });
  }
}
