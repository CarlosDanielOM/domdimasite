import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.deleteData();
    this.router.navigate(['/']);
  }
}
