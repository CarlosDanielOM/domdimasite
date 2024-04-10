import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerFormComponent } from './trigger-form.component';

describe('TriggerFormComponent', () => {
  let component: TriggerFormComponent;
  let fixture: ComponentFixture<TriggerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
