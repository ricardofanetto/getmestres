import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSolicitacaoPerguntasPage } from './nova-solicitacao-perguntas.page';

describe('NovaSolicitacaoPerguntasPage', () => {
  let component: NovaSolicitacaoPerguntasPage;
  let fixture: ComponentFixture<NovaSolicitacaoPerguntasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaSolicitacaoPerguntasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSolicitacaoPerguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
