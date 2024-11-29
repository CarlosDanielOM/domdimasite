import { Component, ElementRef, Renderer2 } from '@angular/core';
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
  user: any = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    if (!this.userService.restoreUser()) this.router.navigate(['/']);
    this.username = this.userService.getUsername();
  }

  navToggle() {
    let navMenu = this.el.nativeElement.querySelector('#nav-list');
    if (navMenu.style.display === 'none') {
      this.renderer.setStyle(navMenu, 'display', 'block');
    } else {
      this.renderer.setStyle(navMenu, 'display', 'none');
    }
  }

}
