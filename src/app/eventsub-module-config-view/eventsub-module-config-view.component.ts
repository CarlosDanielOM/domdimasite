import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Eventsub } from '../eventsub';
import { CommonModule} from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventsubService } from '../eventsub.service';

@Component({
  selector: 'app-eventsub-module-config-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eventsub-module-config-view.component.html',
  styleUrl: './eventsub-module-config-view.component.scss'
})
export class EventsubModuleConfigViewComponent {
  @Input() exists: boolean = true;
  @Input() eventsub: Eventsub = <Eventsub>{};
  @Input() helpers: any[] = [];
  @Input() eventType: string[] = [];

  @Output() createEventsub: EventEmitter<Eventsub> = new EventEmitter();
  @Output() updateEventsub: EventEmitter<Eventsub> = new EventEmitter();

  // eventsub: Eventsub = <Eventsub>{};

  eventsubForm = this.fb.group({
    _id: this.eventsub._id,
    type: this.eventsub.type,
    version: this.eventsub.version,
    condition: this.eventsub.condition,
    enabled: this.eventsub.enabled,
    message: this.eventsub.message,
    endMessage: this.eventsub.endMessage,
    endEnabled: this.eventsub.endEnabled
  });

  constructor(
    private fb: FormBuilder,
    private eventsubService: EventsubService
  ) {}
  
  async ngOnInit() {
    setTimeout(() => {
      this.fillForm();
    }, 300)
  }

  get _id() {return this.eventsubForm.get('_id')}
  get type() {return this.eventsubForm.get('type')}
  get version() {return this.eventsubForm.get('version')}
  get condition() {return this.eventsubForm.get('condition')}
  get enabled() {return this.eventsubForm.get('enabled')}
  get message() {return this.eventsubForm.get('message')}
  get endMessage() {return this.eventsubForm.get('endMessage')}
  get endEnabled() {return this.eventsubForm.get('endEnabled')}
  
  fillForm() {
    this.eventsubForm.patchValue({
      _id: this.eventsub._id,
      type: this.eventsub.type,
      version: this.eventsub.version,
      condition: this.eventsub.condition,
      enabled: this.eventsub.enabled,
      message: this.eventsub.message,
      endMessage: this.eventsub.endMessage,
      endEnabled: this.eventsub.endEnabled
    });
  }
}
