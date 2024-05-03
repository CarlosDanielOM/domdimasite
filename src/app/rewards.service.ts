import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Reward } from './reward';
import { BasicReward } from './basic-reward';
import { LinksService } from './links.service';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private vipRewards: any;
  private customRewards: any;

  constructor(
    private userService: UserService,
    private linksService: LinksService,
    private alertsService: AlertsService
  ) { }

  async getVipRewards() {
    if (this.vipRewards) return this.vipRewards;

    let response = await fetch(`${this.linksService.getApiURL()}/rewards/vip/${this.userService.getUsername()}`, {
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

  async getCustomRewards() {
    if (this.customRewards) return this.customRewards;

    let response = await fetch(`${this.linksService.getApiURL()}/rewards/custom/${this.userService.getUsername()}`, {
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
    let response = await fetch(`${this.linksService.getApiURL()}/${this.userService.getUsername()}/create/reward`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let json = await response.json();

    if (json.error) {
      return this.alertsService.createAlert(json.message, 'danger');
    }

    this.alertsService.createAlert("Reward Created Successfully", 'success');

    return json.rewardData;

  }

  async deleteReward(rewardID: string) {
    let response = await fetch(`${this.linksService.getApiURL()}/${this.userService.getUsername()}/delete/reward/${rewardID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let json = await response.json();

    if (json.error) {
      return this.alertsService.createAlert(json.message, 'danger');
    }

    this.alertsService.createAlert("Reward Deleted Successfully", 'success');
  }

  async editReward(rewardID: string, data: Reward) {
    let response = await fetch(`${this.linksService.getApiURL()}/rewards/${this.userService.getUsername()}/${rewardID}`, {
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

    return json.data;
  }

}