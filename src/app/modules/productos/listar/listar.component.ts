import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar.component.html',
})
export class ListarComponent implements OnInit {
  columnas: string[] = ['id', 'nombre', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerTodos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productosService.eliminar(id).subscribe(() => this.ngOnInit());
    }
  }
}
