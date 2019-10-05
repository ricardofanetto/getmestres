import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesPage } from './solicitacoes.page';

describe('SolicitacoesPage', () => {
  let component: SolicitacoesPage;
  let fixture: ComponentFixture<SolicitacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
