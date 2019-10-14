import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSolicitacaoPage } from './nova-solicitacao.page';

describe('NovaSolicitacaoPage', () => {
  let component: NovaSolicitacaoPage;
  let fixture: ComponentFixture<NovaSolicitacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaSolicitacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSolicitacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
