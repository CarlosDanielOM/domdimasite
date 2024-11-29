import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { UserService } from '../user.service';
import { LinksService } from '../links.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {

  @Output() toggle: any = new EventEmitter();

  username: string = '';
  
  constructor(
    private userService: UserService,
    private linkService: LinksService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.username = params.streamer;
    });
  }
  isActive: boolean = true;

  toggleSize() {
    this.isActive = !this.isActive;
    let sideNav = this.el.nativeElement.querySelector('#side-navbar');
    let topToggle = this.el.nativeElement.querySelector('#top-toggle');
    if(this.isActive) {
      this.renderer.setStyle(sideNav, 'width', '250px');
      this.toggle.emit();
    } else {
      this.renderer.setStyle(sideNav, 'width', '50px');
      this.toggle.emit();
    }
    
  }
  
  routerLink(link: string) {
    this.router.navigate([link]);
  }
  
}
