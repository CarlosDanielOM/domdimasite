import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manage-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule ],
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
  ]

  username: string = '';
  
  constructor(
    private router: Router,
    private userSerivce: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.username = params.streamer;
    });
  }

  manageView(route: string): void {
    this.router.navigate([`/${this.username}/manage/${route}`]);
  }
}
