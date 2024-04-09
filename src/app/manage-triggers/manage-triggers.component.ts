import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
import { TriggerSectionComponent } from './trigger-section/trigger-section.component';
import { FileSectionComponent } from './file-section/file-section.component';

@Component({
  selector: 'app-manage-triggers',
  standalone: true,
  imports: [NgFor, TriggerSectionComponent, FileSectionComponent],
  templateUrl: './manage-triggers.component.html',
  styleUrl: './manage-triggers.component.scss'
})
export class ManageTriggersComponent {
}