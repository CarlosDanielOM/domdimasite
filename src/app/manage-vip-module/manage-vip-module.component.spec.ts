import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVipModuleComponent } from './manage-vip-module.component';

describe('ManageVipModuleComponent', () => {
  let component: ManageVipModuleComponent;
  let fixture: ComponentFixture<ManageVipModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVipModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageVipModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
