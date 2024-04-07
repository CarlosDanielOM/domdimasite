import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageAlertsComponent } from '../page-alerts/page-alerts.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, PageAlertsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.userService.getUser()) {
      this.userService.deleteData();
      this.router.navigate(['/']);
    }
  }

}
