import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
