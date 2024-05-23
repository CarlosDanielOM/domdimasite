import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manage-view',
  standalone: true,
  imports: [CommonModule, MatCardModule ],
  templateUrl: './manage-view.component.html',
  styleUrl: './manage-view.component.scss'
})
export class ManageViewComponent {

  options = [
    { name: 'Triggers', route: 'triggers', img: 'triggers' },
    { name: 'VIP', route: 'vip', img: 'vip' },
    { name: 'Clips', route: 'clips', img: 'clips' },
    { name: 'Redemptions', route: 'redemptions', img: 'redemptions' },
    { name: 'Follows', route: 'follows', img: 'follows' },
    { name: 'Stream Online', route: 'stream-online', img: 'stream-online' },
    { name: 'Stream Offline', route: 'stream-offline', img: 'stream-offline' },
    { name: 'Raids', route: 'raids', img: 'raids' },
    { name: 'Ad Break', route: 'ad-break', img: 'ad-break' },
    { name: 'Song Request', route: 'song-request', img: 'song-request' },
  ]
  
  constructor(
    private router: Router,
    private userSerivce: UserService
  ) { }

  manageView(route: string): void {
    this.router.navigate(['/manage/' + route]);
  }
}
