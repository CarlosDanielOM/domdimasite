import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  token: string = '';
  userData: any = {};

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private linksService: LinksService,
  ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    if (this.token) {
      this.checkIfUserExists(this.token);
    } else {
      this.token = this.location.normalize(this.location.path()).split('&')[0].split('=')[1] || '';

      if (!this.token) {
        //! User Denied Access
        this.router.navigate(['/']);
      }

      this.loginWithToken(this.token);
    }
  }

  loginWithToken(token: string): void {
    // Add a return statement to ensure the function returns a value
    let response: any = null;

    console.log({ token, where: 'loginWithToken', token2: this.token })

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Client-Id', 'jl9k3mi67pmrbl1bh67y07ezjdc4cf');


    response = this.http.get('https://api.twitch.tv/helix/users', { headers: headers }).subscribe((res: any) => {
      let user = res.data[0] || {};

      if (!user.id) {
        //! User Denied Access
        localStorage.clear();
        this.router.navigate(['/']);
      }

      this.http.post(`${this.linksService.getApiURL()}/login`, {
        name: user.login,
        email: user.email,
        id: user.id,
        action: 'login'
      }).subscribe((exists: any) => {

        if (exists.saved || exists.exists) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', user.login);
          localStorage.setItem('user_id', user.id);
          localStorage.setItem('display_name', user.display_name);
          localStorage.setItem('profile_image', user.profile_image_url);
          localStorage.setItem('email', user.email);
          this.router.navigate(['/dashboard']);
        } else {
          localStorage.clear();
          alert('There was a problem with your login, please try again.');
          this.router.navigate(['/']);
        }

      });
    });

  }

  checkIfUserExists(token: string): void {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Client-Id', 'jl9k3mi67pmrbl1bh67y07ezjdc4cf');

    this.http.get('https://api.twitch.tv/helix/users', { headers: headers }).subscribe((res: any) => {
      res = res.data[0] || {};

      if (res.error) {
        localStorage.clear();
        this.router.navigate(['/']);
      }

      this.http.post(`${this.linksService.getApiURL()}/login`, {
        name: res.login,
        email: res.email,
        id: res.id
      }).subscribe((exists: any) => {
        if (!exists.exists) {
          localStorage.clear();
          alert('There was a problem with your login, please try again.');
          this.router.navigate(['/']);
        }

        localStorage.setItem('token', token);
        localStorage.setItem('username', res.login);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('display_name', res.display_name);
        localStorage.setItem('profile_image', res.profile_image_url);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/dashboard']);
      });
    });

  }

}

//http://localhost:4200/login#access_token=m8el7ur3o30cqte2wsu3efykois2ah&scope=user%3Aread%3Aemail&token_type=bearer