import { Component } from '@angular/core';
import { Eventsub } from '../eventsub';
import { EventsubService } from '../eventsub.service';
import { UserService } from '../user.service';
import { EventsubModuleConfigViewComponent } from '../eventsub-module-config-view/eventsub-module-config-view.component';

@Component({
  selector: 'app-manage-stream-offline-module',
  standalone: true,
  imports: [EventsubModuleConfigViewComponent],
  templateUrl: './manage-stream-offline-module.component.html',
  styleUrl: './manage-stream-offline-module.component.scss'
})
export class ManageStreamOfflineModuleComponent {
  eventsubs: Eventsub[] = [];
  eventsub: Eventsub = <Eventsub>{};

  exists: boolean = true;

  helpers = [
    { special: '$(twitch channel)', description: 'The channel that was followed' },
    { special: '$(twitch title)', description: 'The title of the channel that was followed' },
    { special: '$(twitch game)', description: 'The game that you are starting with'}
  ]

  type: string = 'stream.offline';
  splitType: string[] = this.type.split('.');
  
  constructor(
    private eventsubService: EventsubService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.eventsubs = await this.eventsubService.getEventsubByType(this.type) as Eventsub[];
    this.eventsub = this.eventsubs[0];
    if(!this.eventsub._id) {
      this.exists = false;
    }
  }

  async createEventsub() {
    let eventsubData: Eventsub = {
      type: this.type,
      version: 2,
      condition: {
        broadcaster_user_id: this.userService.getId(),
        moderator_user_id: this.eventsubService.modID
      }
    }

    this.eventsub = await this.eventsubService.createEventsub(eventsubData);
    this.exists = true;
  }

  updateEventsub(event: Eventsub) {
    this.eventsubService.updateEventsub(event);
  }
  
  deleteEventsub(id: string) {
    this.eventsubService.deleteEventsub(id);
    this.exists = false;
  }

}
