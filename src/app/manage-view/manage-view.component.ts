import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-view.component.html',
  styleUrl: './manage-view.component.scss'
})
export class ManageViewComponent {

  options = [
    { name: 'Triggers', route: 'triggers', img: 'triggers' },
    { name: 'VIP', route: 'vip', img: 'vip' },
    { name: 'Clips', route: 'clips', img: 'clips' }
  ]
  
  constructor(
    private router: Router,
    private userSerivce: UserService
  ) { }

  manageView(route: string): void {
    this.router.navigate(['/manage/' + route]);
  }
}
