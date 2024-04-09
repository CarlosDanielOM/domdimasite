import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerSectionComponent } from './trigger-section.component';

describe('TriggerSectionComponent', () => {
  let component: TriggerSectionComponent;
  let fixture: ComponentFixture<TriggerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriggerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
