import { Component } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { LinksService } from '../links.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-clips-module',
  standalone: true,
  imports: [],
  templateUrl: './manage-clips-module.component.html',
  styleUrl: './manage-clips-module.component.scss'
})
export class ManageClipsModuleComponent {

  clipLink: string = '';

  constructor(
    private alertsService: AlertsService,
    private userService: UserService,
    private linksService: LinksService
  ) { }

  ngOnInit() {
    this.clipLink = `${this.linksService.getApiURL()}/clip/${this.userService.getUsername()}`;
  }

  copyToClipboard() {
    this.alertsService.createAlert('Copied to clipboard!', 'success');
    navigator.clipboard.writeText(this.clipLink);
  }

  
}
