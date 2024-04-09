import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LinksService } from '../links.service';
import { UserService } from '../user.service';
import { AlertsService } from '../alerts.service';

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
    private userService: UserService,
    private alertsService: AlertsService
  ) {
  }

  ngOnInit() {
    if (this.userService.restoreUser()) {
      this.token = this.userService.getToken();
    }
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

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Client-Id', 'jl9k3mi67pmrbl1bh67y07ezjdc4cf');


    response = this.http.get('https://api.twitch.tv/helix/users', { headers: headers }).subscribe((res: any) => {
      let user = res.data[0] || {};

      if (!user.id) {
        //! User Denied Access
        this.userService.deleteData();
        this.router.navigate(['/']);
      }

      this.http.post(`${this.linksService.getApiURL()}/login`, {
        name: user.login,
        email: user.email,
        id: user.id,
        action: 'login'
      }).subscribe((exists: any) => {

        if (exists.saved || exists.exists) {
          let UserInfoData = {
            token: token,
            username: user.login,
            id: user.id,
            display_name: user.display_name,
            profile_image: user.profile_image_url,
            email: user.email,
            role: 'none'
          }
          this.http.post(`${this.linksService.getApiURL()}/premium`, {
            channel: user.login,
            channelID: user.id
          }).subscribe((premium: any) => {
            if (premium.error) {
              this.userService.deleteData();
              this.router.navigate(['/']);
            }
            UserInfoData.role = premium.premium || 'none';
            this.userService.createUser(UserInfoData);
            this.router.navigate(['/dashboard']);
          });
        } else {
          this.userService.deleteData();
          this.alertsService.createAlert('There was a problem with your login, please try again.', 'error');
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
        this.userService.deleteData();
        this.router.navigate(['/']);
      }

      this.http.post(`${this.linksService.getApiURL()}/login`, {
        name: res.login,
        email: res.email,
        id: res.id
      }).subscribe((exists: any) => {
        if (!exists.exists) {
          this.userService.deleteData();
          this.alertsService.createAlert('There was a problem with your login, please try again.', 'error');
          this.router.navigate(['/']);
        }

        let UserInfoData = {
          token: token,
          username: res.login,
          id: res.id,
          display_name: res.display_name,
          profile_image: res.profile_image_url,
          email: res.email,
          role: 'none'
        }
        this.userService.createUser(UserInfoData);
        this.router.navigate(['/dashboard']);
      });
    });

  }

}

//http://localhost:4200/login#access_token=m8el7ur3o30cqte2wsu3efykois2ah&scope=user%3Aread%3Aemail&token_type=bearer