import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AlertsService } from './alerts.service';
import { LinksService } from './links.service';
import { Eventsub } from './eventsub';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class EventsubService {

  public modID: string = '698614112';

  constructor(
    private userService: UserService,
    private linksService: LinksService,
    private matSnackBar: MatSnackBar
  ) { }

  async getEventsubs(): Promise<Eventsub[]> {
    let eventsubs = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}`, {
      headers: {
        'Authorization': `${this.userService.getAuth()}`
      }
    });
    return await eventsubs.json();
  }

  async getEventsubById(id: string): Promise<Eventsub> {
    let eventsub = await fetch(`${this.linksService.getApiURL()}/eventsub/${id}`, {
      headers: {
        'Authorization': `${this.userService.getAuth()}`
      }
    });
    let data = await eventsub.json();

    if(data.error) {
      this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
      return <Eventsub>{};
    };

    return data.data;
  }

  async getEventsubByType(type: string): Promise<Eventsub> {
    let params = new URLSearchParams(); 
    params.append('type', type);

    let eventsub = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}?${params.toString()}`, {
      headers: {
        'Authorization': `${this.userService.getAuth()}`
      }
    });
    let data = await eventsub.json();

    if(data.error) {
      return <Eventsub>{};
    };

    return data.data;
  }
  
  async createEventsub(eventsub: Eventsub): Promise<Eventsub> {
    let params = new URLSearchParams(); 
    params.append('type', 'all');

    let newEventsub = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.userService.getAuth()}`
      },
      body: JSON.stringify(eventsub)
    });

    let data = await newEventsub.json();

    if(data.error) {
      this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
      return <Eventsub>{};
    };

    this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
    return data.data;
  }

  async deleteEventsub(id: string): Promise<void> {
    let params = new URLSearchParams(); 
    params.append('type', 'all');

    let request = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}/${id}?${params.toString()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.userService.getAuth()}`
      }
    });

    let data = await request.json();

    if(data.error) {
      this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
    };

    this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
  }
  
  async updateEventsub(eventsub: Eventsub): Promise<Eventsub> {
    let params = new URLSearchParams(); 
    params.append('type', 'all');

    let updatedEventsub = await fetch(`${this.linksService.getApiURL()}/eventsubs/${this.userService.getId()}/${eventsub._id}?${params.toString()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.userService.getAuth()}`
      },
      body: JSON.stringify(eventsub)
    });

    let data = await updatedEventsub.json();

    if(data.error) {
      this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
      return <Eventsub>{};
    };

    this.matSnackBar.open(data.message, 'Dismiss', { duration: 2500 });
    return data.data;
  }
  
}
