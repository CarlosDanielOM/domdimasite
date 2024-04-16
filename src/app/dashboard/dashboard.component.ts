import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageAlertsComponent } from '../page-alerts/page-alerts.component';
import { UserService } from '../user.service';
import { LinksService } from '../links.service';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, PageAlertsComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  joinable: boolean = true;

  authURL: string = `https://id.twitch.tv/oauth2/authorize?response_type=code&force_verify=false&client_id=jl9k3mi67pmrbl1bh67y07ezjdc4cf&redirect_uri=${this.linksService.getApiURL()}/auth&scope=analytics%3Aread%3Aextensions+analytics%3Aread%3Agames+bits%3Aread+channel%3Amanage%3Aads+channel%3Aread%3Aads+channel%3Amanage%3Abroadcast+channel%3Aread%3Acharity+channel%3Aedit%3Acommercial+channel%3Aread%3Aeditors+channel%3Amanage%3Aextensions+channel%3Aread%3Agoals+channel%3Aread%3Aguest_star+channel%3Amanage%3Aguest_star+channel%3Aread%3Ahype_train+channel%3Amanage%3Amoderators+channel%3Aread%3Apolls+channel%3Amanage%3Apolls+channel%3Aread%3Apredictions+channel%3Amanage%3Apredictions+channel%3Amanage%3Araids+channel%3Aread%3Aredemptions+channel%3Amanage%3Aredemptions+channel%3Amanage%3Aschedule+channel%3Aread%3Astream_key+channel%3Aread%3Asubscriptions+channel%3Amanage%3Avideos+channel%3Aread%3Avips+channel%3Amanage%3Avips+clips%3Aedit+moderation%3Aread+moderator%3Amanage%3Aannouncements+moderator%3Amanage%3Aautomod+moderator%3Aread%3Aautomod_settings+moderator%3Amanage%3Aautomod_settings+moderator%3Amanage%3Abanned_users+moderator%3Aread%3Ablocked_terms+moderator%3Amanage%3Ablocked_terms+moderator%3Amanage%3Achat_messages+moderator%3Aread%3Achat_settings+moderator%3Amanage%3Achat_settings+moderator%3Aread%3Achatters+moderator%3Aread%3Afollowers+moderator%3Aread%3Aguest_star+moderator%3Amanage%3Aguest_star+moderator%3Aread%3Ashield_mode+moderator%3Amanage%3Ashield_mode+moderator%3Aread%3Ashoutouts+moderator%3Amanage%3Ashoutouts+user%3Aedit+user%3Aedit%3Afollows+user%3Aread%3Ablocked_users+user%3Amanage%3Ablocked_users+user%3Aread%3Abroadcast+user%3Amanage%3Achat_color+user%3Aread%3Aemail+user%3Aread%3Afollows+user%3Aread%3Asubscriptions+user%3Amanage%3Awhispers+channel%3Abot+channel%3Amoderate+chat%3Aedit+chat%3Aread+user%3Abot+user%3Aread%3Achat+whispers%3Aread+whispers%3Aedit&state=${this.userService.getUsername()}`

  constructor(
    private userService: UserService,
    private linksService: LinksService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    if (this.userService.isActive()) {
      this.joinable = false;
    }
  }

  givePermissions() {
    if (!this.userService.isActive()) {
      this.userService.changeIsActive(true);
    }
    window.location.href = this.authURL;
  }

  async joinBtn() {

    let action = this.joinable ? 'join' : 'leave';
    this.userService.changeIsActive(this.joinable);
    this.joinable = !this.joinable;

    this.channelAction(action);

  }

  async channelAction(action: string) {
    let response = await fetch(`${this.linksService.getApiURL()}/bot/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.userService.getId() })
    });

    let data = await response.json();

    if (data.error) {
      this.alertsService.createAlert(data.message, 'danger');
    }

    this.alertsService.createAlert(data.message, 'success');

  }

}
