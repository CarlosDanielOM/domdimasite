import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-user-view',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './manage-user-view.component.html',
  styleUrl: './manage-user-view.component.scss'
})
export class ManageUserViewComponent {
}
