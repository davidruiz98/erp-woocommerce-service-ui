import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientesService } from '../clientes.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  imports: [MatPaginatorModule, MatTableModule ,RouterModule,MatIconModule],
})
export class ListarComponent implements OnInit {
  columnas: string[] = ['id', 'nombre', 'email', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.obtenerTodos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clientesService.eliminar(id).subscribe(() => {
        this.cargarClientes();
      });
    }
  }
}
