import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerWrapperComponent } from './streamer-wrapper.component';

describe('StreamerWrapperComponent', () => {
  let component: StreamerWrapperComponent;
  let fixture: ComponentFixture<StreamerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamerWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
