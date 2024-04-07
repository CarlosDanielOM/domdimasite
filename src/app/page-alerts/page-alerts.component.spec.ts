import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAlertsComponent } from './page-alerts.component';

describe('PageAlertsComponent', () => {
  let component: PageAlertsComponent;
  let fixture: ComponentFixture<PageAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAlertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
