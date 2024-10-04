import { Component } from '@angular/core';
import { EventsubService } from '../eventsub.service';
import { Eventsub } from '../eventsub';
import { NgFor, NgIf } from '@angular/common';
import { EventsubModuleConfigViewComponent } from '../eventsub-module-config-view/eventsub-module-config-view.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-follow-module',
  standalone: true,
  imports: [NgFor, NgIf, EventsubModuleConfigViewComponent],
  templateUrl: './manage-follow-module.component.html',
  styleUrl: './manage-follow-module.component.scss'
})
export class ManageFollowModuleComponent {
  eventsubs: Eventsub[] = [];
  eventsub: Eventsub = <Eventsub>{};

  exists: boolean = true;

  helpers = [
    { special: '$(user)', description: 'The user that followed the channel' },
    { special: '$(twitch channel)', description: 'The channel that was followed' },
    { special: '$(twitch title)', description: 'The title of the channel that was followed' }
  ]

  type: string = 'channel.follow';
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
