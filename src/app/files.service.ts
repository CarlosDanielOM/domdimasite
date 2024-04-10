import { Injectable } from '@angular/core';
import { TriggerFile } from './trigger-file';
import { LinksService } from './links.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  triggerFiles: TriggerFile[] = [];

  constructor(
    private linkService: LinksService,
    private userService: UserService,
  ) { }

  async loadTriggerFiles() {
    let res = await fetch(`${this.linkService.getApiURL()}/trigger/files/${this.userService.getUsername()}`);

    let data = await res.json();

    this.triggerFiles = data.files;
  }

  addTriggerFile(file: TriggerFile) {
    this.triggerFiles.push(file);
  }

  async getTriggerFiles(): Promise<TriggerFile[]> {
    if (this.triggerFiles.length === 0) {
      await this.loadTriggerFiles();
    }
    return this.triggerFiles;
  }

}
