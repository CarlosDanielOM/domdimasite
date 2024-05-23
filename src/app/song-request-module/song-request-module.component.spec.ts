import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRequestModuleComponent } from './song-request-module.component';

describe('SongRequestModuleComponent', () => {
  let component: SongRequestModuleComponent;
  let fixture: ComponentFixture<SongRequestModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongRequestModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongRequestModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
