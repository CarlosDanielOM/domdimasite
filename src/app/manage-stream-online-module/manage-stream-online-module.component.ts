import { Component } from '@angular/core';
import { EventsubModuleConfigViewComponent } from '../eventsub-module-config-view/eventsub-module-config-view.component';
import { UserService } from '../user.service';
import { EventsubService } from '../eventsub.service';
import { Eventsub } from '../eventsub';

@Component({
  selector: 'app-manage-stream-online-module',
  standalone: true,
  imports: [EventsubModuleConfigViewComponent],
  templateUrl: './manage-stream-online-module.component.html',
  styleUrl: './manage-stream-online-module.component.scss'
})
export class ManageStreamOnlineModuleComponent {
  eventsubs: Eventsub[] = [];
  eventsub: Eventsub = <Eventsub>{};

  exists: boolean = true;

  helpers = [
    { special: '$(twitch channel)', description: 'The channel that was followed' },
    { special: '$(twitch title)', description: 'The title of the channel that was followed' },
    { special: '$(twitch game)', description: 'The game that you are starting with'}
  ]

  type: string = 'stream.online';
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
