import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Eventsub } from '../eventsub';
import { CommonModule} from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsubService } from '../eventsub.service';
import { AlertsService } from '../alerts.service';

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
  @Output() deleteEventsub = new EventEmitter();

  eventsubForm = this.fb.group({
    _id: [this.eventsub._id, [Validators.required]],
    type: [this.eventsub.type, [Validators.required]],
    version: [this.eventsub.version, [Validators.required]],
    condition: [this.eventsub.condition, [Validators.required]],
    enabled: [this.eventsub.enabled, [Validators.required]],
    message: [this.eventsub.message, [Validators.required]],
    endMessage: [this.eventsub.endMessage, [Validators.required]],
    endEnabled: [this.eventsub.endEnabled, [Validators.required]],
    minViewers: [this.eventsub.minViewers, [Validators.required]]
  });

  raidEnabled: boolean = false;
  adBreakEnabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventsubService: EventsubService,
    private alertsService: AlertsService
  ) {}
  
  async ngOnInit() {
    setTimeout(() => {
      this.fillForm();
      console.log({event: this.eventsub})
      this.eventType.forEach((type) => {
        if (type === 'raid') {
          this.raidEnabled = true;
        }
        if(type == 'ad_break') {
          this.adBreakEnabled = true;
        }
      });
    }, 400)
  }

  get _id() {return this.eventsubForm.get('_id')}
  get type() {return this.eventsubForm.get('type')}
  get version() {return this.eventsubForm.get('version')}
  get condition() {return this.eventsubForm.get('condition')}
  get enabled() {return this.eventsubForm.get('enabled')}
  get message() {return this.eventsubForm.get('message')}
  get endMessage() {return this.eventsubForm.get('endMessage')}
  get endEnabled() {return this.eventsubForm.get('endEnabled')}
  get minViewers() {return this.eventsubForm.get('minViewers')}
  
  fillForm() {
    this.eventsubForm.patchValue({
      _id: this.eventsub._id,
      type: this.eventsub.type,
      version: this.eventsub.version,
      condition: this.eventsub.condition as any,
      enabled: this.eventsub.enabled,
      message: this.eventsub.message,
      endMessage: this.eventsub.endMessage,
      endEnabled: this.eventsub.endEnabled,
      minViewers: this.eventsub.minViewers
    });
  }

  onSubmit() {
    this.eventsub.message = this.eventsubForm.value.message ?? this.eventsub.message;
    this.eventsub.endMessage = this.eventsubForm.value.endMessage ?? this.eventsub.endMessage;
    this.eventsub.endEnabled = this.eventsubForm.value.endEnabled ?? this.eventsub.endEnabled;
    this.eventsub.enabled = this.eventsubForm.value.enabled ?? this.eventsub.enabled;
    this.eventsub.minViewers = this.eventsubForm.value.minViewers ?? this.eventsub.minViewers;
    this.updateEventsub.emit(this.eventsub);
  }

  createEventsubFun() {
    this.createEventsub.emit();
  }

  deleteEventsubFun() {
    this.deleteEventsub.emit(this.eventsub._id);
  }
}
