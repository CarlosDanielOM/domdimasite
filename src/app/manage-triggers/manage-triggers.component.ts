import { Component, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'
import { TriggerSectionComponent } from './trigger-section/trigger-section.component';
import { FileSectionComponent } from './file-section/file-section.component';
import { Trigger } from '../trigger';
import { TriggerFormComponent } from './trigger-form/trigger-form.component';
import { FileUploadFormComponent } from '../file-upload-form/file-upload-form.component';
import { UserService } from '../user.service';
import { LinksService } from '../links.service';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-manage-triggers',
  standalone: true,
  imports: [NgFor, TriggerSectionComponent, FileSectionComponent, TriggerFormComponent, NgIf, FileUploadFormComponent],
  templateUrl: './manage-triggers.component.html',
  styleUrl: './manage-triggers.component.scss'
})
export class ManageTriggersComponent {

  @ViewChild(TriggerSectionComponent)
  triggerSection!: TriggerSectionComponent;

  @ViewChild(FileSectionComponent) FileSectionComponent!: FileSectionComponent;

  showForm: boolean = false;
  showUploadForm: boolean = false;

  obsLink: string = '';

  editType: boolean = false;

  editTrigger: Trigger = {
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

  constructor(
    private userService: UserService,
    private linksService: LinksService,
    private alertsService: AlertsService
  ) {}

  ngOnInit() {
    this.obsLink = `${this.linksService.getApiURL()}/overlays/triggers/${this.userService.getId()}`
  }

  startEditTrigger(trigger: Trigger) {
    this.editTrigger = trigger;

    this.showForm = true;
    this.editType = true;
  }

  startUploadFile() {
    this.showUploadForm = true;
  }

  updateTriggers() {
    this.triggerSection.updateTriggerList();
  }

  updateFiles() {
    this.FileSectionComponent.getFileList();
  }

  createTrigger() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editType = false;
  }

  closeUploadForm() {
    this.showUploadForm = false;
  }

  copyLink() {
    navigator.clipboard.writeText(this.obsLink);
    this.alertsService.createAlert('Link copied to clipboard', 'success');
  }
  
}