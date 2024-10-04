import { Component } from '@angular/core';
import { TriggerFile } from '../../trigger-file';
import { UserService } from '../../user.service';
import { LinksService } from '../../links.service';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../alerts.service';
import { FilesService } from '../../files.service';

@Component({
  selector: 'app-file-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-section.component.html',
  styleUrl: './file-section.component.scss'
})
export class FileSectionComponent {

  filesList: TriggerFile[] = [];

  constructor(
    private userService: UserService,
    private linkService: LinksService,
    private alertsService: AlertsService,
    private filesService: FilesService
  ) { }

  async ngOnInit() {
    this.filesList = await this.getFileList();
  }

  async getFileList(): Promise<TriggerFile[]> {
    let res = await this.filesService.getTriggerFiles();

    return res;
  }

  async deleteFile(id: String) {
    let userAction = confirm('Are you sure you want to delete this file?');
    if (!userAction) return;

    let res = await fetch(`${this.linkService.getApiURL()}/triggers/files/${this.userService.getId()}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.userService.getAuth()}`
      }
    });

    let data = await res.json();

    if (data.error) {
      this.alertsService.createAlert(data.reason, 'danger');
      return;
    }

    this.alertsService.createAlert('File deleted successfully', 'success');

  }

}
