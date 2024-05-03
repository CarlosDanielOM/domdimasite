import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRedemptionsModuleComponent } from './manage-redemptions-module.component';

describe('ManageRedemptionsModuleComponent', () => {
  let component: ManageRedemptionsModuleComponent;
  let fixture: ComponentFixture<ManageRedemptionsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRedemptionsModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRedemptionsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
