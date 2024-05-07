import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsubModuleConfigViewComponent } from './eventsub-module-config-view.component';

describe('EventsubModuleConfigViewComponent', () => {
  let component: EventsubModuleConfigViewComponent;
  let fixture: ComponentFixture<EventsubModuleConfigViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsubModuleConfigViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsubModuleConfigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
