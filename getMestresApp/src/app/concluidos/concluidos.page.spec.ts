import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcluidosPage } from './concluidos.page';

describe('ConcluidosPage', () => {
  let component: ConcluidosPage;
  let fixture: ComponentFixture<ConcluidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcluidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcluidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
