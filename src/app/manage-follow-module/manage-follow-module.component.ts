import { Component } from '@angular/core';
import { EventsubService } from '../eventsub.service';
import { Eventsub } from '../eventsub';
import { NgFor, NgIf } from '@angular/common';
import { EventsubModuleConfigViewComponent } from '../eventsub-module-config-view/eventsub-module-config-view.component';

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
    private eventsubService: EventsubService
  ) {}

  async ngOnInit() {
    this.eventsub = await this.eventsubService.getEventsubByType(this.type);
    delete this.eventsub.endMessage;
    delete this.eventsub.endEnabled;
    if(!this.eventsub._id) {
      this.exists = false;
    }
  }

  createEventsub(event: Eventsub) {
    console.log(event);
  }

  updateEventsub(event: Eventsub) {
    console.log(event);
  }
  
}
