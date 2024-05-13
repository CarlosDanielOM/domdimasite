import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStreamOfflineModuleComponent } from './manage-stream-offline-module.component';

describe('ManageStreamOfflineModuleComponent', () => {
  let component: ManageStreamOfflineModuleComponent;
  let fixture: ComponentFixture<ManageStreamOfflineModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStreamOfflineModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageStreamOfflineModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
