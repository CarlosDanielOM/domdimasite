import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title: string = 'DomDimaBot';
  username: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if (!this.userService.restoreUser()) router.navigate(['/']);
    this.username = this.userService.getUsername();
  }

}
