import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AlertsService } from './alerts.service';
import { LinksService } from './links.service';
import { Eventsub } from './eventsub';

@Injectable({
  providedIn: 'root'
})
export class EventsubService {

  constructor(
    private userService: UserService,
    private alertsService: AlertsService,
    private linksService: LinksService
  ) { }

  async getEventsubs(): Promise<Eventsub[]> {
    let eventsubs = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}`);
    return await eventsubs.json();
  }

  async getEventsubById(id: string): Promise<Eventsub> {
    let eventsub = await fetch(`${this.linksService.getApiURL()}/eventsub/${id}`);
    let data = await eventsub.json();

    if(data.error) {
      this.alertsService.createAlert(data.message, 'danger')
      return <Eventsub>{};
    };

    return data.eventsub;
  }

  async getEventsubByType(type: string): Promise<Eventsub> {
    let eventsub = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}/${type}`);
    let data = await eventsub.json();

    if(data.error) {
      return <Eventsub>{};
    };

    return data.eventsubs;
  }
  
}
