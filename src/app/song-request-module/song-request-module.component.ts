import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RewardsService } from '../rewards.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Reward } from '../reward';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-song-request-module',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, MatSlideToggleModule, MatButtonModule, MatCardModule],
  templateUrl: './song-request-module.component.html',
  styleUrl: './song-request-module.component.scss'
})
export class SongRequestModuleComponent {
  showForm: boolean = false;
  cardAvailable: boolean = false;
  songReward: any = {
    _id: '',
    title: '',
    prompt: '',
    cost: 0,
    skipQueue: false,
    priceIncrease: 0,
    returnToOriginalCost: false,
    rewardMessage: '',
    rewardType: '',
    cooldown: 0,
    rewardID: ''
  }

  editForm: boolean = false;

  songRequestForm = this.fb.group({
    _id: [''],
    title: ['Song Request', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    prompt: [''],
    cost: [1, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$'), Validators.max(999999999)]],
    skipQueue: [false],
    priceIncrease: [false],
    priceIncreaseAmount: [0],
    returnToOriginalPrice: [false],
    message: [''],
    cooldown: [0, [Validators.min(0), Validators.pattern('^[0-9]*$')]],
    rewardType: ['song']
  })

  constructor(
    private fb: FormBuilder,
    private rewardService: RewardsService
  ) {}

  async ngOnInit(): Promise<void> {
    let reward = await this.rewardService.getSongReward();
    reward.length > 0 ? this.cardAvailable = true : this.cardAvailable = false;
    this.songReward = reward[0];
  }

  showFormToggle(): void {
    this.showForm = !this.showForm;

    if(!this.showForm) {
      this.editForm = false;
      this.songRequestForm.reset();
    }
  }

  startEditForm() {
    this.songRequestForm.patchValue({
      _id: this.songReward._id,
      title: this.songReward.rewardTitle,
      prompt: this.songReward.rewardPrompt,
      cost: this.songReward.rewardCost,
      skipQueue: this.songReward.skipQueue ?? false,
      priceIncrease: this.songReward.rewardCostChange > 0 ? true : false,
      priceIncreaseAmount: this.songReward.rewardCostChange,
      returnToOriginalPrice: this.songReward.returnToOriginalCost ?? false,
      message: this.songReward.rewardMessage,
      cooldown: this.songReward.cooldown,
      rewardType: this.songReward.rewardType
    });

    this.editForm = true;
    this.showFormToggle();
  }
  
  async songRequestSubmit(): Promise<void> {
    if (this.songRequestForm.valid) {
      let rewardData: any = {
        title: this.title!.value ?? 'Song Request',
        prompt: this.prompt!.value ?? '',
        cost: this.cost!.value ?? 1,
        skipQueue: this.skipQueue!.value ?? false,
        priceIncrease: this.priceIncreaseAmount!.value ?? 0,
        returnToOriginalCost: this.returnToOriginalPrice!.value ?? false,
        message: this.message!.value ?? '',
        rewardType: this.rewardType!.value ?? 'song',
        cooldown: this.cooldown!.value ?? 0,
        userInput: true
      }
      
      if(this.cooldown!.value ?? 0 > 0) {
        rewardData.global_cooldown_seconds = this.cooldown!.value ?? 0;
        rewardData.is_global_cooldown_enabled = true;
      }

      let response = await this.rewardService.createReward(rewardData);

      let reward: Reward = {
        _id: response.rewardID,
        title: response.rewardTitle,
        cost: response.rewardCost,
        skipQueue: response.skipQueue ?? false,
        prompt: response.rewardPrompt,
        priceIncrease: response.rewardCostChange,
        returnToOriginalCost: response.returnToOriginalCost,
        rewardMessage: response.rewardMessage,
        rewardType: response.rewardType,
        cooldown: response.global_cooldown_seconds
      }

      this.songReward = reward;
      this.songReward.rewardID = response.rewardID;
      this.cardAvailable = true;

      this.showFormToggle();
      
    }
  }

  deleteReward(): void {
    let answer = confirm('Are you sure you want to delete this reward?');
    if (!answer) return;
    this.rewardService.deleteReward(this.songReward.rewardID);
    this.showForm = false;
    this.cardAvailable = false;
  }
  
  get _id() { return this.songRequestForm.get('_id'); }
  get title() { return this.songRequestForm.get('title'); }
  get prompt() { return this.songRequestForm.get('prompt'); }
  get cost() { return this.songRequestForm.get('cost'); }
  get skipQueue() { return this.songRequestForm.get('skipQueue'); }
  get priceIncrease() { return this.songRequestForm.get('priceIncrease'); }
  get priceIncreaseAmount() { return this.songRequestForm.get('priceIncreaseAmount'); }
  get returnToOriginalPrice() { return this.songRequestForm.get('returnToOriginalPrice'); }
  get message() { return this.songRequestForm.get('message'); }
  get cooldown() { return this.songRequestForm.get('cooldown'); }
  get rewardType() { return this.songRequestForm.get('rewardType'); }
  
}
