import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LinksService } from '../../links.service';
import { UserService } from '../../user.service';
import { Trigger } from '../../trigger';
import { AlertsService } from '../../alerts.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-trigger-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trigger-section.component.html',
  styleUrl: './trigger-section.component.scss'
})
export class TriggerSectionComponent {

  triggerList: Trigger[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private linkService: LinksService,
    private userService: UserService,
    private alertsService: AlertsService
  ) { }

  async ngOnInit() {
    this.triggerList = await this.getTriggerList();
  }

  async getTriggerList(): Promise<Trigger[]> {
    let res = await fetch(`${this.linkService.getApiURL()}/triggers/${this.userService.getUsername()}`);
    let data = await res.json();

    return data.triggers;
  }

  async deleteTrigger(id: string) {
    let confirmDelete = confirm('Are you sure you want to delete this trigger?');
    if (!confirmDelete) return;

    const response = await fetch(`${this.linkService.getApiURL()}/trigger/delete/${this.userService.getUsername()}/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.error) return this.alertsService.createAlert(data.message, 'error');

    this.alertsService.createAlert(data.message, 'success');
    this.triggerList = await this.getTriggerList();

  }

  async editTrigger(id: string) {
    let trigger = this.triggerList.find(trigger => trigger._id == id);

    //!Work on this

  }
}