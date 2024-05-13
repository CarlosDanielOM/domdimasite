import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AlertsService } from './alerts.service';
import { LinksService } from './links.service';
import { Eventsub } from './eventsub';

@Injectable({
  providedIn: 'root'
})
export class EventsubService {

  public modID: string = '698614112';

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
  
  async createEventsub(eventsub: Eventsub): Promise<Eventsub> {
    let newEventsub = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventsub)
    });

    let data = await newEventsub.json();

    if(data.error) {
      this.alertsService.createAlert(data.message, 'danger')
      return <Eventsub>{};
    };

    this.alertsService.createAlert(data.message, 'success')
    return data.eventsub;
  }

  async deleteEventsub(id: string): Promise<void> {
    let request = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let data = await request.json();

    if(data.error) {
      this.alertsService.createAlert(data.message, 'danger')
    };

    this.alertsService.createAlert(data.message, 'success')
  }
  
  async updateEventsub(eventsub: Eventsub): Promise<Eventsub> {
    let updatedEventsub = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}/${eventsub._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventsub)
    });

    let data = await updatedEventsub.json();

    if(data.error) {
      this.alertsService.createAlert(data.message, 'danger')
      return <Eventsub>{};
    };

    this.alertsService.createAlert(data.message, 'success')
    return data.eventsub;
  }
  
}
