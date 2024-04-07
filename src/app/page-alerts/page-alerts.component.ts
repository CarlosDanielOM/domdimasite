import { Component } from '@angular/core';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-page-alerts',
  standalone: true,
  imports: [],
  templateUrl: './page-alerts.component.html',
  styleUrl: './page-alerts.component.scss'
})
export class PageAlertsComponent {

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    const element = document.getElementById('systemAlerts');
    if (element) {
      this.alertsService.setAlertContainer(element.firstChild as HTMLElement);
    } else {
      console.error('Element with id "alerts-container" not found');
    }
  }

}
