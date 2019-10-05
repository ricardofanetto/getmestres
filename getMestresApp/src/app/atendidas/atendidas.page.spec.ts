import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendidasPage } from './atendidas.page';

describe('AtendidasPage', () => {
  let component: AtendidasPage;
  let fixture: ComponentFixture<AtendidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendidasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
