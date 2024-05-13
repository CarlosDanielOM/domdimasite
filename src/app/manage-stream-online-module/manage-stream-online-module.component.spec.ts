import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStreamOnlineModuleComponent } from './manage-stream-online-module.component';

describe('ManageStreamOnlineModuleComponent', () => {
  let component: ManageStreamOnlineModuleComponent;
  let fixture: ComponentFixture<ManageStreamOnlineModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStreamOnlineModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageStreamOnlineModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
