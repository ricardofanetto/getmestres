import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSolicitacaoSubCategoriaPage } from './nova-solicitacao-sub-categoria.page';

describe('NovaSolicitacaoSubCategoriaPage', () => {
  let component: NovaSolicitacaoSubCategoriaPage;
  let fixture: ComponentFixture<NovaSolicitacaoSubCategoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaSolicitacaoSubCategoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSolicitacaoSubCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
