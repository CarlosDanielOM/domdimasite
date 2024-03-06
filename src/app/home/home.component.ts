import { Component, inject } from '@angular/core';
import { LinksService } from '../links.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.scope = 'user:read:email';
    this.scope = encodeURIComponent(this.scope);
    this.twitchAuthURL = this.linksService.getTwitchAuthURL() + '&scope=' + this.scope;
    this.token = '';
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    if (this.token) {
      this.router.navigate(['/login']);
    }
  }

  login() {
    window.location.href = this.twitchAuthURL;
  }

}
