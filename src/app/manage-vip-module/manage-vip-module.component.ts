import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AlertsService } from '../alerts.service';
import { RewardsService } from '../rewards.service';
import { Reward } from '../reward';

@Component({
  selector: 'app-manage-vip-module',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-vip-module.component.html',
  styleUrl: './manage-vip-module.component.scss'
})
export class ManageVipModuleComponent {
  advancedOptions = false;
  premium: boolean = false;
  premiumPlus: boolean = false;

  vipRewards: any[] = [];

  disbaled = true;
  showForm = false;

  disbaleCreate = false;

  vipForm = this.fb.group({
    name: ['VIP', [Validators.required, Validators.pattern('^(VIP)\s?[a-zA-Z0-9]*$'), Validators.maxLength(45)]],
    prompt: ['', []],
    cost: [1, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
    skipQueue: [false, [Validators.required]],
    priceIncrease: [false, [Validators.required]],
    priceIncreaseAmount: [0, [Validators.pattern('^[0-9]*$')]],
    returnToOriginalPrice: [false, [Validators.required]],
    message: ['', []],
    duration: [0, [Validators.pattern('^[0-9]*$')]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertsService: AlertsService,
    private rewardsService: RewardsService
  ) { }

  async ngOnInit() {
    if (this.userService.isPremium()) {
      this.premium = true;
    }
    if (this.userService.isPremiumPlus()) {
      this.premium = true;
      this.premiumPlus = true;
    }

    let rewardsVIP = await this.rewardsService.getVipRewards();
    let rewardsVIPData = rewardsVIP.map((reward: any) => {
      return {
        rewardID: reward.rewardID,
        title: reward.rewardTitle,
        cost: reward.rewardCost,
        skipQueue: reward.skipQueue,
        prompt: reward.rewardPrompt,
        priceIncrease: reward.rewardCostChange,
        returnToOriginalCost: reward.returnToOriginalCost,
        message: reward.rewardMessage,
        rewardType: reward.rewardType ?? 'vip',
        rewardIsEnabled: reward.rewardIsEnabled
      }
    });

    this.vipRewards = rewardsVIPData;

    console.log({ vips: this.vipRewards })

    if (this.vipRewards.length >= 1 && !this.premiumPlus) {
      this.disbaleCreate = true;
    }
  }

  async onSubmit() {
    if (!this.priceIncrease!.value) {
      this.vipForm.patchValue({ priceIncreaseAmount: 0 });
      this.vipForm.patchValue({ returnToOriginalPrice: false });
    }
    let rewardData: Reward = {
      title: this.name!.value ?? 'VIP',
      cost: this.cost!.value ?? 1,
      skipQueue: this.skipQueue!.value ?? false,
      prompt: this.prompt!.value ?? '',
      priceIncrease: this.priceIncreaseAmount!.value ?? 0,
      returnToOriginalCost: this.returnToOriginalPrice!.value ?? false,
      rewardMessage: this.message!.value ?? '',
      rewardType: 'vip',
    }

    this.alertsService.createAlert('Creating VIP module...', 'info');
    let newReward = await this.rewardsService.createReward(rewardData);
    let newRewardData = {
      title: newReward.rewardTitle,
      cost: newReward.rewardCost,
      skipQueue: newReward.skipQueue,
      prompt: newReward.rewardPrompt,
      priceIncrease: newReward.rewardCostChange,
      returnToOriginalCost: newReward.returnToOriginalCost,
      rewardMessage: newReward.rewardMessage,
      rewardType: newReward.rewardType ?? 'vip',
      rewardIsEnabled: newReward.rewardIsEnabled
    }
    this.vipRewards.push(newRewardData);
    this.closeForm();
  }

  showFormBtn() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.vipForm.reset();
  }

  toggleEnable() {
    this.alertsService.createAlert('Toggling VIP module...', 'info');
  }

  editReward(reward: any) {
    this.vipForm.patchValue({ name: reward.title });
    this.vipForm.patchValue({ cost: reward.cost });
    this.vipForm.patchValue({ skipQueue: reward.skipQueue });
    this.vipForm.patchValue({ prompt: reward.prompt });
    this.vipForm.patchValue({ priceIncrease: reward.priceIncrease });
    this.vipForm.patchValue({ priceIncreaseAmount: reward.priceIncrease });
    this.vipForm.patchValue({ returnToOriginalPrice: reward.returnToOriginalCost });
    this.vipForm.patchValue({ message: reward.message });
    this.vipForm.patchValue({ duration: reward.duration });

    this.showForm = true;
  }

  async deleteReward(reward: any) {
    let response = confirm('Are you sure you want to delete this reward?');
    if (!response) return;
    await this.rewardsService.deleteReward(reward.rewardID);
    this.vipRewards = this.vipRewards.filter((r) => r.rewardID !== reward.rewardID);
  }

  //? GETTERS ?//

  get name() { return this.vipForm.get('name'); }
  get prompt() { return this.vipForm.get('prompt'); }
  get cost() { return this.vipForm.get('cost'); }
  get skipQueue() { return this.vipForm.get('skipQueue'); }
  get priceIncrease() { return this.vipForm.get('priceIncrease'); }
  get priceIncreaseAmount() { return this.vipForm.get('priceIncreaseAmount'); }
  get returnToOriginalPrice() { return this.vipForm.get('returnToOriginalPrice'); }
  get message() { return this.vipForm.get('message'); }
  get duration() { return this.vipForm.get('duration'); }

}
