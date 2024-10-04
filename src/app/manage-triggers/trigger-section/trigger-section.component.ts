import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() triggerEdit = new EventEmitter<Trigger>();

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
    let res = await fetch(`${this.linkService.getApiURL()}/triggers/${this.userService.getId()}`, {
      headers: {
        'Authorization': `${this.userService.getAuth()}`
      }
    });
    let data = await res.json();

    return data.data;
  }

  async deleteTrigger(id: string) {
    let confirmDelete = confirm('Are you sure you want to delete this trigger?');
    if (!confirmDelete) return;

    const response = await fetch(`${this.linkService.getApiURL()}/triggers/${this.userService.getId()}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${this.userService.getAuth()}`
      }
    });

    const data = await response.json();

    if (data.error) return this.alertsService.createAlert(data.message, 'error');

    this.alertsService.createAlert(data.message, 'success');
    this.triggerList = await this.getTriggerList();

  }

  async updateTriggerList() {
    this.triggerList = await this.getTriggerList();
  }

  async editTrigger(id: string) {
    let trigger = this.triggerList.find(trigger => trigger._id == id);

    this.triggerEdit.emit(trigger);
  }
}
