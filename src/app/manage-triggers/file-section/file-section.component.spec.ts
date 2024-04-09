import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSectionComponent } from './file-section.component';

describe('FileSectionComponent', () => {
  let component: FileSectionComponent;
  let fixture: ComponentFixture<FileSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
