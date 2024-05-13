import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelRaidModuleComponent } from './manage-channel-raid-module.component';

describe('ManageChannelRaidModuleComponent', () => {
  let component: ManageChannelRaidModuleComponent;
  let fixture: ComponentFixture<ManageChannelRaidModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelRaidModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageChannelRaidModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
