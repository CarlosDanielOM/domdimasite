import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClipsModuleComponent } from './manage-clips-module.component';

describe('ManageClipsModuleComponent', () => {
  let component: ManageClipsModuleComponent;
  let fixture: ComponentFixture<ManageClipsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClipsModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageClipsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
