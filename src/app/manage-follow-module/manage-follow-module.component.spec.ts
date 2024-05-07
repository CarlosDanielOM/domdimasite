import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFollowModuleComponent } from './manage-follow-module.component';

describe('ManageFollowModuleComponent', () => {
  let component: ManageFollowModuleComponent;
  let fixture: ComponentFixture<ManageFollowModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFollowModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFollowModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
