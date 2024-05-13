import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdBreakModuleComponent } from './manage-ad-break-module.component';

describe('ManageAdBreakModuleComponent', () => {
  let component: ManageAdBreakModuleComponent;
  let fixture: ComponentFixture<ManageAdBreakModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAdBreakModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAdBreakModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
