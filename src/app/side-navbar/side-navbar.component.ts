import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../user.service';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  constructor(
    private userService: UserService,
    private linkService: LinksService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  isActive: boolean = true;

  toggleSize() {
    this.isActive = !this.isActive;
    let sideNav = this.el.nativeElement.querySelector('#side-navbar');
    let topToggle = this.el.nativeElement.querySelector('#top-toggle');
    if(this.isActive) {
      this.renderer.setStyle(sideNav, 'width', '250px');
    } else {
      this.renderer.setStyle(sideNav, 'width', '50px');
    }
    
  }
  
}
