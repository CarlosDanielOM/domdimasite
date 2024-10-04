import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trigger } from '../../trigger';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FilesService } from '../../files.service';
import { TriggerFile } from '../../trigger-file';
import { AlertsService } from '../../alerts.service';
import { LinksService } from '../../links.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-trigger-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './trigger-form.component.html',
  styleUrl: './trigger-form.component.scss'
})
export class TriggerFormComponent {
  @Input() trigger: Trigger = {
    _id: '',
    name: '',
    file: '',
    type: 'redemption',
    cooldown: 0,
    cost: 1,
    date: new Date(),
    mediaType: 'video/mp4',
    volume: 100
  };
  @Input() editType: boolean = false;

  @Output() closeTriggerForm = new EventEmitter<void>();
  @Output() createTrigger = new EventEmitter<void>();

  types = [
    { id: 'redemption', value: 'Redemption', disabled: false },
    { id: 'bits', value: 'bits', disabled: true },
  ];

  premium: boolean = false;

  videoSrc: string = '';
  preview: boolean = false;

  files: TriggerFile[] = [];

  editForm = this.fb.group({
    _id: new FormControl(this.trigger._id),
    name: new FormControl(this.trigger.name),
    file: new FormControl(this.trigger.file),
    type: new FormControl(this.trigger.type),
    cooldown: new FormControl(this.trigger.cooldown),
    cost: new FormControl(this.trigger.cost),
    date: new FormControl(this.trigger.date),
    mediaType: new FormControl(this.trigger.mediaType),
    volume: new FormControl(this.trigger.volume),
    priceIncrease: [false],
    priceIncreaseAmount: [0],
    returnToOriginalCost: [false],
  });

  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private linksService: LinksService,
    private alertsService: AlertsService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.editForm.patchValue(this.trigger);
    this.files = await this.filesService.getTriggerFiles();
    this.trigger.file = this.files[0].name;
    this.editForm.patchValue({ file: this.files[0].name });
    if (this.userService.isPremium() || this.userService.isPremiumPlus()) {
      this.premium = true;
    }
  }

  closeForm() {
    this.closeTriggerForm.emit();
    this.editForm.reset();
  }

  async onSubmitEditForm() {
    let response, data;
    if (this.editType) {
      data = {
        name: this.editForm.value.name,
        cost: this.editForm.value.cost,
        prompt: null,
        cooldown: this.editForm.value.cooldown,
        volume: this.editForm.value.volume
      }

      response = await fetch(`${this.linksService.getApiURL()}/triggers/${this.userService.getId()}/${this.editForm.value._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.userService.getAuth()}`
        },
        body: JSON.stringify(data)
      });
    } else {
      data = {
        name: this.editForm.value.name,
        file: this.editForm.value.file,
        type: this.editForm.value.type,
        mediaType: this.editForm.value.mediaType,
        cost: this.editForm.value.cost,
        prompt: null,
        fileID: this.files.filter(f => f.name === this.editForm.value.file)[0]._id,
        cooldown: this.editForm.value.cooldown,
        volume: this.editForm.value.volume,
        priceIncrease: this.priceIncreaseAmount!.value ?? 0,
        returnToOriginalCost: this.returnToOriginalCost!.value ?? false,
        rewardType: 'trigger'
      }

      response = await fetch(`${this.linksService.getApiURL()}/triggers/${this.userService.getId()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.userService.getAuth()}`
        },
        body: JSON.stringify(data)
      });
    }

    let res = await response.json();

    if (res.error) {
      this.closeForm();
      return this.alertsService.createAlert(res.message, 'danger')
    };

    if (this.editType) {
      this.alertsService.createAlert('Trigger updated successfully', 'success');
    } else {
      this.alertsService.createAlert('Trigger created successfully', 'success');
    }

    this.createTrigger.emit();

    this.closeForm();
  }

  get priceIncrease() {
    return this.editForm.get('priceIncrease');
  }
  get priceIncreaseAmount() { return this.editForm.get('priceIncreaseAmount'); }
  get returnToOriginalCost() { return this.editForm.get('returnToOriginalCost'); }

}
