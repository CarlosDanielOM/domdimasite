import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReservedCommandsComponent } from './show-reserved-commands.component';

describe('ShowReservedCommandsComponent', () => {
  let component: ShowReservedCommandsComponent;
  let fixture: ComponentFixture<ShowReservedCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowReservedCommandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowReservedCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
