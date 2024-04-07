import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trigger } from '../trigger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { NgFor } from '@angular/common'
import { AlertsService } from '../alerts.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-triggers',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './manage-triggers.component.html',
  styleUrl: './manage-triggers.component.scss'
})
export class ManageTriggersComponent {

  triggerList: Trigger[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private linkService: LinksService,
    private alertsService: AlertsService,
    private userService: UserService
  ) { }
  async ngOnInit() {
    this.triggerList = await this.getTriggerList();
  }

  async getTriggerList(): Promise<Trigger[]> {
    let res = await fetch(`${this.linkService.getApiURL()}/triggers/cdom201`);
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

// editBtn.addEventListener('click', async (e) => {
//   let id = e.target.id.split('-')[0];

//   let trigger = triggers.find(trigger => trigger._id == id);

//   updateTriggerID = trigger._id;

//   document.getElementById('updateName').value = trigger.name;
//   document.getElementById('updateCost').value = trigger.cost;
//   document.getElementById('updateCooldown').value = trigger.cooldown;
//   document.getElementById('updateVolume').value = trigger.volume;
//   document.getElementById('updateVolumeValue').innerText = trigger.volume + '%';

//   document.getElementById('uploadTrigger').style.display = 'flex';
// });