import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDashboardComponent } from './cards-dashboard.component';

describe('CardsDashboardComponent', () => {
  let component: CardsDashboardComponent;
  let fixture: ComponentFixture<CardsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
