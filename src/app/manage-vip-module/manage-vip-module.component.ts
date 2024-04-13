import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-vip-module',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-vip-module.component.html',
  styleUrl: './manage-vip-module.component.scss'
})
export class ManageVipModuleComponent {
  advancedOptions = false;

  vipForm = this.fb.group({});


  constructor(
    private fb: FormBuilder
  ) { }

}
