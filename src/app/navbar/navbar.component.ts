import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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

  constructor() {
    this.username = localStorage.getItem('username') || '';
  }

}
