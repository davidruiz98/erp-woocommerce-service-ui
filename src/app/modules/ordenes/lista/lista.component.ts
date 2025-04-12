import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenesService } from '../ordenes.service';

@Component({
  selector: 'app-listar-ordenes',
  templateUrl: './listar.component.html',
})
export class ListarComponent implements OnInit {
  columnas: string[] = ['id', 'cliente', 'fecha', 'total', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ordenesService: OrdenesService) {}

  ngOnInit(): void {
    this.ordenesService.obtenerTodos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar esta orden?')) {
      this.ordenesService.eliminar(id).subscribe(() => this.ngOnInit());
    }
  }
}
