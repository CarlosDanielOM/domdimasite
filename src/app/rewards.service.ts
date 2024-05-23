import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Reward } from './reward';
import { BasicReward } from './basic-reward';
import { LinksService } from './links.service';
import { AlertsService } from './alerts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private vipRewards: any;
  private customRewards: any;
  private songRewards: any;

  constructor(
    private userService: UserService,
    private linksService: LinksService,
    private alertsService: AlertsService,
    private matSnackBar: MatSnackBar
  ) { }

  async getVipRewards() {
    if (this.vipRewards) return this.vipRewards;

    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getId()}/vip`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Allow-Origin': '*'
      }
    });

    let json = await response.json();

    this.vipRewards = json.rewards;

    return json.rewards;

  }

  async getSongReward() {
    if(this.songRewards) return this.songRewards;

    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getId()}/song`);

    let json = await response.json();

    this.songRewards = json.rewards;

    return json.rewards;
    
  }

  async getCustomRewards() {
    if (this.customRewards) return this.customRewards;

    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getId()}/custom`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Allow-Origin': '*'
      }
    });

    let json = await response.json();

    this.customRewards = json.rewards;

    return json.rewards;
  }

  createBasicReward(data: BasicReward) {
    console.log('Creating basic reward');

  }

  async createReward(data: Reward) {
    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getId()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let json = await response.json();

    if (json.error) {
      return this.matSnackBar.open(json.message, 'Dismiss', { duration: 2500 });
    }

    this.matSnackBar.open('Reward Created Successfully', 'Dismiss', { duration: 2500 });

    return json.rewardData;

  }

  async deleteReward(rewardID: string) {
    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getId()}/${rewardID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let json = await response.json();

    if (json.error) {
      this.matSnackBar.open(json.message, 'Dismiss', { duration: 2500 });
    } else {
      this.matSnackBar.open('Reward Deleted Successfully', 'Dismiss', { duration: 2500 });
    }

  }

  async editReward(rewardID: string, data: Reward) {
    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getId()}/${rewardID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log(response);

    let json = await response.json();

    if (json.error) {
      return this.alertsService.createAlert(json.message, 'danger');
    }

    this.alertsService.createAlert("Reward Edited Successfully", 'success');

    return json.reward;
  }

}
