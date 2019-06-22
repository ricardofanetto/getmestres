import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IPedidosPendentes } from '../../interfaces/IPedidosPendentes';




const DATA_MOCK: IPedidosPendentes[] = [
  { customerName: 'Joao da Silva', date: '01/01/2019', category: 'Construção', subCategory: 'Reforma' },
  { customerName: 'Joao da Silva', date: '01/01/2019', category: 'Construção', subCategory: 'Reforma' },
  { customerName: 'Joao da Silva', date: '01/01/2019', category: 'Construção', subCategory: 'Reforma' },
  { customerName: 'Joao da Silva', date: '01/01/2019', category: 'Construção', subCategory: 'Reforma' }
];

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.component.html',
  styleUrls: ['./pedidos-pendentes.component.scss']
})
export class PedidosPendentesComponent implements OnInit {
  columns: string[] = ['Nome', 'Data', 'Categoria', 'SubCategoria'];
  dataSource: MatTableDataSource<IPedidosPendentes> = new MatTableDataSource<IPedidosPendentes>(DATA_MOCK);

  constructor() { }

  ngOnInit() {
  }
}
