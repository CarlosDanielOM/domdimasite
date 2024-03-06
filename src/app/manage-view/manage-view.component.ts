import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-view',
  standalone: true,
  imports: [],
  templateUrl: './manage-view.component.html',
  styleUrl: './manage-view.component.scss'
})
export class ManageViewComponent {
  constructor(
    private router: Router
  ) {}
  Triggers(): void {
    this.router.navigate(['/manage/triggers']);
  }
}
