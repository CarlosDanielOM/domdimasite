import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { AlertsService } from '../alerts.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { File } from 'buffer';
import { LinksService } from '../links.service';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-file-upload-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './file-upload-form.component.html',
  styleUrl: './file-upload-form.component.scss'
})
export class FileUploadFormComponent {
  @Output() closeFileUploadForm = new EventEmitter<void>();
  @Output() fileUploaded = new EventEmitter<void>();

  previewURL: string = '';

  uploadForm = this.fb.group({
    name: [''],
    file: [''],
  });

  file!: File;

  constructor(
    private userService: UserService,
    private alertsService: AlertsService,
    private fb: FormBuilder,
    private linksService: LinksService,
    private filesService: FilesService
  ) { }

  ngOnInit() {

  }

  closeForm() {
    this.uploadForm.reset();
    this.closeFileUploadForm.emit();
  }

  onSelectFile(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];

    this.file = file as File;

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      this.previewURL = e.target?.result as string;
    }
  }

  async uploadFile() {
    let formData = new FormData();
    formData.append('trigger', this.file as Blob);
    formData.append('triggerName', this.uploadForm.value.name as string);

    let response = await fetch(`${this.linksService.getApiURL()}/trigger/upload/${this.userService.getUsername()}`, {
      method: 'POST',
      headers: {
        'Content-Allow-Origin': '*'
      },
      body: formData
    });

    let data = await response.json();

    if (data.error) {
      this.closeForm();
      return this.alertsService.createAlert(data.reason, 'danger');
    }

    this.alertsService.createAlert('File uploaded successfully', 'success');
    this.fileUploaded.emit();
    this.closeForm();

  }

}
