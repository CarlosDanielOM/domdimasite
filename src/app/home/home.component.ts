import { Component, HostListener, inject } from '@angular/core';
import { LinksService } from '../links.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private linksService: LinksService = inject(LinksService);
  scope: string;
  twitchAuthURL: string;
  token: string;
  title: string = 'DomDimaBot';

  stats = {
    active: 18,
    registered: 28,
    live: 5
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if (this.userService.restoreUser()) router.navigate(['/login']);
    this.scope = 'user:read:email';
    this.scope = encodeURIComponent(this.scope);
    this.twitchAuthURL = this.linksService.getTwitchAuthURL() + '&scope=' + this.scope;
    this.token = '';
  }

  ngOnInit(): void {
    this.token = this.userService.getToken() ?? '';
    if (this.token) {
      this.router.navigate(['/login']);
    }
  }

  login() {
    window.location.href = this.twitchAuthURL;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 150) { // Adjust the value as needed
      // navbar?.classList.add('fixed');
    } else {
      // navbar?.classList.remove('fixed');
    }
  }

}
