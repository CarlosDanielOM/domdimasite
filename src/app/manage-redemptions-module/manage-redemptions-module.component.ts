import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AlertsService } from '../alerts.service';
import { LinksService } from '../links.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RewardsService } from '../rewards.service';
import { Reward } from '../reward';

@Component({
  selector: 'app-manage-redemptions-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-redemptions-module.component.html',
  styleUrl: './manage-redemptions-module.component.scss'
})
export class ManageRedemptionsModuleComponent {

  showForm = false;
  premium: boolean = false;

  customRewards: Reward[] = [];

  editForm: boolean = false;
  editId: string = '';

  disabled = true;
  
  redemptionForm = this.fb.group({
    _id: [''],
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
    cost: [1, [Validators.required, Validators.min(1)]],
    skipQueue: [false],
    prompt: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    priceIncrease: [false],
    priceIncreaseAmount: [0],
    returnToOriginalCost: [false],
    rewardMessage: [''],
    rewardType: ['custom'],
    cooldown: [0, [Validators.min(0), Validators.pattern('^[0-9]*$')]],
  });

  constructor(
    private userService: UserService,
    private alertsService: AlertsService,
    private linksService: LinksService,
    private fb: FormBuilder,
    private rewardsService: RewardsService
  ) {}

  async ngOnInit() {
    if (this.userService.isPremium() || this.userService.isPremiumPlus()) {
      this.premium = true;
    }
    await this.getRedemptions();
  }

  async getRedemptions() {
      let res = await this.rewardsService.getCustomRewards();
      for (let data of res) {
        let reward: Reward = {
          _id: data.rewardID,
          title: data.rewardTitle,
          cost: data.rewardCost,
          skipQueue: data.skipQueue ?? false,
          prompt: data.rewardPrompt,
          priceIncrease: data.rewardCostChange,
          returnToOriginalCost: data.returnToOriginalCost,
          rewardMessage: data.rewardMessage,
          rewardType: 'custom',
          isEnabled: data.rewardIsEnabled,
          cooldown: data.cooldown ?? 0
        };
        this.customRewards.push(reward);
      }
  }

  showFormToggle(): void {
    this.showForm = !this.showForm;
    if(!this.showForm) {
      this.redemptionForm.reset();
    }
    this.editId = '';
    this.editForm = false;
  }

  async createRedemption(): Promise<void> {
    if(!this.editForm) {
      let rewardData: Reward = {
        title: this.title!.value ?? '',
        cost: this.cost!.value ?? 0,
        skipQueue: this.skipQueue!.value ?? false,
        prompt: this.prompt!.value ?? '',
        priceIncrease: this.priceIncreaseAmount!.value ?? 0,
        returnToOriginalCost: this.returnToOriginalCost!.value ?? false,
        rewardMessage: this.rewardMessage!.value ?? '',
        rewardType: this.redemptionForm.get('rewardType')?.value ?? 'custom',
        cooldown: this.cooldown!.value ?? 0
      }

      if(this.cooldown!.value ?? 0 > 0) {
        rewardData.is_global_cooldown_enabled = true;
        rewardData.global_cooldown_seconds = this.cooldown!.value ?? 0;
      }
  
      let res = await this.rewardsService.createReward(rewardData);
      let reward: Reward = {
        _id: res.rewardID,
        title: res.rewardTitle,
        cost: res.rewardCost,
        skipQueue: res.skipQueue ?? false,
        prompt: res.rewardPrompt,
        priceIncrease: res.rewardCostChange,
        returnToOriginalCost: res.returnToOriginalCost,
        rewardMessage: res.rewardMessage,
        rewardType: 'custom',
        isEnabled: res.rewardIsEnabled,
        cooldown: res.cooldown ?? 0
      };
      this.customRewards.push(reward);
      this.editForm = false;
      this.editId = '';
      this.showFormToggle();
    } else {
      let rewardData: Reward = {
        _id: this.editId,
        title: this.title!.value ?? '',
        cost: this.cost!.value ?? 0,
        skipQueue: this.skipQueue!.value ?? false,
        prompt: this.prompt!.value ?? '',
        priceIncrease: this.priceIncreaseAmount!.value ?? 0,
        returnToOriginalCost: this.returnToOriginalCost!.value ?? false,
        rewardMessage: this.rewardMessage!.value ?? '',
        rewardType: this.redemptionForm.get('rewardType')?.value ?? 'custom',
        cooldown: this.cooldown!.value ?? 0
      }

      if(this.cooldown!.value ?? 0 > 0) {
        rewardData.is_global_cooldown_enabled = true;
        rewardData.global_cooldown_seconds = this.cooldown!.value ?? 0;
      } else {
        rewardData.is_global_cooldown_enabled = false;
        rewardData.global_cooldown_seconds = 0;
      }
  
      let res = await this.rewardsService.editReward(rewardData._id!, rewardData);

      let reward: Reward = {
        _id: res.rewardID,
        title: res.rewardTitle,
        cost: res.rewardCost,
        skipQueue: res.skipQueue ?? false,
        prompt: res.rewardPrompt,
        priceIncrease: res.rewardCostChange,
        returnToOriginalCost: res.returnToOriginalCost,
        rewardMessage: res.rewardMessage,
        rewardType: 'custom',
        isEnabled: res.rewardIsEnabled,
        cooldown: res.cooldown ?? 0
      };

      let index = this.customRewards.findIndex(r => r._id === res.rewardID);
      this.customRewards[index] = reward;

      this.editForm = false;
      this.editId = '';
      this.showFormToggle();

    }
  }
  
  async deleteRedemption(reward: Reward): Promise<void> {
    let confirm = window.confirm(`Are you sure you want to delete ${reward.title}?`);
    if(!confirm) return;
    await this.rewardsService.deleteReward(reward._id!);
    this.customRewards = this.customRewards.filter(r => r._id !== reward._id);
  }

  editRedemption(reward: Reward): void {
    this.redemptionForm.patchValue({
      _id: reward._id,
      title: reward.title,
      cost: reward.cost,
      skipQueue: reward.skipQueue,
      prompt: reward.prompt,
      priceIncrease: reward.priceIncrease > 0 ? true : false,
      priceIncreaseAmount: reward.priceIncrease,
      returnToOriginalCost: reward.returnToOriginalCost,
      rewardMessage: reward.rewardMessage,
      rewardType: reward.rewardType,
      cooldown: reward.cooldown
    });
    this.showForm = true;
    this.editForm = true;
    this.editId = reward._id!;
  }
  
  get title() { return this.redemptionForm.get('title'); }
  get cost() { return this.redemptionForm.get('cost'); }
  get skipQueue() { return this.redemptionForm.get('skipQueue'); }
  get prompt() { return this.redemptionForm.get('prompt'); }
  get priceIncrease() { return this.redemptionForm.get('priceIncrease'); }
  get priceIncreaseAmount() { return this.redemptionForm.get('priceIncreaseAmount'); }
  get returnToOriginalCost() { return this.redemptionForm.get('returnToOriginalCost'); }
  get rewardMessage() { return this.redemptionForm.get('rewardMessage'); }
  get cooldown() { return this.redemptionForm.get('cooldown'); }
  
}
