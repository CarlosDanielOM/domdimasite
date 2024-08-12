import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
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
    if (!this.userService.restoreUser()) this.router.navigate(['/']);
    this.username = this.userService.getUsername();
  }

  navToggle() {
    const nav = document.getElementById('nav')!;
    if (nav.style.display === 'none' || nav.style.display === '') {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
  }

}
