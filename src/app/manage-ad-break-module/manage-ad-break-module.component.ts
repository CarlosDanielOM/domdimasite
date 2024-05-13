import { Component } from '@angular/core';
import { Eventsub } from '../eventsub';
import { EventsubService } from '../eventsub.service';
import { UserService } from '../user.service';
import { EventsubModuleConfigViewComponent } from '../eventsub-module-config-view/eventsub-module-config-view.component';

@Component({
  selector: 'app-manage-ad-break-module',
  standalone: true,
  imports: [EventsubModuleConfigViewComponent],
  templateUrl: './manage-ad-break-module.component.html',
  styleUrl: './manage-ad-break-module.component.scss'
})
export class ManageAdBreakModuleComponent {
  eventsubs: Eventsub[] = [];
  eventsub: Eventsub = <Eventsub>{};

  exists: boolean = true;

  helpers = [
    { special: '$(twitch channel)', description: 'The channel that was followed' },
    { special: '$(twitch title)', description: 'The title of the channel that was followed' },
    { special: '$(twitch game)', description: 'The game that you are starting with'},
    { special: '$(ad time)', description: 'The duration of the ad break'}
  ]

  type: string = 'channel.ad_break.begin';
  splitType: string[] = this.type.split('.');
  
  constructor(
    private eventsubService: EventsubService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.eventsub = await this.eventsubService.getEventsubByType(this.type);
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
