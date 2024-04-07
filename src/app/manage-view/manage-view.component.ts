import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-view',
  standalone: true,
  imports: [],
  templateUrl: './manage-view.component.html',
  styleUrl: './manage-view.component.scss'
})
export class ManageViewComponent {
  constructor(
    private router: Router,
    private userSerivce: UserService
  ) { }

  ngOnInit() {
    if (!this.userSerivce.getUser()) {
      this.userSerivce.deleteData();
      this.router.navigate(['/']);
    }
  }

  Triggers(): void {
    this.router.navigate(['/manage/triggers']);
  }
  VIP(): void {
    this.router.navigate(['/manage/vip']);
  }
}
