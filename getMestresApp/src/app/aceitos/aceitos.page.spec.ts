import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceitosPage } from './aceitos.page';

describe('AceitosPage', () => {
  let component: AceitosPage;
  let fixture: ComponentFixture<AceitosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceitosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
