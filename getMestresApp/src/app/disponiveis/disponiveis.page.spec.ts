import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponiveisPage } from './disponiveis.page';

describe('DisponiveisPage', () => {
  let component: DisponiveisPage;
  let fixture: ComponentFixture<DisponiveisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponiveisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponiveisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
